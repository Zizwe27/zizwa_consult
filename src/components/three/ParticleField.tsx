"use client";

import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Approximate Africa continent outline as point cloud
function generateAfricaPoints(count: number): Float32Array {
  const points = new Float32Array(count * 3);
  // Simplified Africa shape using parametric curves
  // Coordinates normalized to roughly -1 to 1 range

  const africaOutline = [
    // North Africa (Mediterranean coast)
    [-0.1, 0.9], [0.0, 0.92], [0.15, 0.9], [0.3, 0.85], [0.4, 0.8],
    // Northeast (Horn)
    [0.45, 0.7], [0.5, 0.6], [0.55, 0.45], [0.5, 0.3], [0.45, 0.2],
    // East coast
    [0.4, 0.1], [0.45, 0.0], [0.4, -0.1], [0.35, -0.2], [0.4, -0.3],
    [0.35, -0.4], [0.3, -0.5], [0.25, -0.6],
    // South
    [0.2, -0.7], [0.1, -0.8], [0.0, -0.85], [-0.1, -0.8],
    // West coast (going north)
    [-0.15, -0.7], [-0.2, -0.6], [-0.15, -0.5], [-0.2, -0.4],
    [-0.25, -0.3], [-0.3, -0.2], [-0.35, -0.1],
    // West Africa bulge
    [-0.4, 0.0], [-0.45, 0.1], [-0.5, 0.2], [-0.45, 0.3],
    [-0.4, 0.35], [-0.35, 0.4], [-0.3, 0.45], [-0.25, 0.5],
    // Northwest
    [-0.2, 0.6], [-0.2, 0.7], [-0.15, 0.8], [-0.1, 0.85],
  ];

  // Zambia approximate center (normalized)
  const zambiaCenter = [0.15, -0.25];
  const zambiaRadius = 0.08;

  for (let i = 0; i < count; i++) {
    const idx = i * 3;

    // 20% points near Zambia (denser cluster)
    if (i < count * 0.2) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * zambiaRadius;
      points[idx] = zambiaCenter[0] + Math.cos(angle) * r;
      points[idx + 1] = zambiaCenter[1] + Math.sin(angle) * r;
      points[idx + 2] = (Math.random() - 0.5) * 0.05;
    } else {
      // Fill the continent shape
      // Pick a random segment and place point near it
      const segIdx = Math.floor(Math.random() * (africaOutline.length - 1));
      const t = Math.random();
      const p1 = africaOutline[segIdx];
      const p2 = africaOutline[(segIdx + 1) % africaOutline.length];

      const baseX = p1[0] + (p2[0] - p1[0]) * t;
      const baseY = p1[1] + (p2[1] - p1[1]) * t;

      // Add some noise to fill interior
      const spread = 0.15;
      points[idx] = baseX + (Math.random() - 0.5) * spread;
      points[idx + 1] = baseY + (Math.random() - 0.5) * spread;
      points[idx + 2] = (Math.random() - 0.5) * 0.08;
    }
  }

  return points;
}

function generateChaosPoints(count: number): Float32Array {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const idx = i * 3;
    // Spherical distribution
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 0.5 + Math.random() * 1.5;
    points[idx] = r * Math.sin(phi) * Math.cos(theta);
    points[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
    points[idx + 2] = r * Math.cos(phi) * 0.3;
  }
  return points;
}

// Zambia center in the Africa formation
const ZAMBIA_CENTER = new THREE.Vector3(0.15, -0.25, 0);
const ZAMBIA_RADIUS = 0.12;

const vertexShader = `
  attribute float aProgress;
  attribute vec3 aTarget;
  attribute vec3 aChaos;
  attribute float aZambia;

  uniform float uTime;
  uniform float uMorph;
  uniform vec2 uMouse;

  varying float vZambia;
  varying float vAlpha;

  void main() {
    vec3 pos = mix(aChaos, aTarget, uMorph);

    // Ambient drift
    float drift = sin(uTime * 0.5 + position.x * 3.0) * 0.02 * (1.0 - uMorph * 0.7);
    pos.x += drift;
    pos.y += cos(uTime * 0.3 + position.y * 2.0) * 0.015 * (1.0 - uMorph * 0.7);

    // Mouse parallax
    pos.x += uMouse.x * 0.05;
    pos.y += uMouse.y * 0.05;

    vZambia = aZambia;
    vAlpha = 0.3 + uMorph * 0.5 + aZambia * uMorph * 0.2;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (2.0 + aZambia * uMorph * 3.0) * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform float uMorph;

  varying float vZambia;
  varying float vAlpha;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;

    // Cyan base, ember for Zambia nodes
    vec3 cyan = vec3(0.133, 0.827, 0.933);
    vec3 ember = vec3(0.949, 0.463, 0.180);
    vec3 color = mix(cyan, ember, vZambia * uMorph);

    gl_FragColor = vec4(color, alpha);
  }
`;

