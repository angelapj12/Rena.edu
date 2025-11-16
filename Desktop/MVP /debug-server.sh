#!/bin/bash

echo "=== Wellness Hub Debug Script ==="
echo "Date: $(date)"
echo "PWD: $(pwd)"
echo ""

echo "1. Checking Node.js installation..."
node --version || echo "❌ Node.js not found"
npm --version || echo "❌ npm not found"
echo ""

echo "2. Checking project files..."
ls -la package.json 2>/dev/null && echo "✅ package.json found" || echo "❌ package.json missing"
ls -la src/main.tsx 2>/dev/null && echo "✅ main.tsx found" || echo "❌ main.tsx missing"
ls -la src/App-working.tsx 2>/dev/null && echo "✅ App-working.tsx found" || echo "❌ App-working.tsx missing"
echo ""

echo "3. Checking dependencies..."
ls -la node_modules 2>/dev/null && echo "✅ node_modules exists" || echo "❌ node_modules missing - run npm install"
echo ""

echo "4. Checking ports..."
lsof -i :5173 2>/dev/null && echo "⚠️  Port 5173 is busy" || echo "✅ Port 5173 is free"
lsof -i :3000 2>/dev/null && echo "⚠️  Port 3000 is busy" || echo "✅ Port 3000 is free"
echo ""

echo "5. Starting development server..."
echo "Running: npm run dev"
npm run dev
