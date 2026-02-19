#!/bin/bash

# ========================================
# Mix Platform Startup Script
# ========================================

echo "🔹 Starting Mix Platform..."

# ---- Navigate to backend ----
if [ -d "backend" ]; then
    cd backend || { echo " Failed to enter backend directory"; exit 1; }
else
    echo " Backend directory not found!"
    exit 1
fi

# ---- Check Python installation ----
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo " Python installed: $PYTHON_VERSION"
else
    echo " Python 3 not installed. Please install Python 3.x to run Mix Platform."
    exit 1
fi

# ---- Check required modules ----
if [ ! -f "requirements.txt" ]; then
    echo " requirements.txt not found in backend"
    exit 1
fi

echo "🔄 Installing required Python packages..."
python3 -m pip install --upgrade pip
python3 -m pip install -r requirements.txt

# ---- Start the backend server ----
echo " Launching Mix backend..."
python3 app.py &

BACKEND_PID=$!
echo " Backend started with PID $BACKEND_PID"

cd ..

# ---- Frontend (PWA) ----
if [ -f "frontend/index.html" ]; then
    echo "🌐 Frontend ready: frontend/index.html"
    echo "You can open this file in a browser or use a local server like 'live-server'."
else
    echo " frontend/index.html not found!"
fi

echo " Mix Platform startup script completed."
echo "🔹 Backend is running. PID: $BACKEND_PID"
