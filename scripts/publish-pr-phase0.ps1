# Requires: GitHub CLI (`gh auth login`).
# - No `origin` yet: creates the GitHub repo and pushes the current default branch.
# - `origin` exists: updates `main`, then optionally pushes a feature branch and opens a PR to `main`.
#
# Usage:
#   .\scripts\publish-pr-phase0.ps1 [-RepoName pob-web] [-Private]
#   .\scripts\publish-pr-phase0.ps1 -FeatureBranch feat/my-change [-PrTitle "feat: my change"]
#
# For PR body, edit `.github/PULL_REQUEST_BODY_PHASE0.md` or pass a different template path later.

param(
  [string]$RepoName = 'pob-web',
  [switch]$Private,
  [string]$FeatureBranch = '',
  [string]$PrTitle = 'feat: describe your change',
  [string]$BodyFile = '.github/PULL_REQUEST_BODY_PHASE0.md'
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
    '--description=PoB TypeScript Web'
  )
  & $gh @createArgs
  Write-Host 'Repository created. Default branch on GitHub should be `main` (set under repo Settings if needed).' -ForegroundColor Green
  exit 0
}

Write-Host 'Pushing main...'
git checkout main
git pull origin main
git push -u origin main

if (-not $FeatureBranch) {
  Write-Host 'Done (main only). To open a PR from a feature branch, run again with -FeatureBranch feat/your-branch' -ForegroundColor Cyan
  exit 0
}

git checkout $FeatureBranch
if ($LASTEXITCODE -ne 0) {
  Write-Host "Branch '$FeatureBranch' not found. Create it from main: git checkout -b $FeatureBranch" -ForegroundColor Yellow
  exit 1
}

git push -u origin $FeatureBranch
if (-not (Test-Path $BodyFile)) {
  Write-Host "Body file not found: $BodyFile" -ForegroundColor Yellow
  exit 1
}

& $gh pr create --base main --head $FeatureBranch --title $PrTitle --body-file $BodyFile
Write-Host 'Done.' -ForegroundColor Green
