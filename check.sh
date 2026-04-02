#!/bin/bash

# 🔹 Mix Platform Full Structure & Environment Checker

echo "🔹 Checking Mix Platform structure..."

# List of essential backend & core files
FILES=(
    "mix.config.json"
    "backend/app.py"
    "backend/core/memory.py"
    "backend/core/auth.py"
    "backend/core/self_heal.py"
    "backend/api/health.py"
    "frontend/index.html"
    "frontend/manifest.json"
    "frontend/static/main.js"
    "frontend/static/style.css"
    "scripts/start.sh"
    "scripts/check.sh"
)

# Check essential files
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo " ✅ Found $file"
    else
        echo " ⚠️ Missing $file — please check your Mix repository"
    fi
done

# List of frontend page JS and CSS files
FRONTEND_FILES=(
    "pages/dashboard.css"
    "pages/home.css"
    "pages/metaverse.css"
    "pages/media.css"
    "pages/manager.css"
    "pages/bitcoin.css"
    "pages/gps.css"
    "pages/matrix.css"
    "pages/social.css"
    "pages/games.css"
    "pages/dashboard.js"
    "pages/home.js"
    "pages/metaverse.js"
    "pages/media.js"
    "pages/manager.js"
    "pages/bitcoin.js"
    "pages/gps.js"
    "pages/matrix.js"
    "pages/social.js"
    "pages/games.js"
)

# Check frontend JS & CSS files
for file in "${FRONTEND_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo " ✅ Found $file"
    else
        echo " ⚠️ Missing $file — check frontend pages"
    fi
done

# Check Python installation
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo " 🐍 Python installed: $PYTHON_VERSION"
else
    echo " ❌ Python 3 not installed — install Python 3.x to continue"
fi

# Check backend syntax
echo " 🔹 Testing backend syntax..."
if [ -f "backend/app.py" ]; then
    cd backend || exit
    python3 -m py_compile app.py
    if [ $? -eq 0 ]; then
        echo " ✅ app.py syntax OK"
    else
        echo " ⚠️ app.py has syntax errors — fix before running Mix"
    fi
    cd ..
else
    echo " ⚠️ backend/app.py not found"
fi

# Check frontend PWA
if [ -f "frontend/index.html" ]; then
    echo " ✅ frontend/index.html exists — ready for PWA"
else
    echo " ⚠️ frontend/index.html missing"
fi

# Check mix.config.json validity
if [ -f "mix.config.json" ]; then
    python3 -c "import json; json.load(open('mix.config.json'))" &> /dev/null
    if [ $? -eq 0 ]; then
        echo " ✅ mix.config.json is valid JSON"
    else
        echo " ⚠️ mix.config.json has invalid JSON"
    fi
else
    echo " ⚠️ mix.config.json not found"
fi

echo "🔹 Mix structure check completed."
echo "You can now run scripts/start.sh to launch Mix Platform."
