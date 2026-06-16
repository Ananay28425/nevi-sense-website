"use client";
import { useEffect, useState, useRef } from "react";
import ThreeSculpture from "./ThreeSculpture";
import Modal from "./Modal";

const SCULPTURE_IMG =
  "https://raw.createusercontent.com/2e16d1f1-5c86-4605-a032-585eac31d365/";

export default function HeroSection({ scrollY }) {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const parallaxY = scrollY * 0.35;
  const opacityFade = Math.max(0, 1 - scrollY / 600);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 700,
        backgroundColor: "#FAFAF9",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          opacity: 0.6,
          transform: `translateY(${parallaxY * 0.5}px)`,
        }}
      />

      {/* Sculpture - 3D Möbius strip */}
      <div
        style={{
          position: "absolute",
          right: "-5%",
          top: "50%",
          transform: `translate(${mousePos.x * -18}px, calc(-50% + ${mousePos.y * 12}px + ${parallaxY * 0.6}px))`,
          width: "clamp(380px, 55vw, 760px)",
          height: "clamp(380px, 55vw, 760px)",
          opacity: opacityFade,
          transition: "transform 0.12s ease",
        }}
      >
        <ThreeSculpture scrollY={scrollY} />
      </div>

      {/* Red glow accent */}
      <div
        style={{
          position: "absolute",
          right: "20%",
          top: "50%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          backgroundColor: "rgba(196, 30, 58, 0.04)",
          filter: "blur(80px)",
          transform: `translate(${mousePos.x * -10}px, calc(-50% + ${mousePos.y * 8}px))`,
          pointerEvents: "none",
        }}
      />

      {/* Text content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 clamp(24px, 6vw, 100px)",
          maxWidth: 680,
          transform: `translateY(${-parallaxY * 0.2}px)`,
          opacity: opacityFade,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition:
              "opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.76,0,0.24,1) 0.1s",
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div style={{ width: 28, height: 1, backgroundColor: "#C41E3A" }} />
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#C41E3A",
              fontWeight: 500,
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            AI-Powered Mobility Intelligence
          </span>
        </div>

        {/* Main headline */}
        <h1
          style={{
            margin: 0,
            padding: 0,
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 200,
            fontSize: "clamp(56px, 8.5vw, 112px)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            color: "#0A0A0A",
            overflow: "hidden",
          }}
        >
          {["NEVI", "SENSE"].map((word, wi) => (
            <div key={wi} style={{ overflow: "hidden" }}>
              <div
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(120%)",
                  transition: `opacity 1s ease ${0.3 + wi * 0.12}s, transform 1s cubic-bezier(0.76,0,0.24,1) ${0.3 + wi * 0.12}s`,
                }}
              >
                {word}
              </div>
            </div>
          ))}
        </h1>

        {/* Tagline */}
        <p
          style={{
            marginTop: 28,
            marginBottom: 0,
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 300,
            fontSize: "clamp(16px, 1.8vw, 22px)",
            lineHeight: 1.55,
            color: "#444",
            letterSpacing: "-0.01em",
            maxWidth: 480,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition:
              "opacity 1s ease 0.7s, transform 1s cubic-bezier(0.76,0,0.24,1) 0.7s",
          }}
        >
          Mobility. Intelligence. Insight.
        </p>

        <p
          style={{
            marginTop: 16,
            marginBottom: 0,
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 300,
            fontSize: "clamp(13px, 1.1vw, 15px)",
            lineHeight: 1.75,
            color: "#666",
            maxWidth: 420,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition:
              "opacity 1s ease 0.85s, transform 1s cubic-bezier(0.76,0,0.24,1) 0.85s",
          }}
        >
          An intelligent wearable companion that helps individuals navigate the
          world with greater confidence, safety, and independence.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginTop: 44,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition:
              "opacity 1s ease 1s, transform 1s cubic-bezier(0.76,0,0.24,1) 1s",
          }}
        >
          <button
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              padding: "14px 32px",
              backgroundColor: "#0A0A0A",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 500,
              fontFamily: "'Inter', system-ui, sans-serif",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#C41E3A")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#0A0A0A")}
          >
            Experience NeviSense
          </button>
          <button
            onClick={() => setModal("waitlist")}
            style={{
              padding: "14px 32px",
              backgroundColor: "transparent",
              color: "#0A0A0A",
              border: "1px solid rgba(0,0,0,0.2)",
              cursor: "pointer",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 500,
              fontFamily: "'Inter', system-ui, sans-serif",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#C41E3A";
              e.target.style.color = "#C41E3A";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(0,0,0,0.2)";
              e.target.style.color = "#0A0A0A";
            }}
          >
            Join Waitlist
          </button>
          <button
            onClick={() => setModal("investor")}
            style={{
              padding: "14px 32px",
              backgroundColor: "transparent",
              color: "#0A0A0A",
              border: "1px solid rgba(0,0,0,0.2)",
              cursor: "pointer",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 500,
              fontFamily: "'Inter', system-ui, sans-serif",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#C41E3A";
              e.target.style.color = "#C41E3A";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(0,0,0,0.2)";
              e.target.style.color = "#0A0A0A";
            }}
          >
            Request Investor Deck
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: `translateX(-50%)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: loaded ? opacityFade * 0.5 : 0,
          transition: "opacity 1s ease 1.4s",
        }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#999",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 48,
            backgroundColor: "#ccc",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              backgroundColor: "#C41E3A",
              animation: "scrollLine 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Waitlist Modal */}
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

      {/* Investor Deck Modal */}
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
    </section>
  );
}
