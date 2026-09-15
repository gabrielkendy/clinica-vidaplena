/* ============================================================
   Clínica VidaPlena BLINDADA ONLINE — o "depois" no ar (Vercel).
   ------------------------------------------------------------
   As 8 falhas foram FECHADAS (mesmas correções do server-blindado.js
   local, adaptadas pro formato serverless: uma função catch-all).
   Cada correção marcada com ✅ CORREÇÃO.

   Compare rodando lado a lado com: https://clinica-vidaplena.vercel.app
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
  ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8", ".pdf": "application/pdf",
  ".ico": "image/x-icon",
};

const load = () => JSON.parse(fs.readFileSync(DB_PATH, "utf8"));

/* ✅ CORREÇÃO 07: a chave vive SÓ no servidor (lida do ambiente do deploy). */
const VIDA_AI_KEY = process.env.VIDA_AI_KEY || "";

/* ✅ CORREÇÃO 08b: cabeçalhos de proteção em TODA resposta (sem X-Powered-By). */
const SEG = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy": "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'",
};

/* ✅ CORREÇÃO 02 + 08a + 09: arquivos que NUNCA são servidos pela web. */
function arquivoBloqueado(f) {
  const nome = path.basename(f);
  if (nome.startsWith(".")) return true;
  if (/\/(\.git|\.svn|\.hg)\//.test(f) || /\/\.(git|svn|hg)$/.test(f)) return true; // ✅ CORREÇÃO 09: histórico de código fora da web
  if (/\.(sql|env|log|bak|old|zip|tar|gz|dump)$/i.test(nome)) return true;
  return false;
}

/* ✅ CORREÇÃO 04: limite de tentativas (5 por 10 min, por e-mail). */
const TENTATIVAS = new Map();
const MAX_TENTATIVAS = 5;
const JANELA_MS = 10 * 60 * 1000;

/* ✅ CORREÇÃO 06: bloqueia endereços internos no importar-foto. */
function enderecoInterno(hostname) {
  const h = String(hostname || "").toLowerCase();
  if (!h) return true;
  if (h === "localhost" || h.endsWith(".local") || h.endsWith(".internal")) return true;
  if (/^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
  if (h === "169.254.169.254" || h === "::1" || h === "[::1]" || h === "0.0.0.0") return true;
  return false;
}

function json(data, code = 200) {
  return NextResponse.json(data, { status: code, headers: SEG });
}

async function handle(request) {
  const u = new URL(request.url);
  const p = decodeURIComponent(u.pathname);
  const q = u.searchParams;
  const method = request.method;
  console.log(`[vidaplena-blindada] ${method} ${p}${u.search}`);

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

  // Código de acesso — agora COM limite de tentativas
  if (p === "/api/login/codigo" && method === "POST") {
    const b = await request.json().catch(() => ({}));
    const agora = Date.now();
    const reg = TENTATIVAS.get(b.email) || { n: 0, liberaEm: 0 };
    // ✅ CORREÇÃO 04: ainda bloqueado? 429 e nem confere o código.
    if (reg.n >= MAX_TENTATIVAS && agora < reg.liberaEm) {
      const falta = Math.ceil((reg.liberaEm - agora) / 60000);
      return json({ erro: `Muitas tentativas. Tente novamente em ${falta} min.` }, 429);
    }
    if (reg.n >= MAX_TENTATIVAS) { reg.n = 0; reg.liberaEm = 0; }
    const usr = db.pacientes.find((x) => x.email === b.email);
    if (!usr) return json({ erro: "Paciente não encontrado" }, 401);
    if (String(b.codigo) !== String(db.codigos[b.email] || "")) {
      reg.n += 1; reg.liberaEm = agora + JANELA_MS; TENTATIVAS.set(b.email, reg);
      return json({ erro: "Código inválido", tentativas_restantes: Math.max(0, MAX_TENTATIVAS - reg.n) }, 401);
    }
    TENTATIVAS.delete(b.email);
    return json({ token: usr.token, nome: usr.nome, ok: true });
  }

  if (p === "/api/agendamentos" && method === "GET") {
    if (!user) return json({ erro: "Faça login." }, 401);
    return json(db.agendamentos.filter((a) => a.paciente_id === user.id));
  }

  const mat = p.match(/^\/api\/agendamentos\/(\d+)$/);
  if (mat && method === "GET") {
    if (!user) return json({ erro: "Faça login." }, 401);
    // ✅ CORREÇÃO 01: filtro de dono — se não é seu, 404.
    const ag = db.agendamentos.find((a) => a.id === Number(mat[1]) && a.paciente_id === user.id);
    if (!ag) return json({ erro: "Não encontrado" }, 404);
    return json(ag);
  }

  if (p === "/api/exames" && method === "GET") {
    if (!user) return json({ erro: "Faça login." }, 401);
    return json(db.exames.filter((e) => e.paciente_id === user.id));
  }

  // Download de exame
  if (p === "/api/exame" && method === "GET") {
    if (!user) return json({ erro: "Faça login." }, 401);
    const file = String(q.get("arquivo") || "");
    // ✅ CORREÇÃO 05: só nome de arquivo simples + caminho dentro da pasta.
    if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(file) || file.includes("..")) {
      return json({ erro: "Nome de arquivo inválido" }, 400);
    }
    // ✅ CORREÇÃO 05b: e o exame TEM que ser DO paciente que está pedindo.
    const exame = db.exames.find((e) => e.arquivo === file && e.paciente_id === user.id);
    if (!exame) return json({ erro: "Exame não encontrado" }, 404);
    const dest = path.resolve(ARQ, file);
    if (!dest.startsWith(ARQ + path.sep)) return json({ erro: "Nome de arquivo inválido" }, 400);
    try {
      const data = fs.readFileSync(dest);
      return new NextResponse(data, { status: 200, headers: Object.assign({ "Content-Type": MIME[path.extname(dest)] || "text/plain; charset=utf-8" }, SEG) });
    } catch {
      return json({ erro: "Exame não encontrado" }, 404);
    }
  }

  // ✅ CORREÇÃO 01/03: o paciente vê os PRÓPRIOS dados.
  if (p === "/api/meus-dados" && method === "GET") {
    if (!user) return json({ erro: "Faça login." }, 401);
    return json({ id: user.id, nome: user.nome, email: user.email, cpf: user.cpf, telefone: user.telefone, plano: user.plano });
  }

  // Rotas internas — com PORTEIRO
  if ((p === "/api/admin/pacientes" || p === "/api/admin/financeiro" || p === "/api/admin/agenda") && method === "GET") {
    if (!user) return json({ erro: "Faça login." }, 401);
    // ✅ CORREÇÃO 03: só a equipe passa (checado no servidor).
    if (!user.staff) return json({ erro: "Acesso restrito à equipe." }, 403);
    if (p === "/api/admin/pacientes") return json(db.pacientes.map((x) => ({ id: x.id, nome: x.nome, email: x.email, cpf: x.cpf, telefone: x.telefone, plano: x.plano, staff: x.staff })));
    if (p === "/api/admin/financeiro") return json(db.financeiro);
    return json(db.agendamentos);
  }

  // Importar foto
  if (p === "/api/importar-foto" && method === "POST") {
    const b = await request.json().catch(() => ({}));
    let destino;
    try { destino = new URL(String(b.url)); } catch { return json({ erro: "Endereço inválido" }, 400); }
    // ✅ CORREÇÃO 06: nada de rede interna / localhost.
    if (enderecoInterno(destino.hostname)) return json({ erro: "Endereço não permitido" }, 400);
    try {
      const r = await fetch(destino.href);
      const t = await r.text();
      return json({ url: destino.href, conteudo: t.slice(0, 2000) });
    } catch (e) {
      return json({ erro: String((e && e.message) || e) }, 400);
    }
  }

  // ✅ CORREÇÃO 07: a assistente roda no SERVIDOR (a chave nunca vai ao navegador).
  if (p === "/api/assistente" && method === "POST") {
    const b = await request.json().catch(() => ({}));
    const msg = String(b.mensagem || "").slice(0, 500);
    if (!msg) return json({ erro: "Mensagem vazia" }, 400);
    const respostas = [
      "Anotado! Posso verificar sua agenda. Quer remarcar ou confirmar sua próxima consulta?",
      "Nosso horário de atendimento é de segunda a sábado, das 08h às 20h. Quer que eu já reserve um horário?",
      "Aceitamos Ampla Saúde, MedPlus e Saúde Total. Posso conferir a cobertura do seu plano.",
    ];
    if (VIDA_AI_KEY) console.log("[assistente] usando a chave do servidor — nunca exposta ao navegador");
    return json({ resposta: respostas[Math.floor(Math.random() * respostas.length)] });
  }

  /* ---------------- ESTÁTICO ---------------- */
  let f = p === "/" ? "/index.html" : p;
  if (f === "/paciente" || f === "/area") f = "/paciente.html";
  if (f === "/admin" || f === "/interno") f = "/admin.html";

  // ✅ CORREÇÃO 02: bloqueia dotfiles/backups ANTES de ler.
  if (arquivoBloqueado(f)) {
    return new NextResponse("403 — acesso negado", { status: 403, headers: Object.assign({ "Content-Type": "text/plain; charset=utf-8" }, SEG) });
  }

  try {
    const full = path.join(WWW, f);
    const data = fs.readFileSync(full);
    return new NextResponse(data, {
      status: 200,
      headers: Object.assign({ "Content-Type": MIME[path.extname(full)] || "application/octet-stream" }, SEG),
    });
  } catch {
    return new NextResponse("404 — página não encontrada", { status: 404, headers: Object.assign({ "Content-Type": "text/plain; charset=utf-8" }, SEG) });
  }
}

export async function GET(request) { return handle(request); }
export async function POST(request) { return handle(request); }
export async function HEAD(request) { return handle(request); }
