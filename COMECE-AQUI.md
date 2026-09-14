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

## O fluxo do vídeo 1 (3 falhas)

| # | Falha | A história | O ataque | A correção + prompt | O teste |
|---|---|---|---|---|---|
| 1 | 🔐 Caderno de senhas (.env) | projeto inteiro vai junto | `/.env` na barra do navegador | prompt 1 + código | 🟢 → 403 |
| 2 | 🧾 Ficha do outro paciente | esconder o botão ≠ trancar a porta | troca o 101 por 103 na URL | prompt 2 + código | 🟢 → 404 · a dela funciona |
| 3 | 🔢 Fechadura sem limite | 4 dígitos ≈ 10 mil combinações | o loop no terminal → ACESSO CONCEDIDO | prompt 4 + código | 🟢 → 429 |

**Depois de gravar:** próximo vídeo = painel interno + traversal + SSRF (as 3 seguintes). Quando o 1 estiver pronto, a gente prepara.
