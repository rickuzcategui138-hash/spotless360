# =============================================================================
#  Spotless360 — FTP deploy to cPanel (no GitHub involved)
#
#  Usage:   .\deploy.ps1 -FtpHost ftp.spotless360ga.com -User your@user
#
#  Add -WhatIf to list exactly what WOULD be uploaded without touching
#  the server. Run that first.
#
#  Type the password once and never again:
#     .\deploy.ps1 -FtpHost ... -User ... -SaveCredential
#  It is encrypted with Windows DPAPI, tied to THIS Windows account on THIS
#  machine — no other user or machine can read the file, and the password is
#  never in plain text anywhere. Later runs pick it up automatically.
#  Wipe it any time with -ForgetCredential.
# =============================================================================

[CmdletBinding(SupportsShouldProcess = $true)]
param(
    [Parameter(Mandatory = $true)][string]$FtpHost,
    [Parameter(Mandatory = $true)][string]$User,
    [string]$RemoteDir = '/public_html',
    # Explicit FTPS (AUTH TLS). Plain FTP sends the password in the clear on
    # every run, so only pass -NoTls if the host genuinely has no TLS.
    [switch]$NoTls,
    [switch]$SaveCredential,
    [switch]$ForgetCredential,
    # Connect and list $RemoteDir, then stop. Use this to find out where the
    # FTP account actually drops you before writing anything.
    [switch]$ListRemote
)

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot

# --- What must NEVER reach the public server ---------------------------------
# .git would expose the whole repo history over the web; the .md files are
# internal project notes; the .mov files are 67 MB of HEVC that browsers
# largely cannot play anyway.
$excludeDirs  = @('.git', '.github', '.claude', 'node_modules')
$excludeFiles = @('*.md', '.gitignore', 'deploy.ps1', 'review-*.mov', '*.log')

