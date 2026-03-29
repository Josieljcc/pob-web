# Requer: GitHub CLI instalado e autenticado (`gh auth login`).
# Cria o repositório remoto (se ainda não existir `origin`), envia `main` e `feat/fase-0-fundacao`, e abre o PR.
# Uso (na raiz do repo): .\scripts\publish-pr-fase0.ps1 [-RepoName pob-web] [-Private]

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
  Write-Host 'Executa primeiro: gh auth login' -ForegroundColor Yellow
  exit 1
}

Set-Location (Join-Path $PSScriptRoot '..')

$hasOrigin = git remote get-url origin 2>$null
if (-not $hasOrigin) {
  Write-Host "A criar repositório $RepoName e remote origin..."
  git checkout main
  $createArgs = @(
    'repo', 'create', $RepoName,
    $(if ($Private) { '--private' } else { '--public' }),
    '--source=.',
    '--remote=origin',
    '--push',
    '--description=PoB TypeScript Web (Fase 0)'
  )
  & $gh @createArgs
} else {
  Write-Host 'Remote origin já existe; a enviar main...'
  git checkout main
  git push -u origin main
}

git checkout feat/fase-0-fundacao
git push -u origin feat/fase-0-fundacao

$title = 'feat: Fase 0 — fundação do monorepo (Nx, stack web, ADRs, CI)'
& $gh pr create --base main --head feat/fase-0-fundacao --title $title --body-file .github/PULL_REQUEST_BODY_FASE0.md

Write-Host 'Concluído.' -ForegroundColor Green
