"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { content } from "@/lib/content";
import { useBackgroundMusic } from "@/lib/useBackgroundMusic";
import FloatingHearts from "./FloatingHearts";
import IntroScreen from "./IntroScreen";
import PhotoGallery from "./PhotoGallery";
import LoveLetter from "./LoveLetter";
import MusicToggle from "./MusicToggle";

type Stage = "intro" | "gallery" | "letter";

export default function Experience() {
  const [stage, setStage] = useState<Stage>("intro");
  const [celebrate, setCelebrate] = useState(false);
  const { audioRef, available, playing, play, toggle, onCanPlay, onError } = useBackgroundMusic();

  const openGift = () => {
    play();
    setStage("gallery");
  };

  const restart = () => {
    setCelebrate(false);
    setStage("intro");
  };

  return (
    <main
      className="relative isolate min-h-dvh overflow-hidden"
      style={{
        // El fondo llega hasta el borde (gracias a viewport-fit=cover en el
        // layout), pero el contenido en sí queda adentro del área segura:
        // así no se lo tapa el notch/Dynamic Island ni la barra inferior.
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      <audio
        ref={audioRef}
        src={content.songSrc}
        loop
        preload="auto"
        onCanPlay={onCanPlay}
        onError={onError}
      />

      <FloatingHearts celebrate={celebrate} />

      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <IntroScreen
            key="intro"
            name={content.girlfriendName}
            subtitle={content.introSubtitle}
            onOpen={openGift}
          />
        )}
        {stage === "gallery" && (
          <PhotoGallery key="gallery" photos={content.photos} onContinue={() => setStage("letter")} />
        )}
        {stage === "letter" && (
          <LoveLetter
            key="letter"
            salutation={content.letterSalutation}
            paragraphs={content.letterParagraphs}
            signature={content.letterSignature}
            relationshipStartDate={content.relationshipStartDate}
            onRestart={restart}
            onRevealed={() => setCelebrate(true)}
          />
        )}
      </AnimatePresence>

      {available && <MusicToggle playing={playing} onToggle={toggle} />}
    </main>
  );
}
