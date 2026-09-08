"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Botón flotante para pausar/reproducir la canción de fondo. El audio en sí
 * vive en <Experience> (useBackgroundMusic) porque el play() tiene que
 * dispararse desde el gesto de tocar el corazón, no desde acá.
 */
export default function MusicToggle({
  playing,
  onToggle,
}: {
  playing: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={playing ? "Pausar música" : "Reproducir música"}
      className="fixed bottom-5 right-5 z-20 rounded-full bg-white/80 p-3 text-rose-500 shadow-lg backdrop-blur transition hover:bg-white"
    >
      {playing ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </motion.button>
  );
}
