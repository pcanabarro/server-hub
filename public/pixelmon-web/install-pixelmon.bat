@echo off
:: ═══════════════════════════════════════════════════════════
::  Pixelmon 1.21.1 Modpack Installer for Windows
::  Downloads and installs client mods automatically
:: ═══════════════════════════════════════════════════════════
setlocal enabledelayedexpansion

title Pixelmon 1.21.1 — Mod Installer

echo.
echo  ╔══════════════════════════════════════════════════╗
echo  ║     Pixelmon 1.21.1 — Modpack Installer         ║
echo  ║     NeoForge · 42 Mods · Ready to Play          ║
echo  ╚══════════════════════════════════════════════════╝
echo.

:: ── Configuration ──
set "ZIP_URL=https://drive.usercontent.google.com/download?id=16zsKngiMCPcxrWTX42JHa_WSnGYWLXIx&export=download&confirm=t"
set "TEMP_ZIP=%TEMP%\pixelmon-mods-client.zip"
set "TEMP_EXTRACT=%TEMP%\pixelmon-mods-extract"
set "MC_DIR=%APPDATA%\.minecraft"
set "MODS_DIR=%MC_DIR%\mods"
set "NEOFORGE_VERSION=21.1.222"
set "SERVER_IP=tbzz.tech"

:: ── Check .minecraft exists ──
if not exist "%MC_DIR%" (
    echo  [ERROR] .minecraft folder not found at:
    echo          %MC_DIR%
    echo.
    echo  Make sure Minecraft is installed and has been run at least once.
    echo.
    pause
    exit /b 1
)

echo  [OK] Found .minecraft at: %MC_DIR%
echo.

:: ── Backup existing mods if any ──
if exist "%MODS_DIR%\*.jar" (
    echo  [!] Existing mods detected in mods folder.
    echo      Backing them up so they don't conflict...
    echo.

    :: Create backup folder with date
    for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set "DATESTAMP=%%c-%%a-%%b"
    for /f "tokens=1-2 delims=: " %%a in ('time /t') do set "TIMESTAMP=%%a%%b"
    set "BACKUP_DIR=%MC_DIR%\mods-backup-!DATESTAMP!_!TIMESTAMP!"

    mkdir "!BACKUP_DIR!" 2>nul

    echo  [BACKUP] Moving old mods to:
    echo           !BACKUP_DIR!
    echo.

    set /a COUNT=0
    for %%f in ("%MODS_DIR%\*.jar") do (
        move "%%f" "!BACKUP_DIR!\" >nul 2>&1
        set /a COUNT+=1
    )
    echo  [OK] Backed up !COUNT! mod files.
    echo.
) else (
    if not exist "%MODS_DIR%" (
        mkdir "%MODS_DIR%"
        echo  [OK] Created mods folder.
    ) else (
        echo  [OK] Mods folder is clean.
    )
    echo.
)

:: ── Download mods-client.zip ──
echo  [DOWNLOAD] Fetching modpack ZIP...
echo  [INFO] This may take a few minutes depending on your connection.
echo.
if exist "%TEMP_ZIP%" del "%TEMP_ZIP%" 2>nul
where curl >nul 2>&1
if %errorlevel% equ 0 (
    curl -L --fail --retry 3 --retry-delay 5 --connect-timeout 30 --max-time 1800 --progress-bar -o "%TEMP_ZIP%" "%ZIP_URL%"
) else (
    powershell -Command "try { $ProgressPreference='SilentlyContinue'; Invoke-WebRequest -Uri '%ZIP_URL%' -OutFile '%TEMP_ZIP%' -UseBasicParsing -MaximumRedirection 10 -TimeoutSec 1800 -ErrorAction Stop; exit 0 } catch { exit 1 }"
)
if %errorlevel% neq 0 (
    echo  [ERROR] Failed to download the modpack ZIP (request failed or timed out).
    pause
    exit /b 1
)
if not exist "%TEMP_ZIP%" (
    echo  [ERROR] Modpack ZIP was not downloaded.
    pause
    exit /b 1
)
for %%A in ("%TEMP_ZIP%") do set "ZIP_BYTES=%%~zA"
powershell -Command "try { Add-Type -AssemblyName 'System.IO.Compression.FileSystem'; $zip = [System.IO.Compression.ZipFile]::OpenRead('%TEMP_ZIP%'); $zip.Dispose(); exit 0 } catch { exit 1 }" 2>nul
if %errorlevel% neq 0 (
    echo  [ERROR] Downloaded file is not a valid ZIP archive.
    echo          The download link may be invalid or temporarily blocked.
    pause
    exit /b 1
)
echo  [OK] Modpack ZIP downloaded. Size: !ZIP_BYTES! bytes
echo.

