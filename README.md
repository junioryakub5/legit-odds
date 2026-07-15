# Legit Odds

Premium football predictions platform. Users pay to unlock expert betting tips with verified results.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | Node.js, Express |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage (`legit-odds-tips` bucket) |
| Payments | Paystack (Ghana/GHS) |
| Frontend hosting | Vercel |
| Backend hosting | VPS — port 8181, nginx on port 8181 |
| Process manager | PM2 (`legitodds-api`) |

## Live URLs

- **Production:** https://YOUR_VERCEL_URL.vercel.app
- **Admin Panel:** https://YOUR_VERCEL_URL.vercel.app/portal
- **Backend API:** http://YOUR_VPS_IP:8181/api/health

> Replace `YOUR_VERCEL_URL` and `YOUR_VPS_IP` with your actual values once deployed.

## Local Development

```bash
# Start everything (backend + frontend + Cloudflare tunnels)
./start.sh
```

Or manually:

```bash
# Backend (port 8181)
cd backend && node server.js

# Frontend (port 3000)
cd frontend && npm run dev
```

## Environment Variables

### Backend (`backend/.env`)
```
PORT=8181
NODE_ENV=production
PAYSTACK_SECRET_KEY=sk_live_...
ADMIN_TOKEN=<generated 64-char hex token>
CLIENT_URL=https://YOUR_VERCEL_URL.vercel.app
SUPABASE_URL=https://YOUR_SUPABASE_REF.supabase.co
SUPABASE_SERVICE_KEY=eyJ...
SUPABASE_BUCKET=legit-odds-tips
```

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=http://YOUR_VPS_IP:8181/api
NEXT_PUBLIC_PAYSTACK_KEY=pk_live_...
```

## Database Setup

1. Create a new Supabase project at https://supabase.com
2. Run the SQL in `backend/supabase-schema.sql` in the Supabase SQL Editor
3. Create a **public** storage bucket named `legit-odds-tips`
4. Update `backend/.env` with the new `SUPABASE_URL` and `SUPABASE_SERVICE_KEY`

## VPS Deployment

```bash
# SSH to your VPS
ssh root@YOUR_VPS_IP

# Clone the repository
git clone https://github.com/YOUR_GITHUB_USERNAME/legit-odds.git /var/www/legit-odds

# Install dependencies
cd /var/www/legit-odds/backend && npm install --production

# Copy your .env file to the server
# scp backend/.env root@YOUR_VPS_IP:/var/www/legit-odds/backend/.env

# Start with PM2
pm2 start /var/www/legit-odds/backend/ecosystem.config.js
pm2 save && pm2 startup
```

### Update Existing Deployment
```bash
cd /var/www/legit-odds && git pull
cd backend && npm install --production
pm2 restart legitodds-api
```

## Paystack Webhook

Register this URL in your Paystack dashboard:
```
https://YOUR_VERCEL_URL.vercel.app/api/payment/webhook
```

## Admin Access

Go to `/portal` and enter your `ADMIN_TOKEN` to access the dashboard.

> **Security:** The admin token is stored in `backend/.env`. Never commit this file.
> Generate a new token with: `openssl rand -hex 32`

## Port Configuration

This project runs on the following ports to avoid conflicts:

| Service | Port |
|---------|------|
| Node.js backend | 8181 |
| Nginx proxy | 8181 |
| Frontend (dev) | 3000 |

Adjust `nginx.conf` and `ecosystem.config.js` if you need different ports.
