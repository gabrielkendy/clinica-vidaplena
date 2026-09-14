/* ============================================================
   Clínica VidaPlena ONLINE — o lab rodando na Vercel.
   ------------------------------------------------------------
   ⚠️⚠️  LAB DE TREINAMENTO: as 8 falhas plantadas continuam AQUI,
   de propósito. É o MESMO comportamento do server.js local, só que
   adaptado pro formato serverless da Vercel: UMA função catch-all
   ([[...slug]]) responde TODAS as rotas do site.

   Dados 100% fictícios. Nunca use para atacar sistemas de terceiros.
   ============================================================ */
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ROOT = process.cwd();
const WWW = path.join(ROOT, "assets");
const ARQ = path.join(WWW, "arquivos");
const DB_PATH = path.join(ROOT, "data", "db.json");

const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".sql": "text/plain; charset=utf-8", ".env": "text/plain; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8", ".pdf": "application/pdf",
  ".ico": "image/x-icon",
};

const load = () => JSON.parse(fs.readFileSync(DB_PATH, "utf8"));

function json(data, code = 200) {
  return NextResponse.json(data, {
    status: code,
    headers: { "X-Powered-By": "VidaPlenaWeb 2.4" }, // ⚠️ FALHA 08: tagarelice + headers fracos
  });
}

async function handle(request) {
  const u = new URL(request.url);
  const p = decodeURIComponent(u.pathname);
  const q = u.searchParams;
  const method = request.method;
  console.log(`[vidaplena-online] ${method} ${p}${u.search}`);

  const db = load();
  const token = q.get("token") || String(request.headers.get("authorization") || "").replace("Bearer ", "");
  const user = db.pacientes.find((x) => x.token === token);

  /* ---------------- API ---------------- */

  if (p === "/api/login" && method === "POST") {
    const b = await request.json().catch(() => ({}));
    const usr = db.pacientes.find((x) => x.email === b.email && x.senha === b.senha);
    if (!usr) return json({ erro: "E-mail ou senha incorretos" }, 401);
    return json({ token: usr.token, nome: usr.nome });
  }

  // ⚠️ FALHA 04: SEM RATE LIMIT — tentativas ilimitadas
  if (p === "/api/login/codigo" && method === "POST") {
    const b = await request.json().catch(() => ({}));
    const usr = db.pacientes.find((x) => x.email === b.email);
    if (!usr) return json({ erro: "Paciente não encontrado" }, 401);
    if (String(b.codigo) !== String(db.codigos[b.email] || "")) return json({ erro: "Código inválido" }, 401);
    return json({ token: usr.token, nome: usr.nome, ok: true });
  }

  if (p === "/api/agendamentos" && method === "GET") {
    if (!user) return json({ erro: "Faça login." }, 401);
    return json(db.agendamentos.filter((a) => a.paciente_id === user.id));
  }

  // ⚠️ FALHA 01: IDOR — devolve agendamento de QUALQUER paciente
  const mat = p.match(/^\/api\/agendamentos\/(\d+)$/);
  if (mat && method === "GET") {
    if (!user) return json({ erro: "Faça login." }, 401);
    const ag = db.agendamentos.find((a) => a.id === Number(mat[1]));
    if (!ag) return json({ erro: "Não encontrado" }, 404);
    return json(ag);
  }

  if (p === "/api/exames" && method === "GET") {
    if (!user) return json({ erro: "Faça login." }, 401);
    return json(db.exames.filter((e) => e.paciente_id === user.id));
  }

  // ⚠️ FALHA 05: PATH TRAVERSAL — caminho não sanitizado
  if (p === "/api/exame" && method === "GET") {
    const file = String(q.get("arquivo") || "");
    const dest = path.join(ARQ, file);
    try {
      const data = fs.readFileSync(dest);
      return new NextResponse(data, {
        status: 200,
        headers: {
          "Content-Type": MIME[path.extname(dest)] || "text/plain; charset=utf-8",
          "X-Powered-By": "VidaPlenaWeb 2.4",
        },
      });
    } catch {
      return json({ erro: "Exame não encontrado" }, 404);
    }
  }

  // ⚠️ FALHA 03: rotas internas SEM checagem de equipe
  if ((p === "/api/admin/pacientes" || p === "/api/admin/financeiro" || p === "/api/admin/agenda") && method === "GET") {
    if (!user) return json({ erro: "Faça login." }, 401);
    if (p === "/api/admin/pacientes") return json(db.pacientes.map((x) => ({ id: x.id, nome: x.nome, email: x.email, cpf: x.cpf, telefone: x.telefone, plano: x.plano, staff: x.staff })));
    if (p === "/api/admin/financeiro") return json(db.financeiro);
    return json(db.agendamentos);
  }

  // ⚠️ FALHA 06: SSRF — o servidor busca QUALQUER URL
  if (p === "/api/importar-foto" && method === "POST") {
    const b = await request.json().catch(() => ({}));
    try {
      const r = await fetch(String(b.url));
      const t = await r.text();
      return json({ url: String(b.url), conteudo: t.slice(0, 4000) });
    } catch (e) {
      return json({ erro: String((e && e.message) || e) }, 400);
    }
  }

  /* ---------------- ESTÁTICO ---------------- */
  let f = p === "/" ? "/index.html" : p;
  if (f === "/paciente" || f === "/area") f = "/paciente.html";
  if (f === "/admin" || f === "/interno") f = "/admin.html";

  // ⚠️ FALHA 02 + 08: serve TUDO de assets/ (inclusive .env e backup.sql)
  try {
    const full = path.join(WWW, f);
    const data = fs.readFileSync(full);
    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": MIME[path.extname(full)] || "application/octet-stream",
        "X-Powered-By": "VidaPlenaWeb 2.4", // ⚠️ FALHA 08: tecnologia exposta
      },
    });
  } catch {
    return new NextResponse("404 — página não encontrada", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Powered-By": "VidaPlenaWeb 2.4" },
    });
  }
}

export async function GET(request) { return handle(request); }
export async function POST(request) { return handle(request); }
export async function HEAD(request) { return handle(request); }
