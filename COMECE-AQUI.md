# 🎬 COMECE AQUI — o plano de gravação (2 vídeos · 4 falhas cada)

> **O formato:** cada falha virou um bloco completo e dinâmico de ~3 min:
> **1️⃣ A HISTÓRIA** (o problema fácil de entender: o que é + por que acontece) →
> **2️⃣ O ATAQUE** (como o cara pega: demo ao vivo no site 🔴) →
> **3️⃣ A SOLUÇÃO** (o código da correção, na prática) →
> **4️⃣ O TESTE** (roda o MESMO ataque → bloqueado no site 🟢 + uso legítimo funcionando).
>
> 🔴 **Alvo:** `https://clinica-vidaplena.vercel.app` · 🟢 **Blindado:** `https://clinica-vidaplena-blindado.vercel.app`
> ⏱️ **Duração real medida:** ~13-15 min por vídeo (limite: 20).
> 💬 Roteiro completo: `01-ROTEIRO/ROTEIRO-LIMPO-PARA-GRAVAR.md` (falas) + `ROTEIRO-COM-TIMECODES.md` (o que mostrar).

---

## 📦 O que tem na pasta (mapa rápido)

| Arquivo / pasta | Pra quê |
|---|---|
| `COMECE-AQUI.md` | **este guia** — o plano de gravação |
| `01-ROTEIRO/ROTEIRO-LIMPO-PARA-GRAVAR.md` | as falas dos 2 vídeos (o que você fala) |
| `01-ROTEIRO/ROTEIRO-COM-TIMECODES.md` | timecodes + o que mostrar na tela |
| `01-ROTEIRO/APRESENTACAO-TEORIA-ANOTAVEL.html` | deck de slides (apoio visual, navega com ← →) |
| `01-ROTEIRO/KIT-DE-GRAVACAO.md` | os comandos por falha (ataque → correção → teste) |
| `ATAQUE-ONLINE.cmd` | 💀 o ataque completo no site NO AR (duplo clique) |
| `02-BLINDAGEM/server-blindado.js` | **o código das correções** (é o que você mostra na tela — Ctrl+F "CORREÇÃO") |
| `02-BLINDAGEM/reteste.py` | o teste das 8 (`python 02-BLINDAGEM/reteste.py https://clinica-vidaplena-blindado.vercel.app`) |
| `MISSOES/` · `online/` · `online-blindado/` | referência técnica (não precisa mexer) |

**Logins:** `mariana@exemplo.com` / `Mariana2026` (paciente) · `equipe@vidaplena.com` / `equipe2026` (equipe)
**Código de acesso da Mariana:** `4815`

---

# 🎥 VÍDEO 1 · "A IA invadiu a minha clínica" (4 falhas · ~14 min)

## Setup (5 min)
1. **Browser, 2 janelas lado a lado:** 🔴 `clinica-vidaplena.vercel.app` (esquerda) · 🟢 `clinica-vidaplena-blindado.vercel.app` (direita)
   - Na 🔴: logar como Mariana em `/paciente` e abrir `/interno` numa aba
2. **Editor aberto:** `02-BLINDAGEM/server-blindado.js` (é o código das correções que você vai mostrar)
3. **Terminal** limpo, fonte grande — pro ataque ao vivo
4. **Teste antes de gravar:** `ATAQUE-ONLINE.cmd` → 8/8 · e `python 02-BLINDAGEM/reteste.py https://clinica-vidaplena-blindado.vercel.app` → 8/8 bloqueadas

## Ordem dos blocos
| # | Bloco | O que grava |
|---|---|---|
| 1 | **Abertura** (câmera, 50s) | a promessa + "esse site tá no ar agora" |
| 2 | **Falha 1 · .env** | história → ataque (digitar `/.env` no navegador 🔴) → solução (Ctrl+F "CORREÇÃO 02") → teste (mesma URL no 🟢 → 403) |
| 3 | **Falha 2 · IDOR** | história → ataque (`/api/agendamentos/103?token=...` no 🔴) → solução (CORREÇÃO 01) → teste (mesma URL no 🟢 → 404) |
| 4 | **Falha 3 · painel** | história → ataque (`/interno` como paciente no 🔴) → solução (CORREÇÃO 03) → teste (🟢 bloqueado / equipe entra) |
| 5 | **Falha 4 · código sem limite** | história → ataque (o loop no terminal → ACESSO CONCEDIDO) → solução (CORREÇÃO 04) → teste (loop no 🟢 → 429) |
| 6 | **Fecho** (câmera, 90s) | "faltam 4" + CTA + "comenta: fechei a primeira" |

