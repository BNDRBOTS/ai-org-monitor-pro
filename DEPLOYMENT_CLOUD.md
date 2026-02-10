# Cloud Deployment Instructions

## ✅ Deploy to Vercel (Frontend) + Render (Backend)

### Step 1: Deploy Backend to Render.com

1. Go to [render.com](https://render.com) and sign in with GitHub
2. Click **New +** → **Blueprint**
3. Connect your GitHub repo: `BNDRBOTS/ai-org-monitor-pro`
4. Render will auto-detect `render.yaml` and create:
   - PostgreSQL database (free)
   - Redis instance (free)
   - Python backend service (free)
5. Click **Apply** - deployment takes ~5 minutes
6. Copy your backend URL (e.g., `https://ai-monitor-api.onrender.com`)

### Step 2: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New Project**
3. Import `BNDRBOTS/ai-org-monitor-pro`
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Add Environment Variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: Your Render backend URL (from Step 1)
6. Click **Deploy** - takes ~2 minutes
7. Your app will be live at: `https://ai-org-monitor-pro.vercel.app`

### Step 3: Add API Keys to Render

1. Go to Render dashboard → your backend service
2. Click **Environment** tab
3. Add:
   - `NEWS_API_KEY`: your NewsAPI key
   - `TWITTER_API_KEY`: your Twitter API key
   - `REDDIT_API_KEY`: your Reddit API key
4. Save changes (service will auto-redeploy)

### Step 4: Verify Deployment

```bash
# Check backend health
curl https://ai-monitor-api.onrender.com/health

# Check frontend
open https://ai-org-monitor-pro.vercel.app
```

## 🚀 Benefits of This Setup

- **Zero local resources** - runs entirely in the cloud
- **Free tier** - PostgreSQL + Redis + hosting all free
- **Auto-deploys** - push to GitHub = automatic deployment
- **SSL included** - HTTPS out of the box
- **Global CDN** - Vercel edge network for fast loading
- **Auto-scaling** - handles traffic spikes automatically

## 🔧 Alternative: Railway.app (All-in-One)

1. Go to [railway.app](https://railway.app)
2. Click **Deploy from GitHub**
3. Select `BNDRBOTS/ai-org-monitor-pro`
4. Railway auto-detects and deploys both frontend + backend
5. Add environment variables in dashboard
6. Done - your app is live!

## 📊 Cost Breakdown

### Render.com Free Tier:
- PostgreSQL: 1GB storage
- Redis: 25MB storage
- Backend: 512MB RAM, sleeps after 15min inactivity
- **Cost**: $0/month

### Vercel Free Tier:
- 100GB bandwidth/month
- Unlimited sites
- Global CDN
- **Cost**: $0/month

### Paid Upgrades (Optional):
- Render: $7/month (no sleep, more resources)
- Vercel: $20/month (more bandwidth, analytics)

## ⚡ Quick Deploy Links

- **Render**: https://dashboard.render.com/blueprints
- **Vercel**: https://vercel.com/new
- **Railway**: https://railway.app/new

No Docker. No local server. Just cloud hosting.
