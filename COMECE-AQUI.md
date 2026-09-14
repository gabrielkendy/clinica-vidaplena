# 🎬 COMECE AQUI — como gravar o V1 (o vídeo do ataque)

> Você tem em mãos o kit completo do vídeo **"A IA invadiu a minha clínica"**.
> Siga NA ORDEM. Tempo estimado de produção: **2h a 2h30**.
> Tudo aqui é no NOSSO lab (Clínica VidaPlena, dados fictícios). Nunca em sistema de terceiros.

---

## PASSO 0 · Prepare o terreno (15 min)

1. **Suba o lab** (deixa essa janela do terminal aberta durante toda a gravação):
   ```bash
   cd "C:\Users\Gabriel\Documents\New project\clinica-vidaplena"
   node server.js
   ```
   ✅ Deu certo quando aparecer: `🏥 Clínica VidaPlena no ar (LAB DE TREINAMENTO)` na porta 3400.

2. **Teste a simulação** (garante que TUDO funciona antes de gravar). Duplo clique em `SIMULAR-ATAQUES.cmd` na pasta do projeto, ou:
   ```bash
   python MISSOES/simular-ataques.py
   ```
   ✅ Deu certo quando o resumo final disser **8/8 falhas exploradas**. Se alguma falhar, me chama antes de gravar.

   💀 **Quer o visual de filme pra gravar?** Duplo clique em **`ATAQUE-AO-VIVO.cmd`**: banner, cores, contagem ao vivo das tentativas. É esse que fica bonito no vídeo.

   🌐 **O lab TAMBÉM está publicado na internet:** `https://clinica-vidaplena.vercel.app` (dados fictícios, avisos no site). Pra gravar o ataque contra o site NO AR, duplo clique em **`ATAQUE-ONLINE.cmd`** — mesmo visual de filme, alvo público. É o take de "eu ataquei um site de verdade que está no ar".

3. **Abra a apresentação** (`01-ROTEIRO/APRESENTACAO-TEORIA-ANOTAVEL.html`) no navegador:
   ✅ Deu certo quando você navegar com ← → pelos **39 slides** e a capa aparecer.

4. **Confira o ambiente de gravação:**
   - Browser aberto em `http://localhost:3400` (aperta **Ctrl+F5**)
   - Aba 2: `http://localhost:3400/paciente` logada como `mariana@exemplo.com` / `Mariana2026`
   - Aba 3: `http://localhost:3400/interno`
   - Terminal limpo, **fonte grande** (Ctrl + scroll pra cima), fundo escuro
   - OBS: tela + câmera (canto), gravando em 1080p

---

## PASSO 1 · Estude o roteiro (25 min)

1. Leia o **`ROTEIRO-LIMPO-PARA-GRAVAR.md`** de ponta a ponta, UMA vez, sem parar. É o que você vai falar.
2. Depois abra o **`ROTEIRO-COM-TIMECODES.md`** e repare em cada bloco: o que falar + **o que mostrar na tela** (a direção visual já está pronta).
3. Deixe o **`KIT-DE-GRAVACAO.md`** aberto no celular (ou segundo monitor): é de lá que você **copia e cola os comandos** na hora de gravar. O roteiro NÃO tem comando, o kit tem.

💡 Como saber que você está pronto: se você conseguir contar a história de cor em 3 frases ("construí uma clínica com IA, a IA achou 8 falhas graves, inclusive prontuário de paciente, e agora eu vou consertar").

---

## PASSO 2 · Grave em blocos (60 a 80 min)

Grave **na ordem do roteiro**, um bloco por vez. Não precisa ser perfeito de primeira: grave 2 takes de cada bloco e escolha um na edição.

### Blocos com a CÂMERA (você falando):
- **B01 · A promessa** — abertura. Energia alta, direto, olhando pra lente. ("No vídeo de hoje eu vou te mostrar uma IA invadindo um site de clínica.")
- **B03 · Por que acontece (sempre um destes 5 motivos)** — pode ser só áudio sobre os cards do deck (slide 3).
- **B12 · A lição** — o bloco mais importante da sua fala. Grave com calma, pausas. É aqui que a tese aparece: "a IA escreveu o caminho feliz".
- **B13 · Fecho e CTA** — pede like/inscreve/comenta.

### Blocos com a TELA (o lab + o terminal):
- **B02 · A clínica** — navegue devagar: hero → equipe → portal (login) → assistente. Deixe a tela "respirar" 2s em cada seção.
- **B04 a B11 · As 8 missões** — para CADA UMA:
  1. Antes de gravar: rode o comando UMA vez fora de câmera (ensaio). Se funcionar, reseta.
  2. Grave: o slide "Falha XX · Agora no lab" pode ficar no deck (ele te guia) ou você vai direto pro terminal.
  3. **Rode o comando do KIT** e deixe o resultado na tela.
  4. ⭐ **REGRA DE OURO DO TAKE: depois do resultado aparecer, fique 3 SEGUNDOS EM SILÊNCIO olhando pra tela.** É esse silêncio que vira o "uau" na edição. Não corrija, não explique na hora, só olha.
  5. Volte pro slide "Falha XX · A defesa" e diga a frase de ouro (tá no deck).

