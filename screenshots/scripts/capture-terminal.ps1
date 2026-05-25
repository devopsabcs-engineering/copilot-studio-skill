# Renders committed text transcripts under screenshots/transcripts/ into PNGs
# under images/lab-NN/ via charmbracelet/freeze.
#
# Idempotent: a transcript is rendered only when no output exists or the source
# .txt is newer than the existing .png. Filenames must match lab-NN-<descriptor>.txt;
# the lab number drives the output directory (images/lab-NN/).
#
# This script does NOT write into screenshots/final/. Terminal stills go straight
# into images/lab-NN/ (they are deterministic re-renders of committed text fixtures
# and need no promote step).
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = (Resolve-Path "$PSScriptRoot/../..").Path
$transcriptsDir = Join-Path $repoRoot 'screenshots/transcripts'

if (-not (Test-Path $transcriptsDir)) {
    Write-Host "No transcripts directory at $transcriptsDir. Nothing to render."
    return
}

# Soft-fail if freeze is missing — capture-terminal is opt-in tooling; web/portal capture
# still works without it. The error message tells the operator how to install freeze.
$freezeCmd = Get-Command freeze -ErrorAction SilentlyContinue
if ($null -eq $freezeCmd) {
    Write-Warning "freeze is not on PATH. Install via 'winget install charmbracelet.freeze' or 'go install github.com/charmbracelet/freeze@latest'."
    Write-Warning "Skipping terminal capture. Existing PNGs under images/lab-NN/ are left untouched."
    return
}

$transcripts = Get-ChildItem -Path $transcriptsDir -Filter '*.txt' -File -ErrorAction SilentlyContinue
if ($null -eq $transcripts -or $transcripts.Count -eq 0) {
    Write-Host "No .txt transcripts found in $transcriptsDir. Nothing to render."
    return
}

$rendered = 0
$skipped = 0
foreach ($transcript in $transcripts) {
    $name = [System.IO.Path]::GetFileNameWithoutExtension($transcript.Name)
    if ($name -notmatch '^lab-(\d{2})-(.+)$') {
        Write-Warning "Skipping $($transcript.Name): does not match lab-NN-<descriptor>.txt pattern."
        continue
    }
    $labDir = "lab-$($Matches[1])"
    $outDir = Join-Path $repoRoot "images/$labDir"
    $outFile = Join-Path $outDir "$name.png"

    if (-not (Test-Path $outDir)) {
        New-Item -ItemType Directory -Path $outDir -Force | Out-Null
    }

    if ((Test-Path $outFile) -and ((Get-Item $outFile).LastWriteTime -ge $transcript.LastWriteTime)) {
        Write-Host "Skipping $name — $outFile is up to date."
        $skipped++
        continue
    }

    Write-Host "Rendering $($transcript.Name) → $outFile"
    & freeze $transcript.FullName `
        --theme dracula `
        --window `
        --border.radius 8 `
        --shadow.blur 20 `
        --shadow.y 10 `
        --padding "20,40" `
        --font.family "Cascadia Code" `
        --font.size 14 `
        --output $outFile
    if ($LASTEXITCODE -ne 0) {
        throw "freeze failed for $($transcript.FullName) with exit code $LASTEXITCODE."
    }
    $rendered++
}

Write-Host "Done. Rendered $rendered transcript(s); skipped $skipped (already up to date)."
