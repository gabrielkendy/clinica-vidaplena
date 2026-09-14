# 🎬 ROTEIRO V2 — "A Blindagem: eu fecho as 8 falhas ao vivo" (com timecodes e direção visual)

> **VERSÃO 1 · linguagem natural** — mesmo estilo do vídeo 1: conversa de amigo, explicando pra leigo.
> Cada correção é mostrada como ela é: **pequena, simples, na tela**.
> Setup: os dois servidores lado a lado (3400 vulnerável · 3500 blindado) + `reteste.py` no final.
> Comandos prontos: ver `GUIA-DAS-8-CORRECOES.md` (não vão no roteiro).

---

## 🏷️ TÍTULOS (escolher 1)
1. "Eu fechei as 8 falhas da minha clínica. Ao vivo."
2. "A IA invadiu minha clínica. Hoje eu blindei ela na tua frente"
3. "Consertei TODAS as falhas do vídeo passado (e tentei invadir de novo)"

## 🖼️ CONCEITO DE THUMB (gerar no Codex, headline 3D SEMPRE no prompt)
Split: lado esquerdo tela vermelha com "8 FALHAS" riscado. Lado direito tela verde com cadeado e "8/8 BLOQUEADAS". Seta ligando os dois. Headline 3D: **"EU FECHEI TUDO"** + selo "AO VIVO". Expressão confiante.

---

## [00:00–00:40] · B01 — A promessa (parte 2)

**Layout:** Câmera + tela dos dois navegadores lado a lado

### O que FALAR
No vídeo passado eu mostrei uma clínica construída com IA sendo invadida: oito falhas graves, do caderno de senhas exposto até a ficha médica de outro paciente. Eu prometi que hoje eu ia consertar TUDO na tua frente. É isso que a gente vai fazer agora. Eu vou pegar as oito falhas, uma por uma, e mostrar a correção de cada uma. E você vai ver uma coisa: quase nenhuma delas é grande. Tem correção aqui que é UMA linha de código. Não é porque eu sou gênio, não. É porque essas falhas são sempre as mesmas, então as defesas também são. E no final, olha, eu vou fazer o teste que eu mais tô querendo fazer: eu vou tentar invadir a minha clínica DE NOVO, na tua frente, com os mesmos oito ataques. Se um só que seja entrar, eu falhei. Vamos ver no que dá.

### O que MOSTRAR
- [0:00] Câmera. Quick cut: as telas dos dois lados (a vermelha e a verde)
- [0:25] Corte rápido dos dois terminais rodando lado a lado

---

## [00:40–01:30] · B02 — Como a blindagem funciona

**Layout:** Screen demo (os dois sites lado a lado)

### O que FALAR
Antes de abrir o primeiro código, deixa eu te explicar como essa blindagem funciona, porque é a parte que muda a tua cabeça. Olha essa tela aqui: esse é o site como ele está hoje, com as oito falhas. E esse aqui é o mesmo site, a mesma clínica, mesmos dados, mesmos médicos, mesma assistente virtual. Só que blindado. Do lado de fora, os dois parecem idênticos. A diferença está no que cada um responde quando alguém tenta forçar uma porta. E é aí que vem a parte interessante: cada correção é um ajuste pequeno, quase sempre no mesmo lugar, que é o servidor. Porque repara: as oito falhas do vídeo passado são oito jeitos diferentes de a mesma pergunta não ser feita. A pergunta é sempre essa: "espera aí, quem está pedindo isso?" O servidor estava confiando em todo mundo. A partir de agora, ele confere. Bora ver a primeira?

### O que MOSTRAR
- [0:40] Os dois sites abertos lado a lado (3400 e 3500) — visualmente idênticos
- [1:05] Abrir o código dos dois servidores lado a lado (vulnerável e blindado)
- [1:25] Destacar os blocos "✅ CORREÇÃO" no blindado

---

## [01:30–02:10] · B03 — O mapa das correções

