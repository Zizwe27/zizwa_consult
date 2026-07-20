"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "./MagneticButton";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);

      // Scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? window.scrollY / docHeight : 0);

      // Active section detection
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass shadow-lg shadow-black/30"
            : "bg-transparent"
        }`}
      >
        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-cyan to-[#6D5EF0] transition-none"
          style={{ width: `${scrollProgress * 100}%`, opacity: scrolled ? 0.5 : 0 }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-baseline gap-1.5 group relative">
              <span className="font-display text-xl font-bold tracking-tight text-text-primary group-hover:text-cyan transition-colors duration-300">
                ZIZWA
              </span>
              <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-text-secondary uppercase">
                CONSULT
              </span>
              {/* Logo glow on hover */}
              <div className="absolute -inset-4 bg-cyan/[0.05] rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm transition-colors duration-300 ${
                    activeSection === link.href.slice(1)
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                  {/* Active indicator dot */}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      layoutId="nav-dot"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <MagneticButton as="a" className="btn-primary text-sm" href="#contact">
                Book an AI Audit
              </MagneticButton>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-12 h-12 flex items-center justify-center -mr-2"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <div className="flex flex-col gap-1.5 w-6">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                  className="block w-full h-[1.5px] bg-text-primary origin-center"
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                  className="block w-full h-[1.5px] bg-text-primary origin-center"
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-base/98 backdrop-blur-2xl md:hidden"
          >
            {/* Decorative background */}
            <div className="absolute top-1/4 right-0 w-64 h-64 bg-cyan/[0.03] rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-[#6D5EF0]/[0.04] rounded-full blur-[80px]" />

            <div className="flex flex-col items-center justify-center h-full px-8">
              <div className="flex flex-col items-center gap-6 w-full">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-4xl font-bold text-text-primary hover:text-cyan transition-colors w-full text-center py-2"
                  >
                    <span className="font-mono text-xs text-cyan/40 mr-3">0{i + 1}/</span>
                    {link.label}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-6 w-full max-w-xs"
                >
                  <a
                    href="#contact"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary w-full text-center block"
                  >
                    Book an AI Audit
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
