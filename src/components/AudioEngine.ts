// Web Audio API Synthesizer & Music Player
// Generates warm, romantic acoustic piano chords and manages playlist playback

class RomanticSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: any = null;
  private currentStep: number = 0;
  private volume: number = 0.5;
  private onStateChange: ((playing: boolean, time: number, songIdx: number) => void) | null = null;
  private currentTrackIdx: number = 0;
  private customAudio: HTMLAudioElement | null = null;
  private startTime: number = 0;
  private pausedAt: number = 0;
  private simulatedTime: number = 0;

  public tracks = [
    {
      id: "our-song",
      title: "Our Song (Starlight Piano)",
      artist: "For Jay",
      album: "Memories & Milestones",
      duration: 184, // seconds
      cover: "/laying down.jpg",
      note: "The song playing when you open the letter. Every note reminds me of our quietest, sweetest moments.",
      chordProgression: [
        // Chord roots & arpeggio notes in Hz
        // Cmaj7 -> Am9 -> Fmaj7 -> Gsus4 / G
        [261.63, 329.63, 392.00, 493.88, 523.25], // Cmaj7
        [220.00, 261.63, 329.63, 392.00, 493.88], // Am9
        [174.61, 220.00, 261.63, 329.63, 349.23], // Fmaj7
        [196.00, 261.63, 293.66, 392.00, 493.88], // Gsus4
      ],
      tempoMs: 1400,
    },
    {
      id: "sunset-reverie",
      title: "Sunset Walk Reverie",
      artist: "Acoustic Reflection",
      album: "Golden Hour Edition",
      duration: 210,
      cover: "/walking-tgthr.jpg",
      note: "Inspired by that long walk where we talked about everything and forgot what time it was.",
      chordProgression: [
        // Dmaj7 -> Bm7 -> Gmaj7 -> A7
        [293.66, 369.99, 440.00, 554.37, 587.33],
        [246.94, 293.66, 369.99, 440.00, 493.88],
        [196.00, 246.94, 293.66, 369.99, 392.00],
        [220.00, 277.18, 329.63, 392.00, 440.00],
      ],
      tempoMs: 1600,
    },
    {
      id: "cafe-morning",
      title: "Warm Coffee & Soft Smiles",
      artist: "Acoustic Cozy",
      album: "Everyday Magic",
      duration: 168,
      cover: "/cafe-memory.jpg",
      note: "For lazy mornings, shared coffees, and the little jokes only the two of us understand.",
      chordProgression: [
        // Emaj7 -> C#m7 -> Amaj7 -> B7
        [329.63, 415.30, 493.88, 622.25, 659.25],
        [277.18, 329.63, 415.30, 493.88, 554.37],
        [220.00, 277.18, 329.63, 415.30, 440.00],
        [246.94, 311.13, 369.99, 440.00, 493.88],
      ],
      tempoMs: 1300,
    }
  ];

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Play a soft, natural acoustic piano tone
  private playPianoNote(freq: number, startTime: number, duration: number, velocity: number = 0.5) {
    if (!this.ctx) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const oscSub = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Harmonics
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(freq, startTime);

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(freq * 2, startTime); // gentle overtone

    oscSub.type = "sine";
    oscSub.frequency.setValueAtTime(freq * 0.5, startTime); // sub warmth

    // Warm gentle lowpass filter to mimic felt hammer piano
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, startTime);
    filter.frequency.exponentialRampToValueAtTime(350, startTime + duration);

    // Natural ADSR envelope
    const now = startTime;
    const attack = 0.015;
    const peakGain = velocity * this.volume * 0.45;

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(peakGain, now + attack);
    gain.gain.exponentialRampToValueAtTime(peakGain * 0.6, now + attack + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.00001, now + duration);

    // Connect nodes
    osc1.connect(filter);
    osc2.connect(filter);
    oscSub.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    oscSub.start(now);

    osc1.stop(now + duration + 0.05);
    osc2.stop(now + duration + 0.05);
    oscSub.stop(now + duration + 0.05);
  }

  // Play gentle envelope seal break chime
  public playWaxSealChime() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Sparkle frequencies
    const notes = [587.33, 880.00, 1174.66, 1760.00];
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      gain.gain.setValueAtTime(0.12 * this.volume, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.45);
    });
  }

  public subscribe(cb: (playing: boolean, time: number, songIdx: number) => void) {
    this.onStateChange = cb;
  }

  public playTrack(trackIdx: number = 0) {
    this.initCtx();
    this.currentTrackIdx = trackIdx;
    this.isPlaying = true;
    this.startTime = Date.now() - (this.simulatedTime * 1000);
    this.stepMusicLoop();
    this.startProgressTicker();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.playTrack(this.currentTrackIdx);
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.onStateChange) {
      this.onStateChange(false, this.simulatedTime, this.currentTrackIdx);
    }
  }

  public nextTrack() {
    const nextIdx = (this.currentTrackIdx + 1) % this.tracks.length;
    this.simulatedTime = 0;
    this.currentStep = 0;
    this.playTrack(nextIdx);
  }

  public prevTrack() {
    const prevIdx = (this.currentTrackIdx - 1 + this.tracks.length) % this.tracks.length;
    this.simulatedTime = 0;
    this.currentStep = 0;
    this.playTrack(prevIdx);
  }

  public seek(seconds: number) {
    this.simulatedTime = seconds;
    this.startTime = Date.now() - (seconds * 1000);
    if (this.onStateChange) {
      this.onStateChange(this.isPlaying, this.simulatedTime, this.currentTrackIdx);
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public getVolume() {
    return this.volume;
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  public getCurrentTrack() {
    return this.tracks[this.currentTrackIdx];
  }

  public getCurrentTrackIndex() {
    return this.currentTrackIdx;
  }

  public getSimulatedTime() {
    return this.simulatedTime;
  }

  private stepMusicLoop = () => {
    if (!this.isPlaying || !this.ctx) return;

    const track = this.tracks[this.currentTrackIdx];
    const chords = track.chordProgression;
    const chordIndex = Math.floor(this.currentStep / 4) % chords.length;
    const currentChord = chords[chordIndex];

    const ctxNow = this.ctx.currentTime;
    
    // Play root bass note
    this.playPianoNote(currentChord[0] * 0.5, ctxNow, 1.8, 0.4);

    // Arpeggiate chord notes with soft humanized timing
    currentChord.forEach((freq, i) => {
      const delay = (i * 0.12) + (Math.random() * 0.02);
      this.playPianoNote(freq, ctxNow + delay, 1.4, 0.28 + (i * 0.04));
    });

    this.currentStep++;

    const tempo = track.tempoMs || 1500;
    this.timerId = setTimeout(this.stepMusicLoop, tempo);
  };

  private startProgressTicker() {
    const tick = () => {
      if (!this.isPlaying) return;
      const track = this.tracks[this.currentTrackIdx];
      this.simulatedTime += 0.5;
      if (this.simulatedTime >= track.duration) {
        this.simulatedTime = 0;
        this.currentStep = 0;
        this.nextTrack();
        return;
      }
      if (this.onStateChange) {
        this.onStateChange(true, this.simulatedTime, this.currentTrackIdx);
      }
      setTimeout(tick, 500);
    };
    setTimeout(tick, 500);
  }
}

// Global Singleton for seamless background music state across components
let globalAudioEngine: RomanticSoundEngine | null = null;

export function getAudioEngine(): RomanticSoundEngine {
  if (typeof window === "undefined") {
    return new RomanticSoundEngine();
  }
  if (!globalAudioEngine) {
    globalAudioEngine = new RomanticSoundEngine();
  }
  return globalAudioEngine;
}
