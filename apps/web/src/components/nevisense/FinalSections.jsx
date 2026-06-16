"use client";
import { useState, useEffect, useRef } from "react";
import RevealText, { RevealLine } from "./RevealText";
import ThreeSculpture from "./ThreeSculpture";
import { useScrollReveal } from "./useScrollReveal";
import Modal from "./Modal";

const FONT = "'Inter', system-ui, sans-serif";
const RED = "#C41E3A";

// ─── VISION SECTION ───────────────────────────────────────────────────────────
export function VisionSection() {
  const lines = [
    { text: "A future where mobility assistance", color: "#FFFFFF" },
    {
      text: "does more than help people move.",
      color: "rgba(255,255,255,0.7)",
    },
    {
      text: "A future where movement becomes",
      color: "rgba(255,255,255,0.55)",
    },
    { text: "understanding.", color: "rgba(255,255,255,0.55)" },
    { text: "A future where every journey", color: "rgba(255,255,255,0.4)" },
    { text: "contributes to better health.", color: "rgba(255,255,255,0.4)" },
    { text: "A future where independence", color: "rgba(255,255,255,0.3)" },
    { text: "and intelligence coexist.", color: RED },
  ];

  return (
    <section
      style={{
        backgroundColor: "#080808",
        padding: "clamp(120px, 16vw, 240px) clamp(24px, 8vw, 160px)",
      }}
    >
      <RevealText delay={0}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 80,
          }}
        >
          <div style={{ width: 28, height: 1, backgroundColor: RED }} />
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: RED,
              fontWeight: 500,
              fontFamily: FONT,
            }}
          >
            Vision
          </span>
        </div>
      </RevealText>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {lines.map((line, i) => (
          <RevealLine key={i} delay={i * 0.1}>
            <p
              style={{
                margin: 0,
                padding: "6px 0",
                fontFamily: FONT,
                fontWeight: 200,
                fontSize: "clamp(28px, 4.5vw, 68px)",
                letterSpacing: "-0.03em",
                color: line.color,
                lineHeight: 1.15,
              }}
            >
              {line.text}
            </p>
          </RevealLine>
        ))}
      </div>
    </section>
  );
}

