"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowLeft, Clock } from "lucide-react";
import MessageContent from "@/components/MessageContent";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Quelle époque me conseilles-tu ?",
  "Quel est le niveau de danger ?",
  "Quels sont les tarifs ?",
  "Comment se passe la réservation ?",
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-[#c9a84c]"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return;

    const userMessage: Message = { role: "user", content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setStarted(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-4 px-4 sm:px-8 py-4 border-b border-[#c9a84c]/15 bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-10">
        <Link
          href="/"
          className="text-[#ededed]/40 hover:text-[#c9a84c] transition-colors p-1"
          aria-label="Retour"
        >
          <ArrowLeft size={20} />
        </Link>

        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center">
              <Clock className="text-[#c9a84c]" size={18} />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0a0a0a]" />
          </div>
          <div>
            <h1
              className="font-bold text-[#c9a84c] text-base leading-tight"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Guide Temporel
            </h1>
            <p className="text-emerald-500/80 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              En ligne · TimeTravelAgency
            </p>
          </div>
        </div>
      </header>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-3xl w-full mx-auto">
        {/* Welcome state */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/25 flex items-center justify-center mx-auto mb-6"
            >
              <Clock className="text-[#c9a84c]" size={32} />
            </motion.div>
            <h2
              className="text-2xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Bonjour, voyageur du temps
            </h2>
            <p className="text-[#ededed]/50 mb-10 max-w-md mx-auto text-sm leading-relaxed">
              Je suis votre guide temporel personnel. Posez-moi toutes vos
              questions sur nos destinations, tarifs, et protocoles de sécurité.
            </p>

            {!started && (
              <div className="flex flex-wrap gap-3 justify-center">
                {SUGGESTIONS.map((s, i) => (
                  <motion.button
                    key={s}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => sendMessage(s)}
                    className="px-5 py-2.5 rounded-full border border-[#c9a84c]/25 text-[#ededed]/60 hover:border-[#c9a84c]/60 hover:text-[#c9a84c] text-sm transition-colors duration-200"
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Messages */}
        <div className="space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-3`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/25 flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock size={14} className="text-[#c9a84c]" />
                  </div>
                )}

                <div
                  className={`max-w-[78%] rounded-2xl px-5 py-3.5 ${
                    msg.role === "user"
                      ? "bg-[#c9a84c] text-black font-medium rounded-tr-sm text-sm leading-relaxed"
                      : "bg-[#141414] border border-[#c9a84c]/12 text-[#ededed]/85 rounded-tl-sm"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <MessageContent text={msg.content} />
                  ) : (
                    msg.content
                  )}
                </div>

                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-[#c9a84c]/15 border border-[#c9a84c]/20 flex items-center justify-center flex-shrink-0 mt-1 text-xs font-bold text-[#c9a84c]">
                    V
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.25 }}
                className="flex justify-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/25 flex items-center justify-center flex-shrink-0">
                  <Clock size={14} className="text-[#c9a84c]" />
                </div>
                <div className="bg-[#141414] border border-[#c9a84c]/12 rounded-2xl rounded-tl-sm px-5 py-3.5">
                  <TypingDots />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="sticky bottom-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent pt-6 pb-6 px-4 sm:px-8">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto flex gap-3 bg-[#111] border border-[#c9a84c]/20 rounded-2xl p-2 focus-within:border-[#c9a84c]/45 transition-all duration-300 shadow-lg shadow-black/30"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Posez votre question à l'agent temporel..."
            className="flex-1 bg-transparent px-3 py-2.5 text-sm text-[#ededed] placeholder-[#ededed]/30 focus:outline-none"
          />
          <motion.button
            type="submit"
            disabled={!input.trim() || loading}
            whileTap={{ scale: 0.92 }}
            className="w-10 h-10 rounded-xl bg-[#c9a84c] text-black flex items-center justify-center disabled:opacity-35 disabled:cursor-not-allowed hover:bg-[#e4c06e] transition-colors flex-shrink-0"
          >
            <Send size={15} />
          </motion.button>
        </form>
        <p className="text-center text-[#ededed]/20 text-xs mt-3">
          Entrée pour envoyer · TimeTravelAgency © 2024
        </p>
      </div>
    </div>
  );
}
