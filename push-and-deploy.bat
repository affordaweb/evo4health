@echo off
echo ========================================
echo  evo4health - GitHub Push + Vercel Deploy
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] Checking git...
git --version
if errorlevel 1 (
  echo ERROR: git not found. Install Git from https://git-scm.com
  pause
  exit /b 1
)

echo [2/5] Initializing git repo...
git init
git branch -M main

echo [3/5] Adding all files...
git add .
git commit -m "Initial commit: evo4health Next.js + Supabase + Stripe

- Next.js 14 App Router + TypeScript + Tailwind CSS
- Supabase auth + database with RLS
- Stripe payment integration
- Admin dashboard (product/order management)
- User account + order tracking
- Cal.com discovery call scheduling
- SEO optimized (sitemap, robots, LocalBusiness schema)
- AffordaWeb contact form API integration

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

echo [4/5] Creating GitHub repo and pushing...
echo.
echo Option A: Using GitHub CLI (gh)
gh repo create affordaweb/evo4health --public --source=. --remote=origin --push 2>nul

if errorlevel 1 (
  echo GitHub CLI not found or failed. Trying manual push...
  echo.
  echo Option B: Manual push
  echo  Make sure you've created the repo at: https://github.com/new
  echo  Repo name: evo4health  Owner: affordaweb
  echo.
  git remote add origin https://github.com/affordaweb/evo4health.git 2>nul
  git push -u origin main
)

echo.
echo [5/5] Done! Next steps:
echo   1. Go to https://vercel.com/affordawebsolutions-3179s-projects
echo   2. Click "Add New Project"  
echo   3. Import affordaweb/evo4health from GitHub
echo   4. Set environment variables (see .env.local.example)
echo   5. Deploy!
echo.
pause
