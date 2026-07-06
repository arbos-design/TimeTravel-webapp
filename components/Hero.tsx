"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-dark-green">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/images/paris_video.mp4" type="video/mp4" />
      </video>

      {/* Overlay: darken video + vortex effects */}
      <div className="vortex-bg">
        <div className="vortex-glow" />
        <div className="vortex-ring vortex-ring-1" />
        <div className="vortex-ring vortex-ring-2" />
        <div className="vortex-ring vortex-ring-3" />

        {/* Dark overlay to keep text readable */}
        <div className="absolute inset-0 bg-dark-green/65" />

        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(217,187,150,0.08) 0%, rgba(31,38,20,0.55) 60%, #1F2614 100%)",
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(217,187,150,0.26) 1px, transparent 1px), linear-gradient(90deg, rgba(217,187,150,0.26) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sand text-sm font-medium tracking-[0.4em] uppercase mb-6"
      >
          Agence de voyage temporel de luxe
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="font-cinzel text-6xl sm:text-7xl md:text-8xl font-black text-cream leading-tight mb-6"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Traversez
          <br />
          <motion.span
            className="text-sand inline-block"
            initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.85, ease: "easeOut" }}
          >
            les siècles.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          className="text-sand/80 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          De l&apos;ère des dinosaures à la naissance du monde moderne.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#destinations"
            className="px-8 py-4 bg-taupe text-dark-green font-semibold tracking-widest uppercase rounded hover:bg-sand transition-all duration-300 text-sm shadow-lg shadow-taupe/25"
          >
            Explorer les époques
          </a>
          <Link
            href="/chat"
            className="px-8 py-4 border border-sand/50 text-cream font-medium tracking-widest uppercase rounded hover:border-sand hover:text-sand transition-all duration-300 text-sm"
          >
            Parler à un agent
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-sand/70"
      >
        <span className="text-xs tracking-widest uppercase">Découvrir</span>
        <div className="scroll-indicator">
          <ChevronDown size={20} />
        </div>
      </motion.div>
    </section>
  );
}
