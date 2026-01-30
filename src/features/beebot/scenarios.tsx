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

// Definición del contenido central 4x4 para "Verb To Be"
const verbToBeInnerGrid = [
  // Fila Interna 1 (Top Row)
  { text: "I AM", sub: "", color: "bg-green-200", icon: "" },
  { text: "", sub: "", color: "bg-purple-200", icon: "👨‍👩‍👧‍👦" },
  { text: "", sub: "", color: "bg-sky-200", icon: "👦" },
  { text: "AN", sub: "", color: "bg-yellow-200", icon: "🍎" },

  // Fila Interna 2
  { text: "AM", sub: "", color: "bg-purple-200", icon: "👧" },
  { text: "WE ARE", sub: "", color: "bg-green-200", icon: "" },
  { text: "SHE IS", sub: "", color: "bg-purple-200", icon: "" },
  { text: "IT IS", sub: "IT", color: "bg-sky-200", icon: "" },

  // Fila Interna 3
  { text: "ARE", sub: "", color: "bg-sky-200", icon: "👧" },
  { text: "HE IS", sub: "", color: "bg-sky-200", icon: "" },
  { text: "A", sub: "", color: "bg-yellow-200", icon: "🐻" },
  { text: "", sub: "", color: "bg-green-200", icon: "🐶" },

  // Fila Interna 4 (Bottom Row)
  { text: "IS", sub: "", color: "bg-yellow-200", icon: "👧" },
  { text: "", sub: "", color: "bg-purple-200", icon: "👦" },
  { text: "YOU ARE", sub: "", color: "bg-sky-200", icon: "" },
  { text: "THEY", sub: "", color: "bg-sky-200", icon: "📚" },
];

export const scenarioLabel: Record<ScenarioId, string> = {
  letters: "Alphabet",
  treasure: "Treasure Island",
  track: "Race Track",
  space: "Space",
  verbtobe: "Verb To Be",
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
      ariaLabel: `Letter ${char}`,
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
      ariaLabel: has ? "Space object" : "Empty space",
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
      ariaLabel: isTreasure ? "Treasure" : isPalm ? "Palm tree" : isSand ? "Sand" : "Water",
    };
  }

  if (scenario === "verbtobe") {
    // Detectar si es una celda del marco perimetral
    const isFrame = y === 0 || y === 5 || x === 0 || x === 5;

    // --- RENDERIZADO DEL MARCO (Bordes Azules) ---
    if (isFrame) {
      let frameText = "";
      // Título Superior
      if (y === 0) {
        if (x === 1) frameText = "VERB";
        if (x === 2) frameText = "TO";
        if (x === 3) frameText = "BE";
      }
      // Pie Inferior
      if (y === 5) {
        if (x === 1) frameText = "AM,";
        if (x === 2) frameText = "IS";
        if (x === 3) frameText = "ARE";
      }

      return {
        className: "bg-sky-400 text-white font-fredoka font-bold text-sm sm:text-base border-2 border-dashed border-white/30 select-none flex items-center justify-center rounded-md",
        content: frameText,
        ariaLabel: frameText || "Frame",
      };
    }

    // --- RENDERIZADO DEL CONTENIDO CENTRAL (4x4) ---
    // Calcular el índice correspondiente en el array de 16 elementos
    const innerIndex = (y - 1) * 4 + (x - 1);
    const cell = verbToBeInnerGrid[innerIndex];

    if (!cell) return { className: "bg-transparent" }; // fallback

    return {
      className: cn(
        cell.color,
        "flex flex-col items-center justify-center",
        "border-b-[3px] border-black/10",
        "shadow-sm transition-all",
        "relative",
        "p-1"
      ),
      content: (
        <>
          <div className="absolute top-1 left-1 w-2 h-1 bg-white/30 rounded-full"></div>
          <span className="text-xl sm:text-2xl mb-0 sm:mb-1 filter drop-shadow-sm leading-none">{cell.icon}</span>
          <span className="font-fredoka font-black text-slate-700 text-[10px] sm:text-xs uppercase tracking-wide leading-none text-center">
            {cell.text}
          </span>
          {cell.sub && (
            <span className="font-fredoka text-[8px] sm:text-[9px] text-slate-600 font-bold leading-none mt-0.5 text-center">
              {cell.sub}
            </span>
          )}
        </>
      ),
      ariaLabel: `${cell.text} ${cell.sub ? `(${cell.sub})` : ""}`,
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
    ariaLabel: isFinish ? "Finish line" : isRoad ? "Asphalt" : "Grass",
  };
};
