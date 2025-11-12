# Automatic Vercel Deployment Setup

## ✅ Current Status
Your repository is connected to Vercel, but automatic deployments might not be working due to configuration issues.

## 🔧 Manual Setup Steps

### 1. Check Vercel Dashboard Settings
1. Go to [your Vercel project](https://vercel.com/aditya-arakals-projects/expense-manager)
2. Click on **Settings** tab
3. Go to **Git** section
4. Ensure **Production Branch** is set to `main`
5. Ensure **Auto-Deploy** is enabled

### 2. Verify Build Settings
In Vercel dashboard, go to **Settings** → **General**:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node.js Version**: 18.x

### 3. Test Automatic Deployment
1. Make a small change to your code
2. Commit and push to main branch:
   ```bash
   git add .
   git commit -m "test: trigger automatic deployment"
   git push origin main
   ```
3. Check Vercel dashboard for new deployment

### 4. Manual Deployment (If Needed)
If automatic deployment doesn't work:
1. Go to Vercel dashboard
2. Click **Deployments** tab
3. Click **Redeploy** on the latest deployment
4. Or click **Deploy** button to trigger new deployment

## 🚀 Expected Behavior
- Every push to `main` branch should trigger automatic deployment
- You should see new deployments in Vercel dashboard
- Your site should update automatically

## 🔍 Troubleshooting
- **No automatic deployment**: Check Git settings in Vercel
- **Build fails**: Check build logs in Vercel dashboard
- **Site not updating**: Manually redeploy from dashboard

## 📱 Your Site Should Show
- Purple gradient background
- "Expense Manager" logo
- "Coming Soon" title
- 3 feature cards
- "Deployed on Vercel" in footer
