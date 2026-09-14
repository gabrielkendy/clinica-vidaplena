# 🎬 COMECE AQUI — o plano de gravação completo (V1 + V2)

> Você tem **2 vídeos** pra gravar desta série:
> **V1 · "A IA invadiu a minha clínica"** (o ataque) e **V2 · "A Blindagem"** (as correções ao vivo).
> 🌐 O site **JÁ ESTÁ NO AR**: `https://clinica-vidaplena.vercel.app`
> Tudo aqui é no NOSSO lab (Clínica VidaPlena, dados 100% fictícios). Nunca em sistema de terceiros.

---

## 📦 O que tem na pasta (mapa rápido)

| Arquivo / pasta | Pra quê |
|---|---|
| `COMECE-AQUI.md` | **este guia** — o plano de gravação |
| `01-ROTEIRO/ROTEIRO-LIMPO-PARA-GRAVAR.md` | as falas do V1 (o que você fala) |
| `01-ROTEIRO/ROTEIRO-COM-TIMECODES.md` | V1 com timecodes + o que mostrar na tela |
| `01-ROTEIRO/APRESENTACAO-TEORIA-ANOTAVEL.html` | deck de 39 slides (abre no navegador, navega com ← →) |
| `01-ROTEIRO/KIT-DE-GRAVACAO.md` | os comandos pra COLAR na hora (V1 e V2) |
| `ATAQUE-AO-VIVO.cmd` | 💀 modo hacker LOCAL (duplo clique; sobe o lab + ataca) |
| `ATAQUE-ONLINE.cmd` | 💀 modo hacker no site NO AR (duplo clique) |
| `SIMULAR-ATAQUES.cmd` | simulação limpa das 8 falhas (sem visual de filme) |
| `02-BLINDAGEM/` | o V2 inteiro: guia das correções + roteiro + servidor blindado + reteste |
| `MISSOES/` | roteiro técnico de cada falha (referência) |
| `online/` | o código do deploy da Vercel (não precisa mexer pra gravar) |

**Logins do lab:** `mariana@exemplo.com` / `Mariana2026` (paciente) · `equipe@vidaplena.com` / `equipe2026` (equipe)
**Código de acesso da Mariana:** `4815`

---

## 🌐 O site no ar (Vercel) — usa ele na gravação

- **https://clinica-vidaplena.vercel.app** — o lab publicado, funcionando igual ao local (as 8 falhas, login, painel, assistente).
- **Por que isso importa pro vídeo:** agora você pode gravar o take de abertura mostrando um site **de verdade, na internet**. Fala a frase e aponta: "esse site tá no ar agora, qualquer um pode abrir". É outro nível de realismo.
- **Ataque no site público:** duplo clique em `ATAQUE-ONLINE.cmd` (testado: 8/8 no ar).
- **Dica de ouro:** abre no CELULAR na câmera também — mostra "site de clínica navegando no celular" e depois o ataque derrubando ele no PC. Corte forte.

---

## 🎥 VÍDEO 1 · "A IA invadiu a minha clínica" (o ataque)

**Duração alvo:** ~13-16 min · **Produção:** 2h a 2h30

### PASSO 0 · Prepare o terreno (15 min)
1. **Suba o lab** (deixa essa janela aberta a gravação inteira):
   ```bash
   cd "C:\Users\Gabriel\Documents\New project\clinica-vidaplena"
   node server.js
   ```
   ✅ Deu certo quando aparecer `🏥 Clínica VidaPlena no ar (LAB DE TREINAMENTO)` na porta 3400.
2. **Teste a simulação** (garante que TUDO funciona): duplo clique em `SIMULAR-ATAQUES.cmd`.
   ✅ Deu certo quando o resumo disser **8/8 falhas exploradas**. Se alguma falhar, me chama antes de gravar.
