import * as React from "react";
import { Sparkles } from "lucide-react";

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
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/55 p-4 backdrop-blur-sm"
      onClick={onEnableAudio}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") void onEnableAudio();
      }}
      aria-label="Activar sonidos"
    >
      <div className="w-full max-w-xs rounded-2xl border bg-background p-6 text-center shadow-2xl">
        <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-accent">
          <Sparkles className="h-7 w-7 text-foreground" />
        </div>
        <h2 className="text-lg font-black">¡Empezar!</h2>
        <p className="mt-1 text-sm text-muted-foreground">Toca la pantalla para activar los sonidos (Web Audio).</p>
        <p className="mt-3 text-xs text-muted-foreground">
          Consejo: instala la app desde el menú del navegador para usarla offline.
        </p>
      </div>
    </div>
  );
}