## Regras de take (as que fazem o vídeo parecer caro)
- ⭐ **3 SEGUNDOS DE SILÊNCIO** depois de cada descoberta (depois do ataque funcionar). É o "uau".
- O ataque é gravado **na tela cheia** do navegador/terminal. Sem pressa ao digitar a URL: o espectador precisa acompanhar.
- Depois de mostrar a correção no código, **volta pro navegador e roda o teste**: é o ciclo fechando na cara do espectador.
- O loop do código (falha 4): grava o processo completo + sua reação na câmera.

---

# 🎥 VÍDEO 2 · "A clínica blindada" (4 falhas · ~14 min)

## Setup (2 min)
- Mesmo esquema: 🔴 e 🟢 lado a lado, editor aberto, terminal limpo
- **Teste antes:** `python 02-BLINDAGEM/reteste.py https://clinica-vidaplena-blindado.vercel.app` → 8/8 bloqueadas

## Ordem dos blocos
| # | Bloco | O que grava |
|---|---|---|
| 1 | **Abertura/recap** (câmera, 40s) | "consertei 4, hoje tem mais 4" |
| 2 | **Falha 5 · traversal** | história → ataque (`/api/exame?arquivo=../../.env` no 🔴) → solução (CORREÇÃO 05) → teste (🟢 400 / exame real baixa) |
| 3 | **Falha 6 · SSRF** | história → ataque (importar-foto com URL interna no 🔴) → solução (CORREÇÃO 06) → teste (🟢 400 / imagem pública funciona) |
| 4 | **Falha 7 · chave no front** | história → ataque (F12 → Ctrl+F VIDA_AI_KEY no 🔴) → solução (CORREÇÃO 07) → teste (F12 no 🟢 → nada / assistente responde) |
| 5 | **Falha 8 · backup** | história → ataque (`/backup.sql` no 🔴) → solução (CORREÇÃO 08) → teste (🟢 403 + headers) |
| 6 | **Fecho da série** (câmera, 90s) | as 4 perguntas + "cola na tua mesa" + CTA final |

## O take extra do V2 (opcional mas forte)
Se quiser fechar com chave de ouro: grava o **`reteste.py` completo rodando** (os 8 ataques contra o 🟢, um por um, todos bloqueados). Rende 1 min de vídeo e é a prova social da série.

---

## ✅ Checklist antes de publicar cada vídeo
- [ ] Cada falha tem os 4 tempos (história → ataque → solução → teste)? **Sem pular o teste.**
- [ ] Os 3s de silêncio depois de cada descoberta?
- [ ] O teste mostra TAMBÉM o uso legítimo funcionando ("não quebrou nada")?
- [ ] Fecho pede like/inscreve/comenta?
- [ ] Descrição com: 🔴 `clinica-vidaplena.vercel.app` + 🟢 `clinica-vidaplena-blindado.vercel.app` + repo `github.com/gabrielkendy/clinica-vidaplena`

## 🔧 Se algo der errado
| Problema | Solução |
|---|---|
| Site demora na 1ª resposta | cold start da Vercel — aquece antes de gravar (abre o site 1x) |
| Loop não acha o código | o código é `4815`; a faixa já cobre |
| Deu ruim no meio do take | respira, reseta, grava de novo |
| **Bloco estourou de tempo** | grave a falha 4 como bloco separado → a série vira 3 vídeos (3+3+2) sem perder nada |

## 📏 As 3 regras que não se quebram
1. **Só no nosso lab.** Nunca demo em sistema de terceiros.
2. **Testa antes de gravar.** Todo comando roda primeiro fora de câmera.
3. **Os 3 segundos de silêncio** depois de cada descoberta.
