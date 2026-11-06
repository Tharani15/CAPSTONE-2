@echo off
echo ========================================================
echo   Starting TaskFlow Frontend (React.js + Vite)
echo ========================================================
echo.
if not exist node_modules (
    echo Installing dependencies...
    npm install
)
echo.
echo Launching development server...
npm run dev
pause

