type SfxType = "click" | "move" | "turn" | "bump" | "start";

export class BeeBotAudio {
  private ctx: AudioContext | null = null;

  get enabled() {
    return !!this.ctx;
  }

  async enable() {
    if (this.ctx) return;
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    this.ctx = new Ctx();
    // iOS sometimes starts suspended
    if (this.ctx.state === "suspended") await this.ctx.resume();
  }

  play(type: SfxType) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const stopAt = (dt: number) => {
      osc.start(t);
      osc.stop(t + dt);
    };

    if (type === "click") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(300, t + 0.08);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.linearRampToValueAtTime(0, t + 0.08);
      stopAt(0.08);
      return;
    }

    if (type === "turn") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.linearRampToValueAtTime(520, t + 0.35);
      gain.gain.setValueAtTime(0.09, t);
      gain.gain.linearRampToValueAtTime(0, t + 0.35);
      stopAt(0.35);
      return;
    }

    if (type === "move") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(110, t);
      osc.frequency.linearRampToValueAtTime(185, t + 0.38);
      gain.gain.setValueAtTime(0.09, t);
      gain.gain.linearRampToValueAtTime(0, t + 0.38);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "square";
      osc2.frequency.setValueAtTime(55, t);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      gain2.gain.setValueAtTime(0.05, t);
      gain2.gain.linearRampToValueAtTime(0, t + 0.38);

      osc2.start(t);
      osc2.stop(t + 0.38);
      stopAt(0.38);
      return;
    }

    if (type === "bump") {
      osc.type = "square";
      osc.frequency.setValueAtTime(150, t);
      osc.frequency.exponentialRampToValueAtTime(55, t + 0.28);
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.linearRampToValueAtTime(0, t + 0.28);
      stopAt(0.28);
      return;
    }

    // start melody
    if (type === "start") {
      const notes = [440, 554, 659];
      notes.forEach((freq, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.type = "triangle";
        o.frequency.value = freq;
        g.gain.setValueAtTime(0.1, t + i * 0.1);
        g.gain.linearRampToValueAtTime(0, t + i * 0.1 + 0.3);
        o.start(t + i * 0.1);
        o.stop(t + i * 0.1 + 0.3);
      });
    }
  }
}
