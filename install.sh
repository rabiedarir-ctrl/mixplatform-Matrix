#!/bin/bash
# Mix Platform - Automated Installation
# Version: 1.0.0
# Author: rabiedarir-ctrl
# Description: Complete setup and installation

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Functions
print_header() {
    echo ""
    echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║${NC} $1"
    echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
    echo ""
}

print_step() {
    echo -e "${YELLOW}[Step $1]${NC} $2"
}

print_success() {
    echo -e "${GREEN} $1${NC}"
}

print_error() {
    echo -e "${RED}$1${NC}"
}

print_info() {
    echo -e "${BLUE}$1${NC}"
}

# Main installation
main() {
    print_header "Mix Platform - Complete Installation Setup"

    # Step 1: Check Prerequisites
    print_step "1" "Checking Prerequisites..."
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        echo "Please download from: https://nodejs.org/"
        exit 1
    fi
    print_success "Node.js $(node -v)"
    print_success "npm $(npm -v)"

    # Step 2: Verify Repository
    print_step "2" "Verifying Repository..."
    if [ ! -f "package.json" ]; then
        print_error "This is not a Mix Platform repository"
        exit 1
    fi
    print_success "Repository verified"

    # Step 3: Install Dependencies
    print_step "3" "Installing Dependencies..."
    npm install
    print_success "Dependencies installed"

    # Step 4: Setup Environment
    print_step "4" "Setting Up Environment..."
    if [ ! -f ".env" ]; then
        if [ -f ".env.example" ]; then
            cp .env.example .env
            print_success ".env created from .env.example"
        else
            cat > .env << EOF
PORT=3000
SECRET_KEY=mix-platform-secret-key-2026
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/mixplatform
CORS_ORIGIN=http://localhost:3000
API_BASE_URL=http://localhost:3000
EOF
            print_success ".env file created with default values"
        fi
    else
        print_info ".env file already exists"
    fi

    # Step 5: Create Directories
    print_step "5" "Creating Required Directories..."
    mkdir -p storage logs public data
    print_success "Directories created"

    # Step 6: Verification
    print_step "6" "Verifying Installation..."
    FILES=("package.json" "server.js" ".env" "index.html")
    for file in "${FILES[@]}"; do
        if [ -f "$file" ]; then
            print_success "$file exists"
        else
            print_error "$file missing"
        fi
    done

    # Final Summary
    print_header "Installation Complete!"
    
    echo -e "${GREEN} Mix Platform is ready to run!${NC}"
    echo ""
    echo -e "${YELLOW} Quick Start:${NC}"
    echo ""
    echo "   1. Start the server:"
    echo -e "      ${BLUE}npm start${NC}"
    echo ""
    echo "   2. Access the application:"
    echo -e "      ${BLUE}http://localhost:3000${NC}"
    echo ""
    echo "   3. Login page:"
    echo -e "      ${BLUE}http://localhost:3000/login.html${NC}"
    echo ""
    echo -e "${YELLOW} Docker Usage:${NC}"
    echo ""
    echo "   Single container:"
    echo -e "      ${BLUE}docker build -t mixplatform .${NC}"
    echo -e "      ${BLUE}docker run -p 3000:3000 mixplatform${NC}"
    echo ""
    echo "   Multi-container with MongoDB:"
    echo -e "      ${BLUE}docker-compose up -d${NC}"
    echo ""
    echo -e "${YELLOW} Documentation:${NC}"
    echo "   - API URLs: COMPLETE_URLS.md"
    echo "   - User Guide: USER_GUIDE.md"
    echo "   - README: README.md"
    echo ""
    echo -e "${YELLOW} API Endpoints:${NC}"
    echo "   - Health: GET /health"
    echo "   - Register: POST /api/auth/register"
    echo "   - Login: POST /api/auth/login"
    echo "   - Social: GET/POST /api/social"
    echo "   - Store: GET/POST /api/store"
    echo "   - Wallet: GET /api/wallet, POST /api/wallet/add"
    echo "   - Games: GET/POST /api/games"
    echo "   - Metaverse: GET/POST /api/metaverse"
    echo "   - Matrix: GET/POST /api/matrix"
    echo ""
    print_header "Setup Complete! Happy Coding! "
}

# Run main function
main "$@"
