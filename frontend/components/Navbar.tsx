"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Trophy } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/history", label: "History" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(5,10,24,0.88)",
        backdropFilter: "saturate(180%) blur(24px)",
        WebkitBackdropFilter: "saturate(180%) blur(24px)",
        borderBottom: "1px solid rgba(245,158,11,0.1)",
      }}
    >
      {/* Gold top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.5) 30%, rgba(251,191,36,0.9) 50%, rgba(245,158,11,0.5) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="page-container">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 overflow-hidden"
              style={{
                background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.3)",
                boxShadow: "0 0 14px rgba(245,158,11,0.15)",
              }}
            >
              <Image src="/logo.png" alt="Legit Odds" width={36} height={36} className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="flex flex-col leading-none">
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
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}

            {/* Admin CTA pill */}
            <Link
              href="/portal"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "#0a0500",
                boxShadow: "0 4px 14px rgba(245,158,11,0.35)",
                letterSpacing: "0.04em",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              <Trophy size={11} />
              Admin
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-xl transition-all duration-200"
            style={{
              color: "#94a3b8",
              background: "rgba(245,158,11,0.06)",
              border: "1px solid rgba(245,158,11,0.15)",
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          background: "#070d1c",
          borderTop: "1px solid rgba(245,158,11,0.1)",
        }}
      >
        <div className="page-container py-5 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link text-base py-2 ${pathname === link.href ? "active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 pb-1">
            <Link
              href="/portal"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "#0a0500",
                boxShadow: "0 4px 14px rgba(245,158,11,0.3)",
                letterSpacing: "0.04em",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              <Trophy size={11} />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
