"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";

export function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.8", "end 0.2"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [40, -20]);

  return (
    <section id="work" className="relative py-24 md:py-36">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p className="section-index mb-4">Selected Work</p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Proof, not promises.
          </h2>
        </motion.div>

        {/* Case study card */}
        <motion.div
          ref={cardRef}
          style={{ y: cardY }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="glass-glow rounded-2xl overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Visual side */}
            <div className="relative min-h-[320px] md:min-h-[500px] bg-gradient-to-br from-[#0C1018] to-[#07090F] flex items-center justify-center p-8 overflow-hidden">
              {/* Grid background */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: "30px 30px",
                }}
              />

              {/* Delivery network visualization */}
              <div className="relative w-full max-w-[280px] aspect-square">
                {/* Outer rotating ring — represents delivery radius */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(34,211,238,0.06)" strokeWidth="0.5" />
                    <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(34,211,238,0.15)" strokeWidth="1"
                      strokeDasharray="8 20" />
                  </svg>
                </motion.div>

                {/* Inner counter-rotating ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[10%]"
                >
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(34,211,238,0.1)" strokeWidth="0.5"
                      strokeDasharray="4 15" />
                  </svg>
                </motion.div>

                {/* Delivery route lines */}
                <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 100 100">
                  {/* Hub to drop-off routes */}
                  <line x1="50" y1="50" x2="25" y2="20" stroke="#22D3EE" strokeWidth="0.4" strokeDasharray="2 2" />
                  <line x1="50" y1="50" x2="80" y2="25" stroke="#22D3EE" strokeWidth="0.4" strokeDasharray="2 2" />
                  <line x1="50" y1="50" x2="15" y2="60" stroke="#22D3EE" strokeWidth="0.4" strokeDasharray="2 2" />
                  <line x1="50" y1="50" x2="85" y2="65" stroke="#22D3EE" strokeWidth="0.4" strokeDasharray="2 2" />
                  <line x1="50" y1="50" x2="35" y2="85" stroke="#22D3EE" strokeWidth="0.4" strokeDasharray="2 2" />
                  <line x1="50" y1="50" x2="70" y2="80" stroke="#22D3EE" strokeWidth="0.4" strokeDasharray="2 2" />
                </svg>

                {/* Concentric pulse rings */}
                {[0, 1, 2, 3].map((ring) => (
                  <div
                    key={ring}
                    className="absolute rounded-full border border-cyan/[0.08]"
                    style={{
                      inset: `${20 + ring * 8}%`,
                      animation: `pulse-ring 3s ease-out ${ring * 0.5}s infinite`,
                    }}
                  />
                ))}

                {/* Static inner circle */}
                <div className="absolute inset-[35%] rounded-full border border-cyan/20" />

                {/* Center hub node — ember */}
                <div className="absolute inset-[44%] rounded-full bg-ember shadow-[0_0_30px_rgba(242,118,46,0.4),0_0_60px_rgba(242,118,46,0.15)]" />

                {/* Drop-off / pickup points */}
                {[
                  { top: "18%", left: "24%", delay: "0s", size: "3px" },
                  { top: "22%", left: "78%", delay: "0.6s", size: "3px" },
                  { top: "58%", left: "13%", delay: "1.2s", size: "2.5px" },
                  { top: "63%", left: "84%", delay: "0.3s", size: "2.5px" },
                  { top: "83%", left: "33%", delay: "0.9s", size: "3px" },
                  { top: "78%", left: "68%", delay: "1.5s", size: "3px" },
                ].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-cyan/60 animate-float"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      animationDelay: pos.delay,
                      width: pos.size,
                      height: pos.size,
                      boxShadow: "0 0 6px rgba(34,211,238,0.4)",
                    }}
                  />
                ))}

                {/* Moving delivery dot */}
                <motion.div
                  animate={{
                    x: [0, 30, 50, 20, -10, 0],
                    y: [0, -20, 10, 30, 15, 0],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                />

                {/* Three app labels */}
                <div className="absolute -bottom-2 left-0 right-0 flex justify-center gap-3">
                  {["Customer", "Driver", "Admin"].map((label) => (
                    <span
                      key={label}
                      className="font-mono text-[0.4375rem] tracking-widest text-cyan/30 uppercase bg-base/50 px-1.5 py-0.5 rounded"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sector label */}
              <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between">
                <p className="font-mono text-[0.5625rem] tracking-widest text-text-secondary/30 uppercase">
                  Last Mile Delivery
                </p>
                <p className="font-mono text-[0.5625rem] tracking-widest text-text-secondary/30 uppercase">
                  Zambia
                </p>
              </div>
            </div>

            {/* Content side */}
            <div className="p-6 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <p className="font-mono text-[0.625rem] text-cyan tracking-widest uppercase">
                  Case Study
                </p>
                <div className="flex-1 h-px bg-white/[0.04]" />
              </div>
              <h3 className="font-display text-2xl md:text-4xl font-bold mb-8">
                Tuma Logistics
              </h3>

              <div className="space-y-6">
                <div>
                  <p className="font-mono text-[0.5625rem] tracking-widest uppercase mb-2" style={{ color: 'rgba(154,163,178,0.4)' }}>
                    Challenge
                  </p>
                  <p className="leading-relaxed text-sm md:text-base" style={{ color: '#9AA3B2' }}>
                    A fast-growing last mile delivery startup coordinating
                    drivers, parcels, and customers across Lusaka with
                    WhatsApp messages and manual dispatch — no real-time
                    tracking, no driver management, no scalable ordering system.
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[0.5625rem] tracking-widest uppercase mb-2" style={{ color: 'rgba(154,163,178,0.4)' }}>
                    What we built
                  </p>
                  <p className="leading-relaxed text-sm md:text-base" style={{ color: '#9AA3B2' }}>
                    A full technology suite — customer-facing ordering app with
                    live tracking, a driver app with route optimization and
                    earnings dashboards, and an admin/support portal for
                    dispatch, analytics, and fleet management.
                  </p>
                </div>

                {/* Big metric */}
                <div className="pt-6 border-t border-white/[0.06]">
                  <p
                    className="text-gradient font-display font-bold tracking-tight mb-1"
                    style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
                  >
                    3 apps, 1 system
                  </p>
                  <p className="font-mono text-[0.625rem] text-text-secondary/50 tracking-widest uppercase">
                    Customer + Driver + Admin — fully integrated
                  </p>
                </div>

                {/* Supporting metrics with animated counters */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <p className="text-2xl md:text-3xl font-display font-bold text-cyan">
                      <AnimatedCounter value={60} suffix="%" />
                    </p>
                    <p className="font-mono text-[0.5625rem] text-text-secondary/40 tracking-widest mt-1 uppercase">
                      Faster dispatch
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <p className="text-2xl md:text-3xl font-display font-bold text-cyan">
                      Live
                    </p>
                    <p className="font-mono text-[0.5625rem] text-text-secondary/40 tracking-widest mt-1 uppercase">
                      Parcel tracking
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
