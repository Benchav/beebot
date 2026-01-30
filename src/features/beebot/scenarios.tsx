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

// Definición del mapa "Verb To Be"
const verbToBeGrid = [
  // Fila 1
  { text: "I", sub: "Subject", color: "bg-green-200", icon: "👤" },
  { text: "AM", sub: "Verb", color: "bg-purple-200", icon: "" },
  { text: "Boy", sub: "", color: "bg-blue-200", icon: "👦" },
  { text: "SHE", sub: "Subject", color: "bg-purple-200", icon: "👩" },
  { text: "IS", sub: "Verb", color: "bg-yellow-200", icon: "" },
  { text: "Girl", sub: "", color: "bg-green-200", icon: "👧" },

  // Fila 2
  { text: "YOU", sub: "Subject", color: "bg-blue-200", icon: "🫵" },
  { text: "ARE", sub: "Verb", color: "bg-green-200", icon: "" },
  { text: "Friend", sub: "", color: "bg-yellow-200", icon: "🤝" },
  { text: "HE", sub: "Subject", color: "bg-green-200", icon: "👱" },
  { text: "IS", sub: "Verb", color: "bg-blue-200", icon: "" },
  { text: "Man", sub: "", color: "bg-purple-200", icon: "👨" },

  // Fila 3
  { text: "IT", sub: "Subject", color: "bg-yellow-200", icon: "🐶" },
  { text: "IS", sub: "Verb", color: "bg-blue-200", icon: "" },
  { text: "Dog", sub: "", color: "bg-purple-200", icon: "🐕" },
  { text: "WE", sub: "Subject", color: "bg-green-200", icon: "👨👩👧" },
  { text: "ARE", sub: "Verb", color: "bg-yellow-200", icon: "" },
  { text: "Happy", sub: "", color: "bg-blue-200", icon: "😄" },

  // Fila 4
  { text: "THEY", sub: "Subject", color: "bg-purple-200", icon: "👥" },
  { text: "ARE", sub: "Verb", color: "bg-green-200", icon: "" },
  { text: "Books", sub: "", color: "bg-blue-200", icon: "📚" },
  { text: "Apple", sub: "Noun", color: "bg-yellow-200", icon: "🍎" },
  { text: "Cat", sub: "Noun", color: "bg-purple-200", icon: "😺" },
  { text: "Car", sub: "Noun", color: "bg-green-200", icon: "🚗" },

  // Fila 5 (Extras para rellenar 6x6)
  { text: "Start", sub: "", color: "bg-white", icon: "🏁" },
  { text: "AM", sub: "?", color: "bg-purple-200", icon: "❓" },
  { text: "IS", sub: "?", color: "bg-yellow-200", icon: "❓" },
  { text: "ARE", sub: "?", color: "bg-green-200", icon: "❓" },
  { text: "Not", sub: "Neg", color: "bg-red-200", icon: "❌" },
  { text: "Yes", sub: "Aff", color: "bg-blue-200", icon: "✅" },

  // Fila 6
  { text: "My", sub: "Poss", color: "bg-green-200", icon: "🙋" },
  { text: "Your", sub: "Poss", color: "bg-blue-200", icon: "🫵" },
  { text: "His", sub: "Poss", color: "bg-purple-200", icon: "👦" },
  { text: "Her", sub: "Poss", color: "bg-yellow-200", icon: "👧" },
  { text: "Its", sub: "Poss", color: "bg-green-200", icon: "🐶" },
  { text: "Our", sub: "Poss", color: "bg-blue-200", icon: "🏠" },
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
    const cell = verbToBeGrid[i];
    return {
      className: cn(
        cell.color,
        "flex flex-col items-center justify-center",
        "border-b-4 border-black/10",
        "shadow-sm transition-all",
        "relative",
      ),
      content: (
        <>
          <div className="absolute -top-1 w-4 h-2 bg-white/20 rounded-full"></div>
          <span className="text-2xl mb-1 filter drop-shadow-sm">{cell.icon}</span>
          <span className="font-fredoka font-black text-slate-700 text-[10px] sm:text-xs uppercase tracking-wide leading-none">
            {cell.text}
          </span>
          {cell.sub && (
            <span className="font-fredoka text-[8px] text-slate-500 font-semibold">
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
