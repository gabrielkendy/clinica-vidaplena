@echo off
title RESET do LAB - Clinica VidaPlena (estado VULNERAVEL)
cd /d "%~dp0"
echo ============================================================
echo   RESETANDO O LAB PARA O ESTADO VULNERAVEL
echo   (desfaz tudo que o Cursor/IA mexeu nos arquivos do projeto)
echo ============================================================
echo.
git checkout -- .
git clean -fd
echo.
echo   PRONTO. O lab voltou como estava: as 3 falhas no lugar.
echo   Pode comecar a gravar.
echo.
pause
