"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const serviceLinks = [
  "AI Opportunity Audit",
  "Document Intelligence",
  "Lending Operations Suite",
  "Operations Dashboards",
  "Process Automation",
  "AI Assistants",
  "Technology Advisory",
];

const companyLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
];

const contactLinks = [
  { label: "WhatsApp", href: "https://wa.me/260000000000" },
  { label: "Email", href: "mailto:hello@zizwaconsult.com" },
  { label: "LinkedIn", href: "https://linkedin.com/company/zizwa-consult" },
];

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <footer ref={ref} className="relative border-t border-white/[0.04] bg-[#050710]">
      {/* Top gradient line */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-cyan/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="col-span-2 md:col-span-1"
          >
            <div className="flex items-baseline gap-1.5 mb-4 group">
              <span className="font-display text-xl font-bold tracking-tight group-hover:text-cyan transition-colors duration-300">
                ZIZWA
              </span>
              <span className="font-mono text-[0.5rem] tracking-[0.25em] text-text-secondary/50 uppercase">
                CONSULT
              </span>
            </div>
            <p className="text-sm text-text-secondary/40 font-mono tracking-wider mb-6">
              Intelligence, engineered.
            </p>
            {/* Back to top */}
            <a
              href="#hero"
              className="inline-flex items-center gap-2 text-xs text-text-secondary/30 hover:text-cyan transition-colors duration-300 font-mono tracking-wider group"
            >
              <span className="group-hover:-translate-y-0.5 transition-transform duration-300">&#8593;</span>
              Back to top
            </a>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="font-mono text-[0.5625rem] tracking-widest text-text-secondary/30 uppercase mb-4">
              Services
            </p>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#services"
                    className="text-sm text-text-secondary/50 hover:text-text-primary transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="font-mono text-[0.5625rem] tracking-widest text-text-secondary/30 uppercase mb-4">
              Company
            </p>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary/50 hover:text-text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="font-mono text-[0.5625rem] tracking-widest text-text-secondary/30 uppercase mb-4">
              Contact
            </p>
            <ul className="space-y-2">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-sm text-text-secondary/50 hover:text-text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/[0.03] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[0.6875rem] text-text-secondary/25 font-mono">
            &copy; 2026 Zizwa Consult. Registered in Zambia.
          </p>
          <p className="font-mono text-[0.5rem] text-text-secondary/15 tracking-[0.3em] hover:text-cyan/30 transition-colors duration-700 cursor-default">
            &gt; signal.integrity: 100% — built by Zizwa, obviously.
          </p>
        </div>
      </div>
    </footer>
  );
}
