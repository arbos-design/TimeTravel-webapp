"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Maximize2 } from "lucide-react";
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
    <div className="flex items-center gap-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [messages, open]);

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
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#c9a84c] text-black shadow-lg shadow-[#c9a84c]/30 flex items-center justify-center hover:bg-[#e4c06e] transition-colors duration-300"
        aria-label="Ouvrir le chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-24 right-6 z-50 w-[340px] h-[460px] rounded-2xl overflow-hidden shadow-2xl shadow-black/70 border border-[#c9a84c]/20 flex flex-col bg-[#0f0f0f]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#111]/80 border-b border-[#c9a84c]/15 flex-shrink-0 backdrop-blur-sm">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-7 h-7 rounded-full bg-[#c9a84c]/15 border border-[#c9a84c]/30 flex items-center justify-center">
                    <MessageCircle size={13} className="text-[#c9a84c]" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#111]" />
                </div>
                <div>
                  <p
                    className="text-xs font-bold text-[#c9a84c] leading-tight"
                    style={{ fontFamily: "var(--font-cinzel)" }}
                  >
                    Guide Temporel
                  </p>
                  <p className="text-[10px] text-emerald-500/70 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 inline-block" />
                    En ligne
                  </p>
                </div>
              </div>
              <Link
                href="/chat"
                className="text-[#ededed]/30 hover:text-[#c9a84c] transition-colors p-1"
                title="Ouvrir en plein écran"
              >
                <Maximize2 size={14} />
              </Link>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-[#ededed]/40 text-xs mb-4 leading-relaxed">
                    Bonjour ! Comment puis-je vous aider dans votre voyage temporel ?
                  </p>
                  {!started && (
                    <div className="flex flex-col gap-2">
                      {SUGGESTIONS.map((s, i) => (
                        <motion.button
                          key={s}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08, duration: 0.3 }}
                          onClick={() => sendMessage(s)}
                          className="text-xs text-left px-3 py-2 rounded-lg border border-[#c9a84c]/15 text-[#ededed]/55 hover:border-[#c9a84c]/45 hover:text-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all duration-200"
                        >
                          {s}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs ${
                        msg.role === "user"
                          ? "bg-[#c9a84c] text-black font-medium rounded-tr-sm leading-relaxed"
                          : "bg-[#1a1a1a] text-[#ededed]/80 border border-[#c9a84c]/10 rounded-tl-sm"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <MessageContent text={msg.content} />
                      ) : (
                        msg.content
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-start"
                  >
                    <div className="bg-[#1a1a1a] border border-[#c9a84c]/10 rounded-xl rounded-tl-sm px-3.5 py-2.5">
                      <TypingDots />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 p-3 border-t border-[#c9a84c]/15 flex-shrink-0 bg-[#111]"
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
                placeholder="Votre question..."
                className="flex-1 bg-[#0f0f0f] border border-[#c9a84c]/15 rounded-lg px-3 py-2 text-xs text-[#ededed] placeholder-[#ededed]/25 focus:outline-none focus:border-[#c9a84c]/40 transition-colors"
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || loading}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#c9a84c] text-black disabled:opacity-35 disabled:cursor-not-allowed hover:bg-[#e4c06e] transition-colors flex-shrink-0"
              >
                <Send size={13} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
