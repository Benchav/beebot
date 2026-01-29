export type Direction = 0 | 90 | 180 | 270;

export type ScenarioId = "letters" | "treasure" | "track" | "space";

export type Command = "left" | "right" | "forward" | "backward" | "pause";

export type BeeState = {
  x: number;
  y: number;
  dir: Direction;
};

export const GRID_SIZE = 6;

export const normalizeDir = (dir: number): Direction => {
  const d = ((dir % 360) + 360) % 360;
  return (d === 0 ? 0 : d === 90 ? 90 : d === 180 ? 180 : 270) as Direction;
};