// ─── INVESTOR SECTION ─────────────────────────────────────────────────────────
export function InvestorSection() {
  const [emailValue, setEmailValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [modal, setModal] = useState(null);

  const intersections = [
    "Accessibility",
    "Artificial Intelligence",
    "Digital Biomarkers",
    "Mobility Analytics",
    "Assistive Technology",
  ];

  const btns = [
    { label: "Request Investor Deck", primary: true },
    { label: "Partner With Us", primary: false },
    { label: "Contact Us", primary: false },
  ];

  return (
    <section
      id="investors"
      style={{
        backgroundColor: "#000000",
        padding: "clamp(120px, 16vw, 240px) clamp(24px, 8vw, 160px)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "clamp(60px, 8vw, 120px)",
        }}
      >
        {/* Left */}
        <div>
          <RevealText delay={0}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 56,
              }}
            >
              <div style={{ width: 28, height: 1, backgroundColor: RED }} />
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: RED,
                  fontWeight: 500,
                  fontFamily: FONT,
                }}
              >
                Investors
              </span>
            </div>
          </RevealText>

          <RevealLine delay={0.1}>
            <h2
              style={{
                margin: "0 0 32px 0",
                fontFamily: FONT,
                fontWeight: 200,
                fontSize: "clamp(36px, 5vw, 72px)",
                letterSpacing: "-0.035em",
                color: "#FFFFFF",
                lineHeight: 1.05,
              }}
            >
              Building The Future Of Mobility Intelligence.
            </h2>
          </RevealLine>

          <RevealText delay={0.2}>
            <p
              style={{
                margin: "0 0 48px 0",
                fontSize: 15,
                color: "rgba(255,255,255,0.4)",
                fontFamily: FONT,
                fontWeight: 300,
                lineHeight: 1.75,
              }}
            >
              NeviSense operates at the intersection of accessibility,
              artificial intelligence, and digital biomarker technology —
              creating meaningful impact while unlocking entirely new
              possibilities in human mobility understanding.
            </p>
          </RevealText>

          <RevealText delay={0.3}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {btns.map((btn, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setModal(
                      btn.label === "Request Investor Deck"
                        ? "investor"
                        : btn.label === "Partner With Us"
                          ? "partner"
                          : "contact"
                    )
                  }
                  onMouseEnter={() => setHoveredBtn(i)}
                  onMouseLeave={() => setHoveredBtn(null)}
                  style={{
                    padding: "13px 28px",
                    cursor: "pointer",
                    fontSize: 11,
                    letterSpacing: "0.13em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    fontFamily: FONT,
                    border: "1px solid",
                    borderColor: btn.primary ? RED : "rgba(255,255,255,0.15)",
                    backgroundColor: btn.primary
                      ? hoveredBtn === i
                        ? "#A01530"
                        : RED
                      : hoveredBtn === i
                        ? "rgba(255,255,255,0.05)"
                        : "transparent",
                    color: btn.primary ? "#FFFFFF" : "rgba(255,255,255,0.6)",
                    transition:
                      "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </RevealText>
        </div>

        {/* Right - Intersections */}
        <div>
          <RevealText delay={0.2}>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.25)",
                fontFamily: FONT,
                textTransform: "uppercase",
                marginBottom: 32,
                fontWeight: 500,
              }}
            >
              Operating At The Intersection Of
            </p>
          </RevealText>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {intersections.map((item, i) => (
              <IntersectionRow key={i} label={item} index={i} />
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
          </div>

          {/* Email capture */}
          <RevealText delay={0.6}>
            <div style={{ marginTop: 64 }}>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.35)",
                  fontFamily: FONT,
                  marginBottom: 16,
                  fontWeight: 300,
                  letterSpacing: "0.05em",
                }}
              >
                Stay informed about NeviSense developments
              </p>
              {!submitted ? (
                <div style={{ display: "flex", gap: 0 }}>
                  <input
                    type="email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    placeholder="your@email.com"
                    style={{
                      flex: 1,
                      padding: "13px 20px",
                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRight: "none",
                      color: "#FFFFFF",
                      fontSize: 13,
                      fontFamily: FONT,
                      outline: "none",
                      "::placeholder": { color: "rgba(255,255,255,0.2)" },
                    }}
                  />
                  <button
                    onClick={() => emailValue && setSubmitted(true)}
                    style={{
                      padding: "13px 24px",
                      backgroundColor: RED,
                      color: "#fff",
                      border: "1px solid " + RED,
                      cursor: "pointer",
                      fontSize: 11,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      fontFamily: FONT,
                      fontWeight: 500,
                    }}
                  >
                    Join
                  </button>
                </div>
              ) : (
                <p
                  style={{
                    fontSize: 13,
                    color: RED,
                    fontFamily: FONT,
                    fontWeight: 300,
                  }}
                >
                  ✓ You're on the list. We'll be in touch.
                </p>
              )}
            </div>
          </RevealText>

          {/* Modals */}
          <Modal
            open={modal === "investor"}
            onClose={() => setModal(null)}
            title="Request Investor Deck"
            description="Interested in the investment opportunity? Fill in your details and we'll send the deck to your inbox."
            fields={[
              { name: "name", placeholder: "Full Name", type: "text", required: true },
              { name: "email", placeholder: "Email Address", type: "email", required: true },
              { name: "company", placeholder: "Company / Fund (optional)", type: "text" },
            ]}
            submitLabel="Request Deck"
          />
          <Modal
            open={modal === "partner"}
            onClose={() => setModal(null)}
            title="Partner With Us"
            description="Interested in partnering with NeviSense? Let us know about your organization and how we can collaborate."
            fields={[
              { name: "name", placeholder: "Full Name", type: "text", required: true },
              { name: "email", placeholder: "Email Address", type: "email", required: true },
              { name: "org", placeholder: "Organization", type: "text", required: true },
              { name: "message", placeholder: "How would you like to partner? (optional)", type: "text" },
            ]}
            submitLabel="Submit Interest"
          />
          <Modal
            open={modal === "contact"}
            onClose={() => setModal(null)}
            title="Contact Us"
            description="Have a question or want to learn more? Send us a message and we'll get back to you."
            fields={[
              { name: "name", placeholder: "Full Name", type: "text", required: true },
              { name: "email", placeholder: "Email Address", type: "email", required: true },
              { name: "message", placeholder: "Your Message", type: "text", required: true },
            ]}
            submitLabel="Send Message"
          />
        </div>
      </div>
    </section>
  );
}

