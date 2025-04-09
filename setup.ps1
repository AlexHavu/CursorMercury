# Setup script for Vue Demo Project

Write-Host "Setting up Vue Demo Project..." -ForegroundColor Green

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
npm install

# Setup backend
Write-Host "Setting up backend..." -ForegroundColor Yellow
cd backend
npm install
cd ..

Write-Host "Setup complete!" -ForegroundColor Green
Write-Host "To start the development servers:"
Write-Host "1. Start backend: cd backend; npm run dev"
Write-Host "2. Start frontend: npm run dev" 