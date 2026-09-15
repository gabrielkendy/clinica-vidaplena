Material do Aluno — Aula 1: A IA invadiu a minha clínica

  🚪 A invasão
  📋 Os prompts (o ajuste)
  🧪 Testa no ar
  🖐️ Manual (sem IA)
  ✅ Checklist

# Segurança com IA — Aula 1

A IA invadiu a minha clínica: **um arquivo exposto → um crachá vazado → a vida dos pacientes**. Aqui está o mapa das 3 falhas + **o prompt completo pra arrumar cada uma** no SEU projeto.

## 1 A INVASÃO DO VÍDEO — em 3 portas 🚪

Não foram 3 falhas soltas: foi **uma corrente**. Cada porta aberta entregava a chave da próxima. É assim que uma invasão de verdade funciona.

 | Porta | O ataque (ao vivo, no site) | A correção (o prompt) | O teste
 | 🔐 **O caderno de senhas**
`/.env` | Pedi o arquivo de segredos na barra de endereço e baixei o site inteiro de senhas: banco, chave de IA, WhatsApp, cofre de backup... **e o crachá da equipe**. | **Prompt 1** — senhas fora da pasta pública + regra que bloqueia arquivo sensível | `/.env` → **403**
 | 🪪 **O crachá achado**
painel interno | Com o crachá na mão, abri o painel da equipe: **todos os pacientes** (CPF, telefone, plano) e o **faturamento do mês**. | **Prompt 3** — porteiro NO SERVIDOR em toda rota interna | acesso comum → **403** · equipe de verdade → **200**
 | 🧾 **A vida dos pacientes**
ficha + exame | Com a senha do banco que vazou no .env, li os logins direto no banco (a senha da Mariana tava lá, escrita). Logado como ela, troquei 101 por 103 e li a **ficha do Bruno** (as anotações íntimas dele). E baixei o **exame dele**. | **Prompt 2** — filtro de dono em TODA busca (dado E arquivo) | 103 → **404** · a ficha dela → **200**

**A lição da corrente:** quem construiu foi a IA, e a IA só escreveu o caminho feliz. Os erros não são aleatórios: são SEMPRE os mesmos. E o que é previsível é treinável.

### 🗺️ O .env não é uma lista — é um MAPA

O arquivo de senhas do vídeo tinha mais de vinte linhas, e cada uma é uma **seta pra outro lugar**. Foi assim que uma falha só virou a planta do castelo inteiro:

 | Linha do .env | O que ela abre (pra onde leva) | Onde a gente explora
 | `DB_HOST` · `DB_PORT` · `DB_PASSWORD` | O endereço + a senha do banco (pacientes, exames, agenda, financeiro) | a base de tudo
 | `EQUIPE_TOKEN` | O painel interno da equipe | **porta 2** desta aula
 | `JWT_SECRET` | Forjar o login de qualquer pessoa | porta 3 (ficha + exame)
 | `BACKUP_DIR` | O caminho exato da cópia do banco | aula 3 (backup)
 | `REDIS_URL` | O cache que deveria travar tentativas de login | aula 2 (código sem limite)
 | `INTERNAL_API_URL` | A API interna (máquina que só devia ser alcançada por dentro) | aula 2 (função espia)
 | `STORAGE_BUCKET` | O cofre de exames | aula 2 (download)
 | `VIDA_AI_KEY` | A assistente de IA (por conta da clínica) | aula 3 (chave no site)
 | `SENTRY_DSN` + `APP_DEBUG` | Erros internos vazando + detalhe na tela | aula 3 (exposição)
 | `WHATSAPP_TOKEN` · `SMTP` · `PIX_CHAVE` | O WhatsApp oficial, o e-mail e o PIX da clínica | se passar pela clínica

A lição que fica: **o .env vazado não entrega uma senha — entrega o mapa de todas as outras portas.** É por isso que a regra número 1 da série é: segredo fora da pasta pública, e se vazou, troca TUDO.

## 2 O AJUSTE DE CADA FALHA — o prompt completo 📋

Cada falha que você viu no vídeo tem **UM prompt de correção**. É só copiar o da falha **que o SEU projeto tem** e colar no seu agente (Cursor, Claude Code, ChatGPT, Codex...) **junto com o seu projeto**: ele corrige e cria o teste.

**Como usar:** 1) se liga qual das 3 falhas o seu projeto tem · 2) copia o prompt dela · 3) cola no agente e exige o **antes/depois** e o **teste**. Conserta UMA por vez — assim você confere cada prova.

**FALHA 1 🔐 Senhas à vista (.env / arquivos de segredos)**

O que o vídeo mostrou: o `/.env` aberto na internet, com todas as senhas do sistema.

`
Aplique a correção de ARQUIVOS DE SEGREDOS EXPOSTOS no meu projeto.

O que fazer:
1. Localize TODOS os arquivos de segredos e artefatos que não podem ser públicos: .env, *.sql, *.bak, *.dump, backups, logs, dotfiles.
2. Garanta que NENHUM deles fica em pasta servida pela web (pasta pública/static/public/www). Mova pra fora, ou pra uma pasta bloqueada.
3. No servidor, crie uma REGRA que recusa qualquer requisição a arquivo sensível (nome começando com ponto, ou extensão .sql/.bak/.dump/.env) — respondendo 403 ANTES de tentar ler.
4. Se algum desses arquivos já foi para um repositório ou deploy: me liste TUDO que vazou e me diga quais chaves preciso TROCAR (rotação), porque arquivo exposto se considera vazado pra sempre.
5. Crie um teste que PROVA: pedir /.env e /backup.sql na minha app → 403/404.

Me mostre: arquivos movidos, a regra adicionada (antes/depois), a lista de chaves pra trocar, e o teste.
`

