"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Calendar, Users, Compass } from "lucide-react";

function generateRef() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `TTA-2024-${code}`;
}

export default function BookingForm() {
  const [form, setForm] = useState({
    destination: "",
    departDate: "",
    returnDate: "",
    travelers: "1",
    experienceLevel: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.destination) newErrors.destination = "Veuillez choisir une destination.";
    if (!form.departDate) newErrors.departDate = "Veuillez saisir une date de départ.";
    if (!form.returnDate) newErrors.returnDate = "Veuillez saisir une date de retour.";
    if (form.departDate && form.returnDate && form.returnDate <= form.departDate) {
      newErrors.returnDate = "La date de retour doit être après la date de départ.";
    }
    if (!form.experienceLevel) newErrors.experienceLevel = "Veuillez sélectionner votre niveau.";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setBookingRef(generateRef());
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[e.target.name];
        return next;
      });
    }
  };

  const inputClass = (field: string) =>
    `w-full bg-[#111] border rounded px-4 py-3 text-[#ededed] text-sm placeholder-[#ededed]/30 focus:outline-none focus:ring-1 transition-all duration-200 ${
      errors[field]
        ? "border-red-500/60 focus:ring-red-500/40"
        : "border-[#c9a84c]/20 focus:border-[#c9a84c]/60 focus:ring-[#c9a84c]/20"
    }`;

  return (
    <section id="reserver" className="py-24 px-4 bg-[#0d0d0d]">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="text-[#c9a84c] text-sm tracking-[0.4em] uppercase mb-4">
            Prêt à partir ?
          </p>
          <h2
            className="font-cinzel text-4xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Réservez votre voyage
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {!bookingRef ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-5 bg-[#111] border border-[#c9a84c]/15 rounded-2xl p-6 sm:p-8"
            >
              {/* Destination */}
              <div>
                <label className="block text-sm font-medium text-[#ededed]/70 mb-2 flex items-center gap-2">
                  <Compass size={14} className="text-[#c9a84c]" />
                  Destination
                </label>
                <select
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  className={inputClass("destination") + " cursor-pointer"}
                >
                  <option value="">Choisissez une destination</option>
                  <option value="cretace">Crétacé — -65 millions d&apos;années</option>
                  <option value="florence">Florence — Renaissance 1504</option>
                  <option value="paris">Paris — Belle Époque 1889</option>
                </select>
                {errors.destination && (
                  <p className="text-red-400 text-xs mt-1">{errors.destination}</p>
                )}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#ededed]/70 mb-2 flex items-center gap-2">
                    <Calendar size={14} className="text-[#c9a84c]" />
                    Date de départ
                  </label>
                  <input
                    type="date"
                    name="departDate"
                    value={form.departDate}
                    onChange={handleChange}
                    className={inputClass("departDate") + " [color-scheme:dark]"}
                  />
                  {errors.departDate && (
                    <p className="text-red-400 text-xs mt-1">{errors.departDate}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#ededed]/70 mb-2 flex items-center gap-2">
                    <Calendar size={14} className="text-[#c9a84c]" />
                    Date de retour
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    value={form.returnDate}
                    onChange={handleChange}
                    className={inputClass("returnDate") + " [color-scheme:dark]"}
                  />
                  {errors.returnDate && (
                    <p className="text-red-400 text-xs mt-1">{errors.returnDate}</p>
                  )}
                </div>
              </div>

              {/* Travelers */}
              <div>
                <label className="block text-sm font-medium text-[#ededed]/70 mb-2 flex items-center gap-2">
                  <Users size={14} className="text-[#c9a84c]" />
                  Nombre de voyageurs
                </label>
                <select
                  name="travelers"
                  value={form.travelers}
                  onChange={handleChange}
                  className={inputClass("travelers") + " cursor-pointer"}
                >
                  {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} voyageur{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience level */}
              <div>
                <label className="block text-sm font-medium text-[#ededed]/70 mb-3">
                  Niveau d&apos;expérience
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["Novice", "Aventurier", "Expert"].map((level) => (
                    <label
                      key={level}
                      className={`cursor-pointer flex flex-col items-center justify-center p-3 rounded-lg border text-sm transition-all duration-200 ${
                        form.experienceLevel === level
                          ? "border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c]"
                          : "border-[#c9a84c]/15 text-[#ededed]/60 hover:border-[#c9a84c]/40 hover:text-[#ededed]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="experienceLevel"
                        value={level}
                        checked={form.experienceLevel === level}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      {level}
                    </label>
                  ))}
                </div>
                {errors.experienceLevel && (
                  <p className="text-red-400 text-xs mt-1">{errors.experienceLevel}</p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-[#c9a84c] text-black font-semibold text-sm tracking-widest uppercase rounded transition-all duration-300 hover:bg-[#e4c06e] mt-2"
              >
                Confirmer la réservation
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center bg-[#111] border border-[#c9a84c]/20 rounded-2xl p-8 sm:p-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-[#c9a84c]/10 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="text-[#c9a84c]" size={40} />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-cinzel text-3xl font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Voyage confirmé !
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-[#ededed]/60 mb-6"
              >
                Votre aventure temporelle est réservée. Préparez-vous à l&apos;extraordinaire.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="inline-block px-8 py-4 border-2 border-[#c9a84c]/40 rounded-xl mb-8"
              >
                <p className="text-xs text-[#ededed]/40 tracking-widest uppercase mb-1">
                  Référence de réservation
                </p>
                <p
                  className="font-cinzel text-2xl font-bold text-[#c9a84c] tracking-widest"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {bookingRef}
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => {
                  setBookingRef(null);
                  setForm({
                    destination: "",
                    departDate: "",
                    returnDate: "",
                    travelers: "1",
                    experienceLevel: "",
                  });
                }}
                className="text-sm text-[#ededed]/40 hover:text-[#ededed]/70 transition-colors underline underline-offset-4"
              >
                Faire une nouvelle réservation
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