3. **Teste o modo hacker:** duplo clique em `ATAQUE-AO-VIVO.cmd` (visual de filme com banner, cores e contagem ao vivo). É esse que fica no vídeo.
4. **Abra a apresentação** `01-ROTEIRO/APRESENTACAO-TEORIA-ANOTAVEL.html` (39 slides, navega com ← →).
5. **Confira o ambiente:**
   - Browser aba 1: `http://localhost:3400` (Ctrl+F5)
   - Aba 2: `http://localhost:3400/paciente` logada como Mariana
   - Aba 3: `http://localhost:3400/interno`
   - Terminal limpo, **fonte grande** (Ctrl + scroll), fundo escuro
   - OBS: tela + câmera (canto), gravando em 1080p

### PASSO 1 · Estude o roteiro (25 min)
1. Leia o **ROTEIRO-LIMPO-PARA-GRAVAR.md** de ponta a ponta, uma vez, sem parar. É o que você fala, em linguagem de conversa.
2. Depois abra o **ROTEIRO-COM-TIMECODES.md** e veja cada bloco: o que falar + **o que mostrar na tela**.
3. Deixe o **KIT-DE-GRAVACAO.md** aberto no celular/segundo monitor: é de lá que você copia os comandos na hora.
   💡 Você está pronto quando souber contar a história em 3 frases: "construí uma clínica com IA, uma IA achou 8 falhas graves, inclusive prontuário de paciente, e agora eu vou consertar".

### PASSO 2 · Grave em blocos (60–80 min)
Grave **na ordem do roteiro**, um bloco por vez, 2 takes de cada e escolhe um na edição.

**Blocos com a CÂMERA (você falando):**
- **B01 · A promessa** — energia alta, olhando pra lente. Pode abrir mostrando o site no ar no celular.
- **B03 · Por que acontece (sempre um destes 5 motivos)** — pode ser só áudio sobre os cards do deck (slide 3).
- **B12 · A lição** — o bloco mais importante. Calma, pausas. A tese: "a IA escreveu o caminho feliz".
- **B13 · Fecho e CTA** — like/inscreve/comenta.

**Blocos com a TELA (o lab + terminal):**
- **B02 · A clínica** — navegue devagar: hero → equipe → portal (login) → assistente. 2s "respirando" em cada seção.
- **B04 a B11 · As 8 missões** — pra CADA UMA:
  1. Antes de gravar: rode o comando UMA vez fora de câmera (ensaio). Funcionou? Reseta e grava.
  2. O slide "Agora no lab" fica no deck te guiando (ou vai direto pro terminal).
  3. **Rode o comando do KIT** e deixa o resultado na tela.
  4. ⭐ **REGRA DE OURO: depois do resultado, fique 3 SEGUNDOS EM SILÊNCIO olhando pra tela.** É esse silêncio que vira o "uau" na edição.
  5. Volte pro slide "A defesa" e diga a frase de ouro (tá no deck).

**Dicas de campo:**
- A missão mais forte é o **código sem limite (B07)**: grave com calma o loop rodando e o "ENTROU".
- Na **missão da chave (B10)**, dê **Ctrl + +** no app.js pra chave ficar GIGANTE.
- A missão do **.env (B04)** abre as demos: capriche na expressão.
- Se travar ou der erro no meio: para, respira, roda de novo. Regra do "testei antes".

### PASSO 3 · Use a apresentação como esqueleto (na edição)
- Cada falha tem 4 slides: **Teoria → Por que acontece → Agora no lab → A defesa**
- O corte fica: **slide de teoria → B-roll da invasão → slide de defesa**
- Anote no deck (**N** liga o pincel) enquanto fala, se quiser efeito de aula
- Print bonito pra thumb: aperta **S** (ou 💾) em qualquer slide e salva PNG

---

## 🛡️ VÍDEO 2 · "A Blindagem" (as 8 correções ao vivo)

**Duração alvo:** ~10-13 min · **Produção:** 1h30 a 2h