function IntersectionRow({ label, index }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "18px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "default",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(-24px)",
        transition: `opacity 0.7s ease ${index * 0.08}s, transform 0.7s cubic-bezier(0.76,0,0.24,1) ${index * 0.08}s`,
      }}
    >
      <span
        style={{
          fontSize: 15,
          fontFamily: FONT,
          fontWeight: 300,
          color: hovered ? "#FFFFFF" : "rgba(255,255,255,0.5)",
          transition: "color 0.2s ease",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 10,
          color: RED,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        →
      </span>
    </div>
  );
}

// ─── FINAL SECTION ────────────────────────────────────────────────────────────
export function FinalSection() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ctaButtons = [
    { label: "Join Waitlist", primary: true },
    { label: "Request Demo", primary: false },
    { label: "Partner With Us", primary: false },
    { label: "Request Investor Deck", primary: false },
  ];

  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [modal, setModal] = useState(null);

  const getModalType = (label) => {
    if (label === "Join Waitlist") return "waitlist";
    if (label === "Request Demo") return "demo";
    if (label === "Partner With Us") return "partner";
    if (label === "Request Investor Deck") return "investor";
    return null;
  };

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        backgroundColor: "#FAFAF9",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        padding: "clamp(100px, 14vw, 200px) clamp(24px, 8vw, 160px)",
      }}
    >
      {/* Returning sculpture */}
      <div
        style={{
          position: "absolute",
          right: "-8%",
          top: "50%",
          transform: `translateY(-50%)`,
          width: "clamp(360px, 52vw, 720px)",
          height: "clamp(360px, 52vw, 720px)",
          opacity: 0.85,
        }}
      >
        <ThreeSculpture scrollY={0} />
      </div>

      {/* Red glow */}
      <div
        style={{
          position: "absolute",
          right: "25%",
          top: "50%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          backgroundColor: "rgba(196,30,58,0.05)",
          filter: "blur(100px)",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 600 }}>
        <RevealText delay={0}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 40,
            }}
          >
            <div style={{ width: 28, height: 1, backgroundColor: RED }} />
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: RED,
                fontWeight: 500,
                fontFamily: FONT,
              }}
            >
              Begin Your Journey
            </span>
          </div>
        </RevealText>

        <h2
          style={{
            margin: "0 0 0 0",
            fontFamily: FONT,
            fontWeight: 100,
            letterSpacing: "-0.05em",
            lineHeight: 0.9,
            overflow: "hidden",
          }}
        >
          {["NEVI", "SENSE"].map((word, wi) => (
            <RevealLine key={wi} delay={wi * 0.15}>
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(72px, 12vw, 160px)",
                  color: "#0A0A0A",
                }}
              >
                {word}
              </span>
            </RevealLine>
          ))}
        </h2>

        <RevealText delay={0.4}>
          <div
            style={{
              marginTop: 48,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {["Mobility.", "Intelligence.", "Insight."].map((t, i) => (
              <p
                key={i}
                style={{
                  margin: 0,
                  fontFamily: FONT,
                  fontWeight: 200,
                  fontSize: "clamp(20px, 2.5vw, 36px)",
                  color: i === 2 ? RED : "#0A0A0A",
                  letterSpacing: "-0.02em",
                }}
              >
                {t}
              </p>
            ))}
          </div>
        </RevealText>

        <RevealText delay={0.55}>
          <p
            style={{
              marginTop: 28,
              fontSize: 14,
              color: "#888",
              fontFamily: FONT,
              fontWeight: 300,
              lineHeight: 1.75,
              maxWidth: 420,
            }}
          >
            Helping people move with confidence while transforming movement into
            meaningful understanding.
          </p>
        </RevealText>

        <RevealText delay={0.7}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 48,
            }}
          >
            {ctaButtons.map((btn, i) => (
              <button
                key={i}
                onClick={() => setModal(getModalType(btn.label))}
                onMouseEnter={() => setHoveredBtn(i)}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  padding: "13px 28px",
                  cursor: "pointer",
                  fontSize: 11,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  fontFamily: FONT,
                  border: "1px solid",
                  borderColor: btn.primary ? RED : "rgba(0,0,0,0.15)",
                  backgroundColor: btn.primary
                    ? hoveredBtn === i
                      ? "#A01530"
                      : RED
                    : hoveredBtn === i
                      ? "rgba(0,0,0,0.04)"
                      : "transparent",
                  color: btn.primary ? "#FFFFFF" : "#0A0A0A",
                  transition:
                    "background-color 0.2s ease, border-color 0.2s ease",
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </RevealText>
      </div>

      {/* Modals */}
      <Modal
        open={modal === "waitlist"}
        onClose={() => setModal(null)}
        title="Join the Waitlist"
        description="Be among the first to experience NeviSense. Sign up to get early access and updates."
        fields={[
          { name: "name", placeholder: "Full Name", type: "text", required: true },
          { name: "email", placeholder: "Email Address", type: "email", required: true },
        ]}
        submitLabel="Join Waitlist"
      />
      <Modal
        open={modal === "demo"}
        onClose={() => setModal(null)}
        title="Request a Demo"
        description="See NeviSense in action. Tell us about yourself and we'll arrange a personalized demo."
        fields={[
          { name: "name", placeholder: "Full Name", type: "text", required: true },
          { name: "email", placeholder: "Email Address", type: "email", required: true },
          { name: "org", placeholder: "Organization (optional)", type: "text" },
        ]}
        submitLabel="Request Demo"
      />
      <Modal
        open={modal === "partner"}
        onClose={() => setModal(null)}
        title="Partner With Us"
        description="Interested in partnering with NeviSense? Let us know about your organization and how we can collaborate."
        fields={[
          { name: "name", placeholder: "Full Name", type: "text", required: true },
          { name: "email", placeholder: "Email Address", type: "email", required: true },
          { name: "org", placeholder: "Organization", type: "text", required: true },
          { name: "message", placeholder: "How would you like to partner? (optional)", type: "text" },
        ]}
        submitLabel="Submit Interest"
      />
      <Modal
        open={modal === "investor"}
        onClose={() => setModal(null)}
        title="Request Investor Deck"
        description="Interested in the investment opportunity? Fill in your details and we'll send the deck to your inbox."
        fields={[
          { name: "name", placeholder: "Full Name", type: "text", required: true },
          { name: "email", placeholder: "Email Address", type: "email", required: true },
          { name: "company", placeholder: "Company / Fund (optional)", type: "text" },
        ]}
        submitLabel="Request Deck"
      />

      {/* Bottom footer bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "24px clamp(24px, 8vw, 160px)",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(250,250,249,0.8)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "#999",
            fontFamily: FONT,
            letterSpacing: "0.1em",
          }}
        >
          © 2026 NeviSense. All rights reserved.
        </span>
        <span
          style={{
            fontSize: 11,
            color: "#999",
            fontFamily: FONT,
            letterSpacing: "0.05em",
          }}
        >
          Mobility Intelligence
        </span>
      </div>
    </section>
  );
}
