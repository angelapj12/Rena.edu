#!/bin/bash

echo "🔧 Fixing Tailwind CSS configuration..."

# Navigate to project directory
cd "/Users/ang/Desktop/MVP "

echo "📦 Installing stable Tailwind CSS version..."
npm install tailwindcss@^3.4.0 autoprefixer postcss --save-dev --silent

echo "🚀 Starting WellnessHub..."
echo ""
echo "Your app is now running at:"
echo "👉 http://localhost:5173"
echo ""
echo "✅ Tailwind CSS issue has been fixed!"
echo "Press Ctrl+C to stop the server"
echo "================================"

npm run dev
