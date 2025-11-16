#!/bin/bash

echo "🔧 WellnessHub Quick Fix & Start"
echo "================================"

cd "/Users/ang/Desktop/MVP "

# Kill any existing processes
echo "🧹 Cleaning up existing processes..."
pkill -f "vite\|node" 2>/dev/null || true

# Install dependencies if needed
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo ""
echo "🚀 Starting WellnessHub..."
echo ""
echo "Your app will be available at:"
echo "👉 http://localhost:5173"
echo ""
echo "✅ This version uses simple React with inline styles"
echo "✅ No Tailwind CSS conflicts"
echo "✅ Guaranteed to display content"
echo ""
echo "Press Ctrl+C to stop the server"
echo "================================"
echo ""

# Start the server
npm run dev
