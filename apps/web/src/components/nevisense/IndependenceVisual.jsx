"use client";
import { useEffect, useRef } from "react";

export default function IndependenceVisual({ lightMode = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Generate flowing paths
    const paths = [];
    const PATH_COUNT = 18;
    for (let i = 0; i < PATH_COUNT; i++) {
      paths.push({
        yBase: (i / PATH_COUNT) * 1.0 - 0.1,
        amplitude: 0.03 + Math.random() * 0.06,
        frequency: 1.5 + Math.random() * 2.5,
        speed: 0.3 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        width: 0.5 + Math.random() * 1.5,
        opacity: 0.15 + Math.random() * 0.35,
      });
    }

    // Floating waypoints
    const waypoints = [];
    for (let i = 0; i < 12; i++) {
      waypoints.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0003,
        vy: (Math.random() - 0.5) * 0.0003,
        r: 2 + Math.random() * 4,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const draw = (t) => {
      const w = canvas.width / Math.min(window.devicePixelRatio, 2);
      const h = canvas.height / Math.min(window.devicePixelRatio, 2);
      ctx.clearRect(0, 0, w, h);

      const time = t * 0.001;

      // Draw flowing paths
      for (const path of paths) {
        ctx.beginPath();
        ctx.strokeStyle = lightMode
          ? `rgba(180, 40, 60, ${path.opacity * 0.5})`
          : `rgba(220, 80, 100, ${path.opacity * 0.4})`;
        ctx.lineWidth = path.width;

        for (let x = 0; x <= w; x += 3) {
          const nx = x / w;
          const wave =
            Math.sin(nx * path.frequency * Math.PI * 2 + time * path.speed + path.phase) *
            path.amplitude;
          const wave2 =
            Math.sin(nx * path.frequency * 1.5 * Math.PI * 2 + time * path.speed * 0.7 + path.phase * 2) *
            path.amplitude * 0.4;
          const y = (path.yBase + wave + wave2) * h;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw waypoints
      for (const wp of waypoints) {
        wp.x += wp.vx;
        wp.y += wp.vy;
        if (wp.x < 0 || wp.x > 1) wp.vx *= -1;
        if (wp.y < 0 || wp.y > 1) wp.vy *= -1;

        const px = wp.x * w;
        const py = wp.y * h;
        const pulse = Math.sin(time * 1.5 + wp.phase) * 0.4 + 1;
        const r = wp.r * pulse;

        // Outer glow
        const grad = ctx.createRadialGradient(px, py, 0, px, py, r * 4);
        grad.addColorStop(0, lightMode ? "rgba(180, 40, 60, 0.15)" : "rgba(220, 80, 100, 0.12)");
        grad.addColorStop(1, "rgba(180, 40, 60, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = lightMode ? "rgba(180, 40, 60, 0.5)" : "rgba(220, 80, 100, 0.45)";
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    animId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [lightMode]);

  return (
    <div style={{ width: "100%", height: "100%", minHeight: 300 }}>
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
