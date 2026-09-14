# ✅ COMECE AQUI — você só precisa de 2 arquivos

## 🎙️ 1. ROTEIRO.md — o que você FALA no vídeo
Abre, lê, grava. Cada falha: **história → ataque → correção (com o prompt) → teste.**

→ `01-ROTEIRO/ROTEIRO.md`

## 🖥️ 2. EXECUCAO.md — o que você FAZ na tela
**Passo a passo cego:** um quadradinho por vez (faz → marca → segue). Tudo numa tela só: **Cursor + Chrome.**
Onde tiver 🎙️, você fala a fala do roteiro.

→ `01-ROTEIRO/EXECUCAO.md`

---

## O fluxo do vídeo (uma invasão em 3 falhas: **o arquivo → o crachá → os dados**)

| # | A falha | O ataque (você faz no navegador) | A correção (você faz no Cursor) | O teste |
|---|---|---|---|---|
| 1 | 🔐 Caderno de senhas | `localhost:3400/.env` mostra tudo, **incluindo o crachá** | copia o **prompt 1** do material → cola no Cursor → IA arruma → reinicia | `/.env` → **403** |
| 2 | 🪪 O crachá | cola o `tok_equipe_000` no painel → **entra na sala da equipe** | copia o **prompt 3** → cola no Cursor → IA arruma → reinicia | painel com acesso comum → **403** (e a equipe entra normal) |
| 3 | 🧾 A vida dos pacientes | troca 101 por 103 → ficha do Bruno + baixa o laudo dele | copia o **prompt 2** → cola no Cursor → IA arruma → reinicia | 103 → **404** (e o dela funciona) |

**O momento-chave de cada falha:** você cola o prompt do material **no Cursor**, a IA arruma o código **na tua frente**, você reinicia e testa. É o ciclo do vibe coding inteiro: do problema à prova.

---

## Antes de gravar (o essencial)
- [ ] **Cursor** aberto no projeto: `Documents\New project\clinica-vidaplena`
- [ ] **`RESET-LAB.cmd`** (duplo clique: garante o estado com as falhas, desfaz ensaios)
- [ ] **`node server.js`** no terminal do Cursor → "🏥 Clínica VidaPlena no ar"
- [ ] **Chrome** em `localhost:3400/paciente`, logada como Mariana + o site aberto normal
- [ ] **Material do aluno** numa aba (é de lá que saem os prompts): `materiais-aulas.vercel.app/seguranca-com-ia`
- [ ] **ENSAIO (sem câmera):** roda o Bloco 2 do EXECUCAO uma vez → depois **RESET-LAB.cmd de novo** (o Cursor terá mexido nos arquivos)

---

## O resto é apoio (consulta, não precisa decorar)

| Se precisar de... | Vai em... |
|---|---|
| Slides de apoio na gravação | `01-ROTEIRO/APRESENTACAO-TEORIA-ANOTAVEL.html` |
| Os prompts pro espectador (você mostra e usa na tela) | `materiais-aulas.vercel.app/seguranca-com-ia` → PROMPTS (mestre + 8 + manual) |
| Ver o resultado esperado das correções | `02-BLINDAGEM/server-blindado.js` (é o "mapa" do que a IA deve fazer) |
| Voltar o lab pras falhas (resetar) | `RESET-LAB.cmd` |
| A versão blindada pronta (referência no ar) | `clinica-vidaplena-blindado.vercel.app` |
| O site no ar (gancho da abertura / take bônus) | `clinica-vidaplena.vercel.app` |
| Versões antigas dos roteiros | `01-ROTEIRO/_HISTORICO/` |

**Depois de gravar:** próximo vídeo = as 5 falhas restantes (o código sem limite + o download que vira cofre + a foto que espiona + a chave na vitrine + o backup no chão), no mesmo formato. Quando o 1 estiver pronto, a gente prepara.
