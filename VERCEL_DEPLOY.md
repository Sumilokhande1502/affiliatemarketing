# AffiliateHub — Vercel Deployment Guide

## Project Structure for Vercel

```
/
├── api/
│   └── index.py           # FastAPI serverless function (Python)
├── frontend/              # React app (CRA + Craco)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── vercel.json            # Vercel deployment config
├── requirements.txt       # Python dependencies for serverless functions
└── VERCEL_DEPLOY.md       # This file
```

## How It Works

- **Frontend**: React (CRA) is built by Vercel and served as static files
- **Backend**: FastAPI runs as a Python serverless function under `/api/*`
- **Database**: MongoDB Atlas (cloud) — you must use a cloud MongoDB URL
- **Email**: SendGrid for contact form emails

## Deployment Steps

### 1. Push Code to GitHub
Push this entire project to your GitHub repository.

### 2. Create MongoDB Atlas Cluster (Free Tier)
1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free M0 cluster
3. Create a database user with read/write access
4. Whitelist `0.0.0.0/0` for network access (or Vercel's IPs)
5. Copy the connection string: `mongodb+srv://user:pass@cluster.mongodb.net/affiliatehub`

### 3. Import Project in Vercel
1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. **Root Directory**: Leave as `/` (project root)
4. **Framework Preset**: Select `Other`
5. Vercel will auto-detect the `vercel.json` configuration

### 4. Set Environment Variables in Vercel Dashboard
Go to **Project Settings → Environment Variables** and add:

| Variable | Value | Required |
|----------|-------|----------|
| `MONGO_URL` | `mongodb+srv://user:pass@cluster.mongodb.net/affiliatehub` | Yes |
| `DB_NAME` | `affiliatehub` | Yes |
| `SENDGRID_API_KEY` | Your SendGrid API key | Yes (for emails) |
| `SENDER_EMAIL` | Your verified SendGrid sender email | Yes (for emails) |
| `RECIPIENT_EMAIL` | Email to receive contact form messages | Yes (for emails) |
| `CORS_ORIGINS` | `*` or your Vercel domain | Optional |
| `REACT_APP_BACKEND_URL` | *(leave empty)* | Optional |

> **Important**: `REACT_APP_BACKEND_URL` should be left **empty** or not set. On Vercel, the frontend and API are on the same domain, so API calls go to `/api/contact` directly.

### 5. Deploy
Click **Deploy**. Vercel will:
- Install frontend dependencies (`yarn install`)
- Build the React app (`yarn build`)
- Deploy the Python serverless function from `api/index.py`
- Set up routing per `vercel.json`

### 6. Verify
- Visit `https://your-project.vercel.app` — Frontend should load
- Visit `https://your-project.vercel.app/api/health` — Should return `{"status":"healthy"}`
- Test the contact form

## Architecture Difference: Emergent vs Vercel

| Feature | Emergent (Dev) | Vercel (Production) |
|---------|---------------|-------------------|
| Backend | FastAPI + Motor (async) | FastAPI serverless + PyMongo (sync) |
| MongoDB | Local `localhost:27017` | MongoDB Atlas (cloud) |
| Server | Always-on (uvicorn) | Serverless (cold starts) |
| Files | `backend/server.py` | `api/index.py` |

## Troubleshooting

- **500 errors on API**: Check Vercel Function Logs in dashboard
- **MongoDB connection fails**: Verify Atlas connection string and network whitelist
- **Frontend can't reach API**: Ensure `REACT_APP_BACKEND_URL` is empty (not the Emergent URL)
- **Build fails**: Check that `frontend/yarn.lock` is committed
- **SendGrid errors**: Verify API key and sender email are verified in SendGrid
