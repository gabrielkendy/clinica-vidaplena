import sys, json, urllib.request, os
sys.path.insert(0, r"C:\Users\Gabriel\AppData\Local\hermes\hermes-agent")
from agent.auxiliary_client import _read_codex_access_token, _codex_cloudflare_headers

tok = _read_codex_access_token()
if not tok:
    print("SEM TOKEN")
    sys.exit(2)
h = {"Accept": "text/event-stream", "Authorization": f"Bearer {tok}", "Content-Type": "application/json"}
h.update(_codex_cloudflare_headers(tok))
body = {"model": "gpt-5.5", "store": False, "instructions": "Reply OK.",
        "input": [{"type": "message", "role": "user", "content": [{"type": "input_text", "text": "Reply OK"}]}],
        "stream": True}
req = urllib.request.Request("https://chatgpt.com/backend-api/codex/responses",
                            data=json.dumps(body).encode(), headers=h, method="POST")
try:
    r = urllib.request.urlopen(req, timeout=60)
    print("HTTP", r.status, "-> conta OK (sem 429 no recurso texto)")
except urllib.error.HTTPError as e:
    raw = e.read().decode("utf-8", "replace")
    print("HTTP", e.code, raw[:800])
except Exception as e:
    print("EXC", type(e).__name__, e)
