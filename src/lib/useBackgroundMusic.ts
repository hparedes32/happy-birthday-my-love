"use client";

import { useCallback, useRef, useState } from "react";

const FADE_MS = 1200;

function fadeIn(audio: HTMLAudioElement) {
  audio.volume = 0;
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / FADE_MS);
    audio.volume = t;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/**
 * Maneja la canción de fondo opcional. `play()` está pensado para llamarse
 * en el mismo click que abre el regalo (el toque del corazón): los
 * navegadores solo dejan arrancar audio con sonido si viene de un gesto
 * del usuario, así que enganchar el play ahí es lo que hace que "suene
 * apenas entra" sin que el navegador lo bloquee.
 *
 * Si el archivo de `src` no existe, `available` queda en false y no hay
 * que mostrar ningún control de música.
 */
export function useBackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    fadeIn(audio);
    audio.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 1;
      audio.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    } else {
      audio.pause();
      setPlaying(false);
    }
  }, []);

  return {
    audioRef,
    available,
    playing,
    play,
    toggle,
    onCanPlay: () => setAvailable(true),
    onError: () => setAvailable(false),
  };
}
