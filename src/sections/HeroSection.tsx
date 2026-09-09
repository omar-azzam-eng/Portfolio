import { ArrowDownRight, Download } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const TICKER_TEXT =
  'NODE.JS — TYPESCRIPT — POSTGRESQL — NESTJS — WEBSOCKETS — REST — SYSTEM DESIGN';

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-scan" aria-hidden="true" />

      <motion.div
        className="hero-kicker"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="status-dot" aria-hidden="true" />
        BACKEND DEVELOPER · AI ENGINEERING
      </motion.div>

      <div className="hero-layout">
        <div className="hero-copy">
          <motion.p
            className="hero-overline"
            initial={reduceMotion ? false : { y: 24, opacity: 0 }}
            animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
          >
            OMAR AZZAM / 2026
          </motion.p>
          <motion.h1
            id="hero-title"
            initial={reduceMotion ? false : { y: 44, opacity: 0 }}
            animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.06 }}
          >
            I build systems
            <span>behind the interface.</span>
          </motion.h1>
          <motion.p
            className="hero-intro"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
          >
            Scalable APIs, secure data flows, real-time architecture, and machine-learning systems
            built with a focus on reliability.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            transition={{ delay: 0.28 }}
          >
            <a className="primary-link" href="#work" data-cursor="VIEW WORK">
              Selected work <ArrowDownRight size={17} aria-hidden="true" />
            </a>
            <a
              className="secondary-link"
              href={`${import.meta.env.BASE_URL}omar-azzam-resume.pdf`}
              download
              data-cursor="DOWNLOAD CV"
            >
              CV <Download size={16} aria-hidden="true" />
            </a>
            <a
              className="text-link"
              href="mailto:omar.azzam.eng@gmail.com"
              data-cursor="EMAIL OMAR"
            >
              omar.azzam.eng@gmail.com
            </a>
          </motion.div>
        </div>
      </div>

      <div className="hero-identity" aria-hidden="true">
        OA
      </div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>{TICKER_TEXT}</span>
          <span>{TICKER_TEXT}</span>
          <span>{TICKER_TEXT}</span>
          <span>{TICKER_TEXT}</span>
        </div>
      </div>
    </section>
  );
}
