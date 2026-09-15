@echo off
title RESET do LAB - Clinica VidaPlena (estado VULNERAVEL no AR)
cd /d "%~dp0"
echo ============================================================
echo   RESETANDO O LAB PARA O ESTADO VULNERAVEL
echo   1) desfaz tudo que o Cursor/IA mexeu nos arquivos
echo   2) republica o site no ar (uns 40 segundos)
echo ============================================================
echo.
git checkout -- .
git clean -fd
echo.
echo   recriando a pasta .git (falha 9 do lab)...
python MISSOES\recria-git.py
echo.
echo   [1/2] arquivos restaurados para o estado com as falhas.
echo   [2/2] publicando o site no ar...
echo.
cd online
call npx vercel --prod --yes
cd ..
echo.
echo   PRONTO: lab restaurado E site no ar no estado vulneravel.
echo   Pode gravar.
echo.
pause
