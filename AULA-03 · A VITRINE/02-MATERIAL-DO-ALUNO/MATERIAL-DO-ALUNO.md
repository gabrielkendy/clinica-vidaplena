# Segurança com IA — Aula 3 (o fecho)

A chave na vitrine e o banco no chão: a chave da IA escrita no código do site → o backup do banco jogado na pasta pública. As 2 últimas falhas + o prompt completo pra arrumar cada uma — e o re-teste que prova o 8 de 8.

## 1 AS 2 ÚLTIMAS — o que o sistema mostra sem ninguém pedir 🏁

Não são portas abertas: é a vitrine. O que o sistema entrega de bandeja pra qualquer visitante.
| A falha | O ataque (ao vivo, no site) | A correção (o prompt) | O teste |
|---|---|---|---|
| 🗝️ A chave na vitrine (segredo no código do site | Abri o código do site (Ctrl + U), procurei "key" e achei a chave da assistente de IA escrita e legível — qualquer visitante lê e usa na MINHA conta. | Prompt 1 — chamada de IA vai pro servidor; a chave vive no cofre das configurações | buscar a chave no site → zero · assistente → funciona |
| 🗄️ O banco no chão (backup + respostas que contam tudo | Pedi o backup como quem pede uma página: /backup.sql → veio o banco inteiro (nomes, senha). E o servidor ainda contava a tecnologia e a versão de graça. | Prompt 2 — backup fora da pasta pública + escudos nas respostas + nada de versão | backup → 404 · sem versão no cabeçalho · escudos ligados |
A lição da vitrine: o que o sistema NÃO mostra não pode ser usado contra ele. Chave que desce pro navegador é chave pública. Backup na pasta pública é presente de despedida.

## 2 O AJUSTE DE CADA FALHA — o prompt completo 📋

Cada falha do vídeo tem UM prompt de correção — e no fim tem o RE-TESTE, que prova o placar. Copia, cola no seu agente (Cursor, Claude Code, ChatGPT, Codex...) junto com o seu projeto: ele corrige e cria o teste.

Como usar: 1) se liga qual das 2 falhas o seu projeto tem · 2) copia o prompt dela · 3) cola no agente e exige o antes/depois e o teste. No fim, roda o re-teste e guarda o placar.

O que o vídeo mostrou: a chave da assistente de IA legível no código do site (Ctrl + U, busca por "key").

```
Aplique a correção de SEGREDOS NO NAVEGADOR no meu projeto.

O que fazer:
1. Vasculhe TODO arquivo que o navegador baixa (js/ts do front, html, configs públicas) procurando chaves: 'sk-', 'apiKey', 'secret', 'token' de serviço.
2. Corrija movendo a chamada pro SERVIDOR: o front chama uma rota do SEU backend, o backend usa a chave (lida de variável de ambiente) e devolve só a resposta pronta. A chave nunca desce pro navegador.
3. Tire a chave do código: ela vive em variável de ambiente/secret manager, nunca no repositório.
4. Confirme que nenhum arquivo servido ao navegador contém a chave (busque na saída do build também).
5. Crie um teste que PROVA: buscar a chave nos arquivos do front → zero resultados; e a função continua funcionando pelo backend → 200.

Me mostre: arquivos alterados, o antes/depois, e o teste.
```

O que o vídeo mostrou: o /backup.sql baixando o banco inteiro + o servidor contando tecnologia e versão.

```
Aplique a correção de EXPOSIÇÃO PASSIVA no meu projeto.

O que fazer:
1. Backups e dumps: garanta que estão FORA da pasta pública e fora do deploy (e me liste qualquer arquivo esquecido: .sql, .bak, .zip, .old, logs).
2. Ligue os headers de segurança em TODAS as respostas: Content-Security-Policy, X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Referrer-Policy, HSTS (em https).
3. Remova o X-Powered-By (e qualquer header que conte versão/tecnologia).
4. Erros: nada de stack trace/versão pro cliente — erro genérico pro usuário, detalhe só no log do servidor.
5. Rode uma varredura de nomes comuns (/.env, /backup.sql, /.git/config, /admin) e me mostre o status de cada um.

Me mostre: o antes/depois dos headers, a lista de arquivos limpos, e o resultado da varredura.
```