📋 Copiar o ajuste da falha 1

**FALHA 2 🧾 Dado de outro usuário (ficha e exame alheios)**

O que o vídeo mostrou: trocar o número na URL e ler a ficha e o exame de outro paciente.

`
Aplique a correção de ACESSO A DADOS DE OUTROS USUÁRIOS (IDOR) no meu projeto.

O que fazer:
1. Encontre TODA rota/consulta que devolve dados por um id vindo do cliente (ex: /pedidos/:id, /agendamentos/:id, ?id=, ?token=).
2. Em cada uma: filtre SEMPRE pelo dono do dado junto com o id — ex: WHERE id = ? AND user_id = <usuário da sessão> (NUNCA confie em id, role ou "dono" que veio do cliente).
3. Se o dado não for do usuário logado: responda 404 (não 403 — não confirme nem que o dado existe).
4. Se o banco suportar, adicione uma trava extra no nível do banco (constraint/policy) como rede de segurança.
5. Vale também para ARQUIVOS e downloads: um arquivo só pode ser entregue pro dono — confira no servidor se o arquivo pertence a quem está pedindo (e nunca monte caminho de arquivo com texto do usuário).
6. Crie um teste que PROVA: logado como usuário A, pedir o registro do usuário B → 404; e o dono B acessando o dele → 200.

Me mostre: rotas alteradas, o antes/depois de cada correção, e como rodar o teste.
`

📋 Copiar o ajuste da falha 2

**FALHA 3 🖥️ Área interna sem porteiro (qualquer um entrava)**

O que o vídeo mostrou: o painel da equipe abriu pra quem tinha o crachá vazado — sem porteiro de verdade.

`
Aplique a correção de PERMISSÃO EM ROTAS INTERNAS no meu projeto.

O que fazer:
1. Liste TODAS as rotas que não são pra qualquer usuário (admin, painel, equipe, financeiro, relatórios, listagens gerais).
2. Em cada uma, a decisão deve acontecer NO SERVIDOR: checar o papel/permissão do usuário da SESSÃO (ex: user.role === 'admin' | user.staff) — nunca um campo que veio do cliente.
3. Sem permissão: responda 403 com uma mensagem genérica ("acesso restrito").
4. Revise também o frontend: o que a tela mostra pode continuar, mas NUNCA é a defesa — a defesa é no servidor.
5. Crie um teste que PROVA: usuário comum chamando a rota interna → 403; usuário com permissão → 200.

Me mostre: rotas alteradas, o antes/depois, e o teste.
`

📋 Copiar o ajuste da falha 3

**Dica de ouro:** se a IA enrolar, pede de novo: "me mostre o arquivo e a linha exatos". Ela não consegue fingir código que não escreveu.
**Quer o mapa completo?** Este material cobre as 3 falhas DESTA aula. No material completo da série estão a auditoria das 9 (o prompt mestre), os ajustes das outras 5 e o re-teste final: materiais-aulas.vercel.app/seguranca-com-ia.

## 3 TESTA VOCÊ MESMO — as duas clínicas estão no ar 🧪

🔴 **Clínica aberta** (com as 9 falhas) — clinica-vidaplena.vercel.app
🟢 **Clínica blindada** (o depois, com tudo fechado) — clinica-vidaplena-blindado.vercel.app
💾 **Código no GitHub** — clona e ataca na sua máquina (com os scripts de ataque)

Login do paciente: `mariana@exemplo.com` / `Mariana2026` · Tudo fictício, marcado na tela: é laboratório de treino. **A regra da série:** só se ataca o PRÓPRIO laboratório.

**O experimento de 30 segundos:** na clínica aberta, põe `/.env` no fim do endereço. Agora faz o mesmo na blindada. Viu? É a diferença entre um arquivo e uma tranca.

## 4 MODO MANUAL — conserte sem IA 🖐️

Quer conferir com as próprias mãos (ou sem agente)? O caminho de cada uma das 3 falhas:

- **Senhas à vista:** procure `.env`/`.sql` dentro da pasta pública → mova pra fora → no servidor, bloqueie dotfiles e extensões sensíveis (403 antes de ler).

- **Dado de outro:** em toda busca por id, exija também `dono = usuário logado`; se não bater: 404. Vale pra arquivo também.

- **Porteiro da área interna:** toda rota de admin checa o papel NO SERVIDOR (staff/role da sessão) → sem isso: 403.

O passo a passo detalhado (com o "como verificar" de cada uma) está no material completo: materiais-aulas.vercel.app/seguranca-com-ia → seção MODO MANUAL.

## 5 CHECKLIST — hoje, no SEU projeto ✅

- Testar EU MESMO as 3 falhas: pedir `/.env`, trocar um id na URL por um de outro usuário, chamar uma rota interna com conta comum.

- Achou alguma? Copiar o **ajuste daquela falha** (seção 2) e colar no seu agente — com o antes/depois.

- Se algum segredo já esteve exposto: **trocar as chaves** (rotação) — exposto é vazado pra sempre.

- Repetir a varredura a cada entrega nova (5 minutos, uma vez por release).

**A regra da série:** só se ataca o PRÓPRIO laboratório. A gente estuda os ataques pra entender as defesas — nunca pra atacar sistema de ninguém.

Material da aula 1 · **Segurança com IA (modo defesa)**

Material completo + casos reais: materiais-aulas.vercel.app/seguranca-com-ia