### Dicas de campo:
- A missão mais forte é o **código sem limite** (B07): grave com calma o loop rodando e a hora que "ENTROU".
- Na **missão 07 (F12)**, dê **Ctrl + +** no app.js pra chave ficar GIGANTE na tela.
- A missão do **.env (B04)** abre o vídeo das demos: capriche na expressão.
- Se o terminal travar ou der erro no meio: pare, respire, rode de novo. É a regra do "testei antes de gravar".

---

## PASSO 3 · Use a apresentação como esqueleto (dentro da edição)

- Cada falha tem 4 slides: **Teoria → Por que acontece → Agora no lab → A defesa**
- O corte fica: **slide de teoria → B-roll da invasão (a tela) → slide de defesa**
- Anote no deck (**N** liga o pincel) as palavras-chave enquanto você fala, se quiser o efeito de aula
- Quer print bonito pra thumb? Aperte **S** (ou botão 💾) em qualquer slide e ele salva PNG

---

## PASSO 4 · Conferência final (10 min)

Antes de editar, assista os takes e confira:
- [ ] A promessa (B01) ficou clara nos primeiros 20 segundos?
- [ ] Todas as 8 missões têm o momento da descoberta (com os 3s de silêncio)?
- [ ] A frase "eu vou invadir DE NOVO na parte 2" foi gravada?
- [ ] O fecho pede like/inscreve/comenta?
- [ ] Áudio limpo (sem teclado/servidor de fundo nas partes com fala)?

Faltou algo? Regrava SÓ aquele bloco. Não refaça o que está bom.

---

## PASSO 5 · Pós-produção e publicação (depois)

1. **Descrição do YouTube:** capítulos com os timecodes + **site no ar** (`https://clinica-vidaplena.vercel.app`) + repo (`github.com/gabrielkendy/clinica-vidaplena`) + convite: "clona e ataca você mesmo".
2. **Comentário fixado:** "quantas dessas 8 você já cometeu? Eu já cometi umas 5. Comenta a sua."
3. **Shorts:** cada missão vira um short de 40s (o hook é a descoberta; o CTA é "vídeo completo no canal").
4. **Thumb:** conceito no roteiro (split da tela bonita + `.env` aberto + "8 FALHAS"). Prompt no Codex com headline 3D.

---

## 🔧 Se algo der errado (troubleshooting)

| Problema | Solução |
|---|---|
| Lab não abre / erro de conexão | o terminal com `node server.js` caiu: suba de novo (PASSO 0.1) |
| Página com visual antigo | **Ctrl+F5** na aba |
| Comando não retorna nada | confira se copiou o comando INTEIRO do KIT (com as aspas) |
| Loop do código não acha | o código certo é `4815`; a faixa do kit já cobre |
| Deu ruim no meio do take | respira, reseta a página, e grave de novo. Sem estresse. |

## 📏 As 3 regras que não se quebram
1. **Só no nosso lab.** Nunca demo em sistema de terceiros. (É o posicionamento da série inteira.)
2. **Testa antes de gravar.** Todo comando roda primeiro fora de câmera.
3. **Os 3 segundos de silêncio** depois de cada descoberta. É o que faz o vídeo parecer de gente grande.

---

## 🌐 O site NO AR (Vercel) — já está publicado

- **https://clinica-vidaplena.vercel.app** — o lab publicado: funciona igual ao local (as 8 falhas, login, painel, assistente).
- Ataque no site público: **`ATAQUE-ONLINE.cmd`** (ou `python MISSOES/ataque-online.py`). Testado: **8/8 no ar**.
- Serve pra você gravar o "site de verdade na internet" OU deixar ativo pro público brincar.
- Código do deploy: pasta `online/` (Next.js · uma função catch-all). Re-deploy: `cd online && npx vercel --prod`.

## 🛠️ E o V2 (a blindagem)? Já está pronto também
- `02-BLINDAGEM/GUIA-DAS-8-CORRECOES.md` — o passo a passo das 8 correções (com antes/depois)
- `02-BLINDAGEM/ROTEIRO-V2-A-BLINDAGEM.md` — o roteiro falado do V2 (mesma linguagem simples)
- Rodar o "depois": `node 02-BLINDAGEM/server-blindado.js` (porta 3500) + `python 02-BLINDAGEM/reteste.py` → **🛡️ 8/8 bloqueadas**
