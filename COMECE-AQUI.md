# 🎬 COMECE AQUI — plano de gravação 100% ONLINE (V1 + V2)

> **Tudo no ar, simulando o real:** você grava abrindo os sites **na internet** e fazendo os ataques contra eles — do jeito que qualquer pessoa faria.
> - 🔴 **VULNERÁVEL (o alvo):** `https://clinica-vidaplena.vercel.app`
> - 🟢 **BLINDADO (o depois):** `https://clinica-vidaplena-blindado.vercel.app`
> Os dois são labs públicos, com dados 100% fictícios e avisos no site. Nunca faça isso em sistema de terceiros.

---

## 📦 O que tem na pasta (mapa rápido)

| Arquivo / pasta | Pra quê |
|---|---|
| `COMECE-AQUI.md` | **este guia** — o plano de gravação |
| `01-ROTEIRO/ROTEIRO-LIMPO-PARA-GRAVAR.md` | as falas do V1 (o que você fala) |
| `01-ROTEIRO/ROTEIRO-COM-TIMECODES.md` | V1 com timecodes + o que mostrar na tela |
| `01-ROTEIRO/APRESENTACAO-TEORIA-ANOTAVEL.html` | deck de 39 slides (navega com ← →) |
| `01-ROTEIRO/KIT-DE-GRAVACAO.md` | os comandos prontos (V1 e V2, online e local) |
| `ATAQUE-ONLINE.cmd` | 💀 o ataque completo no site NO AR (duplo clique) |
| `SIMULAR-ATAQUES.cmd` · `ATAQUE-AO-VIVO.cmd` | versão LOCAL (só se quiser a alternativa offline) |
| `02-BLINDAGEM/` | o V2: guia das correções + roteiro + reteste |
| `MISSOES/ataque-online.py` | o script do ataque online (roda via .cmd) |
| `online/` e `online-blindado/` | o código dos dois deploys (não precisa mexer) |

**Logins do lab:** `mariana@exemplo.com` / `Mariana2026` (paciente) · `equipe@vidaplena.com` / `equipe2026` (equipe)
**Código de acesso da Mariana:** `4815`

---

## 🎥 VÍDEO 1 · "A IA invadiu a minha clínica" (o ataque)

**Duração alvo:** ~13-16 min · **Produção:** 2h a 2h30

### PASSO 0 · Setup (5 min — agora é só abrir!)
1. **Nada pra subir!** O alvo já está no ar: `https://clinica-vidaplena.vercel.app`
2. **Browser, 3 abas:**
   - Aba 1: `https://clinica-vidaplena.vercel.app` (Ctrl+F5 só na primeira vez)
   - Aba 2: `https://clinica-vidaplena.vercel.app/paciente` (logar como Mariana)
   - Aba 3: `https://clinica-vidaplena.vercel.app/interno`
3. **Terminal** limpo, fonte grande, fundo escuro (pro `ATAQUE-ONLINE.cmd`)
4. **Teste antes de gravar:** duplo clique em `ATAQUE-ONLINE.cmd` → tem que fechar em **8/8 FALHAS EXPLORADAS**.

### PASSO 1 · Estude o roteiro (25 min)
1. Leia o **ROTEIRO-LIMPO-PARA-GRAVAR.md** de ponta a ponta, uma vez, sem parar. É o que você fala (linguagem de conversa).
2. Depois abra o **ROTEIRO-COM-TIMECODES.md**: cada bloco tem o que falar + o que mostrar.
3. Deixe o **KIT-DE-GRAVACAO.md** aberto no celular/segundo monitor: é de lá que você copia os comandos.

### PASSO 2 · Os takes "como um hacker faria" (navegador — NOVO, é ouro)
Grave **a tela do navegador** fazendo exatamente o que qualquer curioso faria — abrir as URLs na barra de endereço:

| O que digitar na barra | O que a tela mostra (o "uau") |
|---|---|
| `clinica-vidaplena.vercel.app/.env` | **o caderno de senhas inteiro**, aberto como texto |
| `clinica-vidaplena.vercel.app/backup.sql` | o banco de dados começando a baixar |
| `clinica-vidaplena.vercel.app/app.js` → Ctrl+F `VIDA_AI_KEY` | a chave da IA no código do site |
| `clinica-vidaplena.vercel.app/interno` (logada como paciente) | o painel da equipe aberto |
| F12 → aba Sources no portal | a chave no meio do JavaScript |

Dica: grava em **tela cheia** o navegador digitando a URL e apertando Enter → mostra o resultado. 2 takes de cada.

### PASSO 3 · O ataque completo (o take de encerramento)
Duplo clique em **`ATAQUE-ONLINE.cmd`** → o ataque roda INTEIRO contra o site no ar (banner, cores, contagem, brute force do código) → fecha em **💀 8/8 FALHAS EXPLORADAS — O SITE NO AR FOI COMPROMETIDO**.
⭐ **Depois do resultado, 3 SEGUNDOS DE SILÊNCIO olhando pra tela.** É o "uau".

