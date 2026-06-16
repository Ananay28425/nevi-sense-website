"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 12 + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 900);
        }, 400);
      }
      setProgress(Math.min(current, 100));
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#0A0A0A",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            style={{ marginBottom: 64, textAlign: "center" }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.4em",
                color: "#C41E3A",
                fontWeight: 500,
                marginBottom: 16,
                textTransform: "uppercase",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              NeviSense
            </div>
            <div
              style={{
                fontSize: "clamp(36px, 6vw, 72px)",
                fontWeight: 200,
                color: "#FFFFFF",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Mobility.
              <br />
              Intelligence.
              <br />
              Insight.
            </div>
          </motion.div>

          {/* Progress bar */}
          <div style={{ width: 200, position: "relative" }}>
            <div
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
            />
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: 1,
                backgroundColor: "#C41E3A",
                width: `${progress}%`,
                transition: "width 0.1s ease",
              }}
            />
            <div
              style={{
                marginTop: 16,
                textAlign: "right",
                fontSize: 11,
                color: "rgba(255,255,255,0.3)",
                fontFamily: "'Inter', system-ui, sans-serif",
                letterSpacing: "0.1em",
                fontWeight: 300,
              }}
            >
              {Math.round(progress)}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
