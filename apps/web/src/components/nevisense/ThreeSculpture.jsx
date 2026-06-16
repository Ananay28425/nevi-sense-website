"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeSculpture({ scrollY = 0 }) {
  const mountRef = useRef(null);
  const sceneRef = useRef({});

  useEffect(() => {
    if (!mountRef.current) return;
    const el = mountRef.current;
    const w = el.clientWidth;
    const h = el.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // ─── Möbius Strip (parametric) ─────────────────────────────────────
    const SEGMENTS = 256;
    const RADIUS = 1.4;
    const WIDTH = 0.45;
    const mobiusGeo = new THREE.BufferGeometry();
    const verts = [];
    const uvs = [];
    const indices = [];
    const strips = 20;

    for (let i = 0; i <= SEGMENTS; i++) {
      const u = (i / SEGMENTS) * Math.PI * 2;
      for (let j = 0; j <= strips; j++) {
        const v = (j / strips - 0.5) * WIDTH * 2;
        const halfU = u / 2;
        const x = (RADIUS + v * Math.cos(halfU)) * Math.cos(u);
        const y = (RADIUS + v * Math.cos(halfU)) * Math.sin(u);
        const z = v * Math.sin(halfU);
        verts.push(x, y, z);
        uvs.push(i / SEGMENTS, j / strips);
      }
    }

    for (let i = 0; i < SEGMENTS; i++) {
      for (let j = 0; j < strips; j++) {
        const a = i * (strips + 1) + j;
        const b = a + strips + 1;
        indices.push(a, b, a + 1);
        indices.push(b, b + 1, a + 1);
      }
    }

    mobiusGeo.setIndex(indices);
    mobiusGeo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    mobiusGeo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    mobiusGeo.computeVertexNormals();

    // Metallic material
    const mobiusMat = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      metalness: 0.2,
      roughness: 0.15,
      side: THREE.DoubleSide,
    });
    const mobiusMesh = new THREE.Mesh(mobiusGeo, mobiusMat);
    scene.add(mobiusMesh);

    // Red wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xc41e3a,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
    });
    const wireMesh = new THREE.Mesh(mobiusGeo, wireMat);
    scene.add(wireMesh);

    // ─── Floating particles ────────────────────────────────────────────
    const pCount = 300;
    const pPositions = new Float32Array(pCount * 3);
    const pColors = new Float32Array(pCount * 3);
    const pVelocities = [];

    for (let i = 0; i < pCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 1.0 + Math.random() * 2.0;
      pPositions[i * 3] = Math.cos(angle) * r;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pPositions[i * 3 + 2] = Math.sin(angle) * r;
      // Red particles
      pColors[i * 3] = 0.75 + Math.random() * 0.25;
      pColors[i * 3 + 1] = 0.1 + Math.random() * 0.1;
      pColors[i * 3 + 2] = 0.15 + Math.random() * 0.1;
      pVelocities.push({
        vx: (Math.random() - 0.5) * 0.003,
        vy: (Math.random() - 0.5) * 0.003,
        vz: (Math.random() - 0.5) * 0.003,
      });
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ─── Lighting ──────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(3, 3, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xc41e3a, 0.3);
    dirLight2.position.set(-3, -1, 2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xc41e3a, 0.5, 10);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // ─── Mouse tracking ────────────────────────────────────────────────
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      const nw = el.clientWidth, nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    let frame;
    let t = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      t += 0.006;

      // Slow rotation
      mobiusMesh.rotation.x = t * 0.4 + mouseY * 0.15;
      mobiusMesh.rotation.y = t * 0.6 + mouseX * 0.15;
      mobiusMesh.rotation.z = Math.sin(t * 0.3) * 0.1;
      wireMesh.rotation.copy(mobiusMesh.rotation);

      // Scroll-driven scale
      const scrollScale = 1 - Math.min(scrollY / 800, 0.4);
      mobiusMesh.scale.setScalar(scrollScale);
      wireMesh.scale.setScalar(scrollScale);

      // Animate particles
      const posAttr = pGeo.getAttribute("position");
      for (let i = 0; i < pCount; i++) {
        posAttr.array[i * 3] += pVelocities[i].vx;
        posAttr.array[i * 3 + 1] += pVelocities[i].vy;
        posAttr.array[i * 3 + 2] += pVelocities[i].vz;
        // Bounce
        if (Math.abs(posAttr.array[i * 3]) > 3) pVelocities[i].vx *= -1;
        if (Math.abs(posAttr.array[i * 3 + 1]) > 2) pVelocities[i].vy *= -1;
        if (Math.abs(posAttr.array[i * 3 + 2]) > 3) pVelocities[i].vz *= -1;
      }
      posAttr.needsUpdate = true;

      // Camera parallax
      camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 0.2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    sceneRef.current = { mobiusMesh, wireMesh, particles, camera, renderer };

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  // Scroll-driven scale
  useEffect(() => {
    const { mobiusMesh, wireMesh } = sceneRef.current;
    if (!mobiusMesh) return;
    const s = 1 - Math.min(scrollY / 800, 0.4);
    mobiusMesh.scale.setScalar(s);
    wireMesh.scale.setScalar(s);
  }, [scrollY]);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
    />
  );
}