**Layout:** Card Grid (as 8 correções)

### O que FALAR
Olha o mapa completo do que a gente vai fazer. Uma correção pra cada falha. A primeira: a busca passa a filtrar pelo dono. A segunda: os arquivos de senha saem do alcance da internet. A terceira: a área interna ganha um porteiro no servidor. A quarta: o código de acesso ganha limite de tentativas. A quinta: o download só aceita nome de arquivo da lista. A sexta: o servidor para de buscar qualquer endereço que pedirem. A sétima: a chave da inteligência artificial muda de casa, vai pro servidor. E a oitava: o backup sai do chão e o servidor para de contar os próprios segredos. Oito ajustes. Nenhum deles cabeludo. Vem ver o primeiro.

### O que MOSTRAR
- [1:30] Cards entrando um a um (os 8 nomes das correções)
- [2:05] Corte pro primeiro terminal

---

## [02:10–03:10] · B04 — CORREÇÃO 1 · O filtro de dono (IDOR)

**Layout:** Screen demo (terminal dos dois lados)

### O que FALAR
Falha número um: aquela em que eu, como Mariana, li a ficha do Bruno. Lembra? O sistema buscava o agendamento só pelo número, e nunca perguntava de quem ele era. Olha o código que causava isso. É essa linha aqui: procura o agendamento pelo número, e pronto. Agora olha a correção. Eu só preciso adicionar UMA coisinha: "e o dono é quem está pedindo". É isso: um pedacinho de linha. Agora presta atenção no teste. Eu vou rodar EXATAMENTE o mesmo comando do vídeo passado, o que me trouxe a ficha do Bruno. Três, dois, um... e olha. "Não encontrado". O sistema agora é como se o agendamento do Bruno nem existisse pra mim. E pra ele, quando ele loga, tudo continua funcionando normal. Não é incrível o tamanho da correção? Uma linha separando o que é meu do que é teu.

### O que MOSTRAR
- [2:10] Terminal 3400: rodar o comando do 103 → ficha do Bruno (recap)
- [2:30] Código: destacar o `find` sem filtro → depois o `&& a.paciente_id === user.id`
- [2:50] Terminal 3500: mesmo comando → `404 Não encontrado`
- [3:05] Câmera: "uma linha separando o que é meu do que é teu"

---

## [03:10–04:10] · B05 — CORREÇÃO 2 · As senhas saem da vitrine (.env)

**Layout:** Screen demo (terminal dos dois lados)

### O que FALAR
Falha número dois: o caderno de senhas aberto na internet. No vídeo passado, o servidor me entregou as chaves da clínica como quem entrega uma página qualquer. Olha por que: o código servia TODOS os arquivos da pasta pública, sem perguntar o que era. Arquivo de senha, backup, o que fosse. A correção tem duas partes, e as duas são simples. Primeira: o arquivo de senhas sai da pasta pública. Ele não fica mais onde a internet alcança. Segunda: o servidor cria uma regra: antes de entregar qualquer arquivo, ele confere. É dotfile? Arquivo de backup? Então: acesso negado. Só que o acesso negado tem que responder na hora, sem pensar. Olha o teste: mesmo comando do vídeo passado, pedindo o arquivo de senhas... e agora responde "403, acesso negado". E o site continua funcionando perfeitamente, porque nenhuma página de verdade dependia desse arquivo. Ele nunca deveria ter estado ali.

### O que MOSTRAR
- [3:10] Terminal 3400: `curl /.env` → chaves na tela (recap)
- [3:30] Código: `arquivoBloqueado()` + o 403
- [3:50] Terminal 3500: `curl /.env` → `403 — acesso negado`
- [4:05] Câmera no fecho

---

## [04:10–05:10] · B06 — CORREÇÃO 3 · O porteiro da área interna

**Layout:** Screen demo (browser dos dois lados)

