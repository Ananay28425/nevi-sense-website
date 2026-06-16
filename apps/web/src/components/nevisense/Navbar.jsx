"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: "0 clamp(24px, 5vw, 80px)",
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: scrolled ? "rgba(250,250,249,0.92)" : "transparent",
    backdropFilter: scrolled ? "blur(16px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
    transition:
      "background-color 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease",
  };

  const linkStyle = {
    fontSize: 12,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: scrolled ? "#1A1A1A" : "#1A1A1A",
    textDecoration: "none",
    fontWeight: 500,
    fontFamily: "'Inter', system-ui, sans-serif",
    opacity: 0.7,
    transition: "opacity 0.2s ease",
  };

  const ctaStyle = {
    fontSize: 11,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#FFFFFF",
    backgroundColor: "#C41E3A",
    padding: "9px 20px",
    borderRadius: 2,
    textDecoration: "none",
    fontWeight: 500,
    fontFamily: "'Inter', system-ui, sans-serif",
    transition: "background-color 0.2s ease",
  };

  return (
    <>
      <nav style={navStyle}>
        <a
          href="#"
          style={{
            fontSize: 13,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#0A0A0A",
            textDecoration: "none",
            fontWeight: 600,
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          NeviSense
        </a>
        <div
          style={{ display: "flex", gap: 40, alignItems: "center" }}
          className="hidden md:flex"
        >
          <a
            href="#about"
            style={linkStyle}
            onMouseEnter={(e) => (e.target.style.opacity = 1)}
            onMouseLeave={(e) => (e.target.style.opacity = 0.7)}
          >
            About
          </a>
          <a
            href="#features"
            style={linkStyle}
            onMouseEnter={(e) => (e.target.style.opacity = 1)}
            onMouseLeave={(e) => (e.target.style.opacity = 0.7)}
          >
            Platform
          </a>
          <a
            href="#biomarkers"
            style={linkStyle}
            onMouseEnter={(e) => (e.target.style.opacity = 1)}
            onMouseLeave={(e) => (e.target.style.opacity = 0.7)}
          >
            Biomarkers
          </a>
          <a
            href="#investors"
            style={linkStyle}
            onMouseEnter={(e) => (e.target.style.opacity = 1)}
            onMouseLeave={(e) => (e.target.style.opacity = 0.7)}
          >
            Investors
          </a>
          <a href="#investors" style={ctaStyle}>
            Join Waitlist
          </a>
        </div>
        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
          }}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span
            style={{
              display: "block",
              width: 22,
              height: 1,
              backgroundColor: "#0A0A0A",
              transition: "transform 0.3s ease",
              transform: menuOpen
                ? "rotate(45deg) translate(1.5px, 1.5px)"
                : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 1,
              backgroundColor: "#0A0A0A",
              opacity: menuOpen ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 1,
              backgroundColor: "#0A0A0A",
              transition: "transform 0.3s ease",
              transform: menuOpen
                ? "rotate(-45deg) translate(1.5px, -1.5px)"
                : "none",
            }}
          />
        </button>
      </nav>
      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            zIndex: 99,
            backgroundColor: "rgba(250,250,249,0.97)",
            backdropFilter: "blur(20px)",
            padding: "32px clamp(24px, 5vw, 80px)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          {["About", "Platform", "Biomarkers", "Investors"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: 22,
                fontWeight: 300,
                color: "#0A0A0A",
                textDecoration: "none",
                letterSpacing: "-0.02em",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              {item}
            </a>
          ))}
          <a
            href="#investors"
            onClick={() => setMenuOpen(false)}
            style={{ ...ctaStyle, alignSelf: "flex-start", marginTop: 8 }}
          >
            Join Waitlist
          </a>
        </div>
      )}
    </>
  );
}
