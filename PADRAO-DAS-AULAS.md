# 📐 PADRÃO DAS AULAS — série "Segurança com IA (modo defesa)"

> A série é **1 invasão contada em 3 aulas**. Cada aula tem a SUA pasta, com o SEU material do aluno e os prompts DAQUELA aula.
> Regra de ouro: **material de aula não mistura conteúdo de outra aula.** O aluno da aula 2 não recebe prompt da aula 3.

---

## As 3 aulas

| Aula | Tema | As falhas da aula | Prompts no material |
|---|---|---|---|
| **AULA-01 · A INVASAO** | A corrente: arquivo → crachá → dados | 🔐 `.env` exposto · 🪪 painel sem porteiro · 🧾 dado/exame de outro (IDOR) | mestre + **1, 2, 3** + re-teste |
| **AULA-02 · AS FUNCOES** | O que as funções da IA escondem | 🔢 código sem limite (força bruta) · 📂 download abre pastas (path traversal) · 🪞 função espia (SSRF) | + **4, 5, 6** |
| **AULA-03 · A VITRINE** | O que está à vista (e o fecho da série) | 🗝️ chave escrita no site · 🗄️ banco na calçada (backup + headers) | + **7, 8** + re-teste completo da série |

*(Ordem dos prompts = numeração do material completo em `materiais-aulas.vercel.app/seguranca-com-ia`.)*

---

## O padrão de CADA pasta de aula

```
AULA-0X · TEMA/
├── MATERIAL-DO-ALUNO.html   ← O ENTREGÁVEL: conteúdos + prompts DA AULA (copia, preenche, usa)
├── ROTEIRO.md               ← o que falar no vídeo (uso interno; NÃO vai pro repo público)
└── EXECUCAO.md              ← o que fazer na tela, passo a passo (uso interno; NÃO vai pro repo público)
```

## O padrão do MATERIAL-DO-ALUNO.html (5 seções, sempre nesta ordem)

1. **A invasão da aula** — o mapa em tabela: porta → ataque ao vivo → a correção (prompt) → o teste.
2. **Testa no ar** — 🔴 `clinica-vidaplena.vercel.app` · 🟢 `clinica-vidaplena-blindado.vercel.app` · 💾 GitHub.
3. **OS PROMPTS DA AULA** — só os prompts daquela aula (+ mestre, na aula 1; + re-teste, na última), com botão **📋 Copiar** em cada um. Os do vídeo levam o selo `DO VÍDEO`.
4. **MODO MANUAL** — o conserto sem IA, porta por porta (só as portas da aula).
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
