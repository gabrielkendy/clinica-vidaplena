# ✅ COMECE AQUI — você só precisa de 2 arquivos

## 🎙️ 1. ROTEIRO.md — o que você FALA no vídeo
Abre, lê, grava. Cada falha: **história → ataque → correção (com o prompt) → teste.**

→ `AULA-01 · A INVASAO/01-ROTEIRO/ROTEIRO.md`

## 🖥️ 2. EXECUCAO.md — o que você FAZ na tela
**Passo a passo cego:** um quadradinho por vez (faz → marca → segue). Tudo no **site oficial + Cursor.**
Onde tiver 🎙️, você fala a fala do roteiro.

→ `AULA-01 · A INVASAO/01-ROTEIRO/EXECUCAO.md`

---

## ⭐ O fluxo (TUDO no site oficial, AO VIVO: `clinica-vidaplena.vercel.app`)

**Uma invasão em 3 falhas: o arquivo → o crachá → os dados. E cada falha tem 4 tempos:**

| # | A falha | 1️⃣ O ataque (no site) | 2️⃣ A correção (no Cursor) | 3️⃣ Publica | 4️⃣ O teste (no site) |
|---|---|---|---|---|---|
| 1 | 🔐 Caderno de senhas | `clinica-vidaplena.vercel.app/.env` mostra tudo, **incluindo o crachá** | pega o **prompt 1** no material → cola no Cursor → IA arruma | `npx vercel --prod` | `/.env` → **403** |
| 2 | 🪪 O crachá | cola o `tok_equipe_000` no painel → **entra na sala da equipe** | **prompt 3** → Cursor → IA arruma | `npx vercel --prod` | painel com acesso comum → **403** (e a equipe entra normal) |
| 3 | 🧾 A vida dos pacientes | troca 101 por 103 → ficha do Bruno + baixa o laudo dele | **prompt 2** → Cursor → IA arruma | `npx vercel --prod` | 103 → **404** (e o dela funciona) |

**O momento-chave de cada falha:** você cola o prompt do material **no Cursor**, a IA arruma o código **na tua frente**, você **publica de novo** e testa **no mesmo endereço, no ar**. É o ciclo do vibe coding inteiro: do problema à prova, ao vivo na internet.

---

## Antes de gravar (o essencial)
- [ ] **Cursor** aberto no projeto: `Documents\New project\clinica-vidaplena`
- [ ] **`RESET-LAB.cmd`** (duplo clique: restaura os arquivos E **republica o site** com as falhas, ~40s)
- [ ] **Chrome** em `clinica-vidaplena.vercel.app/paciente` (logada como Mariana) + o site aberto normal
- [ ] **Terminal do Cursor** aberto (Ctrl + `) — é nele que roda o deploy
- [ ] **Material do aluno** numa aba: `materiais-aulas.vercel.app/seguranca-com-ia` (é de lá que saem os prompts)
- [ ] **ENSAIO (sem câmera):** roda o Bloco 2 do EXECUCAO uma vez (ataque → prompt → publica → testa) → depois **`RESET-LAB.cmd` de novo**

---

## O resto é apoio (consulta, não precisa decorar)

| Se precisar de... | Vai em... |
|---|---|
| **Material do Aluno da AULA 1** (com os prompts) | `AULA-01 · A INVASAO/02-MATERIAL-DO-ALUNO/MATERIAL-DO-ALUNO.html` (é O entregável) |
| **Thumb** (prompt + arte final) | `AULA-01 · A INVASAO/03-THUMBNAIL/` |
| **Descrição do vídeo** (título, tags, fixado) | `AULA-01 · A INVASAO/05-DESCRICAO/DESCRICAO.md` |
| Os prompts pro espectador (você mostra e usa na tela) | `materiais-aulas.vercel.app/seguranca-com-ia` → PROMPTS (mestre + 8 + manual) |
| Ver o resultado esperado das correções | `LAB-BLINDADO/server-blindado.js` (é o "mapa" do que a IA deve fazer) |
| Voltar o lab pras falhas (resetar) | `RESET-LAB.cmd` |
| A versão blindada pronta (referência no ar) | `clinica-vidaplena-blindado.vercel.app` |
| O site no ar (é o cenário do vídeo) | `clinica-vidaplena.vercel.app` |
| O círcuito completo de teste das 9 portas | `LAB-BLINDADO/reteste.py` (ou `reteste.py <URL>`) |
| O padrão das aulas (estrutura + divisão da série) | `PADRAO-DAS-AULAS.md` |

**Depois de gravar:** a série tem 3 aulas — as pastas da **AULA-02 · AS FUNCOES** (código sem limite + download que abre pastas + função espia) e **AULA-03 · A VITRINE** (chave no site + banco na calçada) já estão criadas, esperando produção. O passo a passo de montar cada uma está no `PADRAO-DAS-AULAS.md`.
