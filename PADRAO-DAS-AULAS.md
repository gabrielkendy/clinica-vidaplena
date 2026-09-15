# 📐 PADRÃO DAS AULAS — série "Segurança com IA (modo defesa)"

> A série é **1 invasão contada em 3 aulas**. Cada aula tem a SUA pasta e o SEU material do aluno.
> Regra de ouro: **o material SEMPRE leva os prompts COMPLETOS** (mestre + os 8 de correção + re-teste) — o que muda por aula é o FOCO: a tabela da invasão, o selo `DO VÍDEO` nas falhas daquela aula, o manual e o checklist.

---

## As 3 aulas

| Aula | Tema | As falhas da aula | Prompt de cada falha | Status |
|---|---|---|---|---|
| **AULA-01 · A INVASAO** | A corrente: arquivo → crachá → dados | 🔐 `.env` exposto · 🪪 painel sem porteiro · 🧾 dado/exame de outro (IDOR) | 1, 2, 3 | ✅ completa |
| **AULA-02 · AS FUNCOES** | Funções que a IA escreveu torto | 🔢 código sem limite · 📂 download abre pastas (path traversal) · 🪞 função espia (SSRF) | 4, 5, 6 | ✅ completa |
| **AULA-03 · A VITRINE** | O que o sistema mostra sem ninguém pedir (o fecho) | 🗝️ chave escrita no site · 🗄️ banco na calçada (backup + headers) | 7, 8 + re-teste | ✅ completa |

*(Numeração dos prompts = a do material completo em `materiais-aulas.vercel.app/seguranca-com-ia`.)*

---

## O padrão de CADA pasta de aula (pacote completo de entregáveis)

```
AULA-0X · TEMA/
├── 01-ROTEIRO/              ← ROTEIRO.md (o que falar) + EXECUCAO.md (o que fazer na tela) — NÃO vão pro repo público
├── 02-MATERIAL-DO-ALUNO/    ← MATERIAL-DO-ALUNO.html + MATERIAL-DO-ALUNO.md (os DOIS) — conteúdos + prompts DA AULA
├── 03-THUMBNAIL/            ← PROMPT-THUMB-*.txt (17 blocos) + THUMB-FINAL.png (base Codex + foto de identidade, aprovada)
├── 05-DESCRICAO/            ← DESCRICAO.md: título + alternativas + descrição + capítulos + tags + comentário fixado
└── 06-SHORTS/               ← ROTEIRO-SHORT.md (~50s: gancho+corpo+CTA duplo, keyword, b-roll e legenda/hashtags) + PROMPT-CAPA-9x16.txt (1080x1920)
```

## O padrão do MATERIAL-DO-ALUNO.html (5 seções, sempre nesta ordem)

1. **A invasão da aula** — o mapa em tabela: porta → ataque ao vivo → a correção (prompt) → o teste.
2. **Testa no ar** — 🔴 `clinica-vidaplena.vercel.app` · 🟢 `clinica-vidaplena-blindado.vercel.app` · 💾 GitHub.
3. **OS PROMPTS — 1 prompt pra CADA falha, COMPLETO e detalhado** — o material SEMPRE tem o bloco inteiro: **PROMPT MESTRE** (a auditoria) + os **9 prompts de correção** (um por falha, texto integral, botão **📋 Copiar** em cada) + **PROMPT DE RE-TESTE**. As falhas **do vídeo** daquela aula levam o selo `DO VÍDEO`; as outras ficam como "o mapa completo da série".
   - 🚨 **NUNCA cortar, resumir ou podar prompt.** O aluno copia e cola inteiro. (Correção do dono 14/09: "quero 1 prompt pra cada falha, completo e detalhado" — material resumido = fora do padrão.)
4. **MODO MANUAL** — o conserto sem IA, porta por porta (as 9; as do vídeo em destaque).
5. **CHECKLIST** — o que o aluno faz no projeto DELE hoje.

**Regras técnicas do material (validadas):**
- CSS = o mesmo da série (claro, off-white + verde); copiar do material da aula 1 e só trocar conteúdo.
- Placeholder com `< >` dentro de `<pre>` **sempre escapado** (`&lt;` `&gt;`), senão o texto some no navegador.
- Botão copiar usa `textContent` (funciona até com a caixinha fechada) — testar: clicar e ver "✅ Copiado!".
- Testar no navegador ANTES de entregar: prompts visíveis + cópia funcionando.
- Publicação (hub `materiais-aulas.vercel.app`): cada aula publica a sua página (`/seguranca-com-ia/aula-N`), e a página-mãe continua com a visão completa da série.

## Checklist de uma aula nova (copiar/colar)

1. `mkdir "AULA-0X · TEMA"` e escrever `ROTEIRO.md` + `EXECUCAO.md` (fluxo: história → ataque AO VIVO no site → prompt no Cursor → publica → testa no mesmo endereço).
2. Copiar o `MATERIAL-DO-ALUNO.html` da aula anterior como base → trocar: tabela da invasão, prompts da aula, manual e checklist.
3. Testar no navegador (cópia + render) → commitar o material (tracked) → zip do pacote.
4. Roteiros (`ROTEIRO.md`/`EXECUCAO.md`) ficam FORA do git (`.gitignore`: `AULA-*/ROTEIRO.md` e `AULA-*/EXECUCAO.md`).
5. Ensaio geral com o `RESET-LAB.cmd` (restaura o lab E republica o site no ar).
