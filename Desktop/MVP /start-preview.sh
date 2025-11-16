#!/bin/bash

echo "🧘‍♀️ Starting WellnessHub Preview..."
echo "================================"
echo ""

# Navigate to project directory
cd "/Users/ang/Desktop/MVP "

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in the correct directory"
    echo "Please run this from /Users/ang/Desktop/MVP"
    exit 1
fi

echo "✅ Found WellnessHub project"
echo "📦 Installing any missing dependencies..."

# Install dependencies
npm install --silent

echo "🚀 Starting development server..."
echo ""
echo "Your app will be available at:"
echo "👉 http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop the server when you're done"
echo "================================"

# Start the development server
npm run dev
