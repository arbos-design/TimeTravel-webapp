"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";

type Destination = "cretace" | "florence" | "paris";

const questions = [
  {
    id: 1,
    question: "Quel type d'expérience recherchez-vous ?",
    answers: [
      { label: "Culturelle", scores: { cretace: 0, florence: 2, paris: 1 } },
      { label: "Aventure", scores: { cretace: 2, florence: 0, paris: 1 } },
      { label: "Élégance", scores: { cretace: 0, florence: 2, paris: 1 } },
    ],
  },
  {
    id: 2,
    question: "Votre période préférée ?",
    answers: [
      {
        label: "Histoire moderne",
        scores: { cretace: 0, florence: 0, paris: 2 },
      },
      {
        label: "Temps anciens",
        scores: { cretace: 2, florence: 1, paris: 0 },
      },
      {
        label: "Renaissance",
        scores: { cretace: 0, florence: 2, paris: 1 },
      },
    ],
  },
  {
    id: 3,
    question: "Vous préférez ?",
    answers: [
      {
        label: "Effervescence urbaine",
        scores: { cretace: 0, florence: 1, paris: 2 },
      },
      {
        label: "Nature sauvage",
        scores: { cretace: 2, florence: 0, paris: 0 },
      },
      {
        label: "Art & Architecture",
        scores: { cretace: 0, florence: 2, paris: 1 },
      },
    ],
  },
  {
    id: 4,
    question: "Votre activité idéale ?",
    answers: [
      {
        label: "Visiter des monuments",
        scores: { cretace: 0, florence: 1, paris: 2 },
      },
      {
        label: "Observer la faune",
        scores: { cretace: 2, florence: 0, paris: 0 },
      },
      {
        label: "Explorer des musées",
        scores: { cretace: 0, florence: 2, paris: 1 },
      },
    ],
  },
];

const destinationResults: Record<
  Destination,
  { name: string; tagline: string; color: string; image: string }
> = {
  cretace: {
    name: "Le Crétacé",
    tagline: "Quand les géants dominaient la Terre.",
    color: "#4ade80",
    image: "/images/cretace.jpg",
  },
  florence: {
    name: "Florence 1504",
    tagline: "L'âge d'or de l'art et de l'humanisme.",
    color: "#c9a84c",
    image: "/images/florence.jpg",
  },
  paris: {
    name: "Paris 1889",
    tagline: "À l'aube du monde moderne.",
    color: "#b85c2a",
    image: "/images/paris.jpg",
  },
};

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<Destination, number>>({
    cretace: 0,
    florence: 0,
    paris: 0,
  });
  const [result, setResult] = useState<Destination | null>(null);
  const [direction, setDirection] = useState(1);

  const handleAnswer = (
    answerScores: Record<Destination, number>
  ) => {
    const newScores = {
      cretace: scores.cretace + answerScores.cretace,
      florence: scores.florence + answerScores.florence,
      paris: scores.paris + answerScores.paris,
    };
    setScores(newScores);
    setDirection(1);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Calculate winner
      const winner = (
        Object.entries(newScores) as [Destination, number][]
      ).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
      setResult(winner);
    }
  };

  const reset = () => {
    setCurrentQuestion(0);
    setScores({ cretace: 0, florence: 0, paris: 0 });
    setResult(null);
    setDirection(-1);
  };

  return (
    <section className="py-24 px-4 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="text-[#c9a84c] text-sm tracking-[0.4em] uppercase mb-4">
            Trouvez votre voyage
          </p>
          <h2
            className="font-cinzel text-4xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Quiz de recommandation
          </h2>
        </motion.div>

        <div className="relative min-h-[360px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full"
              >
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-xs text-[#ededed]/40 mb-2">
                    <span>
                      Question {currentQuestion + 1} / {questions.length}
                    </span>
                    <span>
                      {Math.round(
                        ((currentQuestion + 1) / questions.length) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div className="h-1 bg-[#ffffff]/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#c9a84c] rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((currentQuestion + 1) / questions.length) * 100
                          }%`,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <h3
                  className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-8 text-center"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {questions[currentQuestion].question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {questions[currentQuestion].answers.map((answer) => (
                    <motion.button
                      key={answer.label}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleAnswer(answer.scores as Record<Destination, number>)}
                      className="p-5 rounded-xl border border-[#c9a84c]/20 bg-[#111] hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 text-[#ededed] hover:text-[#c9a84c] transition-all duration-300 text-sm font-medium flex items-center justify-between gap-2 group"
                    >
                      <span>{answer.label}</span>
                      <ArrowRight
                        size={14}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full text-center"
              >
                {/* Destination image */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="relative mx-auto mb-8 rounded-2xl overflow-hidden"
                  style={{
                    width: "100%",
                    height: "280px",
                    boxShadow: `0 0 40px ${destinationResults[result].color}40`,
                    border: `1px solid ${destinationResults[result].color}30`,
                  }}
                >
                  <Image
                    src={destinationResults[result].image}
                    alt={destinationResults[result].name}
                    fill
                    className="object-cover"
                  />
                  {/* Bottom gradient for text readability */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 60%)`,
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mb-8"
                >
                  <p className="text-[#ededed]/60 text-sm tracking-widest uppercase mb-4">
                    Votre destination idéale
                  </p>
                  <motion.h3
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                    className="font-cinzel text-4xl sm:text-5xl font-black mb-4"
                    style={{
                      fontFamily: "var(--font-cinzel)",
                      color: destinationResults[result].color,
                    }}
                  >
                    {destinationResults[result].name}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-[#ededed]/70 text-lg"
                  >
                    {destinationResults[result].tagline}
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <a
                    href="#reserver"
                    className="px-8 py-3 font-semibold text-black text-sm tracking-wider uppercase rounded transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: destinationResults[result].color }}
                  >
                    Réserver cette destination
                  </a>
                  <button
                    onClick={reset}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-[#ededed]/20 text-[#ededed]/60 hover:text-[#ededed] hover:border-[#ededed]/40 text-sm font-medium rounded transition-all duration-300"
                  >
                    <RotateCcw size={14} />
                    Recommencer
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