### O que FALAR
Falha número três: a área interna sem porteiro. Eu, como paciente, entrei no painel da equipe e vi o CPF dos pacientes e o faturamento. E por que eu consegui? Porque o sistema só escondia o botão da tela. Ninguém perguntou, no servidor, se quem estava pedindo era da equipe. A correção é exatamente essa pergunta, feita onde ela tem que ser feita: no servidor. Antes de responder QUALQUER coisa da área interna, o sistema confere: você é da equipe? É? Então passa. Não é? Então: acesso restrito. E agora o take que eu quero que você veja: eu tento entrar de novo, como paciente... e olha: "acesso restrito à equipe". Agora olha o detalhe mais importante dessa correção: eu vou logar como a equipe de verdade, a Dra. Camila. E: tudo funcionando. Ela vê os pacientes, a agenda, o financeiro. A correção não atrapalhou o trabalho de ninguém. Ela só fechou a porta pra quem não devia entrar.

### O que MOSTRAR
- [4:10] Browser 3400: paciente no painel interno (recap)
- [4:25] Código: `if (!user.staff) → 403`
- [4:40] Browser 3500: paciente → "Acesso restrito à equipe"
- [4:55] Browser 3500: equipe logando → painel funcionando

---

## [05:10–06:00] · B07 — CORREÇÃO 4 · O limite que mata o ataque

**Layout:** Screen demo (terminal)

### O que FALAR
Falha número quatro: o código de acesso sem limite. No vídeo passado, eu testei os quatro dígitos até acertar, porque o sistema aceitava tentativa atrás de tentativa. E aqui é importante a gente entender: o problema nunca foi o código ser curto. O problema era a falta de limite. Então a correção é: limite. Cinco tentativas erradas, e o acesso daquela conta trava por dez minutos. Olha como é simples no código: um contador de tentativas, e uma checagem. E o teste? Eu vou rodar o MESMO programa do vídeo passado, o que ficou tentando até entrar. Olha o que acontece agora: erro, erro, erro, erro, erro... e na sexta: "Muitas tentativas. Tente novamente em dez minutos". O programa pode rodar a noite inteira: ele não vai passar. Sabe o que aconteceu aqui? O ataque morreu de tédio. Limite é isso: você não precisa vencer o atacante. Você só precisa fazer ele cansar.

### O que MOSTRAR
- [5:10] Terminal 3400: loop antigo entrando (recap, 3s)
- [5:25] Código: MAX_TENTATIVAS + 429
- [5:40] Terminal 3500: loop rodando → `429 — muitas tentativas`
- [5:55] Câmera: "o ataque morreu de tédio"

---

## [06:00–06:50] · B08 — CORREÇÃO 5 · O download só aceita nome

**Layout:** Screen demo (terminal)

### O que FALAR
Falha número cinco: aquele download que abria a pasta inteira do servidor. Lembra dos dois pontinhos que subiam as pastas? O problema era que o nome do arquivo virava um caminho, direto, sem ninguém conferir. A correção tem dois cadeados, porque segurança boa (segurança boa) é cinto E suspensório. Cadeado um: o nome do arquivo só pode ser um nome de arquivo de verdade. Se tem barra, se tem dois pontinhos, se tem qualquer coisa estranha: recusado. Cadeado dois: mesmo se passar pelo primeiro, o sistema confere se o arquivo final está DENTRO da pasta de exames. Tá fora? Recusado. E o teste: o mesmo pedido malandro do vídeo passado... "400, nome de arquivo inválido". E o exame de verdade, da Mariana? Baixa normal, como sempre. Presta atenção nesse padrão: a correção nunca quebra o uso de verdade. Ela separa o uso de verdade do abuso.

### O que MOSTRAR
- [6:00] Terminal 3400: `../../.env` → senhas (recap)
- [6:15] Código: a regex de nome + o `startsWith(ARQ)`
- [6:30] Terminal 3500: `../../.env` → `400` · e `hemograma-mariana.txt` → baixa normal
- [6:45] Câmera no fecho

---

