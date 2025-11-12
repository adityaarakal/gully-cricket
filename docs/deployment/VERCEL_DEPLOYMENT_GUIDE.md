# Vercel Deployment Guide

## Manual Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Import from GitHub: `adityaarakal/expense-manager`
   - Select the repository

3. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at: `https://expense-manager-[random].vercel.app`

### Option 2: Fix CLI Permissions

1. **Check Vercel Account**
   - Ensure you're logged into the correct Vercel account
   - Verify team permissions

2. **Try Different Account**
   ```bash
   npx vercel logout
   npx vercel login
   npx vercel --prod --yes
   ```

### Option 3: Deploy via GitHub Integration

1. **Connect Repository**
   - In Vercel dashboard, go to "Projects"
   - Click "New Project"
   - Connect your GitHub repository

2. **Automatic Deployments**
   - Every push to `main` will trigger automatic deployment
   - Custom domain can be added later

## Current Configuration

### Files Ready for Deployment:
- ✅ `vercel.json` - Vercel configuration
- ✅ `package.json` - Build scripts
- ✅ `vite.config.ts` - Build settings
- ✅ Coming Soon Page - Ready to deploy

### Build Settings:
- **Framework**: Vite + React
- **Node Version**: 18
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## Expected URLs:
- **Preview**: `https://expense-manager-[hash].vercel.app`
- **Production**: `https://expense-manager.vercel.app` (if custom domain set)

## Troubleshooting:
- **Permission Issues**: Use Vercel dashboard instead of CLI
- **Build Errors**: Check TypeScript errors locally first
- **Domain Issues**: Verify vercel.json configuration
