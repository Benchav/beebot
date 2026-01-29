import * as React from "react";
import { useBeeBot } from "@/features/beebot/useBeeBot";
import { BeeHeader } from "@/features/beebot/components/BeeHeader";
import { BeeBoard } from "@/features/beebot/components/BeeBoard";
import { BeeControls } from "@/features/beebot/components/BeeControls";
import { AudioOverlay } from "@/features/beebot/components/AudioOverlay";
import type { ScenarioId } from "@/features/beebot/types";

const Index = () => {
  const {
    scenario,
    setScenario,
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
    clearQueue,
    run,
  } = useBeeBot();
  const [overlayOpen, setOverlayOpen] = React.useState(true);

  const onEnableAudio = React.useCallback(async () => {
    await enableAudio();
    setOverlayOpen(false);
  }, [enableAudio]);

  return (
    <div className="h-[100dvh] overflow-hidden">
      <BeeHeader
        scenario={scenario}
        onScenarioChange={(next) => setScenario(next as ScenarioId)}
        disabled={isRunning}
      />

      <main className="mx-auto grid h-[calc(100dvh-3.5rem)] w-full max-w-6xl grid-rows-[1fr_auto] overflow-hidden md:grid-cols-[1fr_380px] md:grid-rows-1 md:gap-4 md:px-4 md:py-3">
        <div className="min-h-0 md:rounded-2xl">
          <BeeBoard scenario={scenario} bee={bee} bumpTick={bumpTick} status={status} />
        </div>

        <div className="md:my-auto">
          <BeeControls
            queue={queue}
            activeIdx={activeIdx}
            isRunning={isRunning}
            onAdd={addCmd}
            onClear={clear}
            onClearQueue={clearQueue}
            onRun={run}
          />
        </div>

        <AudioOverlay open={overlayOpen} audioEnabled={audioEnabled} onEnable={onEnableAudio} />
      </main>
    </div>
  );
};

export default Index;
