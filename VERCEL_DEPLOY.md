# AffiliateHub — Frontend-Only Vercel Deployment Guide

## Project Structure

```
/
├── frontend/              # React app (CRA + Craco)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── vercel.json            # Vercel deployment config
└── VERCEL_DEPLOY.md       # This file
```

## How It Works

- **Frontend**: React (CRA) is built by Vercel and served as static files
- **No backend/API**: This project is now frontend-only

## Deployment Steps

1. Push code to GitHub.
2. Import project in Vercel.
3. Keep root directory as `/`.
4. Deploy using `vercel.json` build settings.

## Verify

- Visit `https://your-project.vercel.app` — Frontend should load.
- Navigate through sections and test the contact form UX.

## Notes

- Contact form submission is handled client-side for demo UX.
- If you need production form handling later, integrate a frontend service (e.g., Formspree) or add a new backend separately.
