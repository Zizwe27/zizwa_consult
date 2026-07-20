"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const lines = [
  { text: "Your business runs on paper, spreadsheets, and memory.", dim: true },
  { text: "Every day, that costs you hours, money, and deals.", dim: true },
  { text: "We replace that chaos with systems.", dim: false },
];

export function ProblemStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.3"],
  });

  return (
    <section ref={containerRef} className="relative py-28 md:py-40 overflow-hidden">
      {/* Animated grid that resolves */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.8, 1], [0, 0.02, 0.05]) }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34,211,238,0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34,211,238,0.4) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </motion.div>
        {/* Gradient mask from chaotic to ordered */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-cyan/[0.02] to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="space-y-12 md:space-y-20">
          {lines.map((line, i) => {
            const start = i / lines.length;
            const end = (i + 0.8) / lines.length;

            return (
              <motion.div
                key={i}
                style={{
                  opacity: useTransform(scrollYProgress, [start, start + 0.15], [0, 1]),
                  y: useTransform(scrollYProgress, [start, start + 0.15], [50, 0]),
                }}
              >
                <p
                  className={`font-display font-bold leading-[1.15] tracking-tight ${
                    line.dim
                      ? "text-text-secondary/70 text-2xl md:text-4xl lg:text-[3.25rem]"
                      : "text-gradient text-3xl md:text-5xl lg:text-6xl"
                  }`}
                >
                  {line.dim ? (
                    line.text
                  ) : (
                    <>
                      {/* Underline emphasis on the last line */}
                      <span className="relative">
                        {line.text}
                        <motion.span
                          style={{
                            scaleX: useTransform(scrollYProgress, [0.7, 1], [0, 1]),
                          }}
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan to-[#6D5EF0] origin-left"
                        />
                      </span>
                    </>
                  )}
                </p>
                {/* Strike-through effect on dim lines when final line appears */}
                {line.dim && (
                  <motion.div
                    style={{
                      scaleX: useTransform(scrollYProgress, [0.75, 0.95], [0, 1]),
                      opacity: useTransform(scrollYProgress, [0.75, 0.95], [0, 0.15]),
                    }}
                    className="h-px bg-text-secondary/30 mt-4 origin-left"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
