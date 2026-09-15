# -*- coding: utf-8 -*-
"""Recria a pasta .git fake (FALHA 09) do lab — o git não trackeia diretório .git aninhado,
então o `git clean -fd` do RESET apaga; este script restaura na hora.
A pasta no deploy fica em 'gitrepo' (a Vercel não sobe pastas chamadas '.git'); o
route.js serve '/.git/*' a partir dela."""
import io
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GIT = os.path.join(BASE, "online", "assets", "gitrepo")

os.makedirs(os.path.join(GIT, "logs"), exist_ok=True)

CONFIG = """[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
[remote "origin"]
	url = https://github.com/gabrielkendy/clinica-vidaplena.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "main"]
	remote = origin
	merge = refs/heads/main
"""

HEAD = "ref: refs/heads/main\n"

LOGS_HEAD = (
    "0000000000000000000000000000000000000000 4b98bf7102a1b3c4d5e6f7a8b9c0d1e2f3a4b5c6 VidaPlena Dev <dev@vidaplena.local> 1726000000 +0000\tcommit (initial): primeira versão do site da clínica\n"
    "4b98bf7102a1b3c4d5e6f7a8b9c0d1e2f3a4b5c6 7c2e9f1d8a3b6c5e4f7d2a9b0c1e3f5d6a8b4 VidaPlena Dev <dev@vidaplena.local> 1726100000 +0000\tcommit: adiciona assistente virtual (VIDA_AI_KEY no app.js)\n"
    "7c2e9f1d8a3b6c5e4f7d2a9b0c1e3f5d6a8b4 9d1f4e7c2b8a5d3f6e9c0b2a7d4f1e6c8b5a0 VidaPlena Dev <dev@vidaplena.local> 1726200000 +0000\tcommit: remove a VIDA_AI_KEY do app.js (segurança!)\n"
)

io.open(os.path.join(GIT, "config"), "w", encoding="utf-8", newline="").write(CONFIG)
io.open(os.path.join(GIT, "HEAD"), "w", encoding="utf-8", newline="").write(HEAD)
io.open(os.path.join(GIT, "logs", "HEAD"), "w", encoding="utf-8", newline="").write(LOGS_HEAD)
print("pasta .git fake recriada (FALHA 09) em online/assets/.git")
