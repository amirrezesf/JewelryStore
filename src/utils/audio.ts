/**
 * Web Audio API synthesizer for luxury interactive sound effects.
 * Synthesizes pure harmonic chimes without external audio assets.
 */

let globalAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;

  try {
    if (!globalAudioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        globalAudioCtx = new AudioCtxClass();
      }
    }

    if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
      globalAudioCtx.resume().catch(() => {
        // Handled silently if user gesture is pending
      });
    }

    return globalAudioCtx;
  } catch {
    return null;
  }
}

/**
 * Plays a delicate, crystalline golden shimmer chime when hovering over luxury interactive elements.
 */
export function playLuxuryHoverChime(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // Primary crystal chime (high soft sine wave)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // F#6 (1479.98 Hz) to A6 (1760 Hz) subtle upward sparkle
    osc.frequency.setValueAtTime(1479.98, now);
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.1);

    // Ultra subtle envelope
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.028, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.17);
  } catch {
    // Graceful fallback if Web Audio is unsupported or restricted
  }
}

/**
 * Plays a warm, harmonic golden bell chime upon clicking the VIP WhatsApp concierge button.
 */
export function playLuxuryClickChime(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // 1. Warm base chime (D5 - 587.33 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(587.33, now);
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.18); // Harmonic slide to A5

    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.linearRampToValueAtTime(0.065, now + 0.015);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    // 2. Crystalline overtone (D7 harmonic - 2349.32 Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(2349.32, now);
    osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.22);

    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.linearRampToValueAtTime(0.025, now + 0.012);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.33);
    osc2.start(now);
    osc2.stop(now + 0.27);
  } catch {
    // Graceful fallback
  }
}
