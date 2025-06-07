#!/bin/bash

# GoDaddy Deployment Script for React Resume Builder
echo "🚀 Starting GoDaddy deployment process..."

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 2: Build for production
echo "🏗️  Building for production..."
npm run build:prod

# Check if build was successful
if [ ! -d "build" ]; then
    echo "❌ Build failed! Please check for errors and try again."
    exit 1
fi

echo "✅ Build completed successfully!"
echo ""
echo "📋 Next steps for GoDaddy deployment:"
echo "1. Log into your GoDaddy cPanel"
echo "2. Open File Manager"
echo "3. Go to Settings and enable 'Show Hidden Files'"
echo "4. Navigate to public_html folder"
echo "5. Delete existing files (backup first if needed)"
echo "6. Upload ALL contents from the 'build' folder (not the folder itself)"
echo "7. Create .htaccess file with the provided content"
echo "8. Test your site at your domain"
echo ""
echo "📁 Files to upload from build folder:"
find build -type f -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.json" -o -name "*.ico" -o -name "*.png" -o -name "*.svg" | head -10
echo "   ... and all other files in the build directory"
echo ""
echo "🔧 Remember to:"
echo "   - Update homepage in package.json with your actual domain"
echo "   - Update REACT_APP_API_URL in .env.production"
echo "   - Create .htaccess file in public_html"
echo "   - Test all routes after deployment"
echo ""
echo "🎉 Your React Resume Builder is ready for GoDaddy deployment!"