## [06:50–07:40] · B09 — CORREÇÃO 6 · A coleira do servidor (SSRF)

**Layout:** Screen demo (terminal)

### O que FALAR
Falha número seis, a minha favorita do primeiro vídeo: a função de importar foto que espiava por dentro. Lembra? Eu colei o endereço interno e o servidor foi lá e me trouxe o conteúdo. O problema era: o servidor buscava QUALQUER endereço que pedissem. Inclusive os de dentro de casa. A correção: uma lista do que ele pode buscar. E uma regra clara: endereço interno, ele não busca. Nunca. Nem localhost, nem a rede interna, nem o endereço da própria máquina. Pensa assim: você dá pro funcionário uma lista de fornecedores autorizados. Fora da lista, ele não vai. E olha o teste: o mesmo endereço interno do vídeo passado... "400, endereço não permitido". Enquanto isso, um endereço público de verdade, tipo uma imagem da internet? Continua funcionando normal. O servidor obedece, sim. Mas agora ele obedece COM REGRA.

### O que MOSTRAR
- [6:50] Terminal 3400: SSRF devolvendo o conteúdo interno (recap)
- [7:05] Código: `enderecoInterno()` + o 400
- [7:20] Terminal 3500: `400 — endereço não permitido`
- [7:35] Câmera: "obedece, mas com regra"

---

## [07:40–08:30] · B10 — CORREÇÃO 7 · A chave muda de casa

**Layout:** Screen demo (F12 + terminal)

### O que FALAR
Falha número sete: a chave da inteligência artificial piscando no F12. No vídeo passado eu abri o código do site e lá estava ela, inteira, pra qualquer visitante ler. A correção é uma mudança de casa: a chave sai do site e vai morar no servidor. Como é que o site continua funcionando então? Simples: o site agora PEDE pro servidor. Ele manda a pergunta da pessoa, o servidor usa a chave (que só ele vê) e devolve a resposta. Olha o teste, porque esse é o take da virada: eu vou abrir o MESMO F12 do vídeo passado e procurar a chave... ela não existe mais no código do site. Não tem. E a assistente virtual? Continuo conversando com ela aqui, respondendo normal. A chave ficou no cofre, e o cofre fica dentro do servidor. Na conta do servidor aparece: "usando a chave..." e o navegador nunca viu nada.

### O que MOSTRAR
- [7:40] F12 no 3400: a chave na tela (recap)
- [7:55] Código: a rota `/api/assistente` no servidor + o app-blindado.js sem chave
- [8:15] F12 no 3500: procurar `VIDA_AI_KEY` → nada · e a assistente respondendo normal
- [8:28] Câmera no fecho

---

## [08:30–09:20] · B11 — CORREÇÃO 8 · Casaco e tapa-olho (backup + headers)

**Layout:** Screen demo (terminal + browser)

### O que FALAR
Falha número oito, e última: o banco de dados no chão da porta de entrada. O backup, que a clínica fez pra se proteger de acidente, estava na pasta pública, com tudo dentro: dados e senha. E o servidor ainda ajudava quem procurava, contando qual tecnologia usava e quais versões. A correção: o backup sai do chão. Cópia de segurança agora mora em cofre fechado, fora do site e fora da internet. E o servidor veste o casaco: ele para de contar os próprios detalhes e começa a mandar as proteções básicas em toda resposta. Olha o antes e o depois. Antes: "curl backup" e lá vinha o banco inteiro. Agora: "403, acesso negado". E olha os cabeçalhos da resposta agora: as proteções estão lá, e o nome da tecnologia... sumiu. É aquela máxima: menos informação exposta, menos caminho pra quem procura.

### O que MOSTRAR
- [8:30] Terminal 3400: `backup.sql` abrindo (recap)
- [8:45] Código: a regra dos arquivos + SEG_HEADERS
- [9:00] Terminal 3500: `backup.sql` → 403 · headers na tela (`curl -I`)
- [9:15] Câmera no fecho

---

