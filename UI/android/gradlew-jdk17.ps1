param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]] $GradleArguments
)

$ErrorActionPreference = 'Stop'
$jdkCandidates = @()
if ($env:JAVA_HOME) { $jdkCandidates += $env:JAVA_HOME }
$jdkCandidates += Get-ChildItem 'C:\Program Files\Eclipse Adoptium' -Directory -Filter 'jdk-17*' -ErrorAction SilentlyContinue |
    Sort-Object Name -Descending |
    Select-Object -ExpandProperty FullName

$jdkHome = $null
foreach ($candidate in $jdkCandidates) {
    $javaPath = Join-Path $candidate 'bin\java.exe'
    if (-not (Test-Path $javaPath)) { continue }
    $javaVersion = (& $javaPath -version 2>&1 | Out-String)
    if ($javaVersion -match 'version "17\.') {
        $jdkHome = $candidate
        break
    }
}
if (-not $jdkHome) { throw 'JDK 17 was not found. Set JAVA_HOME to a JDK 17 folder or install JDK 17.' }

$env:JAVA_HOME = $jdkHome
$env:Path = "$(Join-Path $jdkHome 'bin');$env:Path"
if (-not $env:ANDROID_HOME) {
    $defaultSdk = Join-Path $env:LOCALAPPDATA 'Android\Sdk'
    if (Test-Path $defaultSdk) { $env:ANDROID_HOME = $defaultSdk }
}

& (Join-Path $PSScriptRoot 'gradlew.bat') @GradleArguments
exit $LASTEXITCODE