### PASSO 0 · Setup dos DOIS servidores (10 min)
Deixa os dois rodando lado a lado (o "antes" e o "depois"):
```bash
cd "C:\Users\Gabriel\Documents\New project\clinica-vidaplena"
node server.js                          # janela 1: o vulnerável (3400)
node 02-BLINDAGEM/server-blindado.js    # janela 2: o blindado (3500)
```
✅ Vulnerável: `http://localhost:3400` · ✅ Blindado: `http://localhost:3500` (visualmente IDÊNTICOS — é isso que o vídeo mostra).
**Teste antes de gravar:** `python 02-BLINDAGEM/reteste.py` → tem que fechar em **🛡️ 8/8 PORTAS FECHADAS**.

### PASSO 1 · Estude o roteiro (20 min)
1. Leia o **`02-BLINDAGEM/ROTEIRO-V2-A-BLINDAGEM.md`** de ponta a ponta (mesmo estilo de conversa do V1).
2. Tenha aberto o **`02-BLINDAGEM/GUIA-DAS-8-CORRECOES.md`**: cada correção tem o "antes → depois" e o que mostrar.

### PASSO 2 · Grave em blocos
- **B01 · A promessa 2** (câmera) — recap do V1 + "hoje eu fecho as 8 E tento invadir de novo".
- **B02 · Como a blindagem funciona** (tela) — os dois sites lado a lado, idênticos.
- **B03 · O mapa** (deck/tela) — as 8 correções em cards.
- **B04 a B11 · As 8 correções** — pra CADA UMA:
  1. Recap rápido: roda o ataque no **3400** e mostra o problema (3s).
  2. Mostra a correção no código do blindado (é pequena — destaca na tela).
  3. Roda o MESMO ataque no **3500** → **bloqueado**. E mostra que o uso legítimo continua funcionando.
  4. Fecha com a frase da correção (tá no guia).
- **B12 · O RETESTE** (o momento de ouro) — grava o `python 02-BLINDAGEM/reteste.py` rodando INTEIRO, sem corte, até o **8/8 PORTAS FECHADAS**.
- **B13 · A lição 2 e o CTA** (câmera) — "correção boa é correção pequena" + as 4 perguntas + CTA.

**Dica de ouro do V2:** os dois navegadores abertos lado a lado (3400 vermelho de um lado, 3500 verde do outro) — o espectador vê o antes/depois em UMA olhada.

---

## ✅ Checklist antes de publicar cada vídeo
- [ ] A promessa ficou clara nos primeiros 20 segundos?
- [ ] Todas as missões têm o momento da descoberta (com os 3s de silêncio)?
- [ ] V1 termina prometendo a parte 2? V2 termina com o placar 8/8?
- [ ] O fecho pede like/inscreve/comenta?
- [ ] Áudio limpo nas partes com fala?
- [ ] Descrição com: **site no ar** (`https://clinica-vidaplena.vercel.app`) + repo (`github.com/gabrielkendy/clinica-vidaplena`) + capítulos

---

## 🔧 Se algo der errado (troubleshooting)

| Problema | Solução |
|---|---|
| Lab não abre / erro de conexão | o terminal com `node server.js` caiu: sobe de novo (PASSO 0) |
| **"Porta em uso" ao subir** | já tem um servidor rodando nela — fecha a janela antiga (ou reinicia o PC e sobe só um) |
| Página com visual antigo | **Ctrl + F5** na aba |
| Comando não retorna nada | confere se copiou o comando INTEIRO do KIT (com as aspas) |
| Loop do código não acha | o código certo é `4815`; a faixa do kit já cobre |
| Deu ruim no meio do take | respira, reseta a página e grava de novo. Sem estresse. |

## 📏 As 3 regras que não se quebram
1. **Só no nosso lab.** Nunca demo em sistema de terceiros. (É o posicionamento da série inteira.)
2. **Testa antes de gravar.** Todo comando roda primeiro fora de câmera.
3. **Os 3 segundos de silêncio** depois de cada descoberta. É o que faz o vídeo parecer de gente grande.
