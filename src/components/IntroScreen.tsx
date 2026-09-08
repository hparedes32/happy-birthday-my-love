"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function IntroScreen({
  name,
  subtitle,
  onOpen,
}: {
  name: string;
  subtitle: string;
  onOpen: () => void;
}) {
  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.5 } }}
      className="relative z-10 flex min-h-dvh flex-col items-center justify-center gap-8 px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="font-script text-4xl text-rose-600 sm:text-5xl"
      >
        Para {name}
      </motion.p>

      <motion.button
        type="button"
        onClick={onOpen}
        aria-label="Abrir el regalo"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        whileTap={{ scale: 0.88 }}
        className="text-rose-500 drop-shadow-[0_8px_24px_rgba(244,63,94,0.35)]"
      >
        <Heart className="h-28 w-28 sm:h-36 sm:w-36" fill="currentColor" strokeWidth={1} />
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="max-w-xs font-sans text-lg text-rose-500/90"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
}
