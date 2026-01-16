#!/bin/bash
# Fix macOS permission issues with Next.js
# Run this script with: bash fix-permissions.sh

echo "Fixing Next.js permission issues..."

# Remove extended attributes from Next.js
echo "Removing extended attributes..."
sudo xattr -rc node_modules/next 2>/dev/null || xattr -rc node_modules/next 2>/dev/null

# Fix file permissions
echo "Fixing file permissions..."
find node_modules/next -type f -exec chmod 644 {} \; 2>/dev/null

# Clear Next.js cache
echo "Clearing Next.js cache..."
rm -rf .next

echo "Done! Now run: npm run dev"
