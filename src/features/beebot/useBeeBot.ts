import * as React from "react";
import { BeeBotAudio } from "@/lib/beebot-audio";
import { sleep } from "@/lib/sleep";
import type { BeeState, Command, ScenarioId } from "./types";
import { GRID_SIZE, normalizeDir } from "./types";

const initialBee: BeeState = { x: 0, y: 0, dir: 90 };

const stepFromDir = (dir: number, step: 1 | -1) => {
  const d = normalizeDir(dir);
  let dx = 0;
  let dy = 0;
  if (d === 0) dy = -step;
  if (d === 90) dx = step;
  if (d === 180) dy = step;
  if (d === 270) dx = -step;
  return { dx, dy, d };
};

export function useBeeBot() {
  const audioRef = React.useRef(new BeeBotAudio());
  const [audioEnabled, setAudioEnabled] = React.useState(false);
  const [scenario, setScenario] = React.useState<ScenarioId>("letters");
  const [bee, setBee] = React.useState<BeeState>(initialBee);
  const [queue, setQueue] = React.useState<Command[]>([]);
  const [isRunning, setIsRunning] = React.useState(false);
  const [activeIdx, setActiveIdx] = React.useState<number | null>(null);
  const [status, setStatus] = React.useState<string>("Listo");
  const [bumpTick, setBumpTick] = React.useState(0);

  const msg = React.useCallback((text: string) => {
    setStatus(text);
  }, []);

  const enableAudio = React.useCallback(async () => {
    await audioRef.current.enable();
    audioRef.current.play("start");
    setAudioEnabled(true);
  }, []);

  const addCmd = React.useCallback((cmd: Command) => {
    setQueue((prev) => {
      if (isRunning) return prev;
      if (prev.length >= 40) return prev;
      audioRef.current.play("click");
      return [...prev, cmd];
    });
  }, [isRunning]);

  const resetBee = React.useCallback(() => {
    setBee(initialBee);
  }, []);

  const clear = React.useCallback(() => {
    if (isRunning) return;
    audioRef.current.play("click");
    setQueue([]);
    setActiveIdx(null);
    resetBee();
    msg("Memoria borrada");
  }, [isRunning, msg, resetBee]);

  const setScenarioSafe = React.useCallback(
    (next: ScenarioId) => {
      setScenario(next);
      if (!isRunning) {
        resetBee();
        msg("Mapa actualizado");
      }
    },
    [isRunning, msg, resetBee],
  );

  const execute = React.useCallback(
    async (cmd: Command) => {
      let duration = 520;
      if (cmd === "left") {
        audioRef.current.play("turn");
        setBee((b) => ({ ...b, dir: normalizeDir(b.dir - 90) }));
        return sleep(duration);
      }

      if (cmd === "right") {
        audioRef.current.play("turn");
        setBee((b) => ({ ...b, dir: normalizeDir(b.dir + 90) }));
        return sleep(duration);
      }

      if (cmd === "pause") {
        duration = 800;
        return sleep(duration);
      }

      audioRef.current.play("move");
      const step = cmd === "forward" ? 1 : -1;

      setBee((b) => {
        const { dx, dy } = stepFromDir(b.dir, step as 1 | -1);
        const nx = b.x + dx;
        const ny = b.y + dy;
        if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE) {
          return { ...b, x: nx, y: ny };
        }
        audioRef.current.play("bump");
        setBumpTick((t) => t + 1);
        return b;
      });

      return sleep(duration);
    },
    [],
  );

  const run = React.useCallback(async () => {
    if (isRunning) return;
    if (queue.length === 0) return;
    setIsRunning(true);
    msg("Ejecutando...");

    for (let i = 0; i < queue.length; i++) {
      setActiveIdx(i);
      // eslint-disable-next-line no-await-in-loop
      await execute(queue[i]);
      // eslint-disable-next-line no-await-in-loop
      await sleep(100);
    }

    setActiveIdx(null);
    setIsRunning(false);
    msg("¡Terminado!");
  }, [execute, isRunning, msg, queue]);

  return {
    scenario,
    setScenario: setScenarioSafe,
    bee,
    queue,
    activeIdx,
    isRunning,
    status,
    bumpTick,
    audioEnabled,
    enableAudio,
    addCmd,
    clear,
    resetBee,
    run,
  };
}
