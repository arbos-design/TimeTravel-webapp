"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Palette, Landmark } from "lucide-react";

const destinations = [
  {
    id: "cretace",
    name: "Crétacé",
    period: "-65 millions d'années",
    tagline: "Quand les géants dominaient la Terre.",
    experiences: [
      "Safari T-Rex sécurisé",
      "Observation de la faune préhistorique",
      "Étude scientifique immersive",
    ],
    profile: "Aventure – Adrénaline – Exploration",
    profileIcon: Zap,
    profileColor: "#1F2614",
    profileTextColor: "#D9BB96",
    image: "/images/cretace.jpg",
    gradientFrom: "#1F2614",
    gradientTo: "#735634",
    accentColor: "#D9BB96",
  },
  {
    id: "florence",
    name: "Florence",
    period: "Renaissance — 1504",
    tagline: "L'âge d'or de l'art et de l'humanisme.",
    experiences: [
      "Ateliers avec les maîtres",
      "Vie quotidienne florentine",
      "Soirées de la noblesse",
    ],
    profile: "Culture – Élégance – Histoire",
    profileIcon: Palette,
    profileColor: "#735634",
    profileTextColor: "#F2E8D5",
    image: "/images/florence.jpg",
    gradientFrom: "#1F2614",
    gradientTo: "#735634",
    accentColor: "#D9BB96",
  },
  {
    id: "paris",
    name: "Paris",
    period: "Belle Époque — 1889",
    tagline: "À l'aube du monde moderne.",
    experiences: [
      "Inauguration de la Tour Eiffel",
      "Exposition Universelle",
      "Balades en fiacre, Paris Belle Époque",
    ],
    profile: "Découverte – Innovation – Patrimoine",
    profileIcon: Landmark,
    profileColor: "#A68053",
    profileTextColor: "#1F2614",
    image: "/images/paris.jpg",
    gradientFrom: "#1F2614",
    gradientTo: "#A68053",
    accentColor: "#A68053",
  },
];

export default function Destinations() {
  return (
    <section id="destinations" className="py-0">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center py-20 px-4"
      >
        <p className="text-sand text-sm tracking-[0.4em] uppercase mb-4">
          Nos destinations
        </p>
        <h2
          className="font-cinzel text-4xl sm:text-5xl font-bold text-cream"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Choisissez votre époque
        </h2>
      </motion.div>

      {destinations.map((dest, index) => (
        <DestinationCard key={dest.id} dest={dest} index={index} />
      ))}
    </section>
  );
}

function DestinationCard({
  dest,
  index,
}: {
  dest: (typeof destinations)[0];
  index: number;
}) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const Icon = dest.profileIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative overflow-hidden"
      style={{
        minHeight: "500px",
        background: `linear-gradient(135deg, ${dest.gradientFrom} 0%, ${dest.gradientTo} 100%)`,
      }}
    >
      {/* Hover glow overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        animate={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse at 60% 50%, ${dest.accentColor}12 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Content + Image layout */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full flex flex-col md:flex-row items-center gap-8 py-12 md:py-20">
          {/* Image: top on mobile, right on desktop */}
          <div
            className="block md:order-2 md:flex-1 relative rounded-2xl overflow-hidden w-full shrink-0"
            style={{ height: "clamp(220px, 35vw, 420px)" }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {!imgError ? (
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    background: `linear-gradient(135deg, ${dest.gradientTo}, ${dest.gradientFrom})`,
                  }}
                />
              )}
            </motion.div>
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to left, transparent 60%, ${dest.gradientFrom}60 100%)`,
              }}
            />
          </div>

          {/* Text content: bottom on mobile, left on desktop */}
          <div className="flex-1 min-w-0 md:order-1 w-full">
            <p className="text-sand/75 text-sm tracking-widest uppercase mb-2">
              {dest.period}
            </p>

            <h3
              className="font-cinzel text-4xl sm:text-5xl font-bold text-cream mb-4"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              {dest.name}
            </h3>

            <p
              className="text-xl sm:text-2xl mb-6 font-light"
              style={{ color: dest.accentColor }}
            >
              {dest.tagline}
            </p>

            <ul className="space-y-2 mb-6">
              {dest.experiences.map((exp) => (
                <li key={exp} className="flex items-center gap-2 text-cream/85 text-sm">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: dest.accentColor }}
                  />
                  {exp}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-4">
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-wider"
                style={{
                  backgroundColor: dest.profileColor + "80",
                  color: dest.profileTextColor,
                  border: `1px solid ${dest.accentColor}40`,
                }}
              >
                <Icon size={12} />
                {dest.profile}
              </span>

              <motion.a
                href="#reserver"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium tracking-wider uppercase rounded"
                style={{
                  backgroundColor: dest.accentColor,
                  color: "#1F2614",
                }}
                whileHover={{ scale: 1.04, gap: "12px" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                Réserver
                <motion.span
                  animate={{ x: hovered ? 3 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <ArrowRight size={14} />
                </motion.span>
              </motion.a>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
