"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-12 text-center overflow-hidden"
      style={{
        background: "#09090b",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        isolation: "auto",
      }}
    >
      {/* Top radial glow */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-40"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(245,158,11,0.06), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Glow line at the top edge */}
      <div className="glow-line absolute top-0 left-0 right-0" aria-hidden="true" />

      <div className="page-container relative z-10">

        {/* Brand */}
        <div className="flex items-center justify-center gap-2.5 mb-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
            style={{
              background: "rgba(245,158,11,0.10)",
              border: "1px solid rgba(245,158,11,0.22)",
              boxShadow: "0 0 12px rgba(245,158,11,0.10)",
            }}
          >
            <Image src="/logo.png" alt="Legit Odds" width={32} height={32} className="w-full h-full object-cover rounded-full" />
          </div>
          <span
            className="font-display font-bold tracking-tight leading-none"
            style={{ fontSize: "1.1rem", letterSpacing: "-0.02em", color: "#f4f4f5" }}
          >
            LEGIT
            <span
              style={{
                background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginLeft: "0.22rem",
              }}
            >
              ODDS
            </span>
          </span>
        </div>

        {/* Tagline */}
        <p className="text-sm mb-6" style={{ color: "#a1a1aa" }}>
          Premium football predictions for serious bettors
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
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
              className="text-xs font-medium transition-colors duration-200 hover:text-[#f59e0b]"
              style={{ color: "#52525b" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div
          className="mx-auto mb-5"
          style={{
            width: "60px",
            height: "1px",
            background: "rgba(255,255,255,0.06)",
          }}
          aria-hidden="true"
        />

        {/* Copyright */}
        <p className="text-xs mb-1.5" style={{ color: "#52525b" }}>
          © {year} Legit Odds. All rights reserved.
        </p>

        {/* Disclaimer */}
        <p className="text-xs" style={{ color: "#52525b" }}>
          Bet responsibly.{" "}
          <span style={{ color: "#a1a1aa" }}>18+ only.</span>
        </p>
      </div>
    </footer>
  );
}
