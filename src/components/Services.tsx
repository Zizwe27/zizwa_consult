"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const services = [
  {
    index: "01",
    name: "AI Opportunity Audit",
    tag: "START HERE",
    hook: "Know exactly where AI makes you money — before you spend on it.",
    description:
      "A quick diagnostic of your operations. We interview your team, map your systems, and deliver a prioritized roadmap of automation and AI opportunities with ROI estimates attached. Affordable price. Zero jargon.",
    outcomes: ["Prioritized AI roadmap", "ROI estimate per opportunity", "Build/buy/skip verdicts"],
    icon: "radar",
  },
  {
    index: "02",
    name: "Document Intelligence",
    tag: "FLAGSHIP",
    hook: "From 3 days of data entry to 30 minutes.",
    description:
      "AI pipelines that read, extract, and process the documents drowning your team — loan applications, KYC files, invoices, claims, bank statements — with human-grade accuracy and machine speed.",
    outcomes: ["90%+ processing time cut", "Fewer errors than manual entry", "Staff redeployed to real work"],
    icon: "doc",
  },
  {
    index: "03",
    name: "Lending Operations Suite",
    hook: "The systems modern lenders run on.",
    description:
      "Loan pipeline tracking, automated WhatsApp/SMS repayment nudges, arrears dashboards, and credit scoring built on your own repayment data. Built for MFIs, payroll lenders, and asset financiers.",
    outcomes: ["Higher on-time repayment", "Live arrears visibility", "Faster loan turnaround"],
    icon: "pipeline",
  },
  {
    index: "04",
    name: "Operations Dashboards",
    hook: "Yesterday's numbers on your phone every morning.",
    description:
      "We turn your Excel chaos into one live picture of the business — sales, stock, cash, branch performance — so decisions stop waiting for month-end.",
    outcomes: ["Single source of truth", "Daily numbers, zero compiling", "Problems visible in hours, not months"],
    icon: "dashboard",
  },
  {
    index: "05",
    name: "Process Automation",
    hook: "Remove the human middleware.",
    description:
      "Your accounting, sales, inventory, and banking systems — finally talking to each other. Automated quotes, invoices, reconciliation, and reports that used to eat your team's week.",
    outcomes: ["Hundreds of hours back per year", "Fewer reconciliation errors", "Systems that scale without headcount"],
    icon: "automation",
  },
  {
    index: "06",
    name: "AI Assistants",
    hook: "Your best employee's brain, available to everyone, 24/7.",
    description:
      "Internal copilots trained on your SOPs, products, policies, and pricing — answering staff and customer questions instantly on WhatsApp or web.",
    outcomes: ["Instant, consistent answers", "Faster onboarding", "Support load down"],
    icon: "chat",
  },
  {
    index: "07",
    name: "Technology Advisory",
    hook: "A technology brain on retainer.",
    description:
      "Ongoing advisory for organizations that need senior judgment without a senior hire: vendor evaluation, architecture, security hygiene, roadmap, and hiring input.",
    outcomes: ["Independent vendor verdicts", "A technology roadmap that holds", "Costly mistakes avoided"],
    icon: "compass",
  },
];

function ServiceIcon({ type, active }: { type: string; active: boolean }) {
  const color = active ? "rgba(34,211,238,0.6)" : "rgba(34,211,238,0.15)";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-all duration-500">
      {type === "radar" && (
        <>
          <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1" />
          <circle cx="10" cy="10" r="4" stroke={color} strokeWidth="1" />
          <line x1="10" y1="10" x2="16" y2="4" stroke={color} strokeWidth="1.5" />
        </>
      )}
      {type === "doc" && (
        <>
          <rect x="4" y="2" width="12" height="16" rx="1" stroke={color} strokeWidth="1" />
          <line x1="7" y1="6" x2="13" y2="6" stroke={color} strokeWidth="1" />
          <line x1="7" y1="9" x2="13" y2="9" stroke={color} strokeWidth="1" />
          <line x1="7" y1="12" x2="10" y2="12" stroke={color} strokeWidth="1" />
        </>
      )}
      {type === "pipeline" && (
        <>
          <circle cx="4" cy="10" r="2" stroke={color} strokeWidth="1" />
          <circle cx="16" cy="10" r="2" stroke={color} strokeWidth="1" />
          <line x1="6" y1="10" x2="14" y2="10" stroke={color} strokeWidth="1" />
          <polyline points="12,7 14,10 12,13" stroke={color} strokeWidth="1" fill="none" />
        </>
      )}
      {type === "dashboard" && (
        <>
          <rect x="2" y="2" width="16" height="16" rx="2" stroke={color} strokeWidth="1" />
          <rect x="4" y="10" width="3" height="6" fill={color} rx="0.5" />
          <rect x="8.5" y="6" width="3" height="10" fill={color} rx="0.5" />
          <rect x="13" y="8" width="3" height="8" fill={color} rx="0.5" />
        </>
      )}
      {type === "automation" && (
        <>
          <circle cx="5" cy="5" r="2" stroke={color} strokeWidth="1" />
          <circle cx="15" cy="5" r="2" stroke={color} strokeWidth="1" />
          <circle cx="10" cy="15" r="2" stroke={color} strokeWidth="1" />
          <line x1="7" y1="5" x2="13" y2="5" stroke={color} strokeWidth="1" />
          <line x1="5" y1="7" x2="10" y2="13" stroke={color} strokeWidth="1" />
          <line x1="15" y1="7" x2="10" y2="13" stroke={color} strokeWidth="1" />
        </>
      )}
      {type === "chat" && (
        <>
          <path d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H7l-4 3V5a1 1 0 011-1z" stroke={color} strokeWidth="1" fill="none" />
          <circle cx="7" cy="9" r="1" fill={color} />
          <circle cx="10" cy="9" r="1" fill={color} />
          <circle cx="13" cy="9" r="1" fill={color} />
        </>
      )}
      {type === "compass" && (
        <>
          <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1" />
          <polygon points="10,4 12,9 10,10 8,9" fill={color} />
          <polygon points="10,16 8,11 10,10 12,11" fill={color} opacity="0.4" />
        </>
      )}
    </svg>
  );
}

