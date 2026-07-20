"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MagneticButton } from "./MagneticButton";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-36 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(34,211,238,0.3) 1px, transparent 0)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-cyan/[0.015] blur-[200px] animate-glow-breathe" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[#6D5EF0]/[0.02] blur-[150px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="section-index mb-4">Get started</p>
          <h2
            className="font-display font-bold tracking-tight mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Let&apos;s find the money hiding
            <br className="hidden md:block" />
            <span className="text-gradient"> in your operations.</span>
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Start with an AI Opportunity Audit — quick, affordable price, and a
            roadmap you keep whether you choose to build with us or not.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="glass-glow rounded-2xl p-6 md:p-12 max-w-2xl mx-auto relative overflow-hidden"
            >
              {/* Animated border accent based on focused field */}
              <motion.div
                animate={{
                  opacity: focusedField ? 0.3 : 0,
                  y: focusedField === "name" ? "0%" : focusedField === "company" ? "0%" : focusedField === "role" ? "25%" : focusedField === "message" ? "50%" : "0%",
                }}
                className="absolute left-0 top-0 w-px h-1/3 bg-gradient-to-b from-transparent via-cyan to-transparent"
                transition={{ duration: 0.5 }}
              />

              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div className="group">
                  <label
                    htmlFor="name"
                    className={`block font-mono text-[0.625rem] tracking-widest uppercase mb-2 transition-colors duration-300 ${
                      focusedField === "name" ? "text-cyan" : "text-text-secondary/50"
                    }`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3.5 text-text-primary text-sm placeholder:text-text-secondary/20 focus:border-cyan/30 focus:outline-none transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className={`block font-mono text-[0.625rem] tracking-widest uppercase mb-2 transition-colors duration-300 ${
                      focusedField === "company" ? "text-cyan" : "text-text-secondary/50"
                    }`}
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    onFocus={() => setFocusedField("company")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3.5 text-text-primary text-sm placeholder:text-text-secondary/20 focus:border-cyan/30 focus:outline-none transition-all duration-300"
                    placeholder="Your company"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="role"
                  className={`block font-mono text-[0.625rem] tracking-widest uppercase mb-2 transition-colors duration-300 ${
                    focusedField === "role" ? "text-cyan" : "text-text-secondary/50"
                  }`}
                >
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  onFocus={() => setFocusedField("role")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3.5 text-text-primary text-sm placeholder:text-text-secondary/20 focus:border-cyan/30 focus:outline-none transition-all duration-300"
                  placeholder="Your role"
                />
              </div>

              <div className="mb-8">
                <label
                  htmlFor="message"
                  className={`block font-mono text-[0.625rem] tracking-widest uppercase mb-2 transition-colors duration-300 ${
                    focusedField === "message" ? "text-cyan" : "text-text-secondary/50"
                  }`}
                >
                  What&apos;s slowing you down?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3.5 text-text-primary text-sm placeholder:text-text-secondary/20 focus:border-cyan/30 focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Tell us about the bottleneck, the process that eats hours, the report nobody trusts..."
                />
              </div>

              <MagneticButton
                as="button"
                className="btn-primary w-full text-base py-4"
                strength={0.15}
              >
                Send message
              </MagneticButton>

              <p className="text-center mt-4 font-mono text-[0.5625rem] text-text-secondary/30 tracking-widest">
                Replies within one business day. Lusaka & Seattle hours covered.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="glass-glow rounded-2xl p-12 md:p-16 text-center max-w-2xl mx-auto relative overflow-hidden"
            >
              {/* Success ripple effect */}
              <motion.div
                initial={{ scale: 0, opacity: 0.4 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-success/20"
              />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-full bg-success/10 border border-success/20 flex items-center justify-center mx-auto mb-6 relative z-10"
              >
                <svg
                  className="w-7 h-7 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 relative z-10">
                Message received.
              </h3>
              <p className="text-text-secondary relative z-10">
                We&apos;ll be in touch within one business day.
              </p>
            </motion.div>
          )}

          {/* Direct channels */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <MagneticButton
              as="a"
              className="btn-secondary text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
              href="https://wa.me/260000000000"
              target="_blank"
              rel="noopener noreferrer"
              strength={0.2}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </MagneticButton>
            <MagneticButton
              as="a"
              className="btn-secondary text-sm w-full sm:w-auto justify-center"
              href="mailto:hello@zizwaconsult.com"
              strength={0.2}
            >
              hello@zizwaconsult.com
            </MagneticButton>
            <MagneticButton
              as="a"
              className="btn-secondary text-sm w-full sm:w-auto justify-center"
              href="https://linkedin.com/company/zizwa-consult"
              target="_blank"
              rel="noopener noreferrer"
              strength={0.2}
            >
              LinkedIn
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
