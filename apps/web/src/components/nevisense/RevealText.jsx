"use client";
import { useScrollReveal } from "./useScrollReveal";

export default function RevealText({
  children,
  delay = 0,
  style = {},
  className = "",
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) skewY(0deg)"
          : "translateY(40px) skewY(1deg)",
        transition: `opacity 1s ease ${delay}s, transform 1s cubic-bezier(0.76,0,0.24,1) ${delay}s`,
        willChange: "transform, opacity",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function RevealLine({ children, delay = 0, style = {} }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });
  return (
    <div style={{ overflow: "hidden" }}>
      <div
        ref={ref}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(110%)",
          transition: `opacity 0.8s ease ${delay}s, transform 0.9s cubic-bezier(0.76,0,0.24,1) ${delay}s`,
          willChange: "transform, opacity",
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
}
