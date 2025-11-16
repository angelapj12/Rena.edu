#!/bin/bash

echo "🚀 Starting Wellness Hub Development Server..."
echo "📍 Current directory: $(pwd)"

# Kill any existing processes
echo "🔪 Killing existing processes..."
pkill -f "vite" 2>/dev/null || true
pkill -f "npm.*dev" 2>/dev/null || true

# Clear cache
echo "🧹 Clearing cache..."
rm -rf node_modules/.vite 2>/dev/null || true
rm -rf dist 2>/dev/null || true

# Check Node version
echo "📋 Node version: $(node --version 2>/dev/null || echo 'Node not found')"

# Start server with explicit configuration
echo "🌟 Starting Vite server..."
npx vite --port 3000 --host 127.0.0.1 --open false --clearScreen false

echo "✅ If successful, visit: http://localhost:3000/db-explorer"
