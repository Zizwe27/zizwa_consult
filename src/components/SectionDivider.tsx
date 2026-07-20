"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div ref={ref} className="relative h-24 md:h-32 flex items-center justify-center overflow-hidden">
      {/* Center pulse dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
        <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-cyan animate-ping opacity-50" />
      </motion.div>

      {/* Left line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[10%] right-1/2 h-px origin-right"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.2))",
        }}
      />

      {/* Right line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 right-[10%] h-px origin-left"
        style={{
          background: "linear-gradient(90deg, rgba(34,211,238,0.2), transparent)",
        }}
      />
    </div>
  );
}
