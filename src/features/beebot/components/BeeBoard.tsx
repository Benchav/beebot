import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BeeBotSvg } from "@/features/beebot/BeeBotSvg";
import { getCell } from "@/features/beebot/scenarios";
import type { BeeState, ScenarioId } from "@/features/beebot/types";
import { GRID_SIZE } from "@/features/beebot/types";

export function BeeBoard(props: {
  scenario: ScenarioId;
  bee: BeeState;
  bumpTick: number;
  status: string;
}) {
  const reduceMotion = useReducedMotion();

  const cellRadius = props.scenario === "treasure" ? "rounded-none" : "rounded-md";

  const boardBg =
    props.scenario === "space"
      ? "bg-space-stars"
      : props.scenario === "treasure"
        ? "bg-water-texture"
        : "bg-card";

  return (
    <section className="flex h-full min-h-0 flex-1 items-center justify-center px-2 py-2 sm:px-4 sm:py-3">
      <div
        className={cn(
          "relative aspect-square w-full max-h-full max-w-full overflow-hidden rounded-2xl",
          "shadow-[0_20px_45px_-18px_hsl(var(--foreground)/0.25),0_0_0_10px_hsl(var(--primary)/0.18)]",
          boardBg,
        )}
      >
        {/* Grid */}
        <div className="relative grid h-full w-full grid-cols-6 grid-rows-6 gap-0 p-2">
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const cell = getCell(props.scenario, i);
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isActive = x === props.bee.x && y === props.bee.y;
            return (
              <div key={i} className="relative">
                <div
                  className={cn(
                    "flex h-full w-full items-center justify-center",
                    cellRadius,
                    "select-none text-lg font-black",
                    "border border-border/25",
                    "transition-[box-shadow,filter]",
                    isActive && "shadow-[0_0_0_2px_hsl(var(--ring)/0.35)]",
                    cell.className,
                  )}
                  aria-label={cell.ariaLabel}
                >
                  {cell.content}
                </div>
              </div>
            );
          })}

          {/* Bee: grid-positioned + layout animation */}
          <motion.div
            layout
            className="pointer-events-none z-20 flex items-center justify-center"
            style={{ gridColumnStart: props.bee.x + 1, gridRowStart: props.bee.y + 1 }}
            transition={
              reduceMotion
                ? { layout: { duration: 0 } }
                : {
                    layout: {
                      type: "tween",
                      duration: 0.5,
                      ease: "easeInOut",
                    },
                  }
            }
          >
            <motion.div
              key={props.bumpTick}
              className={cn("h-[80%] w-[80%]", !reduceMotion && "animate-bee-float")}
              animate={
                reduceMotion || props.bumpTick === 0
                  ? undefined
                  : {
                      x: [-5, 5, -5, 5, 0],
                    }
              }
              transition={reduceMotion ? undefined : { duration: 0.26, ease: "easeOut" }}
            >
              <motion.div
                className="h-full w-full"
                animate={{ rotate: props.bee.dir }}
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 26 }}
              >
                <BeeBotSvg
                  className="h-full w-full drop-shadow-[0_10px_10px_hsl(var(--foreground)/0.15)]"
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-30 -translate-x-1/2 rounded-full border bg-background/80 px-4 py-1 text-sm font-semibold text-muted-foreground shadow-sm backdrop-blur">
          {props.status}
        </div>
      </div>
    </section>
  );
}
