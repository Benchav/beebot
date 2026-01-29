import type { ScenarioId } from "./types";
import { cn } from "@/lib/utils";

type CellDescriptor = {
  className?: string;
  content?: React.ReactNode;
  ariaLabel?: string;
};

const lettersForIndex = (i: number) => {
  if (i < 26) return String.fromCharCode(65 + i);
  return String(i - 25);
};

const pseudo = (i: number) => {
  const seed = Math.sin(i * 12.9898) * 43758.5453;
  return seed - Math.floor(seed);
};

export const scenarioLabel: Record<ScenarioId, string> = {
  letters: "Alfabeto",
  treasure: "Isla del Tesoro",
  track: "Pista de Carreras",
  space: "Espacio",
};

export const getCell = (scenario: ScenarioId, i: number): CellDescriptor => {
  const x = i % 6;
  const y = Math.floor(i / 6);

  if (scenario === "letters") {
    const char = lettersForIndex(i);
    const isOdd = i % 2 === 1;
    return {
      className: isOdd
        ? "bg-board-letters-a text-board-letters-fg beebot-inner-shadow"
        : "bg-board-letters-b text-board-letters-fg beebot-inner-shadow",
      content: <span className="text-xl font-black tracking-tight">{char}</span>,
      ariaLabel: `Letra ${char}`,
    };
  }

  if (scenario === "space") {
    const r = pseudo(i);
    const has = r > 0.7;
    const icon = r > 0.93 ? "☄" : r > 0.88 ? "🪐" : r > 0.82 ? "✦" : "";
    return {
      className: "bg-board-space-cell text-board-space-star border-border/10",
      content: has ? (
        <span className={icon === "🪐" ? "text-2xl drop-shadow-sm" : "text-xl opacity-80"}>{icon}</span>
      ) : undefined,
      ariaLabel: has ? "Objeto espacial" : "Espacio vacío",
    };
  }

  if (scenario === "treasure") {
    const isSand = x >= 1 && x <= 4 && y >= 1 && y <= 4;
    const isTreasure = i === 27;
    const isPalm = i === 8 || i === 10 || i === 25 || i === 29;

    // Make the island feel connected: only round the outer corners of the 4x4 sand block.
    const sandCornerRadius = isSand
      ? cn(
          x === 1 && y === 1 && "rounded-tl-xl",
          x === 4 && y === 1 && "rounded-tr-xl",
          x === 1 && y === 4 && "rounded-bl-xl",
          x === 4 && y === 4 && "rounded-br-xl",
        )
      : "";

    return {
      className: isSand
        ? cn(
            "bg-board-treasure-sand text-board-treasure-sand-fg",
            "shadow-[inset_0_1px_0_hsl(var(--space-star)/0.18)]",
            sandCornerRadius,
          )
        : "bg-transparent text-board-space-star",
      content: isTreasure ? (
        <span className="text-3xl drop-shadow-sm">💎</span>
      ) : isPalm && isSand ? (
        <span className="text-2xl">🌴</span>
      ) : undefined,
      ariaLabel: isTreasure ? "Tesoro" : isPalm ? "Palmera" : isSand ? "Arena" : "Agua",
    };
  }

  // track
  const isRoad =
    (y === 1 && x > 0 && x < 5) ||
    (y === 4 && x > 0 && x < 5) ||
    (x === 0 && y > 0 && y < 5) ||
    (x === 5 && y > 0 && y < 5);

  const isFinish = i === 0;

  // Add dashed lane markings on some road tiles for readability.
  const hasLaneMark = isRoad && !isFinish && ((x + y) % 2 === 0);

  return {
    className: isRoad
      ? cn(
          "bg-track-asphalt text-board-track-road-fg",
          "border border-board-track-road-fg/15",
          "beebot-inner-shadow",
          isFinish && "bg-track-finish",
        )
      : cn("bg-track-grass-texture border-0"),
    content: isFinish ? (
      <span className="text-lg drop-shadow-sm">🏁</span>
    ) : hasLaneMark ? (
      <span className="track-lane-mark" aria-hidden="true" />
    ) : undefined,
    ariaLabel: isFinish ? "Meta" : isRoad ? "Asfalto" : "Césped",
  };
};
