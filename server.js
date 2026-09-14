/* ============================================================
   Clínica VidaPlena — site + área do paciente + painel interno
   ⚠️⚠️  LAB DE TREINAMENTO: 8 falhas plantadas DE PROPÓSITO.
   Dados 100% fictícios. Nunca use este código em produção.
   ============================================================ */
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = process.env.PORT || 3400;
const DB_PATH = path.join(__dirname, "data", "db.json");
const PUBLIC = path.join(__dirname, "public");
const ARQ = path.join(PUBLIC, "arquivos");
if (!fs.existsSync(ARQ)) fs.mkdirSync(ARQ, { recursive: true });

const load = () => JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".sql": "text/plain; charset=utf-8", ".env": "text/plain; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8", ".pdf": "application/pdf",
};

function json(res, code, data) {
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
  return res.end(JSON.stringify(data));
}
function body(req) {
  return new Promise((r) => {
    let b = "";
    req.on("data", (c) => (b += c));
    req.on("end", () => { try { r(JSON.parse(b || "{}")); } catch { r({}); } });
  });
}

const server = http.createServer(async (req, res) => {
  const u = url.parse(req.url, true);
  const p = u.pathname;
  console.log(`[vidaplena] ${req.method} ${p}${u.search ? u.search : ""}`);

  const db = load();
  const token = u.query.token || String(req.headers.authorization || "").replace("Bearer ", "");
  const user = db.pacientes.find((x) => x.token === token);

  /* ---------------- API ---------------- */

  // Login da área do paciente
  if (p === "/api/login" && req.method === "POST") {
    const b = await body(req);
    const usr = db.pacientes.find((x) => x.email === b.email && x.senha === b.senha);
    if (!usr) return json(res, 401, { erro: "E-mail ou senha incorretos" });
    return json(res, 200, { token: usr.token, nome: usr.nome });
  }

  // Login por código de acesso (4 dígitos, enviado por WhatsApp)
  // ⚠️ FALHA 04: SEM RATE LIMIT — tentativas ilimitadas (brute force de 10.000 combinações)
  if (p === "/api/login/codigo" && req.method === "POST") {
    const b = await body(req);
    const usr = db.pacientes.find((x) => x.email === b.email);
    if (!usr) return json(res, 401, { erro: "Paciente não encontrado" });
    if (String(b.codigo) !== String(db.codigos[b.email] || "")) return json(res, 401, { erro: "Código inválido" });
    return json(res, 200, { token: usr.token, nome: usr.nome, ok: true });
  }

  // Meus agendamentos
  if (p === "/api/agendamentos" && req.method === "GET") {
    if (!user) return json(res, 401, { erro: "Faça login." });
    return json(res, 200, db.agendamentos.filter((a) => a.paciente_id === user.id));
  }

  // Um agendamento pelo ID
  // ⚠️ FALHA 01: IDOR — devolve agendamento de QUALQUER paciente (com observações médicas!)
  const mat = p.match(/^\/api\/agendamentos\/(\d+)$/);
  if (mat && req.method === "GET") {
    if (!user) return json(res, 401, { erro: "Faça login." });
    const ag = db.agendamentos.find((a) => a.id === Number(mat[1]));
    if (!ag) return json(res, 404, { erro: "Não encontrado" });
    return json(res, 200, ag);
  }

  // Meus exames
  if (p === "/api/exames" && req.method === "GET") {
    if (!user) return json(res, 401, { erro: "Faça login." });
    return json(res, 200, db.exames.filter((e) => e.paciente_id === user.id));
  }

  // Download de exame
  // ⚠️ FALHA 05: PATH TRAVERSAL — caminho não sanitizado (permite ../../)
  if (p === "/api/exame" && req.method === "GET") {
    const file = String(u.query.arquivo || "");
    const dest = path.join(ARQ, file);
    try {
      const data = fs.readFileSync(dest);
      res.writeHead(200, { "Content-Type": MIME[path.extname(dest)] || "text/plain; charset=utf-8" });
      return res.end(data);
    } catch {
      return json(res, 404, { erro: "Exame não encontrado" });
    }
  }

  // Lista de pacientes (uso interno da equipe)
  // ⚠️ FALHA 03: NENHUMA checagem de equipe/admin no backend — qualquer paciente logado acessa
  if (p === "/api/admin/pacientes" && req.method === "GET") {
    if (!user) return json(res, 401, { erro: "Faça login." });
    return json(res, 200, db.pacientes.map((x) => ({ id: x.id, nome: x.nome, email: x.email, cpf: x.cpf, telefone: x.telefone, plano: x.plano, staff: x.staff })));
  }

  // Financeiro (uso interno)
  // ⚠️ FALHA 03b: idem — sem checagem
  if (p === "/api/admin/financeiro" && req.method === "GET") {
    if (!user) return json(res, 401, { erro: "Faça login." });
    return json(res, 200, db.financeiro);
  }

  // Agenda completa da clínica (uso interno)
  // ⚠️ FALHA 03c: sem checagem — expõe a agenda de TODOS os pacientes (com observações médicas)
  if (p === "/api/admin/agenda" && req.method === "GET") {
    if (!user) return json(res, 401, { erro: "Faça login." });
    return json(res, 200, db.agendamentos);
  }

  // Importar foto de perfil por link
  // ⚠️ FALHA 06: SSRF — o servidor busca QUALQUER URL (inclusive internas), sem whitelist
  if (p === "/api/importar-foto" && req.method === "POST") {
    const b = await body(req);
    try {
      const r = await fetch(b.url);
      const t = await r.text();
      return json(res, 200, { url: b.url, conteudo: t.slice(0, 4000) });
    } catch (e) {
      return json(res, 400, { erro: String((e && e.message) || e) });
    }
  }

  /* ---------------- ESTÁTICO ---------------- */
  let f = p === "/" ? "/index.html" : p;
  if (f === "/paciente" || f === "/area") f = "/paciente.html";
  if (f === "/admin" || f === "/interno") f = "/admin.html";
  // ⚠️ FALHA 02 + 08: serve TUDO de public/ (inclusive .env e backup.sql)
  const full = path.join(PUBLIC, decodeURIComponent(f));
  try {
    const data = fs.readFileSync(full);
    res.writeHead(200, {
      "Content-Type": MIME[path.extname(full)] || "application/octet-stream",
      "X-Powered-By": "VidaPlenaWeb 2.4", // ⚠️ FALHA 08: tecnologia exposta, zero headers de segurança
    });
    return res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("404 — página não encontrada");
  }
});

server.listen(PORT, () => {
  console.log("=======================================================");
  console.log("  🏥 Clínica VidaPlena no ar (LAB DE TREINAMENTO)");
  console.log(`     http://localhost:${PORT}`);
  console.log("  ⚠️  8 falhas plantadas de propósito. Dados fictícios.");
  console.log("=======================================================");
});