### 🏁 O FECHO — o re-teste (prove o 8 de 8)

O que o vídeo mostrou: rodar o ataque completo de novo e ver 8 de 8 fechadas.

```
Faça uma VARREDURA FINAL de segurança no meu projeto, como um atacante faria (nos MEUS próprios testes), e me devolva o placar:

1. Liste o que é servido publicamente e confirme que nenhum arquivo sensível responde: teste /.env, /backup.sql, /.git/config, /package.json exposto indevidamente.
2. Para CADA rota que devolve dados: prove que filtra pelo dono (teste com 2 usuários de verdade).
3. Confirme que rotas internas respondem 403 pra usuário comum (testando no servidor).
4. Confirme o rate limit: tente 10x seguidas no login/código e mostre o bloqueio acontecendo.
5. Busque chaves de API em todos os arquivos do front ('sk-', 'apiKey', 'secret') e mostre zero resultados.
6. Confirme os headers de segurança nas respostas (curl -I).

Me devolva a tabela final: porta | status (ABERTA/FECHADA) | evidência (comando + resposta). Se alguma continuar aberta, corrija e teste de novo até fechar.
```

## 3 TESTA VOCÊ MESMO — as duas clínicas estão no ar 🧪[🔴 Clínica aberta (com as 8 falhas) — clinica-vidaplena.vercel.app](https://clinica-vidaplena.vercel.app)[🟢 Clínica blindada (o depois, com tudo fechado) — clinica-vidaplena-blindado.vercel.app](https://clinica-vidaplena-blindado.vercel.app)[💾 Código no GitHub — clona e ataca na tua máquina (com os scripts de ataque)](https://github.com/gabrielkendy/clinica-vidaplena)

Login do paciente: mariana@exemplo.com / Mariana2026 · Tudo fictício, marcado na tela: é laboratório de treino. A regra da série: só se ataca o PRÓPRIO laboratório.

O experimento de 30 segundos: na clínica aberta, põe /backup.sql no fim do endereço — o banco inteiro desce. Agora na blindada: não encontrado. E o curl -I? A blindada não conta nem quem é.

## 4 MODO MANUAL — conserte sem IA 🖐️

Quer conferir com as próprias mãos (ou sem agente)? O caminho de cada uma das 2 falhas:

- Chave no site: a chamada de IA vai pro servidor; a chave vive em variável de ambiente, nunca em arquivo que o navegador baixa.

- Backup na calçada: dumps fora da pasta pública e fora do deploy; headers de segurança ligados; nada de versão/stack trace nas respostas.

O passo a passo detalhado (com o "como verificar" de cada uma) está no material completo: [materiais-aulas.vercel.app/seguranca-com-ia](https://materiais-aulas.vercel.app/seguranca-com-ia/#manual) → seção MODO MANUAL.

## 5 CHECKLIST FINAL — hoje, no SEU projeto ✅

- Testar EU MESMO as 2 falhas: abrir o código do site e procurar "key"/"secret"; pedir /backup.sql e /.env no fim do endereço.

- Achou alguma? Copiar o ajuste daquela falha (seção 2) e colar no seu agente — com o antes/depois.

- Rodar o re-teste e guardar o placar final do teu projeto.

- Se algum segredo já esteve exposto: trocar as chaves (rotação) — exposto é vazado pra sempre.

- Repetir a varredura a cada entrega nova (5 minutos, uma vez por release).

A regra da série: só se ataca o PRÓPRIO laboratório. A gente estuda os ataques pra entender as defesas — nunca pra atacar sistema de ninguém.

Material da aula 3 (o fecho) · Segurança com IA (modo defesa)  
 Série completa + casos reais: [materiais-aulas.vercel.app/seguranca-com-ia](https://materiais-aulas.vercel.app/seguranca-com-ia/)
