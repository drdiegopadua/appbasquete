#!/bin/bash
REPO_URL="https://github.com/drdiegopadua/basquete-app.git"

echo "🚀 Iniciando deploy da Supercopa..."

if [ ! -d ".git" ]; then
  git init
  git remote add origin $REPO_URL
fi

git add .
git commit -m "Update: Supercopa PWA $(date '+%d/%m/%Y %H:%M')"
git branch -M main
git push -u origin main --force

echo ""
echo "✅ Deploy concluído!"
echo "🌐 Acesse: https://drdiegopadua.github.io/basquete-app/"
echo ""
echo "Se for a primeira vez, ative o GitHub Pages:"
echo "→ Settings → Pages → Branch: main → / (root) → Save"
