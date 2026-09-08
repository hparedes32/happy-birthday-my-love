"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import PhotoFrame from "./PhotoFrame";

interface Photo {
  src: string;
  caption?: string;
}

const AUTOPLAY_MS = 8000;

// Variantes "dinámicas": cada función recibe el `custom` que le pasamos al
// motion.div (la dirección del swipe) y devuelve hacia dónde entra/sale.
const slideVariants: Variants = {
  enter: (direction: number) => ({ x: direction >= 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction >= 0 ? -80 : 80, opacity: 0 }),
};

export default function PhotoGallery({
  photos,
  onContinue,
}: {
  photos: Photo[];
  onContinue: () => void;
}) {
  const [[index, direction], setIndexState] = useState<[number, number]>([0, 0]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (newDirection: number) => {
    setIndexState(([current]) => {
      const next = (current + newDirection + photos.length) % photos.length;
      return [next, newDirection];
    });
  };

  const goTo = (target: number) => {
    setIndexState(([current]) => [target, target > current ? 1 : -1]);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => go(1), AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- solo queremos reiniciar el intervalo por cantidad de fotos
  }, [photos.length]);

  const photo = photos[index];

  return (
    <motion.div
      key="gallery"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="relative z-10 flex min-h-dvh flex-col items-center justify-center gap-6 px-6 py-16 text-center"
    >
      <p className="font-script text-3xl text-rose-600">Nosotros</p>

      <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <PhotoFrame src={photo.src} alt={photo.caption ?? `Foto ${index + 1}`} />
          </motion.div>
        </AnimatePresence>

        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 text-rose-500 shadow backdrop-blur transition hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Foto siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 text-rose-500 shadow backdrop-blur transition hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {photo.caption && (
        <p className="max-w-xs font-sans text-rose-700/80 italic">{photo.caption}</p>
      )}

      {photos.length > 1 && (
        <div className="flex gap-2">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a la foto ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === index ? "bg-rose-500" : "bg-rose-300/50"
              }`}
            />
          ))}
        </div>
      )}

      <motion.button
        type="button"
        onClick={onContinue}
        whileTap={{ scale: 0.95 }}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 font-sans font-semibold text-white shadow-lg shadow-rose-500/30 transition hover:bg-rose-600"
      >
        Todavía hay algo más <Heart className="h-4 w-4" fill="currentColor" />
      </motion.button>
    </motion.div>
  );
}