:: ── Extract mods to temp and copy jars ──
if exist "%TEMP_EXTRACT%" rmdir /s /q "%TEMP_EXTRACT%" 2>nul
mkdir "%TEMP_EXTRACT%" 2>nul

echo  [INSTALL] Extracting modpack to temp folder...
echo.

powershell -Command "try { Expand-Archive -Path '%TEMP_ZIP%' -DestinationPath '%TEMP_EXTRACT%' -Force -ErrorAction Stop; exit 0 } catch { exit 1 }"
if %errorlevel% neq 0 (
    echo  [ERROR] Extraction failed.
    pause
    exit /b 1
)

set /a COPIED=0
for /r "%TEMP_EXTRACT%" %%f in (*.jar) do (
    copy /Y "%%f" "%MODS_DIR%\" >nul 2>&1
    if not errorlevel 1 set /a COPIED+=1
)

if !COPIED! equ 0 (
    echo  [ERROR] No .jar files were found in the downloaded ZIP.
    echo          ZIP path: %TEMP_ZIP%
    pause
    exit /b 1
)
echo  [OK] Copied !COPIED! mod files to: %MODS_DIR%

:: ── Count installed mods ──
set /a MODCOUNT=0
for %%f in ("%MODS_DIR%\*.jar") do set /a MODCOUNT+=1

echo.
echo  ═══════════════════════════════════════════════════
echo.
echo  ✓ Installation complete!
echo.
echo    Mods installed:  %MODCOUNT%
echo    Location:        %MODS_DIR%
echo.
echo  ── Next Steps ──
echo    1. Open your Minecraft launcher
echo    2. Select the NeoForge 1.21.1 profile
echo    3. Set RAM to at least 6 GB in JVM arguments
echo    4. Launch and connect to: %SERVER_IP%
echo.
echo  ═══════════════════════════════════════════════════
echo.

:: ── Check for NeoForge ──
echo  [CHECK] Checking for NeoForge %NEOFORGE_VERSION%...
for /d %%D in ("%MC_DIR%\versions\*neoforge*%NEOFORGE_VERSION%*") do (
    echo  [OK] NeoForge %NEOFORGE_VERSION% is already installed! Skipping installer.
    echo.
    goto Cleanup
)

:: ── Download & Run NeoForge Installer ──
echo  [DOWNLOAD] Fetching NeoForge Installer (%NEOFORGE_VERSION%)...
echo             A new window will pop up soon!
echo.
set "FORGE_INSTALLER=%TEMP%\neoforge-%NEOFORGE_VERSION%-installer.jar"
powershell -Command "Invoke-WebRequest -Uri 'https://maven.neoforged.net/releases/net/neoforged/neoforge/%NEOFORGE_VERSION%/neoforge-%NEOFORGE_VERSION%-installer.jar' -OutFile '%FORGE_INSTALLER%' -UseBasicParsing" 2>nul

if exist "%FORGE_INSTALLER%" (
    java -version >nul 2>&1
    if !errorlevel! equ 0 (
        start "NeoForge Installer" java -jar "%FORGE_INSTALLER%"
    ) else (
        echo  [WARNING] Java not found in PATH!
        echo            Trying to open the .jar installer implicitly...
        start "" "%FORGE_INSTALLER%"
    )
) else (
    echo  [ERROR] Failed to download the NeoForge installer.
)

:Cleanup
:: ── Cleanup ──
del "%TEMP_ZIP%" 2>nul
if exist "%TEMP_EXTRACT%" rmdir /s /q "%TEMP_EXTRACT%" 2>nul

pause
