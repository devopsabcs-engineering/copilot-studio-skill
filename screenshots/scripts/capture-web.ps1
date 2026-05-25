# Thin wrapper around `npx playwright test` for the public web projects (en-public, fr-public).
# Captures workshop site + Microsoft Learn pages in both languages.
# Honors BASE_URL env var for the workshop-site spec (defaults to http://localhost:4000).
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = (Resolve-Path "$PSScriptRoot/../..").Path
Push-Location $repoRoot
try {
    & npx playwright test --project=en-public --project=fr-public
    if ($LASTEXITCODE -ne 0) {
        throw "playwright test failed with exit code $LASTEXITCODE."
    }
}
finally {
    Pop-Location
}
