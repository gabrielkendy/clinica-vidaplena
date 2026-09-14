# 🔧 AS 8 CORREÇÕES — guia de gravação do V2 ("A Blindagem")

> **O setup do vídeo:** dois servidores rodando lado a lado —
> o **vulnerável na porta 3400** (o "antes") e o **blindado na porta 3500** (o "depois").
> ```bash
> node server.js                        # 3400 — o que cai
> node 02-BLINDAGEM/server-blindado.js  # 3500 — o que aguenta
> python 02-BLINDAGEM/reteste.py        # o "tento invadir de novo" → 8/8 bloqueadas
> ```
> **O código de cada correção:** abre `02-BLINDAGEM/server-blindado.js` e procura por `✅ CORREÇÃO`.
> Cada uma tem comentário explicando. As correções ficam em lados: rode os dois e compare.

---

## 📊 A TABELA QUE É O VÍDEO INTEIRO

| # | A falha | Antes (3400) | Depois (3500) | A correção em 1 frase |
|---|---------|--------------|----------------|------------------------|
| 1 | Dado de outro paciente | 200 (ficha do Bruno!) | **404** | filtra por dono em toda busca |
| 2 | Caderno de senhas (.env) | 200 (chaves abertas) | **403** | bloqueia dotfiles + tira do servidor |
| 3 | Área interna sem porteiro | 200 (CPF de todos) | **403** | confere se é da equipe, no servidor |
| 4 | Código sem limite | infinitas tentativas | **429** (5 e trava) | limite de tentativas |
| 5 | Download abre pastas | 200 (as senhas!) | **400** | só nome de arquivo da lista |
| 6 | Função espia por dentro | 200 (conteúdo interno) | **400** | bloqueia endereço interno |
| 7 | Chave no front | chave no F12 | sem chave + funciona | a chave mora no servidor |
| 8 | Backup + servidor tagarela | 200 (banco inteiro) | **403** + headers | backup fora + proteções ligadas |

---

## 🎬 CORREÇÃO 1 · DADO DE OUTRO PACIENTE (IDOR)

**O que estava errado (no `server.js`, linha ~78):**
```js
const ag = db.agendamentos.find((a) => a.id === Number(mat[1]));   // busca só pelo número
```

**A correção (no blindado, `CORREÇÃO 01`):**
```js
const ag = db.agendamentos.find((a) => a.id === Number(mat[1]) && a.paciente_id === user.id);
// ↑ o "E ESSE DADO É DE QUEM ESTÁ PEDINDO?" — uma linha
```
E se não for do dono? `404` (é como se não existisse). Pro dono, nada muda.

**Na tela:** roda o comando do 103 → no 3400 vem a ficha do Bruno; no 3500 vem `404 Não encontrado`.
**Frase:** "Olha o tamanho da correção: **um `&&`**. O filtro de dono em toda busca."

---

## 🎬 CORREÇÃO 2 · CADERNO DE SENHAS (.env)

**O que estava errado:** o servidor servia QUALQUER arquivo da pasta pública (`.env` incluído).
**A correção (`CORREÇÃO 02`):**
```js
function arquivoBloqueado(f) {
  const nome = path.basename(f);
  if (nome.startsWith(".")) return true;                                  // dotfiles (.env)
  if (/\.(sql|env|log|bak|old|zip|tar|gz|dump)$/i.test(nome)) return true; // backups
  return false;
}
// e antes de servir: if (arquivoBloqueado(f)) → 403
```
**E o hábito (o mais importante):** o arquivo de senhas sai da pasta pública. No lab, o `public/.env` vira `403`.

**Na tela:** `curl site/.env` → 3400: as chaves na tela · 3500: `403 — acesso negado`.
**Frase:** "Não tem filtro mágico: arquivo de senha não fica onde a internet alcança. E o servidor recusa por padrão."

---

## 🎬 CORREÇÃO 3 · PORTEIRO NO SERVIDOR (ÁREA INTERNA)

**O que estava errado:** as 3 rotas `/api/admin/*` só checavam "tem login?" — nunca "é da equipe?".
**A correção (`CORREÇÃO 03`):**
```js
if (!user.staff) return json(res, 403, { erro: "Acesso restrito à equipe." });
// ↑ confere QUEM É, no servidor, antes de responder qualquer coisa
```
**Na tela (o take importante):** como PACIENTE (Mariana) tentando o painel → **403**. E logado como EQUIPE (equipe@vidaplena.com) → **200, funciona** — a correção não quebrou o trabalho de ninguém.
**Frase:** "A pergunta 'quem é você?' agora é feita onde o pedido chega: no servidor."

---

## 🎬 CORREÇÃO 4 · LIMITE DE TENTATIVAS (CÓDIGO)

