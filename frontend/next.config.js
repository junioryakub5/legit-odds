/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Increase body size limit for file uploads proxied through Next.js
  experimental: {
    proxyTimeout: 60000,
  },
  async rewrites() {
    return [
      // Secret path → serves admin page without changing URL to /admin
      {
        source: "/portal",
        destination: "/admin",
      },
      // Proxy backend API calls through Vercel to avoid mixed-content (HTTP→HTTPS) issues.
      // Browser calls /backend/api/* → Vercel server proxies to VPS http://YOUR_VPS_IP:8181/api/*
      // IMPORTANT: Replace YOUR_VPS_IP with your actual VPS IP address before deploying.
      {
        source: "/backend/:path*",
        destination: "http://YOUR_VPS_IP:8181/:path*",
      },
    ];
  },
  async redirects() {
    return [
      // Block direct access to /admin — redirect to home
      {
        source: "/admin",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
