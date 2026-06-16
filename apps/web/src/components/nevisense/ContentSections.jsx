"use client";
import { useRef, useState, useEffect } from "react";
import RevealText, { RevealLine } from "./RevealText";
import { useScrollReveal } from "./useScrollReveal";
import BrainCanvas from "./BrainCanvas";
import ChallengeVisual from "./ChallengeVisual";
import IndependenceVisual from "./IndependenceVisual";

const FONT = "'Inter', system-ui, sans-serif";
const RED = "#C41E3A";

// ─── CHALLENGE SECTION ────────────────────────────────────────────────────────
export function ChallengeSection() {
  const lines = [
    "For millions of people around the world,",
    "mobility is more than movement.",
    "",
    "It is confidence.",
    "It is independence.",
    "It is freedom.",
    "",
    "Every journey requires awareness,",
    "decision-making, and trust.",
    "",
    "NeviSense exists to make those journeys",
    "safer and more empowering.",
  ];

  return (
    <section
      id="about"
      style={{
        backgroundColor: "#FAFAF9",
        padding: "clamp(40px, 6vw, 80px) clamp(24px, 8vw, 160px)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(24px, 4vw, 60px)",
        alignItems: "center",
      }}
    >
      {/* Left: Text content */}
      <div style={{ maxWidth: 500 }}>
        <RevealText delay={0}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 64,
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
              The Challenge
            </span>
          </div>
        </RevealText>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {lines.map((line, i) => (
            <RevealLine key={i} delay={i * 0.06}>
              {line === "" ? (
                <div style={{ height: 28 }} />
              ) : (
                <p
                  style={{
                    margin: 0,
                    fontFamily: FONT,
                    fontSize: "clamp(24px, 3.5vw, 48px)",
                    fontWeight: 200,
                    lineHeight: 1.25,
                    letterSpacing: "-0.02em",
                    color: "#0A0A0A",
                  }}
                >
                  {line}
                </p>
              )}
            </RevealLine>
          ))}
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(32px, 5vw, 80px)",
            marginTop: 48,
          }}
        >
          {[
            { num: "43M+", label: "people living with blindness worldwide" },
            { num: "285M+", label: "with significant visual impairment" },
            { num: "∞", label: "journeys that deserve confidence" },
          ].map((stat, i) => (
            <RevealText key={i} delay={i * 0.12}>
              <div>
                <div
                  style={{
                    fontSize: "clamp(48px, 6vw, 80px)",
                    fontWeight: 200,
                    color: "#0A0A0A",
                    fontFamily: FONT,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#888",
                    fontFamily: FONT,
                    marginTop: 8,
                    maxWidth: 180,
                    lineHeight: 1.5,
                    letterSpacing: "0.02em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            </RevealText>
          ))}
        </div>
      </div>

      {/* Right: Visual component */}
      <div style={{ height: "100%", minHeight: 400 }}>
        <ChallengeVisual />
      </div>
    </section>
  );
}

