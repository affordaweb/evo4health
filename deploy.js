#!/usr/bin/env node
/**
 * evo4health GitHub Deploy Script
 * Run: node deploy.js
 * Requires: GITHUB_TOKEN environment variable (or set it below)
 */
const https = require('https')
const { execSync } = require('child_process')
const path = require('path')

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''
const ORG = 'affordaweb'
const REPO = 'evo4health'

if (!GITHUB_TOKEN) {
  console.error('\n❌ GITHUB_TOKEN is required.')
  console.error('   Get one at: https://github.com/settings/tokens/new')
  console.error('   Needs: repo scope')
  console.error('   Then run: set GITHUB_TOKEN=your_token && node deploy.js\n')
  process.exit(1)
}

function apiCall(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null
    const options = {
      hostname: 'api.github.com',
      path,
      method,
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'evo4health-deploy',
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
      },
    }
    const req = https.request(options, (res) => {
      let body = ''
      res.on('data', chunk => body += chunk)
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(body) }) }
        catch { resolve({ status: res.statusCode, data: body }) }
      })
    })
    req.on('error', reject)
    if (data) req.write(data)
    req.end()
  })
}

async function main() {
  const projectDir = __dirname

  console.log('\n🚀 evo4health Deploy Script\n')

  // Step 1: Create GitHub repo
  console.log('📦 Creating GitHub repo affordaweb/evo4health...')
  const createRes = await apiCall('POST', `/orgs/${ORG}/repos`, {
    name: REPO,
    description: 'Evolution Functional Medicine - Next.js + Supabase + Stripe',
    private: false,
    auto_init: false,
  })

  if (createRes.status === 201) {
    console.log('   ✅ Repo created!')
  } else if (createRes.status === 422) {
    console.log('   ℹ️  Repo already exists, continuing...')
  } else {
    console.error('   ❌ Failed to create repo:', createRes.data.message)
    process.exit(1)
  }

  // Step 2: Git init and push
  console.log('\n📤 Pushing code to GitHub...')
  try {
    execSync('git init', { cwd: projectDir, stdio: 'inherit' })
    execSync('git branch -M main', { cwd: projectDir, stdio: 'inherit' })
    execSync('git add .', { cwd: projectDir, stdio: 'inherit' })
    try {
      execSync('git commit -m "Initial commit: evo4health Next.js + Supabase + Stripe\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"', { cwd: projectDir, stdio: 'inherit' })
    } catch {
      console.log('   (nothing new to commit, or already committed)')
    }

    const remoteUrl = `https://${GITHUB_TOKEN}@github.com/${ORG}/${REPO}.git`
    try {
      execSync(`git remote add origin ${remoteUrl}`, { cwd: projectDir, stdio: 'pipe' })
    } catch {
      execSync(`git remote set-url origin ${remoteUrl}`, { cwd: projectDir, stdio: 'pipe' })
    }
    execSync('git push -u origin main --force', { cwd: projectDir, stdio: 'inherit' })
    console.log('   ✅ Code pushed!')
  } catch (err) {
    console.error('   ❌ Git push failed:', err.message)
    process.exit(1)
  }

  console.log('\n✨ Done! Now deploy to Vercel:\n')
  console.log('   1. Go to https://vercel.com/affordawebsolutions-3179s-projects')
  console.log('   2. Click "Add New Project"')
  console.log('   3. Import: affordaweb/evo4health')
  console.log('   4. Framework: Next.js (auto-detected)')
  console.log('   5. Add these environment variables:')
  console.log('      NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co')
  console.log('      NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...')
  console.log('      SUPABASE_SERVICE_ROLE_KEY=eyJ...')
  console.log('      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...')
  console.log('      STRIPE_SECRET_KEY=sk_live_...')
  console.log('      STRIPE_WEBHOOK_SECRET=whsec_...')
  console.log('      NEXT_PUBLIC_BASE_URL=https://evo4health.vercel.app')
  console.log('      NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX (optional)')
  console.log('   6. Click Deploy!\n')
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