### PASSO 4 · Os blocos com a câmera
Na ordem do roteiro:
- **B01 · A promessa** — energia alta. Dica: pode ABRIR mostrando o site no celular: "esse site tá na internet agora".
- **B03 · Por que acontece** — só áudio sobre os cards do deck (slide 3).
- **B12 · A lição** — o bloco mais importante. Calma, pausas. A tese: "a IA escreveu o caminho feliz".
- **B13 · Fecho e CTA** — like/inscreve/comenta.

### PASSO 5 · Use a apresentação como esqueleto (na edição)
- Cada falha tem 4 slides: **Teoria → Por que acontece → Agora no lab → A defesa**
- Corte: **slide de teoria → B-roll do navegador/terminal → slide de defesa**
- Print pra thumb: aperta **S** em qualquer slide.

> 🔌 **Modo local (alternativa):** se quiser gravar sem internet, roda `node server.js` e usa os .cmd locais (`ATAQUE-AO-VIVO.cmd`). Mesma coisa, na tua máquina.

---

## 🛡️ VÍDEO 2 · "A Blindagem" (as 8 correções ao vivo)

**Duração alvo:** ~10-13 min · **Produção:** 1h30 a 2h

### PASSO 0 · Setup (2 min — os dois já estão no ar!)
Abre os DOIS navegadores/lado a lado:
- 🔴 Esquerda: `https://clinica-vidaplena.vercel.app` (o vulnerável)
- 🟢 Direita: `https://clinica-vidaplena-blindado.vercel.app` (o blindado)
✅ São visualmente IDÊNTICOS — é isso que o vídeo mostra.
**Teste antes de gravar:** `python 02-BLINDAGEM/reteste.py https://clinica-vidaplena-blindado.vercel.app` → fecha em **🛡️ 8/8 PORTAS FECHADAS**.

### PASSO 1 · Estude o roteiro (20 min)
1. Leia o **`02-BLINDAGEM/ROTEIRO-V2-A-BLINDAGEM.md`** (mesmo estilo de conversa do V1).
2. Abra o **`02-BLINDAGEM/GUIA-DAS-8-CORRECOES.md`**: cada correção tem o "antes → depois" e o que mostrar.

### PASSO 2 · Grave em blocos
- **B01 · A promessa 2** (câmera) — recap do V1 + "hoje eu fecho as 8 E tento invadir de novo".
- **B02 · Como a blindagem funciona** (tela) — os dois sites lado a lado, idênticos.
- **B03 · O mapa** — as 8 correções em cards.
- **B04 a B11 · As 8 correções** — pra CADA UMA:
  1. Recap: roda o ataque no site 🔴 e mostra o problema (3s).
  2. Mostra a correção (o código tá no guia — é pequena).
  3. Roda o MESMO ataque no site 🟢 → **bloqueado na tela** (404/403/400/429).
  4. Fecha com a frase do guia ("Dificuldade não é defesa. LIMITE é defesa.").
- **B12 · O RETESTE** (momento de ouro) — grava o comando rodando INTEIRO, sem corte, até **🛡️ 8/8 PORTAS FECHADAS**.
- **B13 · A lição 2 e o CTA** (câmera) — "correção boa é correção pequena" + as 4 perguntas.

**Dica de ouro:** tela dividida — os DOIS navegadores abertos (🔴 e 🟢) e você digita a MESMA URL de ataque nos dois. Um mostra os dados, o outro mostra "acesso negado". Corte perfeito.

> 🔌 **Modo local (alternativa):** `node server.js` (3400) + `node 02-BLINDAGEM/server-blindado.js` (3500) e `python 02-BLINDAGEM/reteste.py` (sem URL).

---

## ✅ Checklist antes de publicar cada vídeo
- [ ] A promessa ficou clara nos primeiros 20 segundos?
- [ ] Tem o take no navegador (a URL suspeita aberta na tela)? É o que rende comentário.
- [ ] Os 3s de silêncio depois de cada descoberta?
- [ ] V1 termina prometendo a parte 2? V2 termina com o placar 8/8?
- [ ] Descrição com: alvo (`clinica-vidaplena.vercel.app`) + blindado (`clinica-vidaplena-blindado.vercel.app`) + repo (`github.com/gabrielkendy/clinica-vidaplena`)

---

## 🔧 Se algo der errado

| Problema | Solução |
|---|---|
| Site não abre | confere a URL (sem espaço); testa no celular; a Vercel pode estar em cold start (espera 3s) |
| Demora na primeira resposta | normal (servidor "acordando") — na gravação, faça 1 acesso antes pra aquecer |
| `ATAQUE-ONLINE.cmd` não acha o código | o código é `4815`; a faixa do loop já cobre |
| Comando local não roda | **Ctrl+F5**, ou confere se o `node server.js` tá rodando (modo local) |
| Deu ruim no meio do take | respira, reseta, grava de novo. Sem estresse. |

## 📏 As 3 regras que não se quebram
1. **Só no nosso lab.** Nunca demo em sistema de terceiros. (É o posicionamento da série inteira.)
2. **Testa antes de gravar.** Todo comando roda primeiro fora de câmera.
3. **Os 3 segundos de silêncio** depois de cada descoberta. É o que faz o vídeo parecer de gente grande.
