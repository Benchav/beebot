import * as React from "react";
import { motion } from "framer-motion";
import { BeeBotSvg } from "@/features/beebot/BeeBotSvg";

export function AudioOverlay(props: {
  open: boolean;
  audioEnabled: boolean;
  onEnable: () => Promise<void>;
}) {
  if (!props.open || props.audioEnabled) return null;

  const onEnableAudio = async () => {
    await props.onEnable();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/55 p-4 backdrop-blur-sm"
      onClick={onEnableAudio}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") void onEnableAudio();
      }}
      aria-label="Activar sonidos"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full max-w-xs rounded-3xl border-4 border-yellow-400 bg-yellow-50 p-8 text-center shadow-2xl"
      >
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center">
          <BeeBotSvg className="h-full w-full drop-shadow-md" />
        </div>
        <h2 className="text-2xl font-black text-amber-950">¡Hola! Soy Bee-Bot</h2>
        <p className="mt-2 text-base font-medium text-amber-900/80">
          Toca la pantalla para comenzar a jugar y activar mis sonidos.
        </p>
        <p className="mt-6 text-xs text-amber-900/60">
          Consejo: Instala la app para jugar sin internet.
        </p>
      </motion.div>
    </motion.div>
  );
}
