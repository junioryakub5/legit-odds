"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-14 text-center overflow-hidden"
      style={{
        background: "#050a18",
        borderTop: "1px solid rgba(245,158,11,0.1)",
        position: "relative",
      }}
    >
      {/* Top radial glow */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-48"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(245,158,11,0.05), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Glow line at the top edge */}
      <div className="glow-line absolute top-0 left-0 right-0" aria-hidden="true" />

      <div className="page-container relative z-10">

        {/* Brand */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
            style={{
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.22)",
              boxShadow: "0 0 12px rgba(245,158,11,0.1)",
            }}
          >
            <Image src="/logo.png" alt="Legit Odds" width={36} height={36} className="w-full h-full object-cover rounded-xl" />
          </div>
          <div className="flex flex-col leading-none text-left">
            <span
              className="font-display font-black tracking-tight"
              style={{ fontSize: "1.05rem", letterSpacing: "-0.02em", color: "#f8fafc" }}
            >
              LEGIT
              <span
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginLeft: "0.25rem",
                }}
              >
                ODDS
              </span>
            </span>
            <span style={{ fontSize: "0.55rem", color: "#475569", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>
              Premium Tips
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sm mb-8" style={{ color: "#475569" }}>
          Premium football predictions for serious bettors
        </p>

        <style>{`
          .footer-link { color: #475569; transition: color 0.2s; font-size: 0.75rem; font-weight: 500; text-decoration: none; }
          .footer-link:hover { color: #f59e0b; }
        `}</style>
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
          {[
            { href: "/", label: "Home" },
            { href: "/history", label: "History" },
            { href: "/about", label: "About" },
            { href: "/faq", label: "FAQ" },
            { href: "/terms", label: "Terms of Service" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="footer-link"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div
          className="mx-auto mb-6"
          style={{
            width: "60px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)",
          }}
          aria-hidden="true"
        />

        {/* Copyright */}
        <p className="text-xs mb-1.5" style={{ color: "#334155" }}>
          © {year} Legit Odds. All rights reserved.
        </p>

        {/* Disclaimer */}
        <p className="text-xs" style={{ color: "#334155" }}>
          Bet responsibly.{" "}
          <span style={{ color: "#475569" }}>18+ only.</span>
        </p>
      </div>
    </footer>
  );
}
