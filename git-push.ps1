param(
    [Parameter(Mandatory = $true)]
    [string]$Message
)

$ErrorActionPreference = 'Stop'
Push-Location $PSScriptRoot
try {
    git rev-parse --show-toplevel *> $null
    if ($LASTEXITCODE -ne 0) {
        throw 'This script must be inside a Git repository.'
    }

    git add --all
    if ($LASTEXITCODE -ne 0) {
        throw 'Could not stage changes.'
    }

    git diff --cached --quiet
    if ($LASTEXITCODE -eq 0) {
        Write-Host 'No changes to commit.'
        exit 0
    }

    Write-Host 'Changes staged for commit:'
    git diff --cached --stat

    $confirmation = Read-Host 'Commit these changes and push to origin on the current branch? (y/N)'
    if ($confirmation -notmatch '^(y|yes)$') {
        Write-Host 'Cancelled. Changes remain staged.'
        exit 0
    }

    git commit -m $Message
    if ($LASTEXITCODE -ne 0) {
        throw 'Commit failed; nothing was pushed.'
    }

    git push origin HEAD
    if ($LASTEXITCODE -ne 0) {
        throw 'Push failed. The commit is saved locally and can be pushed again later.'
    }
}
finally {
    Pop-Location
}
