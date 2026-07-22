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
| Backend hosting | VPS `72.60.23.133` — Node port 5007, nginx port 8181 |
| Process manager | PM2 (`legit-odds-api`) |

## Live URLs

- **Production:** https://legit-odds.vercel.app
- **Admin Panel:** https://legit-odds.vercel.app/portal
- **Backend API:** http://72.60.23.133:8181/api/health

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
PORT=5007
NODE_ENV=production
PAYSTACK_SECRET_KEY=sk_live_...
ADMIN_TOKEN=<generated 64-char hex token>
CLIENT_URL=https://legit-odds.vercel.app
SUPABASE_URL=https://qkllsheuloboziarfgeq.supabase.co
SUPABASE_SERVICE_KEY=eyJ...
SUPABASE_BUCKET=legit-odds-tips
```

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=http://72.60.23.133:8181/api
NEXT_PUBLIC_PAYSTACK_KEY=pk_live_...
```

## Database Setup

1. Supabase project **`legit odds`** (`qkllsheuloboziarfgeq`) — already created
2. Schema already applied — `predictions` and `payments` tables are live
3. Storage bucket `legit-odds-tips` — already created (public)
4. `backend/.env` already configured ✅

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
pm2 restart legit-odds-api
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
| Node.js backend | 5007 |
| Nginx proxy | 8181 |
| Frontend (dev) | 3000 |

Adjust `nginx.conf` and `ecosystem.config.js` if you need different ports.
