"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Clock } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#destinations", label: "Destinations" },
    { href: "#experience", label: "Expérience" },
    { href: "#reserver", label: "Réserver" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-dark-green/92 backdrop-blur-md border-b border-sand/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Clock
              className="text-sand transition-transform group-hover:rotate-12 duration-500"
              size={24}
            />
            <span
              className="font-cinzel text-lg font-bold text-sand tracking-widest"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              TimeTravelAgency
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-cream/80 hover:text-sand transition-colors duration-300 tracking-wider uppercase"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/chat"
              className="px-5 py-2 border border-sand text-sand text-sm font-medium tracking-wider uppercase rounded hover:bg-taupe hover:border-taupe hover:text-dark-green transition-all duration-300"
            >
              Commencer le voyage
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-sand p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark-green/95 backdrop-blur-md border-t border-sand/20"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-cream/80 hover:text-sand transition-colors py-2 text-lg tracking-wider"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/chat"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-5 py-3 border border-sand text-sand text-center font-medium tracking-wider uppercase rounded hover:bg-taupe hover:border-taupe hover:text-dark-green transition-all duration-300"
              >
                Commencer le voyage
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
