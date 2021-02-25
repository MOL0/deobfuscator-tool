@echo off
chcp 65001 > nul
title deobfuscator tool v1.0 by molo (beta)
set file=

set /p file=Entrez le nom du fichier à désobfusquer : %=%
cls

node code "%file%"
pause > nul