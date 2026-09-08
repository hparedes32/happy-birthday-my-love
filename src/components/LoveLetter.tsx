"use client";

import { motion, type Variants } from "framer-motion";
import { RotateCcw } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.4, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function daysTogether(startDate: string): number {
  const start = new Date(`${startDate}T00:00:00`);
  const diff = Date.now() - start.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export default function LoveLetter({
  salutation,
  paragraphs,
  signature,
  relationshipStartDate,
  onRestart,
  onRevealed,
}: {
  salutation: string;
  paragraphs: string[];
  signature: string;
  relationshipStartDate: string | null;
  onRestart: () => void;
  onRevealed: () => void;
}) {
  return (
    <motion.div
      key="letter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6 py-16"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-lg rounded-3xl bg-white/70 p-8 shadow-xl shadow-rose-200/60 backdrop-blur-sm sm:p-10"
      >
        <motion.p variants={item} className="font-script text-3xl text-rose-600">
          {salutation}
        </motion.p>

        <div className="mt-6 space-y-4">
          {paragraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              variants={item}
              className="font-serif text-lg italic leading-relaxed text-rose-950/90"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <motion.p variants={item} className="mt-8 text-right font-script text-2xl text-rose-600">
          {signature}
        </motion.p>

        {relationshipStartDate && (
          <motion.p
            variants={item}
            className="mt-6 text-center font-sans text-sm text-rose-500/80"
          >
            Llevamos {daysTogether(relationshipStartDate)} días juntos 💕
          </motion.p>
        )}

        {/* Elemento invisible que siempre es el último en aparecer: marca de
            forma inequívoca cuándo terminó de revelarse toda la carta,
            sin depender de si el contador de días está o no. */}
        <motion.span
          variants={item}
          onAnimationComplete={onRevealed}
          aria-hidden
          className="block h-0"
        />
      </motion.div>

      <motion.button
        type="button"
        onClick={onRestart}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-8 inline-flex items-center gap-2 font-sans text-sm text-rose-500/70 transition hover:text-rose-600"
      >
        <RotateCcw className="h-4 w-4" /> Volver a ver todo
      </motion.button>
    </motion.div>
  );
}
