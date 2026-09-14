# 🛡️ PROMPTS DE BLINDAGEM — conserte o SEU projeto na prática

> **O objetivo da série:** você não sai daqui só sabendo o que é falha. Você sai com o **prompt pronto** pra mandar pra IA que construiu (ou mantém) o seu projeto — ela acha as portas abertas, explica e CORRIGE, uma por uma, com teste.
>
> **Como usar (o fluxo de 3 passos):**
> 1. Cola o **PROMPT MESTRE** no seu agente (Cursor, Claude Code, ChatGPT, Codex) **junto com o seu projeto** → ele devolve o relatório das 8 portas.
> 2. Pra cada porta aberta, cola o **prompt daquela falha** → ele corrige e cria o teste.
> 3. Fecha com o **PROMPT DE RE-TESTE** → prova que fechou.
>
> ⚠️ Use em projeto SEU (ou que você tem autorização). A regra da série vale sempre: só se testa no próprio.

---

## 🚀 PROMPT MESTRE — a auditoria completa + plano de correção

```
Você é um engenheiro de segurança auditando o MEU projeto. Faça uma auditoria completa procurando as 8 classes de falhas mais comuns em sistemas construídos com IA e me devolva um RELATÓRIO + PLANO DE CORREÇÃO.

Para cada uma das 8 classes abaixo:
(a) diga se existe no meu projeto, com arquivo e linha exatos;
(b) explique o risco em 1 frase simples (como se eu não fosse técnico);
(c) classifique a gravidade (crítico / alto / médio);
(d) escreva a correção exata que você vai aplicar.

As 8 classes:
1. DADOS DE OUTRO USUÁRIO (IDOR): toda rota que devolve dados por id filtra pelo dono (user_id da sessão)? Ou busca só pelo id?
2. ARQUIVOS SENSÍVEIS EXPOSTOS: .env, *.sql, *.bak, dumps, dotfiles — algum está em pasta servida pela web? Alguma rota monta caminho de arquivo com input do usuário (path traversal)?
3. ÁREA INTERNA SEM PORTEIRO: rotas de admin/painel checam permissão NO SERVIDOR (role/staff) ou só escondem o botão no front? Alguma rota confia em dados do cliente pra decidir permissão?
4. SEM LIMITE DE TENTATIVAS: login, código OTP, recuperação de senha — têm rate limit, bloqueio após N erros e expiração?
5. URL BUSCADA PELO SERVIDOR (SSRF): alguma função do backend busca URL fornecida pelo usuário? Ela bloqueia rede interna/localhost/metadata?
6. SEGREDOS NO FRONT: alguma chave de API aparece em arquivo que o navegador baixa (js do site)? Alguma chamada de IA/serviço é feita direto do navegador?
7. CÓPIA DE SEGURANÇA NA VITRINE: backups/dumps estão fora da pasta pública? Fora da internet? Existe arquivo esquecido que um scanner acharia?
8. CABEÇALHOS E EXPOSIÇÃO PASSIVA: headers de segurança ligados (CSP, X-Content-Type-Options, X-Frame-Options)? X-Powered-By removido? Mensagens de erro vazando stack trace ou versão?

REGRAS: não corrija nada ainda — só o relatório completo, ordenado do mais grave pro menos, com a correção proposta pra cada item. Seja específico: arquivo, linha, e o trecho de código de cada correção.
```

---

## 🛠️ OS 8 PROMPTS DE CORREÇÃO (um por porta)

### 1 · 🔐 SENHAS À VISTA (.env / arquivos de segredos)

