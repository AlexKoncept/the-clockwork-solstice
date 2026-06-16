/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class WatchAudioEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private lastTickAngle: number = 0;

  constructor() {
    // Lazy initialisation to comply with browser autoplay and API key / engine constraints
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      } catch (e) {
        console.warn('Failed to initialize AudioContext:', e);
      }
    }
  }

  setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  /**
   * Generates a high-quality physical ticking sound of a mechanical watches hand-wound escapement.
   * Leverages exponential frequency down-sweeps and instant envelope decay.
   */
  playTick(type: 'esc' | 'clank' | 'solstice' = 'esc') {
    if (!this.soundEnabled || !this.ctx) return;
    
    // Resume context if suspended
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const noiseGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      if (type === 'esc') {
        // High click of watch tooth escapement wheel release
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.008);

        noiseGain.gain.setValueAtTime(0.04, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.008);
        
        osc.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.01);
      } else if (type === 'clank') {
        // Deeper watch drum clank (e.g., when laser meshes or user does deep wind)
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.05);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, now);

        noiseGain.gain.setValueAtTime(0.08, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

        osc.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.07);
      } else if (type === 'solstice') {
        // Magical golden bell sound when Solstice target charges
        const osc2 = this.ctx.createOscillator();
        const mainGain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(659.25, now); // E5 Note
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(987.77, now); // B5 Note (harmonious fifth)

        mainGain.gain.setValueAtTime(0.12, now);
        mainGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc.connect(mainGain);
        osc2.connect(mainGain);
        mainGain.connect(this.ctx.destination);

        osc.start(now);
        osc2.start(now);
        osc.stop(now + 0.45);
        osc2.stop(now + 0.45);
      }
    } catch (e) {
      // Fail silently for browser security/blocked constraints
    }
  }

  /**
   * Compares rotation changes to tick matching tooth-intervals
   */
  processHeadingTick(currentAngle: number, teethCount: number) {
    const anglePerTooth = (2 * Math.PI) / teethCount;
    const currentSector = Math.floor(currentAngle / anglePerTooth);
    const lastSector = Math.floor(this.lastTickAngle / anglePerTooth);

    if (currentSector !== lastSector) {
      // Alternate pitch slightly for dynamic tick-tock feel
      const isTick = currentSector % 2 === 0;
      this.playTick(isTick ? 'esc' : 'esc');
      this.lastTickAngle = currentAngle;
    }
  }
}

export const watchAudio = new WatchAudioEngine();
