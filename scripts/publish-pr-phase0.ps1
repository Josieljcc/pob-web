# Requires: GitHub CLI installed and authenticated (`gh auth login`).
# Creates the remote repo (if `origin` is missing), pushes `main` and `feat/phase-0-foundation`, and opens the PR.
# Usage (repo root): .\scripts\publish-pr-phase0.ps1 [-RepoName pob-web] [-Private]

param(
  [string]$RepoName = 'pob-web',
  [switch]$Private
)

$ErrorActionPreference = 'Stop'
$gh = 'C:\Program Files\GitHub CLI\gh.exe'
if (-not (Test-Path $gh)) {
  $gh = 'gh'
}

& $gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host 'Run first: gh auth login' -ForegroundColor Yellow
  exit 1
}

Set-Location (Join-Path $PSScriptRoot '..')

$hasOrigin = git remote get-url origin 2>$null
if (-not $hasOrigin) {
  Write-Host "Creating repository $RepoName and origin remote..."
  git checkout main
  $createArgs = @(
    'repo', 'create', $RepoName,
    $(if ($Private) { '--private' } else { '--public' }),
    '--source=.',
    '--remote=origin',
    '--push',
    '--description=PoB TypeScript Web (Phase 0)'
  )
  & $gh @createArgs
} else {
  Write-Host 'Remote origin exists; pushing main...'
  git checkout main
  git push -u origin main
}

git checkout feat/phase-0-foundation
git push -u origin feat/phase-0-foundation

$title = 'feat: Phase 0 — monorepo foundation (Nx, web stack, ADRs, CI)'
& $gh pr create --base main --head feat/phase-0-foundation --title $title --body-file .github/PULL_REQUEST_BODY_PHASE0.md

Write-Host 'Done.' -ForegroundColor Green
