"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";

const ParticleField = lazy(() =>
  import("@/components/three/ParticleField").then((mod) => ({
    default: mod.ParticleField,
  }))
);

const headlineWords = ["Intelligence,", "engineered."];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* Ambient background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090F] via-[#0a0e1a] to-[#07090F]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-cyan/[0.03] blur-[140px] animate-glow-breathe" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#6D5EF0]/[0.04] blur-[120px] animate-glow-breathe [animation-delay:2s]" />
        {/* Subtle radial lines */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(34,211,238,0.3) 1deg, transparent 2deg, transparent 30deg, rgba(34,211,238,0.2) 31deg, transparent 32deg, transparent 90deg, rgba(34,211,238,0.15) 91deg, transparent 92deg, transparent 160deg, rgba(34,211,238,0.2) 161deg, transparent 162deg, transparent 220deg, rgba(34,211,238,0.25) 221deg, transparent 222deg, transparent 290deg, rgba(34,211,238,0.15) 291deg, transparent 292deg)`,
        }} />
      </div>

      {/* 3D particle field — lazy loaded */}
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow with typing cursor */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 md:mb-10 flex items-center justify-center gap-2"
        >
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-cyan/50" />
          <p className="font-mono text-[0.6875rem] md:text-xs tracking-[0.25em] text-cyan uppercase">
            AI & Systems Consultancy
          </p>
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-cyan/50" />
          <span className="w-[2px] h-4 bg-cyan animate-typing-cursor" />
        </motion.div>

        {/* Headline — word by word stagger */}
        <h1 className="font-display font-bold leading-[1.0] tracking-tight mb-8 md:mb-10">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block text-gradient mr-[0.25em]"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 8rem)",
                perspective: "600px",
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-base md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10 md:mb-14"
        >
          Zizwa Consult builds the AI, automation, and data systems that make
          African businesses measurably faster, safer, and more profitable.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton as="a" className="btn-primary text-base px-8 py-4" href="#contact">
            Book an AI Opportunity Audit
          </MagneticButton>
          <MagneticButton as="a" className="btn-secondary" href="#services" strength={0.2}>
            See what we build
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block ml-1"
            >
              &#8595;
            </motion.span>
          </MagneticButton>
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-16 md:mt-20"
        >
          <div className="flex items-center justify-center gap-6 text-text-secondary/40">
            <div className="hidden sm:block w-12 h-px bg-white/[0.06]" />
            <p className="text-[0.6875rem] font-mono tracking-wider max-w-md text-center">
              Intelligence, engineered.
            </p>
            <div className="hidden sm:block w-12 h-px bg-white/[0.06]" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — more prominent on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[0.5rem] tracking-[0.3em] text-text-secondary/30 uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-text-secondary/20 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-cyan"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