function Should-Skip([System.IO.FileInfo]$file) {
    $rel = $file.FullName.Substring($root.Length).TrimStart('\', '/')
    foreach ($d in $excludeDirs) {
        if ($rel -like "$d\*" -or $rel -eq $d) { return $true }
    }
    foreach ($p in $excludeFiles) {
        if ($file.Name -like $p) { return $true }
    }
    return $false
}

# --- Collect the payload ------------------------------------------------------
$files = Get-ChildItem -Path $root -Recurse -File | Where-Object { -not (Should-Skip $_) }

if (-not $files) { throw 'Nothing to upload — is deploy.ps1 sitting in the site folder?' }

$totalKb = [math]::Round(($files | Measure-Object -Property Length -Sum).Sum / 1KB)
Write-Host ''
Write-Host "Site folder : $root"
Write-Host "Files       : $($files.Count)  ($totalKb KB)"
Write-Host "Target      : ftp$(if(-not $NoTls){'s'})://$FtpHost$RemoteDir"
Write-Host ''

if ($WhatIfPreference) {
    $files | ForEach-Object {
        $rel = $_.FullName.Substring($root.Length).TrimStart('\', '/') -replace '\\', '/'
        Write-Host ("  would upload  {0,-42} {1,7} KB" -f $rel, [math]::Round($_.Length / 1KB))
    }
    Write-Host ''
    Write-Host 'Dry run only — nothing was sent. Re-run without -WhatIf to deploy.'
    return
}

# --- Credentials --------------------------------------------------------------
# Stored outside the site folder on purpose: nothing here can be swept into a
# commit or picked up by the deploy walk above.
$credDir  = Join-Path $env:LOCALAPPDATA 'spotless360'
$credFile = Join-Path $credDir ("ftp-{0}.cred.xml" -f ($FtpHost -replace '[^\w.-]', '_'))

if ($ForgetCredential) {
    if (Test-Path $credFile) { Remove-Item $credFile -Force; Write-Host "Saved credential deleted: $credFile" }
    else { Write-Host 'No saved credential to delete.' }
    return
}

$cred = $null
if (Test-Path $credFile) {
    try {
        $cred = Import-Clixml $credFile
        Write-Host "Using saved credential for $($cred.UserName)  (-ForgetCredential to remove)"
    } catch {
        Write-Host "Saved credential unreadable, asking again: $($_.Exception.Message)"
    }
}

if (-not $cred) {
    # Read-Host, not Get-Credential: the latter pops a Windows dialog that
    # opens *behind* the console window, so the script looks hung. This prompts
    # inline and still keeps the password as a SecureString.
    Write-Host "Password for FTP user '$User' on $FtpHost" -ForegroundColor Cyan
    Write-Host '(typing is hidden — paste with right-click, then press Enter)'
    $secure = Read-Host -Prompt 'Password' -AsSecureString
    if ($secure.Length -eq 0) { throw 'No password entered.' }
    $cred = New-Object System.Management.Automation.PSCredential($User, $secure)
}

if ($SaveCredential) {
    if (-not (Test-Path $credDir)) { New-Item -ItemType Directory -Path $credDir -Force | Out-Null }
    # Export-Clixml encrypts the SecureString via DPAPI for the current user.
    $cred | Export-Clixml -Path $credFile
    Write-Host "Credential saved (DPAPI, this Windows account only): $credFile"
}

$netCred = New-Object System.Net.NetworkCredential($cred.UserName, $cred.GetNetworkCredential().Password)

if ($ListRemote) {
    Write-Host ''
    Write-Host "Listing ftp://$FtpHost$RemoteDir" -ForegroundColor Cyan
    $req = [System.Net.FtpWebRequest]::Create("ftp://$FtpHost$RemoteDir/")
    $req.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectoryDetails
    $req.Credentials = $netCred
    $req.EnableSsl = -not $NoTls
    $req.UsePassive = $true
    $resp = $req.GetResponse()
    $reader = New-Object System.IO.StreamReader($resp.GetResponseStream())
    $lines = $reader.ReadToEnd() -split "`n" | Where-Object { $_.Trim() }
    $reader.Close(); $resp.Close()
    if (-not $lines) { Write-Host '  (empty directory)' }
    else { $lines | ForEach-Object { Write-Host "  $_" } }
    Write-Host ''
    Write-Host 'If you see index.html / assets here, this IS the site root: deploy with -RemoteDir /'
    Write-Host 'If you see a public_html folder here, keep the default -RemoteDir /public_html'
    return
}

$madeDirs = New-Object System.Collections.Generic.HashSet[string]

function Ensure-RemoteDir([string]$dir) {
    if ([string]::IsNullOrWhiteSpace($dir) -or $madeDirs.Contains($dir)) { return }
    # Walk parents first, so assets/sub/deep works from a clean server.
    $parent = $dir.Substring(0, [Math]::Max(0, $dir.LastIndexOf('/')))
    if ($parent) { Ensure-RemoteDir $parent }
    try {
        $req = [System.Net.FtpWebRequest]::Create("ftp://$FtpHost$RemoteDir/$dir")
        $req.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
        $req.Credentials = $netCred
        $req.EnableSsl = -not $NoTls
        $req.UsePassive = $true
        $req.KeepAlive = $false
        $req.GetResponse().Close()
        Write-Host "  mkdir  $dir"
    } catch {
        # 550 = already exists, which is the normal case on re-deploys.
    }
    [void]$madeDirs.Add($dir)
}

$ok = 0; $failed = @()

foreach ($f in $files) {
    $rel = ($f.FullName.Substring($root.Length).TrimStart('\', '/')) -replace '\\', '/'
    $dir = if ($rel.Contains('/')) { $rel.Substring(0, $rel.LastIndexOf('/')) } else { '' }
    if ($dir) { Ensure-RemoteDir $dir }

    # Over FTPS the server drops pooled control connections part-way through a
    # run, which surfaces as "(451) Local error in processing" on roughly every
    # third file. KeepAlive=$false forces a fresh connection per file, and the
    # retries mop up whatever still trips.
    $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
    $sent = $false
    $lastErr = $null

    for ($try = 1; $try -le 4 -and -not $sent; $try++) {
        try {
            $req = [System.Net.FtpWebRequest]::Create("ftp://$FtpHost$RemoteDir/$rel")
            $req.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
            $req.Credentials = $netCred
            $req.EnableSsl = -not $NoTls
            $req.UsePassive = $true
            $req.UseBinary = $true
            $req.KeepAlive = $false
            $req.Timeout = 120000
            $req.ReadWriteTimeout = 120000
            $req.ContentLength = $bytes.Length

            $stream = $req.GetRequestStream()
            $stream.Write($bytes, 0, $bytes.Length)
            $stream.Close()
            $resp = $req.GetResponse(); $resp.Close()
            $sent = $true
        } catch {
            $lastErr = $_.Exception.Message
            if ($try -lt 4) { Start-Sleep -Milliseconds (400 * $try) }
        }
    }

    if ($sent) {
        $ok++
        $note = if ($try -gt 2) { "  (retry $($try - 1))" } else { '' }
        Write-Host ("  sent   {0,-42} {1,7} KB{2}" -f $rel, [math]::Round($f.Length / 1KB), $note)
    } else {
        $failed += $rel
        Write-Host ("  FAIL   {0}  -> {1}" -f $rel, $lastErr) -ForegroundColor Red
    }
}

Write-Host ''
Write-Host "Uploaded $ok of $($files.Count) files."
if ($failed.Count) {
    Write-Host "Failed:" -ForegroundColor Red
    $failed | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
    exit 1
}
Write-Host 'Done.'
