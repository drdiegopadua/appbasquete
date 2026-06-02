@echo off
set REPO_URL=https://github.com/drdiegopadua/basquete-app.git

echo 🚀 Iniciando deploy da Supercopa...

if not exist .git (
    git init
    git remote add origin %REPO_URL%
)

git add .
git commit -m "Update: Supercopa PWA"
git branch -M main
git push -u origin main --force

echo.
echo ✅ Deploy concluido!
echo 🌐 Acesse: https://drdiegopadua.github.io/basquete-app/
echo.
echo Se for a primeira vez, ative o GitHub Pages:
echo -- Settings - Pages - Branch: main - / (root) - Save
pause
