// Web Audio API Synthesizer for Lumi's Star-Weaver Lullabies & UI Sounds
// Zero external audio files required! 100% synthesized in-browser.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private listeners: Set<(muted: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lumi_sound_muted');
      this.isMuted = saved === 'true';
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('lumi_sound_muted', String(this.isMuted));
    }
    this.listeners.forEach(fn => fn(this.isMuted));
    if (!this.isMuted) {
      this.playChime(659.25, 0.4); // E5 unmuted chime
    }
    return this.isMuted;
  }

  public subscribeMute(fn: (muted: boolean) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  // Pure music box chime
  public playChime(freq = 587.33, duration = 0.8) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Sine wave with soft harmonic
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // AudioContext gracefully handled
    }
  }

  // Gentle tactile button click
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // AudioContext gracefully handled
    }
  }

  // 3-note dreamy celestial chord
  public playChord(frequencies = [523.25, 659.25, 783.99]) {
    if (this.isMuted) return;
    frequencies.forEach((freq, i) => {
      setTimeout(() => this.playChime(freq, 1.2), i * 90);
    });
  }

  // Full bedtime lullaby snippet
  public playLullaby() {
    if (this.isMuted) return;
    // Twinkle pentatonic melody: C5, C5, G5, G5, A5, A5, G5
    const notes = [
      { f: 523.25, d: 0.35, delay: 0 },
      { f: 523.25, d: 0.35, delay: 350 },
      { f: 783.99, d: 0.35, delay: 700 },
      { f: 783.99, d: 0.35, delay: 1050 },
      { f: 880.00, d: 0.35, delay: 1400 },
      { f: 880.00, d: 0.35, delay: 1750 },
      { f: 783.99, d: 0.70, delay: 2100 },
    ];

    notes.forEach(note => {
      setTimeout(() => this.playChime(note.f, note.d), note.delay);
    });
  }
}

export const sound = new SoundEngine();