**O que estava errado:** tentativas infinitas no código de 4 dígitos.
**A correção (`CORREÇÃO 04`):**
```js
const MAX_TENTATIVAS = 5, JANELA_MS = 10 * 60 * 1000;  // 5 tentativas, 10 min de espera
// errou → reg.n += 1;  |  se reg.n >= 5 → 429 "Muitas tentativas..."
// acertou → TENTATIVAS.delete(email) // zera o contador
```
**Na tela:** roda o loop de tentativas de novo → nas primeiras vem `Código inválido` com contador, e na 6ª: **`429 — Muitas tentativas. Tente novamente em 10 min.`** O ataque morre por cansaço... do atacante.
**Frase:** "Dificuldade não é defesa. LIMITE é defesa. Cinco linhas e o ataque acabou."

---

## 🎬 CORREÇÃO 5 · NOME EXATO DE ARQUIVO (DOWNLOAD)

**O que estava errado:** o nome do arquivo virava caminho direto (`path.join(ARQ, file)` com `../`).
**A correção (`CORREÇÃO 05`):**
```js
if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(file) || file.includes("..")) → 400
const dest = path.resolve(ARQ, file);
if (!dest.startsWith(ARQ + path.sep)) → 400          // cinto E suspensório
```
**Na tela:** pedindo `../../.env` → **400 Nome de arquivo inválido** · e o exame de verdade (`hemograma-mariana.txt`) → **200, baixa normal**.
**Frase:** "Nome de arquivo, sim. Caminho, nunca. O usuário escolhe da lista."

---

## 🎬 CORREÇÃO 6 · O SERVIDOR COM COLEIRA (SSRF)

**O que estava errado:** o servidor buscava `qualquer` URL que o usuário mandasse.
**A correção (`CORREÇÃO 06`):**
```js
function enderecoInterno(hostname) { /* localhost, 127., 10., 192.168., 169.254., ::1 → true */ }
if (enderecoInterno(destino.hostname)) return json(res, 400, { erro: "Endereço não permitido" });
```
**Na tela:** cola o endereço interno no importar-foto → **400 Endereço não permitido**. Um endereço público de imagem continua funcionando.
**Frase:** "O servidor obedece. Por isso ele precisa de lista do que pode."

---

## 🎬 CORREÇÃO 7 · A CHAVE MUDA DE CASA (FRONT → SERVIDOR)

**O que estava errado:** `const VIDA_AI_KEY = "sk-..."` dentro do `app.js` que o navegador baixava.
**A correção (`CORREÇÃO 07`):**
- No servidor: rota `/api/assistente` que **usa** a chave (lida do ambiente) e devolve só a resposta.
- No site: `app-blindado.js` chama `/api/assistente` — **sem nenhuma chave no código**.
**Na tela (take forte):** F12 → procurar `VIDA_AI_KEY` no app.js do 3500 → **não existe mais** · e a assistente continua respondendo (no console do servidor aparece: `usando chave do servidor...`).
**Frase:** "O site pede. O servidor decide. A chave nunca desce pro navegador."

---

## 🎬 CORREÇÃO 8 · CASACO E TAPA-OLHO (BACKUP + HEADERS)

**O que estava errado:** `backup.sql` servido pra internet + `X-Powered-By: VidaPlenaWeb 2.4` contando tudo + zero headers.
**A correção (`CORREÇÃO 08`):** backup bloqueado (mesma regra da 2, extensões `.sql`/`.bak`/`.dump`) + headers ligados:
```js
"X-Content-Type-Options": "nosniff",
"X-Frame-Options": "DENY",
"Referrer-Policy": "strict-origin-when-cross-origin",
"Content-Security-Policy": "default-src 'self'; ..."
// e o X-Powered-By foi DELETADO
```
**Na tela:** `curl site/backup.sql` → **403** · e nos headers da resposta: as proteções aparecem e a "tagarelice" sumiu.
**Frase:** "Menos informação exposta, menos caminho pra quem procura."

---

## 🏁 O FECHAMENTO DO VÍDEO (o reteste)

```bash
python 02-BLINDAGEM/reteste.py
```
Roda os **mesmos 8 ataques** do vídeo 1 contra a versão blindada e imprime, um por um:
**✓ BLOQUEADO** com o HTTP de cada porta (404, 403, 429, 400...) e fecha com:

> 🛡️ **8/8 PORTAS FECHADAS — NÃO ENTROU EM NENHUMA**

É o "eu vou tentar invadir DE NOVO na tua frente" prometido. E o melhor: a equipe continua
entrando, os exames continuam baixando, a assistente continua respondendo. **Blindar não é
quebrar o sistema. É fechar o que não devia estar aberto.**

## 📋 CHECKLIST DO V2 (pós-gravação)
- [ ] Gravar os dois servidores lado a lado (3400/3500) — os números já vêm certos
- [ ] Cada take: "antes" no 3400 → "depois" no 3500 → frase da correção
- [ ] Fechar com o reteste inteiro na tela
- [ ] Descrição: link do repo (branch `blindado`) + o mesmo convite de comentário
- [ ] Short: "eu corrigi em 1 linha" (as correções mais curtas viram shorts)
