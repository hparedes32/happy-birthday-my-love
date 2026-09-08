"use client";

import { useMemo, useSyncExternalStore } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
}

function makeParticles(count: number, idOffset: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: idOffset + i,
    left: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 9 + Math.random() * 7,
    size: 12 + Math.random() * 20,
    drift: (Math.random() - 0.5) * 80,
  }));
}

const noopSubscribe = () => () => {};

/**
 * true recién después de hidratar en el cliente, false en el server y en el
 * primer render del cliente (así coinciden y no hay mismatch de hidratación).
 * Es el patrón recomendado por React para datos que solo existen en el
 * cliente (acá, posiciones al azar con Math.random()), sin necesitar un
 * setState dentro de un useEffect.
 */
function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/**
 * Corazones flotando de fondo, siempre presentes de forma sutil.
 * `celebrate` agrega una segunda capa (más densa) sin reiniciar la primera,
 * para que el "festejo" al final de la carta no corte la animación ambiente.
 */
export default function FloatingHearts({ celebrate = false }: { celebrate?: boolean }) {
  const isClient = useIsClient();

  const ambient = useMemo(() => (isClient ? makeParticles(16, 0) : []), [isClient]);
  const burst = useMemo(
    () => (isClient && celebrate ? makeParticles(28, 1000) : []),
    [isClient, celebrate],
  );

  const particles = ambient.length ? [...ambient, ...burst] : [];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute bottom-[-10%] text-rose-400/60"
          style={{ left: `${p.left}%`, fontSize: p.size }}
          initial={{ y: 0, opacity: 0, x: 0 }}
          animate={{
            y: "-120vh",
            opacity: [0, 1, 1, 0],
            x: [0, p.drift, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ❤
        </motion.span>
      ))}
    </div>
  );
}
