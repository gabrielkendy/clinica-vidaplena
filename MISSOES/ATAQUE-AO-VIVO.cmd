@echo off
title MODO HACKER - Ataque ao vivo (lab Clinica VidaPlena)
cd /d "%~dp0"
echo.
echo  Subindo o lab (node server.js) em segundo plano...
start /min cmd /c "node server.js"
timeout /t 2 /nobreak >nul
echo.
C:\Python314\python.exe MISSOES\ataque-ao-vivo.py
echo.
pause
