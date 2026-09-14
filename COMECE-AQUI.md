# ✅ COMECE AQUI — você só precisa de 2 arquivos

## 🎙️ 1. ROTEIRO.md
**O que você FALA no vídeo.** Abre, lê a fala, grava. Cada falha tem 4 momentos:
**a história** (você explica) → **o ataque** (você faz) → **a correção** (o conserto + o prompt que você entrega) → **o teste** (você prova que fechou).

→ `01-ROTEIRO/ROTEIRO.md`

## 🖥️ 2. EXECUCAO.md
**O que você FAZ na tela, na ordem.** Deixa aberto do lado enquanto grava: cada passo diz o que digitar/abrir e o que vai aparecer (Bloco 1 = abertura, Bloco 2 = falha 1...). Onde tiver 🎙️, é a hora de falar.

→ `01-ROTEIRO/EXECUCAO.md`

---

## O resto é apoio (consulta, não precisa decorar)

| Se precisar de... | Vai em... |
|---|---|
| Slides de apoio na gravação | `01-ROTEIRO/APRESENTACAO-TEORIA-ANOTAVEL.html` |
| Os prompts pro espectador (você mostra na tela) | `materiais-aulas.vercel.app/seguranca-com-ia/` → seção PROMPTS |
| O código das correções (você mostra no VS Code) | `02-BLINDAGEM/server-blindado.js` (Ctrl+F "CORREÇÃO") |
| Testar tudo antes de gravar | `ATAQUE-ONLINE.cmd` + `python 02-BLINDAGEM/reteste.py https://clinica-vidaplena-blindado.vercel.app` |
| Versões antigas dos roteiros | `01-ROTEIRO/_HISTORICO/` |

**Os 2 sites (sempre):** 🔴 `clinica-vidaplena.vercel.app` (o alvo) · 🟢 `clinica-vidaplena-blindado.vercel.app` (o consertado)

---

## O fluxo do vídeo 1 (uma invasão em 3 falhas: **o arquivo → o crachá → os dados**)

| # | Falha | A história | O ataque | A correção + prompt | O teste |
|---|---|---|---|---|---|
| 1 | 🔐 Caderno de senhas (.env) | o projeto inteiro vai junto | `/.env` na barra — e **ache o crachá da equipe** | prompt 1 + código | 🟢 → 403 |
| 2 | 🪪 O crachá achado | a porta da equipe vale ouro | usa o `tok_equipe_000` achado → painel + financeiro | prompt 3 + código | 🟢 → 403 (e a equipe entra normal) |
| 3 | 🧾 A vida dos pacientes | "quem pede é o dono do dado?" | troca 101 por 103 + baixa o laudo do Bruno | prompt 2 + código | 🟢 → 404 (e o dela funciona) |

**As 3 formam UMA invasão:** o arquivo entrega o crachá → o crachá abre a sala → de dentro, os dados. É a narrativa do vídeo.

**Depois de gravar:** próximo vídeo = as 5 falhas restantes em cadeia nova (o código sem limite + o download que vira cofre + a foto que espiona + a chave na vitrine + o backup no chão). Quando o 1 estiver pronto, a gente prepara.
