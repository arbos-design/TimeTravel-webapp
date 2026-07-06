"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Clock } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

export default function Footer() {
  return (
    <footer className="bg-dark-green border-t border-sand/20 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <motion.div
            className="sm:col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <div className="flex items-center gap-2 mb-3">
              <Clock className="text-sand" size={20} />
              <span
                className="font-cinzel text-sand font-bold tracking-widest text-sm"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                TimeTravelAgency
              </span>
            </div>
            <p className="text-sand/65 text-sm leading-relaxed max-w-xs">
              L&apos;agence de voyage temporel de luxe. Explorez l&apos;histoire, vivez l&apos;extraordinaire.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            variants={fadeUp}
          >
            <h4 className="text-sand/80 text-xs tracking-widest uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { href: "#destinations", label: "Destinations" },
                { href: "#experience", label: "Expérience" },
                { href: "#reserver", label: "Réserver" },
                { href: "/chat", label: "Chat avec un agent" },
              ].map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      className="text-sand/65 hover:text-cream text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sand/65 hover:text-cream text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
            variants={fadeUp}
          >
            <h4 className="text-sand/80 text-xs tracking-widest uppercase mb-4">
              Informations
            </h4>
            <ul className="space-y-3">
              {[
                "Conditions d'utilisation temporelle",
                "Politique de confidentialité",
                "Mentions légales",
                "Protocoles de sécurité",
              ].map((item) => (
                <li key={item}>
                  <span className="text-sand/45 text-sm cursor-default">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-sand/15 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-sand/45 text-xs text-center">
            © 2024 TimeTravelAgency — Tous droits réservés à travers le temps.
          </p>
          <p className="text-sand/35 text-xs">
            Agréé par le Bureau International du Voyage Temporel (BIVT)
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
