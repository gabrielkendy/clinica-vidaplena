/* ============================================================
   Clínica VidaPlena — VERSÃO BLINDADA (o "depois" do vídeo)
   ------------------------------------------------------------
   As 8 falhas do lab foram FECHADAS, uma por uma.
   Cada correção está marcada com ✅ CORREÇÃO + a explicação simples.
   Compare com o server.js da raiz (o "antes", com as 8 falhas).

   Como rodar:  node 02-BLINDAGEM/server-blindado.js
   Roda na porta 3500 (o vulnerável fica na 3400) — dá pra rodar os
   dois lado a lado e comparar.
   ============================================================ */
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = process.env.PORT || 3500;
const RAIZ = __dirname;
const DB_PATH = path.join(RAIZ, "data", "db.json");
const PUBLIC = path.join(RAIZ, "public");
const ARQ = path.join(PUBLIC, "arquivos");

const load = () => JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8", ".pdf": "application/pdf",
};

/* ✅ CORREÇÃO 07: a chave da assistente vive SÓ no servidor.
   O site (navegador) nunca vê. Aqui ela é lida do ambiente. */
function lerEnv(nome) {
  try {
    const txt = fs.readFileSync(path.join(RAIZ, ".env"), "utf8");
    const m = txt.match(new RegExp("^" + nome + "=(.+)$", "m"));
    return m ? m[1].trim() : "";
  } catch { return ""; }
}
const VIDA_AI_KEY = process.env.VIDA_AI_KEY || lerEnv("VIDA_AI_KEY");

/* ✅ CORREÇÃO 02 + 08a: arquivos que NUNCA são servidos pela web.
   Dotfiles (.env) e backups/dumps (.sql, .bak...) ficam bloqueados. */
function arquivoBloqueado(f) {
  const nome = path.basename(f);
  if (nome.startsWith(".")) return true;
  if (/\.(sql|env|log|bak|old|zip|tar|gz|dump)$/i.test(nome)) return true;
  return false;
}

/* ✅ CORREÇÃO 08b: cabeçalhos de proteção em TODA resposta.
   E o X-Powered-By (que contava a tecnologia) foi removido. */
const SEG_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy": "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'",
};

function json(res, code, data) {
  res.writeHead(code, Object.assign({ "Content-Type": "application/json; charset=utf-8" }, SEG_HEADERS));
  return res.end(JSON.stringify(data));
}
function body(req) {
  return new Promise((r) => {
    let b = "";
    req.on("data", (c) => (b += c));
    req.on("end", () => { try { r(JSON.parse(b || "{}")); } catch { r({}); } });
  });
}

/* ✅ CORREÇÃO 04: limite de tentativas do código de acesso.
   5 tentativas erradas = espera de 10 minutos. */
const TENTATIVAS = new Map(); // email -> { n, liberaEm }
const MAX_TENTATIVAS = 5;
const JANELA_MS = 10 * 60 * 1000;

/* ✅ CORREÇÃO 06: o servidor só busca endereços PERMITIDOS.
   Nada de rede interna, nada da própria casa. */
