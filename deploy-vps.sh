#!/usr/bin/env bash
# ─── Legit Odds — VPS Deploy Script ───────────────────────────────────────────
# Deploys the backend to 72.60.23.133 alongside existing projects
# Node port : 5007  (confirmed free)
# Nginx port: 8181  (confirmed free)
# PM2 name  : legit-odds-api
# ──────────────────────────────────────────────────────────────────────────────

set -e

VPS_IP="72.60.23.133"
VPS_USER="root"
REPO_URL="https://github.com/junioryakub5/legit-odds.git"   # update if different
APP_DIR="/var/www/legit-odds"
PM2_NAME="legit-odds-api"
NODE_PORT=5007
NGINX_PORT=8181

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  LEGIT ODDS — deploying to $VPS_IP"
echo "  Node: $NODE_PORT  |  Nginx: $NGINX_PORT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ── 1. Upload .env to VPS ─────────────────────────────────────────────────────
echo "→ Uploading backend .env..."
scp backend/.env $VPS_USER@$VPS_IP:$APP_DIR/backend/.env

# ── 2. SSH and deploy ─────────────────────────────────────────────────────────
ssh $VPS_USER@$VPS_IP bash -s << REMOTE

set -e

echo "→ Pulling latest code..."
if [ -d "$APP_DIR" ]; then
  cd $APP_DIR && git pull
else
  git clone $REPO_URL $APP_DIR
fi

echo "→ Installing backend dependencies..."
cd $APP_DIR/backend
npm install --production --silent

echo "→ Installing/updating nginx config..."
cp $APP_DIR/nginx.conf /etc/nginx/sites-available/legit-odds
ln -sf /etc/nginx/sites-available/legit-odds /etc/nginx/sites-enabled/legit-odds
nginx -t && systemctl reload nginx
echo "   nginx reloaded ✓"

echo "→ Starting/restarting PM2 process ($PM2_NAME)..."
if pm2 describe $PM2_NAME > /dev/null 2>&1; then
  pm2 restart $PM2_NAME
else
  pm2 start $APP_DIR/backend/ecosystem.config.js
fi
pm2 save
echo "   PM2 running ✓"

echo "→ Verifying health endpoint..."
sleep 2
curl -s http://127.0.0.1:$NODE_PORT/api/health && echo "" || echo "⚠ Health check failed — check PM2 logs"

REMOTE

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅  Deploy complete!"
echo "  Health: http://$VPS_IP:$NGINX_PORT/api/health"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
