@echo off
title SIMULACAO DE ATAQUES - Clinica VidaPlena (lab)
cd /d "%~dp0"
echo.
echo  Subindo o lab (node server.js) em segundo plano...
start /min cmd /c "node server.js"
timeout /t 2 /nobreak >nul
echo  Rodando a simulacao...
echo.
C:\Python314\python.exe MISSOES\simular-ataques.py
echo.
pause