// ─── WHAT IT DOES SECTION ─────────────────────────────────────────────────────
export function WhatItDoesSection() {
  const items = [
    {
      num: "01",
      title: "Real-Time Environmental Awareness",
      body: "NeviSense continuously monitors the user's immediate surroundings and provides timely feedback about potential obstacles and environmental changes — before a situation becomes a risk.",
    },
    {
      num: "02",
      title: "Intelligent Navigation Assistance",
      body: "The system supports users in moving through different environments by providing guidance that promotes safer and more efficient movement, whether indoors or outdoors.",
    },
    {
      num: "03",
      title: "Enhanced Mobility Confidence",
      body: "Independent movement is about more than reaching a destination. It is about feeling confident, comfortable, and secure throughout the journey.",
    },
    {
      num: "04",
      title: "Personalized User Experience",
      body: "NeviSense learns from mobility patterns over time, enabling a more personalized experience that adapts to the user's habits, routines, and preferences.",
    },
  ];

  return (
    <section
      id="features"
      style={{
        backgroundColor: "#0A0A0A",
        padding: "clamp(100px, 14vw, 200px) clamp(24px, 8vw, 160px)",
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
            The Platform
          </span>
        </div>
      </RevealText>

      <RevealLine delay={0}>
        <h2
          style={{
            margin: "0 0 100px 0",
            fontFamily: FONT,
            fontWeight: 200,
            fontSize: "clamp(40px, 6vw, 80px)",
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            lineHeight: 1.1,
            maxWidth: 700,
          }}
        >
          Continuous awareness.
          <br />
          Intuitive guidance.
        </h2>
      </RevealLine>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {items.map((item, i) => (
          <FeatureRow key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

function FeatureRow({ item, index }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "clamp(32px, 4vw, 56px) 0",
        display: "grid",
        gridTemplateColumns: "80px 1fr 1fr",
        gap: "clamp(16px, 3vw, 48px)",
        alignItems: "start",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.9s ease ${index * 0.1}s, transform 0.9s cubic-bezier(0.76,0,0.24,1) ${index * 0.1}s`,
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: RED,
          fontFamily: FONT,
          letterSpacing: "0.1em",
          paddingTop: 4,
        }}
      >
        {item.num}
      </div>
      <div
        style={{
          fontSize: "clamp(18px, 2vw, 26px)",
          fontWeight: 300,
          color: "#FFFFFF",
          fontFamily: FONT,
          letterSpacing: "-0.02em",
          lineHeight: 1.3,
        }}
      >
        {item.title}
      </div>
      <div
        style={{
          fontSize: 14,
          color: "rgba(255,255,255,0.45)",
          fontFamily: FONT,
          lineHeight: 1.75,
          fontWeight: 300,
        }}
      >
        {item.body}
      </div>
    </div>
  );
}

// ─── REIMAGINING INDEPENDENCE ─────────────────────────────────────────────────
export function IndependenceSection() {
  const { ref, progress } = useScrollReveal({ threshold: 0 });
  const bgOpacity = Math.min(progress * 1.5, 1);

  const lines = [
    "Independence is not simply",
    "reaching a destination.",
    "",
    "It is the confidence to explore.",
    "The freedom to move.",
    "The ability to make decisions",
    "without hesitation.",
    "",
    "NeviSense helps create that",
    "confidence through continuous",
    "awareness and intelligent support.",
  ];

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        backgroundColor: `rgb(${Math.round(250 - bgOpacity * 250)}, ${Math.round(250 - bgOpacity * 250)}, ${Math.round(249 - bgOpacity * 249)})`,
        padding: "clamp(40px, 6vw, 80px) clamp(24px, 8vw, 160px)",
        transition: "background-color 0.1s linear",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(24px, 4vw, 60px)",
        alignItems: "center",
      }}
    >
      {/* Left: Text content */}
      <div style={{ maxWidth: 500 }}>
        <RevealText delay={0}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 64,
            }}
          >
            <div
              style={{
                width: 28,
                height: 1,
                backgroundColor: bgOpacity > 0.5 ? "#fff" : RED,
              }}
            />
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: bgOpacity > 0.5 ? "rgba(255,255,255,0.5)" : RED,
                fontWeight: 500,
                fontFamily: FONT,
                transition: "color 0.3s ease",
              }}
            >
              Reimagining Independence
            </span>
          </div>
        </RevealText>
        {lines.map((line, i) => (
          <RevealLine key={i} delay={i * 0.05}>
            {line === "" ? (
              <div style={{ height: 20 }} />
            ) : (
              <p
                style={{
                  margin: 0,
                  fontFamily: FONT,
                  fontSize: "clamp(22px, 3.2vw, 44px)",
                  fontWeight: 200,
                  lineHeight: 1.3,
                  letterSpacing: "-0.02em",
                  color: bgOpacity > 0.5 ? "#FFFFFF" : "#0A0A0A",
                  transition: "color 0.3s ease",
                }}
              >
                {line}
              </p>
            )}
          </RevealLine>
        ))}
      </div>

      {/* Right: Visual component */}
      <div style={{ height: "100%", minHeight: 400 }}>
        <IndependenceVisual lightMode={bgOpacity < 0.5} />
      </div>
    </section>
  );
}

// ─── DIGITAL BIOMARKERS ───────────────────────────────────────────────────────
export function BiomarkersSection() {
  const { ref, isVisible, progress } = useScrollReveal({ threshold: 0.05 });
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const [localProgress, setLocalProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const p =
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const raw = Math.max(0, Math.min(1, p));
      // Delay disintegration: brain stays fully formed until 45% scroll
      const delayed = raw < 0.45 ? 0 : (raw - 0.45) / 0.55;
      setLocalProgress(delayed);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const biomarkers = [
    "Walking consistency",
    "Movement confidence",
    "Balance stability",
    "Daily activity patterns",
    "Long-term mobility trends",
  ];

  return (
    <section
      id="biomarkers"
      ref={sectionRef}
      style={{
        position: "relative",
        backgroundColor: "#080808",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Brain: absolute left half */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <BrainCanvas scrollProgress={localProgress} />
      </div>

      {/* Content: right half */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          marginLeft: "50%",
          padding: "clamp(40px, 6vw, 80px) clamp(24px, 4vw, 80px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <RevealText delay={0}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 64,
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
              Digital Biomarker Platform
            </span>
          </div>
        </RevealText>

        <RevealLine delay={0.1}>
          <h2
            style={{
              margin: "0 0 24px 0",
              fontFamily: FONT,
              fontWeight: 200,
              fontSize: "clamp(48px, 7vw, 100px)",
              letterSpacing: "-0.04em",
              color: "#FFFFFF",
              lineHeight: 0.95,
            }}
          >
            Every Step
            <br />
            Tells A Story.
          </h2>
        </RevealLine>

        <RevealText delay={0.3}>
          <p
            style={{
              fontSize: "clamp(14px, 1.3vw, 18px)",
              color: "rgba(255,255,255,0.45)",
              fontFamily: FONT,
              fontWeight: 300,
              lineHeight: 1.75,
              maxWidth: 480,
              marginTop: 32,
              marginBottom: 64,
            }}
          >
            Human movement contains valuable information. NeviSense transforms
            real-world mobility behavior into meaningful insights that may help
            identify changes in physical performance and overall wellbeing.
          </p>
        </RevealText>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            maxWidth: 500,
          }}
        >
          {biomarkers.map((b, i) => (
            <RevealText key={i} delay={0.1 + i * 0.1}>
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  padding: "20px 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: FONT,
                    fontWeight: 300,
                  }}
                >
                  {b}
                </span>
                <span
                  style={{ fontSize: 10, color: RED, letterSpacing: "0.2em" }}
                >
                  ●
                </span>
              </div>
            </RevealText>
          ))}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
        </div>

        {/* Large number */}
        <RevealText delay={0.5}>
          <div style={{ marginTop: 100 }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.3)",
                fontFamily: FONT,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Continuous monitoring
            </div>
            <div
              style={{
                fontSize: "clamp(64px, 10vw, 140px)",
                fontWeight: 100,
                color: "#FFFFFF",
                fontFamily: FONT,
                letterSpacing: "-0.05em",
                lineHeight: 1,
              }}
            >
              24<span style={{ color: RED }}>/</span>7
            </div>
            <div
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.35)",
                fontFamily: FONT,
                marginTop: 12,
                fontWeight: 300,
              }}
            >
              awareness of your mobility health
            </div>
          </div>
        </RevealText>
      </div>
    </section>
  );
}

// ─── BEYOND NAVIGATION ────────────────────────────────────────────────────────
export function BeyondNavigationSection() {
  const paragraphs = [
    "Navigation is only the beginning.",
    "NeviSense is designed to understand mobility itself.",
    "The platform continuously learns from movement behavior and long-term trends.",
    "This creates a deeper understanding of how individuals interact with the world around them.",
    "The result is a system that evolves alongside the people who use it.",
  ];

  return (
    <section
      style={{
        backgroundColor: "#FAFAF9",
        padding: "clamp(100px, 14vw, 200px) clamp(24px, 8vw, 160px)",
      }}
    >
      <RevealText>
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
            Beyond Navigation
          </span>
        </div>
      </RevealText>
      {paragraphs.map((p, i) => (
        <RevealLine key={i} delay={i * 0.08}>
          <p
            style={{
              margin: "0 0 clamp(20px, 3vw, 40px) 0",
              fontFamily: FONT,
              fontWeight: 200,
              fontSize: "clamp(24px, 3.8vw, 52px)",
              letterSpacing: "-0.025em",
              color: i === 0 ? "#0A0A0A" : `rgba(10,10,10,${1 - i * 0.1})`,
              lineHeight: 1.2,
            }}
          >
            {p}
          </p>
        </RevealLine>
      ))}
    </section>
  );
}

// ─── HEALTH INSIGHTS ─────────────────────────────────────────────────────────
export function HealthInsightsSection() {
  const insights = [
    {
      title: "Walking Pattern Analysis",
      desc: "Long-term trends in walking consistency, movement confidence, and mobility stability.",
    },
    {
      title: "Balance & Stability Monitoring",
      desc: "Identifying patterns that may indicate increased fall risk or changes in gait behavior.",
    },
    {
      title: "Behavioral Mobility Insights",
      desc: "Observing changes in activity levels, daily routines, and environmental engagement.",
    },
    {
      title: "Early Health Signal Detection",
      desc: "Identifying early warning signs that may support earlier intervention and better outcomes.",
    },
    {
      title: "Long-Term Health Monitoring",
      desc: "A continuous picture of mobility health tracked across weeks, months, and years.",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: "#F2F1EF",
        padding: "clamp(100px, 14vw, 200px) clamp(24px, 8vw, 160px)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "0",
          borderTop: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        {insights.map((item, i) => (
          <InsightCard key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

function InsightCard({ item, index }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "clamp(32px, 4vw, 56px)",
        borderRight: "1px solid rgba(0,0,0,0.1)",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        cursor: "default",
        backgroundColor: hovered ? "#FFFFFF" : "transparent",
        transition: "background-color 0.3s ease",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(32px)",
        transitionProperty: "opacity, transform, background-color",
        transitionDuration: "0.8s, 0.8s, 0.3s",
        transitionDelay: `${index * 0.1}s, ${index * 0.1}s, 0s`,
        transitionTimingFunction: "ease, cubic-bezier(0.76,0,0.24,1), ease",
      }}
    >
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.2em",
          color: RED,
          fontFamily: FONT,
          marginBottom: 20,
          textTransform: "uppercase",
        }}
      >
        0{index + 1}
      </div>
      <h3
        style={{
          margin: "0 0 16px 0",
          fontSize: "clamp(16px, 1.5vw, 20px)",
          fontWeight: 400,
          color: "#0A0A0A",
          fontFamily: FONT,
          letterSpacing: "-0.01em",
          lineHeight: 1.3,
        }}
      >
        {item.title}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: 13,
          color: "#777",
          fontFamily: FONT,
          lineHeight: 1.7,
          fontWeight: 300,
        }}
      >
        {item.desc}
      </p>
    </div>
  );
}

// ─── WHO IT SERVES ────────────────────────────────────────────────────────────
export function WhoItServesSection() {
  const scrollRef = useRef(null);
  const panels = [
    {
      tag: "For Individuals",
      title: "Navigate with greater confidence and independence.",
      points: [
        "Independent navigation",
        "Increased confidence",
        "Improved situational awareness",
        "Better mobility understanding",
      ],
    },
    {
      tag: "For Families & Caregivers",
      title: "Gain meaningful long-term mobility insights.",
      points: [
        "Long-term mobility insights",
        "Awareness of behavioral changes",
        "Enhanced support planning",
        "Peace of mind",
      ],
    },
    {
      tag: "For Healthcare & Research",
      title: "Support research and mobility monitoring initiatives.",
      points: [
        "Digital biomarker generation",
        "Mobility analytics",
        "Longitudinal patient monitoring",
        "Early intervention opportunities",
      ],
    },
    {
      tag: "For Organizations & NGOs",
      title: "Deploy scalable accessibility solutions for communities.",
      points: [
        "Accessibility programs",
        "Assistive technology initiatives",
        "Community mobility support",
        "Inclusive infrastructure",
      ],
    },
  ];

  return (
    <section
      style={{
        backgroundColor: "#0A0A0A",
        padding: "clamp(80px, 10vw, 140px) 0",
        overflow: "hidden",
      }}
    >
      <RevealText delay={0}>
        <div style={{ padding: "0 clamp(24px, 8vw, 160px)", marginBottom: 56 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
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
              Who It Serves
            </span>
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: FONT,
              fontWeight: 200,
              fontSize: "clamp(32px, 4.5vw, 64px)",
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              lineHeight: 1.1,
            }}
          >
            Built for everyone
            <br />
            who values independence.
          </h2>
        </div>
      </RevealText>

      <div
        ref={scrollRef}
        style={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          padding: "0 clamp(24px, 8vw, 160px) 0",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {panels.map((panel, i) => (
          <PanelCard key={i} panel={panel} index={i} />
        ))}
      </div>
    </section>
  );
}

function PanelCard({ panel, index }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "0 0 clamp(280px, 35vw, 440px)",
        scrollSnapAlign: "start",
        padding: "clamp(40px, 5vw, 64px)",
        backgroundColor: hovered ? "#1A1A1A" : "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        cursor: "default",
        transition:
          "background-color 0.3s ease, opacity 0.8s ease, transform 0.8s cubic-bezier(0.76,0,0.24,1)",
        transitionDelay: `${index * 0.1}s`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        minHeight: 380,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.25em",
            color: RED,
            fontFamily: FONT,
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          {panel.tag}
        </div>
        <h3
          style={{
            margin: "0 0 40px 0",
            fontSize: "clamp(18px, 2vw, 26px)",
            fontWeight: 300,
            color: "#FFFFFF",
            fontFamily: FONT,
            letterSpacing: "-0.02em",
            lineHeight: 1.35,
          }}
        >
          {panel.title}
        </h3>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {panel.points.map((pt, j) => (
          <div
            key={j}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                backgroundColor: RED,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.45)",
                fontFamily: FONT,
                fontWeight: 300,
              }}
            >
              {pt}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
