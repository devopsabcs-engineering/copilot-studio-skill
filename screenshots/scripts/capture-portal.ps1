# Thin wrapper around `npx playwright test` for the authenticated portal projects
# (en-copilotstudio, fr-copilotstudio). Requires a valid storageState at
# screenshots/.auth/copilotstudio.json — seed it first via:
#   npm run screenshots:seed
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = (Resolve-Path "$PSScriptRoot/../..").Path
$authFile = Join-Path $repoRoot 'screenshots/.auth/copilotstudio.json'
if (-not (Test-Path $authFile)) {
    throw "No portal auth state found at $authFile. Run 'npm run screenshots:seed' first to complete an interactive Entra sign-in."
}

Push-Location $repoRoot
try {
    & npx playwright test --project=en-copilotstudio --project=fr-copilotstudio
    if ($LASTEXITCODE -ne 0) {
        throw "playwright test failed with exit code $LASTEXITCODE."
    }
}
finally {
    Pop-Location
}
