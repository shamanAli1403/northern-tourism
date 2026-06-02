# Run from project folder after Git is installed:
#   powershell -ExecutionPolicy Bypass -File .\push-to-github.ps1

$ErrorActionPreference = "Stop"
$repoUrl = "https://github.com/shamanAli1403/northern-tourism.git"

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "Git is not installed. Install from https://git-scm.com/download/win then reopen PowerShell."
}

Set-Location $PSScriptRoot

if (-not (Test-Path .git)) {
    git init -b main
}

git add .
git status

$hasCommits = git rev-parse HEAD 2>$null
if (-not $hasCommits) {
    git commit -m "Initial commit: Northern tourism static site"
}

$remotes = git remote
if ($remotes -notcontains "origin") {
    git remote add origin $repoUrl
} else {
    git remote set-url origin $repoUrl
}

Write-Host "Pushing to $repoUrl ..."
git push -u origin main

Write-Host "Done."
