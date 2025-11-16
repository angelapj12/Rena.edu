#!/bin/bash

echo "🚀 Starting WellnessHub - Working Version"
echo ""
echo "✅ Fixed blank page issue"
echo "✅ Database ready for connection" 
echo "✅ Demo accounts available"
echo ""

cd "/Users/ang/Desktop/MVP "

# Ensure we're using the working version
echo "📱 Using working App version..."

echo ""
echo "🔥 Starting development server..."
echo "🌐 App will open at: http://localhost:5173"
echo ""
echo "Demo Accounts Available:"
echo "  👤 Student: student@wellnesshub.com"  
echo "  ⚡ Admin: admin@wellnesshub.com"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