export function Services() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [mobileActive, setMobileActive] = useState(0);

  const current = services[active];

  // Mobile scroll snap tracking
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth * 0.85 + 16; // card width + gap
      const index = Math.round(scrollLeft / cardWidth);
      setMobileActive(Math.min(index, services.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="services" className="relative py-24 md:py-36">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p className="section-index mb-4">What we build</p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Seven ways we turn
            <br />
            <span className="text-gradient">operations into signal.</span>
          </h2>
        </motion.div>

        {/* Desktop: side-by-side console */}
        <div className="hidden lg:grid lg:grid-cols-[340px_1fr] gap-8">
          {/* Left rail */}
          <div className="space-y-1">
            {services.map((s, i) => (
              <button
                key={s.index}
                onClick={() => setActive(i)}
                className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-400 group relative ${
                  i === active
                    ? "glass-glow"
                    : "hover:bg-white/[0.02]"
                }`}
              >
                {/* Active indicator bar */}
                {i === active && (
                  <motion.div
                    layoutId="service-indicator"
                    className="absolute left-0 top-[20%] bottom-[20%] w-[2px] rounded-full bg-cyan"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <div className="flex items-center gap-3">
                  <ServiceIcon type={s.icon} active={i === active} />
                  <span
                    className={`text-sm font-medium transition-colors duration-300 ${
                      i === active
                        ? "text-text-primary"
                        : "text-text-secondary group-hover:text-text-primary"
                    }`}
                  >
                    {s.name}
                  </span>
                  {s.tag && (
                    <span
                      className={`ml-auto font-mono text-[0.5625rem] tracking-wider px-2 py-0.5 rounded-full ${
                        s.tag === "START HERE"
                          ? "bg-cyan/10 text-cyan"
                          : "bg-ember/10 text-ember"
                      }`}
                    >
                      {s.tag}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Right panel */}
          <div className="glass-glow rounded-2xl p-8 md:p-12 min-h-[480px] relative overflow-hidden">
            {/* Scan line effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              <div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent"
                style={{ animation: "scan-line 4s linear infinite" }}
              />
            </div>

            {/* Background number */}
            <span className="absolute top-6 right-8 font-display text-[8rem] font-bold text-white/[0.02] select-none leading-none">
              {current.index}
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-cyan text-sm">
                    {current.index}/
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold">
                    {current.name}
                  </h3>
                  {current.tag && (
                    <span
                      className={`font-mono text-[0.5625rem] tracking-wider px-2.5 py-1 rounded-full ${
                        current.tag === "START HERE"
                          ? "bg-cyan/10 text-cyan border border-cyan/20"
                          : "bg-ember/10 text-ember border border-ember/20"
                      }`}
                    >
                      {current.tag}
                    </span>
                  )}
                </div>

                <p className="text-lg text-cyan/80 font-medium mb-5 leading-relaxed">
                  {current.hook}
                </p>

                <p className="text-text-secondary leading-relaxed mb-8 max-w-xl">
                  {current.description}
                </p>

                <div>
                  <p className="font-mono text-[0.625rem] text-text-secondary/50 tracking-widest uppercase mb-4">
                    Outcomes
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {current.outcomes.map((o, oi) => (
                      <motion.span
                        key={o}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + oi * 0.05, duration: 0.3 }}
                        className="text-sm text-text-primary/80 bg-white/[0.04] border border-white/[0.08] px-3.5 py-1.5 rounded-full hover:border-cyan/20 hover:bg-cyan/[0.03] transition-all duration-300"
                      >
                        {o}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: horizontal scroll cards */}
        <div className="lg:hidden -mx-6">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scroll-snap-x px-6 pb-4"
          >
            {services.map((s, i) => (
              <motion.div
                key={s.index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="snap-center flex-shrink-0 w-[85vw] max-w-[400px]"
              >
                <div className="glass-glow rounded-2xl p-6 h-full relative overflow-hidden">
                  {/* Background number */}
                  <span className="absolute top-3 right-4 font-display text-5xl font-bold text-white/[0.03] select-none">
                    {s.index}
                  </span>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <ServiceIcon type={s.icon} active={true} />
                      <h3 className="font-display text-lg font-bold">{s.name}</h3>
                      {s.tag && (
                        <span
                          className={`ml-auto font-mono text-[0.5rem] tracking-wider px-2 py-0.5 rounded-full ${
                            s.tag === "START HERE"
                              ? "bg-cyan/10 text-cyan"
                              : "bg-ember/10 text-ember"
                          }`}
                        >
                          {s.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-cyan/80 font-medium text-sm mb-3 leading-relaxed">
                      {s.hook}
                    </p>
                    <p className="text-text-secondary text-sm leading-relaxed mb-5">
                      {s.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {s.outcomes.map((o) => (
                        <span
                          key={o}
                          className="text-xs text-text-primary/70 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-full"
                        >
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll dots indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-4 px-6">
            {services.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === mobileActive
                    ? "w-6 bg-cyan"
                    : "w-1.5 bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Pricing note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10 font-mono text-xs text-text-secondary/40 tracking-wider"
        >
          All at the most affordable and competitive rates.
        </motion.p>
      </div>
    </section>
  );
}
