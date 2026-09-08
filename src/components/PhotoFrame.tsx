"use client";

import { useState } from "react";
import { Camera } from "lucide-react";

/**
 * Muestra una foto de /public, y si todavía no existe (porque el dueño de
 * este sitio no la agregó) cae con gracia en un cartel de "falta esta foto"
 * en vez de romper el layout. Usa <img> normal (no next/image) a propósito:
 * son pocas fotos locales y así el fallback con onError es simple.
 */
export default function PhotoFrame({ src, alt }: { src: string; alt: string }) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-rose-300 bg-rose-50/80 p-6 text-center">
        <Camera className="h-10 w-10 text-rose-300" strokeWidth={1.5} />
        <p className="font-sans text-sm text-rose-400">
          Falta esta foto
          <br />
          <span className="text-rose-300">agregala en {src}</span>
        </p>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- necesitamos onError para el fallback de arriba
    <img
      src={src}
      alt={alt}
      onError={() => setMissing(true)}
      className="h-full w-full rounded-3xl object-cover shadow-lg"
      draggable={false}
    />
  );
}
