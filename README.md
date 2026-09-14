# 🏥 Clínica VidaPlena — LAB DE TREINAMENTO DE SEGURANÇA

> **⚠️ AVISO:** site fictício criado para treino/conteúdo (Gabriel Kendy). Contém **8 falhas plantadas de propósito**.
> Todos os dados (pacientes, CPFs, exames, financeiro) são **100% fictícios**. Nunca use para atacar sistemas de terceiros.

## Como rodar
```bash
cd clinica-vidaplena
node server.js
# Site: http://localhost:3400
```

## 🌐 Site NO AR (Vercel) — o mesmo lab, publicado
**https://clinica-vidaplena.vercel.app** — funciona igual ao local (as 8 falhas, login, painel, assistente). Dados fictícios, avisos no site.
- Ataque contra o site público: `python MISSOES/ataque-online.py` (ou `ATAQUE-ONLINE.cmd`)
- Código do deploy: pasta `online/` (Next.js · função catch-all). Re-deploy: `cd online && npx vercel --prod`

## 🎯 Simular os ataques (as 8 falhas de uma vez)
```bash
python MISSOES/simular-ataques.py     # ou dê duplo clique em SIMULAR-ATAQUES.cmd
```
O script sobe o lab, explora as 8 falhas em sequência e mostra o resultado de cada uma.

## Contas de teste
| E-mail | Senha | Quem é |
|---|---|---|
| mariana@exemplo.com | Mariana2026 | paciente comum |
| bruno@exemplo.com | Bruno2026 | paciente comum |
| carla@exemplo.com | Carla2026 | paciente comum |
| equipe@vidaplena.com | equipe2026 | equipe interna |

Códigos de acesso (4 dígitos): mariana = 4815 · bruno = 2277 · carla = 9090

## Páginas
- `/` — site da clínica (landing)
- `/paciente` — portal do paciente (login + agenda/exames/dados + assistente virtual)
- `/interno` — painel interno da equipe (pacientes, agenda, financeiro)

## As 8 falhas plantadas (mapa — detalhes em MISSOES/)
| # | Falha | Onde |
|---|---|---|
| 1 | **IDOR** — agendamento de outro paciente (com observações médicas!) | `GET /api/agendamentos/:id` |
| 2 | **`.env` exposto** — credenciais na web | `GET /.env` |
| 3 | **Painel interno sem checagem** — qualquer paciente vê pacientes, agenda e financeiro | `GET /api/admin/*` |
| 4 | **Código de acesso sem rate limit** — brute force de 10.000 | `POST /api/login/codigo` |
| 5 | **Path traversal** — baixar qualquer arquivo do servidor pelo "exame" | `GET /api/exame?arquivo=...` |
| 6 | **SSRF** — servidor busca qualquer URL ("foto de perfil") | `POST /api/importar-foto` |
| 7 | **Chave de API no front** — assistente virtual | `public/app.js` |
| 8 | **backup.sql exposto + headers fracos** | `/backup.sql` · headers |

## Estrutura
```
clinica-vidaplena/
├── server.js          ← servidor (falhas comentadas com ⚠️)
├── .env               ← segredos fictícios
├── data/db.json       ← pacientes/agendamentos/exames/financeiro (fictícios)
├── public/
│   ├── index.html     ← landing da clínica
│   ├── paciente.html  ← portal do paciente
│   ├── admin.html     ← painel interno (dark)
│   ├── app.js         ← ⚠️ chave exposta (falha 7)
│   ├── .env           ← ⚠️ o vazado (falha 2)
│   ├── backup.sql     ← ⚠️ o exposto (falha 8)
│   ├── img/           ← fotos da clínica e da equipe
│   └── arquivos/      ← "exames" dos pacientes
└── MISSOES/           ← guia de exploração (roteiro do V1)
```

## 🔀 As duas versões (o antes e o depois)
- **`main`** (esta branch) — o lab **vulnerável**: as 8 falhas plantadas, do jeito que o vídeo 1 mostra.
- **branch `blindado`** — o MESMO lab com **as 8 correções aplicadas** (o "depois" do vídeo 2), com o guia das correções e o script do reteste.

```bash
git checkout blindado             # ver o código corrigido (✅ CORREÇÃO em cada ajuste)
node 02-BLINDAGEM/server-blindado.js   # roda na porta 3500, lado a lado com o vulnerável
python 02-BLINDAGEM/reteste.py         # roda os MESMOS 8 ataques → 🛡️ 8/8 bloqueadas
```

