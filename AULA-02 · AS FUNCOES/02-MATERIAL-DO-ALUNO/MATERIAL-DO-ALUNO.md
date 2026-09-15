# Segurança com IA — Aula 2

As funções que a IA escreveu contra você: o código que aceita tentativa a noite toda → o download que vira cofre → a foto de perfil que espiona por dentro. As 3 falhas desta aula + o prompt completo pra arrumar cada uma no SEU projeto.

## 1 AS 3 FUNÇÕES DO VÍDEO — e o que cada uma faz de errado 🧩

Não são portas na parede: são funções que funcionam — até alguém apertar o botão do jeito errado.  

| A função | O ataque (ao vivo, no site) | A correção (o prompt) | O teste |
|---|---|---|---|
| 🔢 O código de acesso (login por código (4 dígitos) | Tentei os códigos um atrás do outro, sem parar. Sem limite de tentativas, o sistema deixou até acertar: acesso concedido, sem saber o código. | Prompt 1 — limite de tentativas + bloqueio + código com validade | 6ª tentativa → 429 · bloqueado |
| 📂 O download de exame (busca por nome de arquivo | Em vez do nome de um exame, mandei um atalho que sobe as pastas (../../). O download me entregou o arquivo de senhas do servidor. | Prompt 2 — dois cadeados: nome válido + caminho preso na pasta | atalho → 400 · exame real → 200 |
| 🪞 A foto de perfil (importar por link | Colei um "link de foto" que apontava pra dentro do próprio sistema. O servidor foi lá, buscou e me trouxe o conteúdo interno. | Prompt 3 — bloquear rede interna + whitelist + limite de tempo | link interno → bloqueado · foto pública → funciona |
A lição das funções: a IA escreve a função que FUNCIONA — nunca a que se DEFENDE. O limite de tentativas, os dois cadeados do arquivo e a coleira da busca: nada disso apareceu sozinho no código dela.

## 2 O AJUSTE DE CADA FUNÇÃO — o prompt completo 📋

Cada função que você viu no vídeo tem UM prompt de correção. Copia o da falha que o SEU projeto tem, cola no seu agente (Cursor, Claude Code, ChatGPT, Codex...) junto com o seu projeto: ele corrige e cria o teste.

Como usar: 1) se liga qual das 3 funções o seu projeto tem · 2) copia o prompt dela · 3) cola no agente e exige o antes/depois e o teste. Conserta UMA por vez — assim você confere cada prova.

O que o vídeo mostrou: o código de 4 dígitos aceitando tentativa atrás de tentativa até acertar.

```
Aplique a correção de LIMITE DE TENTATIVAS nos meus acessos do projeto.

O que fazer:
1. Encontre TODOS os pontos de tentativa: login com senha, código OTP/WhatsApp, recuperação de senha, verificação de e-mail.
2. Adicione rate limit com bloqueio progressivo: após 5 tentativas erradas, bloqueie aquele e-mail/telefone por 10 minutos (e avise quando estiver próximo do limite). Zere o contador quando a pessoa ACERTAR.
3. Se der, prefira armazenamento compartilhado (Redis/tabela) em vez de memória — me explique qual seu projeto permite.
4. Os códigos também devem EXPIRAR (ex: 10 minutos) e ser de uso único.
5. Crie um teste que PROVA: 6 tentativas erradas seguidas → a resposta vira 429/bloqueio.

Me mostre: o antes/depois do código, onde o contador vive, e o teste.
```

O que o vídeo mostrou: o download de exame subindo as pastas e entregando o arquivo de senhas.

```
Aplique a correção de CAMINHOS DE ARQUIVO (path traversal) no meu projeto.

O que fazer:
1. Encontre toda rota/função que lê ou baixa arquivo com nome/caminho vindo do usuário.
2. Correção com dois cadeados:
   a) o nome só pode ser um nome de arquivo simples (sem barras, sem '..', sem caracteres estranhos — valide com whitelist/regex);
   b) mesmo depois, confira que o caminho final resolvido está DENTRO da pasta permitida.
3. Se possível, o ideal é nem usar nome de arquivo do cliente: use um id que busca o arquivo numa lista/tabela do banco (o cliente nunca dita o caminho).
4. Crie um teste que PROVA: pedir '../../etc/passwd' ou '../../.env' → 400/404; e um arquivo real → 200.

Me mostre: o antes/depois da função, e o teste.
```

