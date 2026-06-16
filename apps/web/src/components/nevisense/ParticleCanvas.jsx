"use client";
import { useEffect, useRef } from "react";

export default function ParticleCanvas({ scrollProgress = 0 }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ scrollProgress: 0 });

  useEffect(() => {
    stateRef.current.scrollProgress = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Neural network nodes
    const NODE_COUNT = 120;
    const CONNECTION_DIST = 140;
    const nodes = [];

    // Create layered neural structure
    for (let i = 0; i < NODE_COUNT; i++) {
      const layer = Math.floor(Math.random() * 5);
      const cx = width * (0.15 + layer * 0.175);
      const spread = height * 0.38;
      const nodesInLayer = NODE_COUNT / 5;
      const posInLayer = (i % nodesInLayer) / nodesInLayer;

      nodes.push({
        // Base position in neural layer structure
        bx: cx + (Math.random() - 0.5) * width * 0.12,
        by: height / 2 + (posInLayer - 0.5) * spread * 2 + (Math.random() - 0.5) * spread * 0.5,
        x: 0,
        y: 0,
        baseRadius: 1.5 + Math.random() * 2.5,
        radius: 0,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.5 + Math.random() * 1.5,
        isRed: Math.random() > 0.78,
        brightness: 0.3 + Math.random() * 0.7,
        activation: 0,
        activationTarget: 0,
      });
    }

    // Pre-compute connections
    const connections = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = nodes[i].bx - nodes[j].bx;
        const dy = nodes[i].by - nodes[j].by;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          connections.push({
            a: i,
            b: j,
            dist,
            signalPos: -1, // -1 means no active signal
            signalSpeed: 0.008 + Math.random() * 0.012,
            signalDelay: Math.random() * 200,
            isRed: nodes[i].isRed || nodes[j].isRed,
          });
        }
      }
    }

    let t = 0;
    let frameCount = 0;
    let animId;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      t += 0.016;
      frameCount++;
      const sp = stateRef.current.scrollProgress;

      // Fade background (creates trail effect)
      ctx.fillStyle = "rgba(8, 8, 8, 0.22)";
      ctx.fillRect(0, 0, width, height);

      // Update node positions (gentle drift + pulse)
      nodes.forEach((n) => {
        n.x = n.bx + Math.sin(t * 0.4 + n.phase) * 3;
        n.y = n.by + Math.cos(t * 0.3 + n.phase * 1.3) * 2.5;

        // Pulse radius
        const pulse = Math.sin(t * n.pulseSpeed + n.phase) * 0.5 + 0.5;
        n.radius = n.baseRadius * (0.7 + pulse * 0.6);

        // Activation based on scroll
        n.activationTarget = sp > 0.15 ? Math.min(1, (sp - 0.15) * 3) : 0;
        n.activation += (n.activationTarget - n.activation) * 0.04;
      });

      // Trigger signals along connections periodically
      connections.forEach((c) => {
        if (c.signalPos < 0 && sp > 0.2) {
          // Random chance to fire, more likely when scrolled further
          if (Math.random() < 0.001 * sp * 2) {
            c.signalPos = 0;
          }
        }
        // Advance signal
        if (c.signalPos >= 0) {
          c.signalPos += c.signalSpeed;
          if (c.signalPos > 1) c.signalPos = -1;
        }
      });

      // Draw connections
      connections.forEach((c) => {
        const a = nodes[c.a];
        const b = nodes[c.b];
        const baseAlpha = (1 - c.dist / CONNECTION_DIST) * 0.12 * (0.3 + sp * 0.7);
        const activated = Math.min(a.activation, b.activation);

        // Base line
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        const lineAlpha = baseAlpha * (0.4 + activated * 0.6);

        if (c.isRed && activated > 0.3) {
          ctx.strokeStyle = `rgba(196, 30, 58, ${lineAlpha * 1.2})`;
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
        }
        ctx.lineWidth = 0.4 + activated * 0.4;
        ctx.stroke();

        // Draw signal pulse traveling along connection
        if (c.signalPos >= 0 && activated > 0.3) {
          const sx = a.x + (b.x - a.x) * c.signalPos;
          const sy = a.y + (b.y - a.y) * c.signalPos;
          const signalAlpha = Math.sin(c.signalPos * Math.PI) * activated;

          // Signal glow
          const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, 8);
          if (c.isRed) {
            grad.addColorStop(0, `rgba(196, 30, 58, ${signalAlpha * 0.6})`);
            grad.addColorStop(1, `rgba(196, 30, 58, 0)`);
          } else {
            grad.addColorStop(0, `rgba(255, 255, 255, ${signalAlpha * 0.4})`);
            grad.addColorStop(1, `rgba(255, 255, 255, 0)`);
          }
          ctx.beginPath();
          ctx.arc(sx, sy, 8, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          // Signal core
          ctx.beginPath();
          ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = c.isRed
            ? `rgba(196, 30, 58, ${signalAlpha})`
            : `rgba(255, 255, 255, ${signalAlpha * 0.8})`;
          ctx.fill();
        }
      });

      // Draw nodes
      nodes.forEach((n) => {
        const alpha = n.brightness * (0.3 + n.activation * 0.7);

        // Outer glow
        const glowSize = n.radius * (3 + n.activation * 2);
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowSize);
        if (n.isRed && n.activation > 0.3) {
          grad.addColorStop(0, `rgba(196, 30, 58, ${alpha * 0.3})`);
          grad.addColorStop(0.5, `rgba(196, 30, 58, ${alpha * 0.08})`);
          grad.addColorStop(1, `rgba(196, 30, 58, 0)`);
        } else {
          grad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.2})`);
          grad.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.05})`);
          grad.addColorStop(1, `rgba(255, 255, 255, 0)`);
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.isRed && n.activation > 0.3
          ? `rgba(196, 30, 58, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      });
    };

    draw();

    const onResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      // Reposition nodes proportionally
      nodes.forEach((n) => {
        const layer = Math.floor((n.bx / width) * 5);
        n.bx = width * (0.15 + layer * 0.175) + (Math.random() - 0.5) * width * 0.12;
        n.by = height / 2 + (n.by - height / 2) * (height / (height || 1));
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