```
Aplique a correção de ARQUIVOS DE SEGREDOS EXPOSTOS no meu projeto.

O que fazer:
1. Localize TODOS os arquivos de segredos e artefatos que não podem ser públicos: .env, *.sql, *.bak, *.dump, backups, logs, dotfiles.
2. Garanta que NENHUM deles fica em pasta servida pela web (pasta pública/static/public/www). Mova pra fora, ou pra uma pasta bloqueada.
3. No servidor, crie uma REGRA que recusa qualquer requisição a arquivo sensível (nome começando com ponto, ou extensão .sql/.bak/.dump/.env) — respondendo 403 ANTES de tentar ler.
4. Se algum desses arquivos já foi para um repositório ou deploy: me liste TUDO que vazou e me diga quais chaves preciso TROCAR (rotação), porque arquivo exposto se considera vazado pra sempre.
5. Crie um teste que PROVA: pedir /.env e /backup.sql na minha app → 403/404.

Me mostre: arquivos movidos, a regra adicionada (antes/depois), a lista de chaves pra trocar, e o teste.
```

### 2 · 🧾 DADO DE OUTRO USUÁRIO (IDOR)

```
Aplique a correção de ACESSO A DADOS DE OUTROS USUÁRIOS (IDOR) no meu projeto.

O que fazer:
1. Encontre TODA rota/consulta que devolve dados por um id vindo do cliente (ex: /pedidos/:id, /agendamentos/:id, ?id=, ?token=).
2. Em cada uma: filtre SEMPRE pelo dono do dado junto com o id — ex: WHERE id = ? AND user_id = <usuário da sessão> (NUNCA confie em id, role ou "dono" que veio do cliente).
3. Se o dado não for do usuário logado: responda 404 (não 403 — não confirme nem que o dado existe).
4. Se o banco suportar, adicione uma trava extra no nível do banco (constraint/policy) como rede de segurança.
5. Crie um teste que PROVA: logado como usuário A, pedir o registro do usuário B → 404; e o dono B acessando o dele → 200.

Me mostre: rotas alteradas, o antes/depois de cada correção, e como rodar o teste.
```

### 3 · 🖥️ ÁREA INTERNA SEM PORTEIRO (permissão no servidor)

```
Aplique a correção de PERMISSÃO EM ROTAS INTERNAS no meu projeto.

O que fazer:
1. Liste TODAS as rotas que não são pra qualquer usuário (admin, painel, equipe, financeiro, relatórios, listagens gerais).
2. Em cada uma, a decisão deve acontecer NO SERVIDOR: checar o papel/permissão do usuário da SESSÃO (ex: user.role === 'admin' | user.staff) — nunca um campo que veio do cliente.
3. Sem permissão: responda 403 com uma mensagem genérica ("acesso restrito").
4. Revise também o frontend: o que a tela mostra pode continuar, mas NUNCA é a defesa — a defesa é no servidor.
5. Crie um teste que PROVA: usuário comum chamando a rota interna → 403; usuário com permissão → 200.

Me mostre: rotas alteradas, o antes/depois, e o teste.
```

### 4 · 🔢 CÓDIGO SEM LIMITE (força bruta)

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

### 5 · 📂 DOWNLOAD ABRE PASTAS (path traversal)

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

### 6 · 🪞 FUNÇÃO ESPIA POR DENTRO (SSRF)

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

### 7 · 🗝️ CHAVE ESCRITA NO SITE (segredo no front)

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

### 8 · 🗄️ BANCO NA CALÇADA (backup + headers)

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

---

## 🏁 PROMPT DE RE-TESTE — prove que fechou

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

---

## 📌 DICAS DE USO

- **Rode um prompt por vez.** Consertar tudo de uma vez dá confusão; uma porta por vez você CONFERE cada teste.
- **Exija o "antes/depois".** É a sua garantia de que a IA mexeu certo (e você aprende vendo).
- **Exija o teste.** Correção sem prova é promessa. O teste é a prova.
- **Depois de corrigir: rode o prompt de re-teste.** É o "reteste" da série, só que no SEU projeto.
- **Se a IA enrolar:** pede de novo "me mostre o arquivo e a linha" — ela não consegue fingir código que não escreveu.