O que o vídeo mostrou: a "importação de foto" buscando um endereço interno e devolvendo o conteúdo do servidor.

```
Aplique a correção de REQUISIÇÕES DO SERVIDOR (SSRF) no meu projeto.

O que fazer:
1. Encontre toda função do backend que busca uma URL fornecida pelo usuário (importar por link, webhook, preview, fetch de imagem).
2. Correção:
   a) bloqueie endereços internos: localhost, 127.*, 10.*, 172.16-31.*, 192.168.*, 169.254.* (metadata da nuvem), IPv6 local — resolva o DNS ANTES de chamar e valide o IP final (proteção contra DNS rebinding);
   b) prefira uma whitelist de domínios permitidos, se o caso de uso permitir;
   c) limite o tamanho da resposta e o tempo (timeout).
3. Crie um teste que PROVA: apontar a função pra um endereço interno → 400/bloqueado; e pra uma URL pública de verdade → funciona.

Me mostre: o antes/depois, e o teste.
```

## 3 TESTA VOCÊ MESMO — as duas clínicas estão no ar 🧪[🔴 Clínica aberta (com as 9 falhas) — clinica-vidaplena.vercel.app](https://clinica-vidaplena.vercel.app)[🟢 Clínica blindada (o depois, com tudo fechado) — clinica-vidaplena-blindado.vercel.app](https://clinica-vidaplena-blindado.vercel.app)[💾 Código no GitHub — clona e ataca na sua máquina (com os scripts de ataque)](https://github.com/gabrielkendy/clinica-vidaplena)

Login do paciente: mariana@exemplo.com / Mariana2026 · Tudo fictício, marcado na tela: é laboratório de treino. A regra da série: só se ataca o PRÓPRIO laboratório.

O experimento de 30 segundos: na clínica aberta, abre o console (F12) e roda o ataque do código: fetch('/api/login/codigo',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:'mariana@exemplo.com',codigo:'1234'})}).then(r=>console.log(r.status)) — repara que NUNCA bloqueia. Na blindada... bloqueia na 6ª.

## 4 MODO MANUAL — conserte sem IA 🖐️

Quer conferir com as próprias mãos (ou sem agente)? O caminho de cada uma das 3 falhas:

- Código sem limite: 5 erros = bloqueio de 10 min por e-mail; código expira em 10 min e vale 1 vez.

- Download abre pastas: o nome do arquivo nunca vem do cliente (lista/tabela do banco) e o caminho final fica dentro da pasta permitida.

- Função espia: bloqueie rede interna (localhost, 127.*, 10.*, 192.168.*, 169.254.*) antes de buscar qualquer URL.

O passo a passo detalhado (com o "como verificar" de cada uma) está no material completo: [materiais-aulas.vercel.app/seguranca-com-ia](https://materiais-aulas.vercel.app/seguranca-com-ia/#manual) → seção MODO MANUAL.

## 5 CHECKLIST — hoje, no SEU projeto ✅

- Testar EU MESMO as 3 funções: tentar o código de login várias vezes seguidas (bloqueia?), pedir um arquivo com ../ no nome, colar um link interno num campo de importar.

- Achou alguma? Copiar o ajuste daquela função (seção 2) e colar no seu agente — com o antes/depois.

- Se algum segredo já esteve exposto: trocar as chaves (rotação) — exposto é vazado pra sempre.

- Repetir a varredura a cada entrega nova (5 minutos, uma vez por release).

A regra da série: só se ataca o PRÓPRIO laboratório. A gente estuda os ataques pra entender as defesas — nunca pra atacar sistema de ninguém.

Material da aula 2 · Segurança com IA (modo defesa)
Material completo + casos reais: [materiais-aulas.vercel.app/seguranca-com-ia](https://materiais-aulas.vercel.app/seguranca-com-ia/)
