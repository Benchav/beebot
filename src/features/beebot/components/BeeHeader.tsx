import * as React from "react";
import { Sparkles } from "lucide-react";
import type { ScenarioId } from "@/features/beebot/types";
import { scenarioLabel } from "@/features/beebot/scenarios";

export function BeeHeader(props: {
  scenario: ScenarioId;
  onScenarioChange: (next: ScenarioId) => void;
  disabled?: boolean;
}) {
  const scenarioOptions: { id: ScenarioId; label: string }[] = React.useMemo(
    () =>
      (Object.keys(scenarioLabel) as ScenarioId[]).map((id) => ({
        id,
        label: scenarioLabel[id],
      })),
    [],
  );

  return (
    <header className="sticky top-0 z-30 h-14 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-full max-w-3xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-accent">
            <Sparkles className="h-5 w-5 text-foreground" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <h1 className="text-base font-black tracking-tight">Bee‑Bot</h1>
            <p className="text-xs text-muted-foreground">PWA offline · 6×6 · memoria de comandos</p>
          </div>
        </div>

        <label className="flex items-center gap-2">
          <span className="sr-only">Selecciona escenario</span>
          <select
            value={props.scenario}
            onChange={(e) => props.onScenarioChange(e.target.value as ScenarioId)}
            className="h-9 rounded-full bg-secondary px-3 text-sm font-bold text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            disabled={props.disabled}
          >
            {scenarioOptions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </header>
  );
}