## [09:20–10:30] · B12 — O reteste: invadindo de novo (na tua frente)

**Layout:** Screen demo (terminal cheio, resolução do comando)

### O que FALAR
Chegou a hora que eu prometi. As oito correções estão no lugar, e agora eu vou rodar os MESMOS oito ataques do vídeo passado, contra a versão blindada. Na tua frente. Sem edição, sem corte, sem tirar nada. E eu quero que você preste atenção em cada resposta, porque cada uma tem uma história: o banco de senhas: bloqueado. A ficha do outro paciente: bloqueado. O painel interno: bloqueado, e a equipe continua entrando normal. O código de acesso: bloqueado. O download malandro: bloqueado, e os exames continuam baixando. A função de espionar: bloqueada. A chave no site: não existe mais. O backup: no chão, bloqueado. Olha o placar... OITO DE OITO. Não entrou em NENHUMA. E eu quero que você note uma coisa nesse placar: nenhum desses "bloqueados" quebrou o funcionamento. A clínica funciona. Os pacientes entram. A equipe trabalha. O que fechou foi só aquilo que nunca deveria ter estado aberto. Blindar não é trancar tudo. Blindar é saber o que fica aberto pra quem.

### O que MOSTRAR
- [9:20] Rodar `python 02-BLINDAGEM/reteste.py` — deixar rolar inteiro na tela
- [10:10] Zoom no placar: `8/8 PORTAS FECHADAS`
- [10:20] Câmera no fecho

---

## [10:30–11:40] · B13 — A lição (parte 2) e o CTA

**Layout:** Câmera + split com a tabela antes/depois

### O que FALAR
Vem cá, deixa eu conversar com você reto, porque essa é a mensagem que eu quero que fique. Olha a tabela do antes e depois desse experimento. No vídeo passado, oito falhas, dados de pacientes expostos, um sistema que qualquer curioso derrubava. Hoje: oito correções, nenhuma porta aberta pros mesmos ataques. E sabe o que me deixa animado? Não é a parte técnica, não. É o tamanho da correção. Olha de novo: as correções não são projetos de meses. São linhas. São regras pequenas, escritas no lugar certo. Porque o problema nunca foi a IA ser burra. A IA entregou o que foi pedido. O que faltou foi alguém perguntar: "quem pode ver o quê? quem pode acessar o quê? o que ficou exposto? quanto eu deixo tentar?". As mesmas quatro perguntas do vídeo passado. E olha a diferença: perguntar isso ANTES de colocar no ar leva uma tarde. Descobrir do jeito ruim... leva a clínica inteira. Se você constrói com IA, imprime essas quatro perguntas e cola do lado do monitor. Uma tarde de perguntas vale mais que qualquer ferramenta cara. E ó, tudo que eu usei tá no link da descrição: o código, as correções, o script do reteste. Baixa, roda no teu projeto e faz o teste você mesmo. Se você consertar a tua primeira falha por causa daqui, comenta aqui embaixo: "fechei a primeira". Eu quero ler. E se inscreve, porque o próximo experimento já tá na forja. Até a próxima!

### O que MOSTRAR
- [10:30] Split: câmera + tabela antes/depois (as 8 linha com 200 → 403)
- [11:00] Câmera cheia: o trecho das quatro perguntas
- [11:30] Card final: repo no GitHub (branch `blindado`) + "fecha a tua primeira falha"

---

## 📋 CHECKLIST DO V2 (pós-gravação)
- [ ] Gravar com os DOIS servidores rodando lado a lado (3400 · 3500)
- [ ] Cada correção: recap no 3400 → correção no código → teste no 3500 → frase
- [ ] Reteste completo SEM corte (é a prova social do vídeo)
- [ ] Descrição: link do repo branch `blindado` + as 4 perguntas no texto
- [ ] Fixar comentário: "fecha a tua primeira falha e me conta"
- [ ] Shorts: "a correção de 1 linha" · "o placar 8/8" · "a chave que mudou de casa"
