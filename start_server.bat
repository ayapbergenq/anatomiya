@echo off
echo Starting local server...
start http://localhost:8080/
C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
pause
