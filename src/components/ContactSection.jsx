import React, { useState } from "react";
import { motion } from "framer-motion";

const EMAIL = "kushaankaushik007@gmail.com"; // ← put your real email here
const GITHUB = "https://github.com/kuxhaan7"; // confirmed
const LINKEDIN = "#"; // ← add your LinkedIn URL
const CAL = "/"; // ← or Calendly link
const RESUME_URL = "/resume/Kushaan_Kaushik_Resume.pdf";


export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [msg, setMsg] = useState("");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  const sendMailto = () => {
    const subject = "Hello from your portfolio";
    const body = msg ? msg : "Hi Kushaan,\n\nI'd love to connect!";
    const url = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  return (
    <section className="contact-section" id="contact" aria-label="Contact">
      {/* soft animated rings background */}
      <div className="contact-bg" aria-hidden>
        <span className="ring r1" />
        <span className="ring r2" />
        <span className="ring r3" />
      </div>

      <div className="container contact-wrap">
        <motion.h2
          className="contact-title"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 0.8, 0.26, 0.99] }}
        >
          Let’s build something great.
          <span className="accent-underline" />
        </motion.h2>

        <motion.p
          className="contact-sub"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45 }}
        >
          I’m open to full-stack, systems, iOS/QA, and AI Projects. Based in <strong>New York City</strong>.
        </motion.p>

        <motion.div
          className="contact-card"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
        >
          {/* email line with copy & open */}
          <div className="email-row">
            <div className="email-left">
              <span className="status-dot" aria-hidden />
              <span className="email-text">{EMAIL}</span>
            </div>
            <div className="email-actions">
              <button className="btn ghost" onClick={copyEmail} aria-label="Copy email">
                {copied ? "Copied ✓" : "Copy"}
              </button>
              <button className="btn solid" onClick={sendMailto} aria-label="Open email">
                Email me
              </button>
            </div>
          </div>

          {/* tiny composer (builds a mailto so no backend needed) */}
          <div className="quick-msg">
            <textarea
              placeholder="Write a quick note… "
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={3}
            />
            <button className="btn solid wide" onClick={sendMailto}>
              Send message
            </button>
          </div>

          {/* social / scheduling */}
          <div className="contact-ctas">
            <a className="chip-link" href={GITHUB} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a className="chip-link" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            {/* <a className="chip-link" href={CAL} target="_blank" rel="noreferrer">Book a call ↗</a> */}
            <a className="chip-link" href={RESUME_URL}>Resume ↗</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
