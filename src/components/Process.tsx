"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    n: "01",
    name: "Diagnose",
    copy: "Paid audit. We map where your money and hours leak. You get the roadmap whether or not you build with us.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="12" cy="12" r="9" stroke="rgba(34,211,238,0.4)" strokeWidth="1.5" />
        <line x1="18.5" y1="18.5" x2="25" y2="25" stroke="rgba(34,211,238,0.4)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="4" stroke="rgba(34,211,238,0.2)" strokeWidth="1" strokeDasharray="2 3" />
      </svg>
    ),
  },
  {
    n: "02",
    name: "Build",
    copy: "Affordable price, superior engineering. You see working software incrementally, and we update you all the way.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="8" width="22" height="14" rx="2" stroke="rgba(34,211,238,0.4)" strokeWidth="1.5" />
        <polyline points="8,15 12,12 16,16 20,11" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="3" y1="5" x2="10" y2="5" stroke="rgba(34,211,238,0.15)" strokeWidth="1" />
      </svg>
    ),
  },
  {
    n: "03",
    name: "Run",
    copy: "We maintain, improve, and stand behind what we ship — on retainer, with response-time guarantees.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="rgba(34,211,238,0.4)" strokeWidth="1.5" />
        <path d="M14 7v7l5 3" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="14" r="1.5" fill="rgba(34,211,238,0.4)" />
      </svg>
    ),
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.3"],
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative py-24 md:py-36 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-20"
        >
          <p className="section-index mb-4">How we work</p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Three steps. <span className="text-gradient">No surprises.</span>
          </h2>
        </motion.div>

        {/* Desktop: horizontal connected steps */}
        <div className="hidden md:block relative">
          {/* Background connecting line */}
          <div className="absolute top-[72px] left-[8%] right-[8%] h-px bg-white/[0.04]" />
          {/* Animated progress line */}
          <motion.div
            style={{ width: lineProgress }}
            className="absolute top-[72px] left-[8%] h-px bg-gradient-to-r from-cyan/60 via-cyan/40 to-cyan/20"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: i * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                {/* Node with pulse */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.3 + i * 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="w-12 h-12 rounded-full bg-base border border-cyan/20 flex items-center justify-center relative z-10"
                    >
                      {step.icon}
                    </motion.div>
                    <div className="absolute inset-0 rounded-full bg-cyan/5 animate-pulse-ring" style={{ animationDelay: `${i * 0.5}s` }} />
                  </div>
                </div>

                <div className="glass-glow rounded-2xl p-8 h-full relative group">
                  {/* Large background number */}
                  <span className="absolute top-4 right-6 font-display text-7xl font-bold text-white/[0.02] select-none leading-none transition-all duration-500 group-hover:text-white/[0.04]">
                    {step.n}
                  </span>

                  <p className="font-mono text-xs text-cyan tracking-wider mb-3 relative z-10">
                    Step {step.n}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 relative z-10">
                    {step.name}
                  </h3>
                  <p className="text-text-secondary leading-relaxed relative z-10">
                    {step.copy}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-white/[0.04]" />
          <motion.div
            style={{ height: lineProgress }}
            className="absolute left-5 top-0 w-px bg-gradient-to-b from-cyan/60 to-cyan/10"
          />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative pl-14"
              >
                {/* Timeline node */}
                <div className="absolute left-0 top-2 w-10 h-10 rounded-full bg-base border border-cyan/20 flex items-center justify-center z-10">
                  <span className="font-mono text-xs text-cyan font-medium">{step.n}</span>
                </div>

                <div className="glass-glow rounded-2xl p-6 relative">
                  <span className="absolute top-3 right-4 font-display text-5xl font-bold text-white/[0.02] select-none">
                    {step.n}
                  </span>
                  <h3 className="font-display text-xl font-bold mb-2">{step.name}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.copy}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