function Particles({ count }: { count: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const morphRef = useRef(0);
  const introCompleteRef = useRef(false);

  const { chaosPositions, targetPositions, zambiaFlags } = useMemo(() => {
    const chaos = generateChaosPoints(count);
    const target = generateAfricaPoints(count);
    const zambia = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const tx = target[i * 3];
      const ty = target[i * 3 + 1];
      const dx = tx - ZAMBIA_CENTER.x;
      const dy = ty - ZAMBIA_CENTER.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      zambia[i] = dist < ZAMBIA_RADIUS ? 1.0 : 0.0;
    }

    return { chaosPositions: chaos, targetPositions: target, zambiaFlags: zambia };
  }, [count]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useFrame((state) => {
    if (!materialRef.current) return;

    const elapsed = state.clock.elapsedTime;
    materialRef.current.uniforms.uTime.value = elapsed;
    materialRef.current.uniforms.uMouse.value = [
      mouseRef.current.x * 0.03,
      mouseRef.current.y * 0.03,
    ];

    // Intro morph: 0 -> 1 over 2.5s starting at 0.5s
    if (!introCompleteRef.current) {
      const t = Math.max(0, Math.min(1, (elapsed - 0.5) / 2.5));
      const eased = t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
      morphRef.current = eased;
      if (t >= 1) introCompleteRef.current = true;
    }

    materialRef.current.uniforms.uMorph.value = morphRef.current;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={chaosPositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aChaos"
          count={count}
          array={chaosPositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aTarget"
          count={count}
          array={targetPositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aZambia"
          count={count}
          array={zambiaFlags}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uMorph: { value: 0 },
          uMouse: { value: [0, 0] },
        }}
      />
    </points>
  );
}

function Scene({ particleCount }: { particleCount: number }) {
  return (
    <>
      <Particles count={particleCount} />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
          intensity={0.4}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export function ParticleField() {
  const [mounted, setMounted] = useState(false);
  const [canRender3D, setCanRender3D] = useState(true);
  const [particleCount, setParticleCount] = useState(15000);

  useEffect(() => {
    setMounted(true);

    // Check for WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) {
        setCanRender3D(false);
        return;
      }
    } catch {
      setCanRender3D(false);
      return;
    }

    // Check connection quality
    const nav = navigator as Navigator & {
      connection?: { effectiveType?: string };
    };
    const conn = nav.connection;
    if (conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g") {
      setCanRender3D(false);
      return;
    }

    // Adjust particle count based on device
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency
      ? navigator.hardwareConcurrency <= 4
      : false;

    if (isMobile && isLowEnd) {
      setParticleCount(3000);
    } else if (isMobile) {
      setParticleCount(5000);
    } else if (isLowEnd) {
      setParticleCount(8000);
    } else {
      setParticleCount(20000);
    }

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCanRender3D(false);
    }
  }, []);

  if (!mounted) return null;

  if (!canRender3D) {
    // Lightweight SVG/CSS fallback
    return <FallbackBackground />;
  }

  return (
    <div className="absolute inset-0 z-[1]">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Scene particleCount={particleCount} />
      </Canvas>
    </div>
  );
}

function FallbackBackground() {
  return (
    <div className="absolute inset-0 z-[1] overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-cyan/[0.04] blur-[100px] animate-float" />
      <div className="absolute bottom-1/3 right-1/3 w-72 h-72 rounded-full bg-[#6D5EF0]/[0.05] blur-[80px] animate-float [animation-delay:2s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-ember shadow-lg shadow-ember/40" />

      {/* Signal lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="1" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1={`${10 + i * 12}%`}
            y1="0%"
            x2={`${20 + i * 10}%`}
            y2="100%"
            stroke="url(#line-grad)"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  );
}
