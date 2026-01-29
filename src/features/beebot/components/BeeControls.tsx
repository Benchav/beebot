import * as React from "react";
import { ArrowDown, ArrowUp, Pause, Redo2, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Command } from "@/features/beebot/types";

const cmdMeta: Record<Command, { label: string; Icon: React.ComponentType<{ className?: string }> }> = {
  left: { label: "Girar izquierda", Icon: RotateCcw },
  forward: { label: "Avanzar", Icon: ArrowUp },
  right: { label: "Girar derecha", Icon: Redo2 },
  pause: { label: "Pausa", Icon: Pause },
  backward: { label: "Retroceder", Icon: ArrowDown },
};

export function BeeControls(props: {
  queue: Command[];
  activeIdx: number | null;
  isRunning: boolean;
  onAdd: (cmd: Command) => void;
  onClear: () => void;
  onRun: () => void;
}) {
  return (
    <section className="shrink-0 rounded-t-3xl border-t bg-card/90 pb-[env(safe-area-inset-bottom)] backdrop-blur md:rounded-3xl md:border">
      <div className="mx-auto max-w-3xl">
        <div className="border-b px-4 py-2">
          <div className="mb-1 flex items-end justify-between">
            <span className="text-[10px] font-black tracking-widest text-muted-foreground">MEMORIA</span>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-black text-muted-foreground">
              {props.queue.length}
            </span>
          </div>
          <div className="flex h-9 items-center gap-1 overflow-x-auto">
            {props.queue.length === 0 ? (
              <span className="w-full text-center text-xs italic text-muted-foreground/60">Pulsa los botones…</span>
            ) : (
              props.queue.map((cmd, i) => {
                const Icon = cmdMeta[cmd].Icon;
                const active = i === props.activeIdx;
                const tone =
                  cmd === "forward" || cmd === "backward"
                    ? "bg-cmd-move/20 text-cmd-move-foreground"
                    : cmd === "left" || cmd === "right"
                      ? "bg-cmd-turn/20 text-cmd-turn-foreground"
                      : "bg-cmd-util/20 text-cmd-util-foreground";
                return (
                  <div
                    key={`${cmd}-${i}`}
                    className={cn(
                      "shrink-0 rounded-md px-2 py-1 text-[10px] font-black",
                      "ring-offset-background",
                      tone,
                      active && "ring-2 ring-ring",
                      !active && props.activeIdx !== null && "opacity-45",
                    )}
                    title={cmdMeta[cmd].label}
                  >
                    <Icon className="h-3 w-3" />
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 p-2 sm:p-3">
          <Button
            variant="gameTurn"
            size="game"
            onClick={() => props.onAdd("left")}
            disabled={props.isRunning}
            aria-label="Añadir giro izquierda"
          >
            <RotateCcw />
          </Button>
          <Button
            variant="gameMove"
            size="game"
            onClick={() => props.onAdd("forward")}
            disabled={props.isRunning}
            aria-label="Añadir avanzar"
          >
            <ArrowUp />
          </Button>
          <Button
            variant="gameTurn"
            size="game"
            onClick={() => props.onAdd("right")}
            disabled={props.isRunning}
            aria-label="Añadir giro derecha"
          >
            <Redo2 />
          </Button>

          <Button
            variant="gameUtil"
            size="game"
            onClick={() => props.onAdd("pause")}
            disabled={props.isRunning}
            aria-label="Añadir pausa"
          >
            <Pause />
          </Button>
          <Button
            variant="gameMove"
            size="game"
            onClick={() => props.onAdd("backward")}
            disabled={props.isRunning}
            aria-label="Añadir retroceder"
          >
            <ArrowDown />
          </Button>
          <Button
            variant="gameDanger"
            size="game"
            onClick={props.onClear}
            disabled={props.isRunning}
            aria-label="Borrar memoria"
          >
            <Trash2 />
          </Button>

          <Button
            variant="gameGo"
            size="go"
            className="col-span-3"
            onClick={props.onRun}
            disabled={props.isRunning || props.queue.length === 0}
          >
            GO
          </Button>
        </div>
      </div>
    </section>
  );
}
