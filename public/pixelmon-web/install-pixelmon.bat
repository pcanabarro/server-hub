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
set "ZIP_NAME=mods-client.zip"
set "MC_DIR=%APPDATA%\.minecraft"
set "MODS_DIR=%MC_DIR%\mods"
set "NEOFORGE_VERSION=21.11.42"
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

:: ── Use local mods-client.zip ──
if not exist "%ZIP_NAME%" (
    echo  [ERROR] %ZIP_NAME% was not found in the current folder.
    echo          Please place %ZIP_NAME% next to this script and try again.
    echo.
    pause
    exit /b 1
)

echo  [INFO] Local %ZIP_NAME% found. Preparing for extraction...
echo.
set "TEMP_ZIP=%TEMP%\pixelmon-mods-client.zip"
copy /Y "%ZIP_NAME%" "%TEMP_ZIP%" >nul

:: ── Extract mods ──
echo  [INSTALL] Extracting mods to: %MODS_DIR%
echo.

powershell -Command "Expand-Archive -Path '%TEMP_ZIP%' -DestinationPath '%MODS_DIR%' -Force"
if %errorlevel% neq 0 (
    echo  [ERROR] Extraction failed.
    pause
    exit /b 1
)
echo  [OK] Mods extracted successfully.

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

pause
