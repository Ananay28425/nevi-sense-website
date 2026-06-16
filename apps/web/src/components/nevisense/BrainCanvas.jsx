"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BrainCanvas({ scrollProgress = 0 }) {
  const mountRef = useRef(null);
  const stateRef = useRef({ scrollProgress: 0 });

  useEffect(() => {
    stateRef.current.scrollProgress = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const w = el.clientWidth;
    const h = el.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0.2, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // ─── Generate brain point cloud ──────────────────────────────────────────
    const brainGroup = new THREE.Group();
    const regions = [
      // Left cerebral hemisphere
      { type: "hemi", side: -1, count: 3200, sx: 0.58, sy: 0.48, sz: 0.62, ox: -0.14 },
      // Right cerebral hemisphere
      { type: "hemi", side: 1, count: 3200, sx: 0.58, sy: 0.48, sz: 0.62, ox: 0.14 },
      // Left cerebellum
      { type: "sphere", count: 800, sx: 0.3, sy: 0.2, sz: 0.28, ox: -0.14, oy: -0.52, oz: -0.1 },
      // Right cerebellum
      { type: "sphere", count: 800, sx: 0.3, sy: 0.2, sz: 0.28, ox: 0.14, oy: -0.52, oz: -0.1 },
      // Brain stem
      { type: "stem", count: 600, radius: 0.07, yMin: -0.42, yMax: -0.9 },
      // Internal depth points (left)
      { type: "fill", count: 400, sx: 0.42, sy: 0.35, sz: 0.45, ox: -0.1, oy: 0.05 },
      // Internal depth points (right)
      { type: "fill", count: 400, sx: 0.42, sy: 0.35, sz: 0.45, ox: 0.1, oy: 0.05 },
    ];

    const allPos = [];
    const allOrig = [];
    const allColor = [];
    const allScatter = [];
    const allSize = [];

    // Pseudo-random noise for organic surface
    const hash = (x, y, z) => {
      const n = Math.sin(x * 12.9898 + y * 78.233 + z * 45.164) * 43758.5453;
      return (n - Math.floor(n)) * 2 - 1;
    };

    const getRegionColor = (y, nz) => {
      // Top: warm pink → Middle: white → Bottom: cool cyan/blue
      const t = Math.max(0, Math.min(1, (y + 0.9) / 1.4));
      let r, g, b;
      if (t > 0.55) {
        // Upper: pink/warm to white
        const u = (t - 0.55) / 0.45;
        r = 1.0;
        g = 0.65 + u * 0.35;
        b = 0.72 + u * 0.28;
      } else if (t > 0.25) {
        // Mid: white to lavender
        const u = (t - 0.25) / 0.3;
        r = 0.75 + u * 0.25;
        g = 0.6 + u * 0.2;
        b = 0.95 + u * 0.05;
      } else {
        // Lower: lavender to cyan/blue
        const u = t / 0.25;
        r = 0.35 + u * 0.4;
        g = 0.55 + u * 0.2;
        b = 1.0;
      }
      // Subtle facing highlight
      const facing = Math.max(0, nz) * 0.05;
      r = Math.min(0.85, r * 0.55 + facing);
      g = Math.min(0.85, g * 0.55 + facing);
      b = Math.min(0.85, b * 0.55 + facing);
      return [r, g, b];
    };

    regions.forEach((reg) => {
      for (let i = 0; i < reg.count; i++) {
        let x, y, z;

        if (reg.type === "hemi") {
          // Surface of hemisphere with organic noise
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const noise = hash(Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)) * 0.04;
          x = (reg.sx + noise) * Math.sin(phi) * Math.cos(theta) + reg.ox;
          y = (reg.sy + noise) * Math.cos(phi);
          z = (reg.sz + noise) * Math.sin(phi) * Math.sin(theta);

          // Longitudinal fissure - thin gap at top center
          if (Math.abs(x) < 0.025 && y > 0.15) {
            x = Math.sign(x || 0.01) * (0.025 + Math.random() * 0.01);
          }

          // Add sulci (grooves) via periodic displacement
          const grooveDepth = 0.025;
          const grooveFreq = 8;
          const groove = Math.sin(theta * grooveFreq) * Math.sin(phi * 6) * grooveDepth;
          x += groove * Math.sin(phi) * Math.cos(theta);
          y += groove * Math.cos(phi) * 0.5;
          z += groove * Math.sin(phi) * Math.sin(theta);

        } else if (reg.type === "sphere") {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const noise = hash(Math.cos(phi), Math.sin(phi) * Math.sin(theta), Math.sin(phi) * Math.cos(theta)) * 0.03;
          x = (reg.sx + noise) * Math.sin(phi) * Math.cos(theta) + reg.ox;
          y = (reg.sy + noise) * Math.cos(phi) + reg.oy;
          z = (reg.sz + noise) * Math.sin(phi) * Math.sin(theta) + (reg.oz || 0);

          // Cerebellum horizontal striations
          const striation = Math.sin(y * 28) * 0.015;
          z += striation;
          x += Math.sin(y * 20) * 0.008;

        } else if (reg.type === "stem") {
          const t = Math.random();
          y = reg.yMin + (reg.yMax - reg.yMin) * t;
          const r = reg.radius * (1 - t * 0.35) + hash(y * 5, 0, 0) * 0.01;
          const angle = Math.random() * Math.PI * 2;
          x = r * Math.cos(angle);
          z = r * Math.sin(angle) * 0.8 - 0.05;

        } else if (reg.type === "fill") {
          // Interior points for depth
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const rad = Math.cbrt(Math.random()); // uniform volume distribution
          x = reg.sx * rad * Math.sin(phi) * Math.cos(theta) + reg.ox;
          y = reg.sy * rad * Math.cos(phi) + (reg.oy || 0);
          z = reg.sz * rad * Math.sin(phi) * Math.sin(theta);
        }

        allOrig.push(x, y, z);

        // Scatter direction - outward from center with randomness
        const sAngle = Math.atan2(y, x) + (Math.random() - 0.5) * 1.5;
        const sElev = Math.atan2(z, Math.sqrt(x * x + y * y)) + (Math.random() - 0.5) * 1.0;
        const sDist = 2.0 + Math.random() * 4.0;
        allScatter.push(
          Math.cos(sAngle) * Math.cos(sElev) * sDist,
          Math.sin(sAngle) * Math.cos(sElev) * sDist,
          Math.sin(sElev) * sDist
        );

        // Current position = original
        allPos.push(x, y, z);

        // Color
        const nz = z / 0.62;
        const [cr, cg, cb] = getRegionColor(y, nz);
        allColor.push(cr, cg, cb);

        // Random size
        allSize.push(1.0 + Math.random() * 2.0);
      }
    });

    const totalCount = allPos.length / 3;

    // ─── Points with custom shader ──────────────────────────────────────────
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.Float32BufferAttribute(allPos, 3));
    pointsGeo.setAttribute("aOrigPos", new THREE.Float32BufferAttribute(allOrig, 3));
    pointsGeo.setAttribute("aScatter", new THREE.Float32BufferAttribute(allScatter, 3));
    pointsGeo.setAttribute("color", new THREE.Float32BufferAttribute(allColor, 3));
    pointsGeo.setAttribute("aSize", new THREE.Float32BufferAttribute(allSize, 1));

    const pointsMat = new THREE.ShaderMaterial({
      vertexShader: `
        uniform float uScatter;
        uniform float uTime;
        attribute vec3 aOrigPos;
        attribute vec3 aScatter;
        attribute float aSize;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          // Per-point staggered scatter (each point starts scattering at different threshold)
          float stagger = fract(sin(dot(aOrigPos.xy, vec2(12.9898, 78.233))) * 43758.5453) * 0.35;
          float scatter = smoothstep(stagger, stagger + 0.5, uScatter);

          vec3 scattered = aOrigPos + aScatter * scatter;

          // Gentle idle animation when not scattered
          float idle = 1.0 - scatter;
          scattered.x += sin(uTime * 0.5 + aOrigPos.y * 3.0) * 0.008 * idle;
          scattered.y += cos(uTime * 0.4 + aOrigPos.x * 3.0) * 0.006 * idle;

          vec4 mvPos = modelViewMatrix * vec4(scattered, 1.0);
          gl_Position = projectionMatrix * mvPos;
          gl_PointSize = aSize * (18.0 / -mvPos.z) * (1.0 - scatter * 0.35);

          vColor = color;
          vAlpha = (0.75 - scatter * 0.65);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float core = smoothstep(0.5, 0.35, d);
          float glow = smoothstep(0.5, 0.15, d) * 0.2;
          vec3 col = vColor * (core * 0.85 + glow * 0.25);
          float alpha = (core * 0.95 + glow * 0.4) * vAlpha;
          gl_FragColor = vec4(col, alpha);
        }
      `,
      uniforms: {
        uScatter: { value: 0 },
        uTime: { value: 0 },
      },
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(pointsGeo, pointsMat);
    brainGroup.add(points);

    // ─── Connection lines between nearby points ─────────────────────────────
    const linePositions = [];
    const lineOrigPositions = [];
    const lineScatterPositions = [];
    const lineColors = [];
    const MAX_LINES = 8000;
    const MAX_DIST = 0.18;
    let lineCount = 0;

    // Build spatial grid for efficient neighbor lookup
    const gridSize = 0.15;
    const grid = new Map();
    for (let i = 0; i < totalCount && lineCount < MAX_LINES; i++) {
      const gx = Math.floor(allOrig[i * 3] / gridSize);
      const gy = Math.floor(allOrig[i * 3 + 1] / gridSize);
      const gz = Math.floor(allOrig[i * 3 + 2] / gridSize);
      const key = `${gx},${gy},${gz}`;
      if (!grid.has(key)) grid.set(key, []);
      grid.get(key).push(i);
    }

    for (const [key, indices] of grid) {
      if (lineCount >= MAX_LINES) break;
      const [gx, gy, gz] = key.split(",").map(Number);
      for (let dx = -1; dx <= 1 && lineCount < MAX_LINES; dx++) {
        for (let dy = -1; dy <= 1 && lineCount < MAX_LINES; dy++) {
          for (let dz = -1; dz <= 1 && lineCount < MAX_LINES; dz++) {
            const nKey = `${gx + dx},${gy + dy},${gz + dz}`;
            const neighbors = grid.get(nKey);
            if (!neighbors) continue;
            for (const i of indices) {
              if (lineCount >= MAX_LINES) break;
              for (const j of neighbors) {
                if (j <= i || lineCount >= MAX_LINES) continue;
                const ddx = allOrig[i * 3] - allOrig[j * 3];
                const ddy = allOrig[i * 3 + 1] - allOrig[j * 3 + 1];
                const ddz = allOrig[i * 3 + 2] - allOrig[j * 3 + 2];
                const dist = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz);
                if (dist < MAX_DIST && Math.random() < 0.5) {
                  // Point i endpoint
                  linePositions.push(allOrig[i * 3], allOrig[i * 3 + 1], allOrig[i * 3 + 2]);
                  lineOrigPositions.push(allOrig[i * 3], allOrig[i * 3 + 1], allOrig[i * 3 + 2]);
                  lineScatterPositions.push(allScatter[i * 3], allScatter[i * 3 + 1], allScatter[i * 3 + 2]);
                  const [r1, g1, b1] = [allColor[i * 3], allColor[i * 3 + 1], allColor[i * 3 + 2]];
                  lineColors.push(r1, g1, b1);
                  // Point j endpoint
                  linePositions.push(allOrig[j * 3], allOrig[j * 3 + 1], allOrig[j * 3 + 2]);
                  lineOrigPositions.push(allOrig[j * 3], allOrig[j * 3 + 1], allOrig[j * 3 + 2]);
                  lineScatterPositions.push(allScatter[j * 3], allScatter[j * 3 + 1], allScatter[j * 3 + 2]);
                  const [r2, g2, b2] = [allColor[j * 3], allColor[j * 3 + 1], allColor[j * 3 + 2]];
                  lineColors.push(r2, g2, b2);
                  lineCount++;
                }
              }
            }
          }
        }
      }
    }

    if (linePositions.length > 0) {
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
      lineGeo.setAttribute("aOrigPos", new THREE.Float32BufferAttribute(lineOrigPositions, 3));
      lineGeo.setAttribute("aScatter", new THREE.Float32BufferAttribute(lineScatterPositions, 3));
      lineGeo.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 3));

      const lineMat = new THREE.ShaderMaterial({
        vertexShader: `
          uniform float uScatter;
          uniform float uTime;
          attribute vec3 aOrigPos;
          attribute vec3 aScatter;
          varying vec3 vColor;
          varying float vAlpha;

          void main() {
            float stagger = fract(sin(dot(aOrigPos.xy, vec2(12.9898, 78.233))) * 43758.5453) * 0.35;
            float scatter = smoothstep(stagger, stagger + 0.5, uScatter);

            vec3 pos = aOrigPos + aScatter * scatter;
            float idle = 1.0 - scatter;
            pos.x += sin(uTime * 0.5 + aOrigPos.y * 3.0) * 0.008 * idle;
            pos.y += cos(uTime * 0.4 + aOrigPos.x * 3.0) * 0.006 * idle;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            vColor = color;
            vAlpha = (1.0 - scatter * 0.95) * 0.18;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            gl_FragColor = vec4(vColor * 0.6, vAlpha);
          }
        `,
        uniforms: {
          uScatter: { value: 0 },
          uTime: { value: 0 },
        },
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });

      const lines = new THREE.LineSegments(lineGeo, lineMat);
      brainGroup.add(lines);
      brainGroup.userData.lineMat = lineMat;
    }

    // Center and tilt brain
    brainGroup.position.set(0, 0.1, 0);
    brainGroup.rotation.x = 0.15;
    scene.add(brainGroup);

    // ─── Animation loop ─────────────────────────────────────────────────────
    let frame;
    let t = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      t += 0.016;

      const sp = stateRef.current.scrollProgress;
      const scatter = Math.max(0, Math.min(1, (sp - 0.15) / 0.55));

      // Update scatter uniform
      pointsMat.uniforms.uScatter.value = scatter;
      pointsMat.uniforms.uTime.value = t;

      if (brainGroup.userData.lineMat) {
        brainGroup.userData.lineMat.uniforms.uScatter.value = scatter;
        brainGroup.userData.lineMat.uniforms.uTime.value = t;
      }

      // Continuous rotation (slows as it disintegrates)
      const rotSpeed = 0.004 * (1 - scatter * 0.8);
      brainGroup.rotation.y += rotSpeed;
      // Gentle X tilt oscillation
      brainGroup.rotation.x = 0.15 + Math.sin(t * 0.3) * 0.08;

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const onResize = () => {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
    />
  );
}