function enderecoInterno(hostname) {
  const h = String(hostname || "").toLowerCase();
  if (!h) return true;
  if (h === "localhost" || h.endsWith(".local") || h.endsWith(".internal")) return true;
  if (/^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
  if (h === "169.254.169.254" || h === "::1" || h === "[::1]" || h === "0.0.0.0") return true;
  return false;
}

const server = http.createServer(async (req, res) => {
  const u = url.parse(req.url, true);
  const p = u.pathname;
  console.log(`[vidaplena-blindada] ${req.method} ${p}${u.search ? u.search : ""}`);

  const db = load();
  const token = u.query.token || String(req.headers.authorization || "").replace("Bearer ", "");
  const user = db.pacientes.find((x) => x.token === token);

  /* ---------------- API ---------------- */

  if (p === "/api/login" && req.method === "POST") {
    const b = await body(req);
    const usr = db.pacientes.find((x) => x.email === b.email && x.senha === b.senha);
    if (!usr) return json(res, 401, { erro: "E-mail ou senha incorretos" });
    return json(res, 200, { token: usr.token, nome: usr.nome });
  }

  // Código de acesso (4 dígitos) — agora COM limite de tentativas
  if (p === "/api/login/codigo" && req.method === "POST") {
    const b = await body(req);
    const agora = Date.now();
    const reg = TENTATIVAS.get(b.email) || { n: 0, liberaEm: 0 };

    // ✅ CORREÇÃO 04: ainda bloqueado? responde 429 e nem confere o código.
    if (reg.n >= MAX_TENTATIVAS && agora < reg.liberaEm) {
      const falta = Math.ceil((reg.liberaEm - agora) / 60000);
      return json(res, 429, { erro: `Muitas tentativas. Tente novamente em ${falta} min.` });
    }
    if (reg.n >= MAX_TENTATIVAS) { reg.n = 0; reg.liberaEm = 0; } // janela expirou

    const usr = db.pacientes.find((x) => x.email === b.email);
    if (!usr) return json(res, 401, { erro: "Paciente não encontrado" });
    if (String(b.codigo) !== String(db.codigos[b.email] || "")) {
      reg.n += 1;
      reg.liberaEm = agora + JANELA_MS;
      TENTATIVAS.set(b.email, reg);
      return json(res, 401, { erro: "Código inválido", tentativas_restantes: Math.max(0, MAX_TENTATIVAS - reg.n) });
    }
    TENTATIVAS.delete(b.email); // acertou: zera o contador
    return json(res, 200, { token: usr.token, nome: usr.nome, ok: true });
  }

  if (p === "/api/agendamentos" && req.method === "GET") {
    if (!user) return json(res, 401, { erro: "Faça login." });
    return json(res, 200, db.agendamentos.filter((a) => a.paciente_id === user.id));
  }

  // Um agendamento pelo ID
  const mat = p.match(/^\/api\/agendamentos\/(\d+)$/);
  if (mat && req.method === "GET") {
    if (!user) return json(res, 401, { erro: "Faça login." });
    // ✅ CORREÇÃO 01: filtro de dono. Se não é seu, é como se não existisse (404).
    const ag = db.agendamentos.find((a) => a.id === Number(mat[1]) && a.paciente_id === user.id);
    if (!ag) return json(res, 404, { erro: "Não encontrado" });
    return json(res, 200, ag);
  }

  if (p === "/api/exames" && req.method === "GET") {
    if (!user) return json(res, 401, { erro: "Faça login." });
    return json(res, 200, db.exames.filter((e) => e.paciente_id === user.id));
  }

  // Download de exame
  if (p === "/api/exame" && req.method === "GET") {
    const file = String(u.query.arquivo || "");
    // ✅ CORREÇÃO 05: o nome precisa ser um nome de arquivo simples (sem caminhos, sem "..")
    if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(file) || file.includes("..")) {
      return json(res, 400, { erro: "Nome de arquivo inválido" });
    }
    // ✅ CORREÇÃO 05b: e o caminho final TEM que ficar dentro da pasta de exames.
    const dest = path.resolve(ARQ, file);
    if (!dest.startsWith(ARQ + path.sep)) return json(res, 400, { erro: "Nome de arquivo inválido" });
    try {
      const data = fs.readFileSync(dest);
      res.writeHead(200, Object.assign({ "Content-Type": MIME[path.extname(dest)] || "text/plain; charset=utf-8" }, SEG_HEADERS));
      return res.end(data);
    } catch {
      return json(res, 404, { erro: "Exame não encontrado" });
    }
  }

  // ✅ CORREÇÃO 01/03: o paciente vê os PRÓPRIOS dados (nunca a lista interna da equipe).
  if (p === "/api/meus-dados" && req.method === "GET") {
    if (!user) return json(res, 401, { erro: "Faça login." });
    return json(res, 200, { id: user.id, nome: user.nome, email: user.email, cpf: user.cpf, telefone: user.telefone, plano: user.plano });
  }

  // Rotas internas da equipe (as 3) — agora com PORTEIRO
  // ✅ CORREÇÃO 03: o servidor confere se quem pede é da equipe (staff).
  //    Não importa o que a tela mostra: quem não é da equipe recebe 403.
  const rotaEquipe = p === "/api/admin/pacientes" || p === "/api/admin/financeiro" || p === "/api/admin/agenda";
  if (rotaEquipe && req.method === "GET") {
    if (!user) return json(res, 401, { erro: "Faça login." });
    if (!user.staff) return json(res, 403, { erro: "Acesso restrito à equipe." });
    if (p === "/api/admin/pacientes") return json(res, 200, db.pacientes.map((x) => ({ id: x.id, nome: x.nome, email: x.email, cpf: x.cpf, telefone: x.telefone, plano: x.plano, staff: x.staff })));
    if (p === "/api/admin/financeiro") return json(res, 200, db.financeiro);
    return json(res, 200, db.agendamentos);
  }

  // Importar foto de perfil por link
  if (p === "/api/importar-foto" && req.method === "POST") {
    const b = await body(req);
    let destino;
    try { destino = new URL(String(b.url)); } catch { return json(res, 400, { erro: "Endereço inválido" }); }
    // ✅ CORREÇÃO 06: bloqueia rede interna / localhost / IPs privados.
    if (enderecoInterno(destino.hostname)) {
      return json(res, 400, { erro: "Endereço não permitido" });
    }
    try {
      const r = await fetch(destino.href);
      const t = await r.text();
      return json(res, 200, { url: destino.href, conteudo: t.slice(0, 2000) });
    } catch (e) {
      return json(res, 400, { erro: String((e && e.message) || e) });
    }
  }

  // ✅ CORREÇÃO 07: a assistente roda no SERVIDOR. O site só manda a
  //    pergunta; o servidor usa a chave (que ninguém vê) e devolve a resposta.
  if (p === "/api/assistente" && req.method === "POST") {
    const b = await body(req);
    const msg = String(b.mensagem || "").slice(0, 500);
    if (!msg) return json(res, 400, { erro: "Mensagem vazia" });
    // (No lab, a "IA" é simulada — mas a chave usada aqui é a de verdade do servidor.)
    const respostas = [
      "Anotado! Posso verificar sua agenda. Quer remarcar ou confirmar sua próxima consulta?",
      "Nosso horário de atendimento é de segunda a sábado, das 08h às 20h. Quer que eu já reserve um horário?",
      "Aceitamos Ampla Saúde, MedPlus e Saúde Total. Posso conferir a cobertura do seu plano.",
    ];
    console.log(`[assistente] usando chave do servidor (${VIDA_AI_KEY.slice(0, 12)}...) — nunca exposta ao navegador`);
    return json(res, 200, { resposta: respostas[Math.floor(Math.random() * respostas.length)] });
  }

  /* ---------------- ESTÁTICO ---------------- */
  let f = p === "/" ? "/index.html" : decodeURIComponent(p);
  if (f === "/paciente" || f === "/area") f = "/paciente.html";
  if (f === "/admin" || f === "/interno") f = "/admin.html";

  // ✅ CORREÇÃO 02: bloqueio dos arquivos sensíveis ANTES de tentar ler.
  if (arquivoBloqueado(f)) {
    res.writeHead(403, Object.assign({ "Content-Type": "text/plain; charset=utf-8" }, SEG_HEADERS));
    return res.end("403 — acesso negado");
  }

  // ✅ CORREÇÃO 07b: o site baixa a versão do front SEM a chave.
  const full = path.join(PUBLIC, f); // o public/app.js desta branch ja e o limpo
  try {
    const data = fs.readFileSync(full);
    res.writeHead(200, Object.assign({
      "Content-Type": MIME[path.extname(full)] || "application/octet-stream",
      // ✅ CORREÇÃO 08: sem X-Powered-By (não conta mais a tecnologia usada)
    }, SEG_HEADERS));
    return res.end(data);
  } catch {
    res.writeHead(404, Object.assign({ "Content-Type": "text/plain; charset=utf-8" }, SEG_HEADERS));
    return res.end("404 — página não encontrada");
  }
});

server.listen(PORT, () => {
  console.log("=======================================================");
  console.log("  🛡️  Clínica VidaPlena — VERSÃO BLINDADA (o depois)");
  console.log(`     http://localhost:${PORT}`);
  console.log("  ✅  As 8 falhas foram fechadas. Compare com a versão");
  console.log("      vulnerável (porta 3400) rodando lado a lado.");
  console.log("=======================================================");
});
