# -*- coding: utf-8 -*-
"""
🛡️ RETESTE — "tenta invadir de novo" (Clínica VidaPlena · VERSÃO BLINDADA)
Roda os MESMOS 8 ataques do vídeo 1 contra a versão corrigida (porta 3500).
Agora TODOS devem FALHAR. É o momento "na tua frente" do vídeo 2.

Uso:  python 02-BLINDAGEM/reteste.py
(antes: rodar  node 02-BLINDAGEM/server-blindado.js)
"""
import json
import os
import sys
import time
import urllib.request
import urllib.error

# NOTA: os.system("") vazio é o truque padrão para habilitar cores ANSI no
# terminal do Windows (não executa nada; sem risco de injection). Seguro aqui.
os.system("")  # habilita cores ANSI no terminal do Windows (sem risco: comando vazio)

G = "\033[92m"; R = "\033[91m"; Y = "\033[93m"; C = "\033[96m"; W = "\033[97m"
B = "\033[1m"; D = "\033[2m"; X = "\033[0m"
BG = B + G

BASE = "http://localhost:3500"

def slow(t, d=0.012, fim="\n"):
    for ch in t:
        sys.stdout.write(ch); sys.stdout.flush(); time.sleep(d)
    sys.stdout.write(fim)

def req(path, method="GET", data=None):
    r = urllib.request.Request(
        BASE + path, method=method,
        data=json.dumps(data).encode() if data else None,
        headers={"Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(r, timeout=10) as resp:
            return resp.status, resp.read().decode("utf-8", "ignore"), dict(resp.headers)
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", "ignore"), dict(e.headers or {})
    except Exception:
        return 0, "", {}

print()
slow(f"{BG}  ██████  RETESTE  ██████  VERSÃO BLINDADA{X}", 0.008)
slow(f"{W}  A M E S M A S   8   F A L H A S   ·   A G O R A   F E C H A D A S{X}", 0.008)
print()

s, _, _ = req("/")
if s != 200:
    print(f"{R}⚠️  O servidor blindado não está no ar. Rode primeiro:X")
    print(f"{W}    node 02-BLINDAGEM/server-blindado.js{X}")
    sys.exit(2)

resultados = []

def missao(n, nome):
    print(f"{D}{'─' * 64}{X}")
    print(f"{BG}[{n}/8] {nome}{X}")

def verifica(bloqueado, detalhe):
    tag = f"{G}✓ BLOQUEADO{X}" if bloqueado else f"{R}✗ AINDA ABERTO{X}"
    print(f"  {tag}  {C}{detalhe}{X}")
    resultados.append(bloqueado)

time.sleep(0.5)

# 1) IDOR
missao(1, "DADO DE OUTRO PACIENTE (IDOR)")
s, b, _ = req("/api/agendamentos/103?token=tok_mariana_4d1")
verifica(s == 404, f"tentou ler o agendamento 103 (do Bruno) → HTTP {s} (antes: 200 com a ficha do Bruno)")

# 2) .env
missao(2, "ARQUIVO DE SENHAS (.env)")
s, b, _ = req("/.env")
verifica(s == 403, f"pediu o caderno de senhas → HTTP {s} (antes: 200 com as chaves)")

# 3) painel sem porteiro (e o legítimo continua entrando!)
missao(3, "ÁREA INTERNA SEM PORTEIRO")
s_pac, _, _ = req("/api/admin/pacientes?token=tok_mariana_4d1")
s_equipe, _, _ = req("/api/admin/pacientes?token=tok_equipe_000")
verifica(s_pac == 403 and s_equipe == 200,
         f"paciente tentou o painel → HTTP {s_pac} | e a EQUIPE continua entrando → HTTP {s_equipe}")

# 4) código sem limite
missao(4, "CÓDIGO DE ACESSO (FORÇA BRUTA)")
status_final = 0
for i in range(6):
    status_final, _, _ = req("/api/login/codigo", "POST", {"email": "mariana@exemplo.com", "codigo": f"{4790 + i:04d}"})
    time.sleep(0.15)
verifica(status_final == 429, f"6 tentativas erradas seguidas → HTTP {status_final} (antes: infinitas tentativas)")

# 5) exame vira cofre
missao(5, "DOWNLOAD ABRE PASTAS (PATH TRAVERSAL)")
s_hack, _, _ = req("/api/exame?arquivo=../../.env")
s_legit, _, _ = req("/api/exame?arquivo=hemograma-mariana.txt")
verifica(s_hack == 400 and s_legit == 200,
         f"pediu '../../.env' → HTTP {s_hack} | e o exame DE VERDADE continua baixando → HTTP {s_legit}")

# 6) SSRF
missao(6, "FUNÇÃO QUE ESPIA POR DENTRO (SSRF)")
s, _, _ = req("/api/importar-foto", "POST", {"url": "http://localhost:3500/.env"})
verifica(s == 400, f"colou endereço interno no importar foto → HTTP {s} (antes: devolvia o conteúdo)")

# 7) chave no front
missao(7, "CHAVE DE API NO FRONT")
s, b, _ = req("/app.js")
tem_chave = "sk-" in b or "VIDA_AI_KEY" in b
s_ass, b_ass, _ = req("/api/assistente", "POST", {"mensagem": "oi"})
verifica((not tem_chave) and s_ass == 200 and '"resposta"' in b_ass,
         f"o código do site NÃO tem mais chave | e a assistente continua respondendo → HTTP {s_ass}")

# 8) backup + headers
missao(8, "BACKUP EXPOSTO + SERVIDOR TAGARELA")
s, _, _ = req("/backup.sql")
s2, _, h = req("/")
sem_powered = "X-Powered-By" not in h
com_headers = "X-Content-Type-Options" in h and "X-Frame-Options" in h
verifica(s == 403 and sem_powered and com_headers,
         f"backup → HTTP {s} | X-Powered-By sumiu | headers de proteção presentes")

print()
print(f"{G}{B}{'═' * 64}{X}")
fechadas = sum(1 for x in resultados if x)
if fechadas == 8:
    slow(f"{G}{B}  🛡️  8/8 PORTAS FECHADAS — NÃO ENTROU EM NENHUMA{X}", 0.02)
    print(f"{D}  (os mesmos ataques do vídeo 1, agora todos barrados){X}")
else:
    slow(f"{R}{B}  ⚠️  {fechadas}/8 fechadas — ainda tem porta aberta{X}", 0.02)
print(f"{G}{B}{'═' * 64}{X}")
print()
sys.exit(0 if fechadas == 8 else 1)
