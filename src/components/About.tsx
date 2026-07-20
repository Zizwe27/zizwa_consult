"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const stats = [
  { value: "World-class", label: "Engineering pedigree" },
  //{ value: "Lusaka + Seattle", label: "Two time zones, one team" },
  { value: "Affordable", label: "Price per engagement" },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const founderY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="about" className="relative py-24 md:py-36">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Text side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="section-index mb-4">About</p>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.1]">
                World-class engineered.
                <br />
                <span className="text-gradient">Zambian-run.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-5"
            >
              <p className="text-text-secondary leading-relaxed text-lg">
                Zizwa Consult is led by world class engineering
                talent trained inside world-renowned tech corporations like Microsoft and Oracle, and delivered on
                the ground in Zambia.
              </p>
              <p className="text-text-secondary leading-relaxed">
                We exist because African businesses deserve world-class
                systems — built by people who understand load-shedding, low
                bandwidth, WhatsApp-first customers, and kwacha volatility.
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-text-primary font-medium text-lg relative"
              >
                We build for the reality here, at the standard there.
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-cyan/40 to-transparent origin-left"
                />
              </motion.p>
            </motion.div>

            {/* Stats — mobile horizontal scroll, desktop grid */}
            <div className="mt-10 grid grid-cols-3 gap-3 md:gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="text-center p-3 md:p-5 rounded-xl glass-glow"
                >
                  <p className="font-display text-xs md:text-sm font-bold text-cyan mb-1.5 leading-tight">
                    {stat.value}
                  </p>
                  <p className="font-mono text-[0.5rem] md:text-[0.5625rem] text-text-secondary/40 tracking-wider uppercase leading-tight">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual / founder side */}
          <motion.div
            style={{ y: founderY }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Founder card — elevated design */}
            <div className="glass-glow rounded-2xl p-8 relative overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan/[0.03] to-transparent" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#6D5EF0]/[0.03] to-transparent" />

              <div className="relative z-10">
                <div className="flex items-start gap-5 mb-6">
                  {/* Photo placeholder with animated ring */}
                  <div className="relative shrink-0">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-cyan/20 to-[#6D5EF0]/20 border border-cyan/20 flex items-center justify-center">
                      <span className="font-display text-2xl md:text-3xl font-bold text-cyan/50">
                        Z
                      </span>
                    </div>
                    {/* Rotating dashed ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-2"
                    >
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(34,211,238,0.1)" strokeWidth="0.5" strokeDasharray="4 8" />
                      </svg>
                    </motion.div>
                    {/* Status dot */}
                    <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-success border-2 border-base" />
                  </div>

                  <div className="pt-1">
                    <p className="font-display text-lg md:text-xl font-bold mb-0.5">Zizwe Mtonga</p>
                    <p className="text-text-secondary text-sm">
                      Founder and CEO
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[0.625rem] font-mono text-text-secondary/40 px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.04]">
                        Microsoft
                      </span>
                      <span className="text-[0.625rem] font-mono text-text-secondary/40 px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.04]">
                        Oracle
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-white/[0.04] mb-5" />

                <p className="text-text-secondary text-sm leading-relaxed">
                  Our founder has had the privilege of building enterprise systems at scale inside two of the world&apos;s
                  largest technology companies, and is passionate aboutapplying that discipline to
                  the problems African businesses actually face.
                </p>

                {/* Location indicator */}
                {/* <div className="mt-5 flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan/60" />
                    <span className="font-mono text-[0.5625rem] text-text-secondary/40 tracking-wider">SEATTLE</span>
                  </div>
                  <div className="flex-1 h-px bg-white/[0.03] relative">
                    <motion.div
                      animate={{ x: ["0%", "100%", "0%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-0 w-4 h-px bg-cyan/30"
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[0.5625rem] text-text-secondary/40 tracking-wider">LUSAKA</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-ember/60" />
                  </div>
                </div> */}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
