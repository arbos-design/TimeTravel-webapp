"use client";

import { motion } from "framer-motion";
import { Globe, Bot, CalendarDays, Shield } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Globe,
    title: "Choisissez une époque",
    description:
      "Parcourez nos destinations temporelles et sélectionnez l'ère qui vous attire le plus.",
  },
  {
    number: "02",
    icon: Bot,
    title: "Consultez l'agent IA",
    description:
      "Notre assistant temporel personnel vous guide et répond à toutes vos questions.",
  },
  {
    number: "03",
    icon: CalendarDays,
    title: "Sélectionnez vos dates",
    description:
      "Choisissez vos dates de départ et de retour selon vos disponibilités.",
  },
  {
    number: "04",
    icon: Shield,
    title: "Voyagez en sécurité",
    description:
      "Nos protocoles de sécurité temporelle garantissent un retour sain et sauf.",
  },
];

export default function HowItWorks() {
  return (
    <section id="experience" className="py-24 px-4 bg-brown/25">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-sand text-sm tracking-[0.4em] uppercase mb-4">
            Le processus
          </p>
          <h2
            className="font-cinzel text-4xl sm:text-5xl font-bold text-cream"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Comment ça marche
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                  delay: index * 0.15,
                }}
                whileHover={{ scale: 1.03 }}
                className="relative p-6 rounded-xl border border-sand/20 bg-dark-green/70 hover:border-sand/45 transition-all duration-300 group cursor-default"
              >
                {/* Step number */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  className="text-5xl font-black text-sand/15 group-hover:text-sand/25 transition-colors duration-300 mb-4 font-cinzel"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {step.number}
                </motion.div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-taupe/20 flex items-center justify-center mb-4 group-hover:bg-taupe/30 transition-colors duration-300">
                  <Icon className="text-sand" size={22} />
                </div>

                <h3
                  className="font-cinzel text-lg font-bold text-cream mb-3"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {step.title}
                </h3>
                <p className="text-sand/75 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Connector line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-sand/35" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
