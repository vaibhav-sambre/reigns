/**
 * Office Reigns — Rich Audio Engine
 *
 * Multi-voice synthesiser using Web Audio API:
 *  • 4-voice chord pads  (oscillator type per theme)
 *  • Arpeggiated melody  (oscillator type per theme)
 *  • Walking bass line   (triangle sub)
 *  • Pseudo-reverb via generated convolver impulse
 *  • Danger mode: dissonant, tense variation (overrides theme chords)
 *  • Theme system: 4 distinct musical identities
 *  • 5 distinct sound effects
 */

import type { AudioThemeConfig } from '../ui/theme';

// ── Singleton state ──────────────────────────────────────────────────────────
let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let reverbNode: ConvolverNode | null = null;
let dryGain: GainNode | null = null;
let wetGain: GainNode | null = null;

let musicTimeout: number | null = null;
let isMusicPlaying = false;
let isDangerMode = false;
let currentChordIndex = 0;

// Active theme audio config (set by setAudioTheme)
let activeTheme: AudioThemeConfig | null = null;

// ── Init ─────────────────────────────────────────────────────────────────────
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

        masterGain = audioCtx.createGain();
        masterGain.gain.value = 0.55;

        // Reverb chain: dryGain → destination, wetGain → reverb → destination
        dryGain = audioCtx.createGain();
        dryGain.gain.value = 0.7;
        dryGain.connect(masterGain);

        wetGain = audioCtx.createGain();
        wetGain.gain.value = 0.3;

        reverbNode = buildReverb(audioCtx, activeTheme?.reverbDuration ?? 1.8);
        wetGain.connect(reverbNode);
        reverbNode.connect(masterGain);

        masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return { ctx: audioCtx, master: masterGain!, dry: dryGain!, wet: wetGain! };
}

/** Synthesise a short exponential-decay noise impulse for reverb. */
function buildReverb(ctx: AudioContext, durationSec: number): ConvolverNode {
    const node = ctx.createConvolver();
    const len = Math.floor(ctx.sampleRate * durationSec);
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
        const d = buf.getChannelData(ch);
        for (let i = 0; i < len; i++) {
            d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
        }
    }
    node.buffer = buf;
    return node;
}

// ── Default (fallback) music data ─────────────────────────────────────────────
// Used when no theme has been set yet (e.g. first load before theme selection)

const DEFAULT_CHORDS: number[][] = [
    [110.00, 130.81, 164.81, 196.00],  // Am7
    [87.31,  110.00, 130.81, 164.81],  // Fmaj7
    [65.41,   82.41,  98.00, 123.47],  // Cmaj7
    [82.41,   98.00, 123.47, 146.83],  // Em7
];

const DEFAULT_MELODY: number[] = [
    440.00, 523.25, 659.25, 523.25,
    698.46, 659.25, 523.25, 440.00,
    523.25, 587.33, 659.25, 587.33,
    659.25, 587.33, 523.25, 392.00,
];

// Danger variation — dissonant, half-diminished (overrides theme chords)
const CHORDS_DANGER: number[][] = [
    [110.00, 130.81, 155.56, 185.00],  // Adim7
    [73.42, 87.31, 103.83, 130.81],    // Dm7b5
    [58.27, 73.42, 87.31, 110.00],     // Bbmaj7
    [82.41, 103.83, 123.47, 146.83],   // E7b9
];

const DANGER_MELODY: number[] = [
    349.23, 369.99, 329.63, 311.13,
    293.66, 311.13, 329.63, 349.23,
    369.99, 392.00, 369.99, 349.23,
    329.63, 311.13, 293.66, 277.18,
];

// ── Low-level synthesis helpers ───────────────────────────────────────────────

/** Play a single tone with ADSR envelope into the reverb send. */
function tone(
    ctx: AudioContext,
    dest: GainNode,
    reverbSend: GainNode,
    freq: number,
    start: number,
    duration: number,
    type: OscillatorType,
    peak: number,
    attack = 0.04,
    release = 0.15,
    detuneHz = 0
) {
    const osc = ctx.createOscillator();
    const env = ctx.createGain();

    osc.type = type;
    osc.frequency.value = freq;
    if (detuneHz) osc.detune.value = detuneHz * 100;

    env.gain.setValueAtTime(0, start);
    env.gain.linearRampToValueAtTime(peak, start + attack);
    env.gain.setValueAtTime(peak, start + duration - release);
    env.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    osc.connect(env);
    env.connect(dest);
    env.connect(reverbSend);

    osc.start(start);
    osc.stop(start + duration + 0.01);
}

/** White-noise burst for hi-hat / percussive effects. */
function noiseBurst(ctx: AudioContext, dest: GainNode, start: number, duration: number, peak: number, highpass = 4000) {
    const buf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * duration), ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;

    const src = ctx.createBufferSource();
    src.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = highpass;

    const env = ctx.createGain();
    env.gain.setValueAtTime(peak, start);
    env.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    src.connect(filter);
    filter.connect(env);
    env.connect(dest);

    src.start(start);
    src.stop(start + duration + 0.01);
}

// ── Music Scheduler ───────────────────────────────────────────────────────────

function scheduleMeasure() {
    if (!isMusicPlaying || !audioCtx || !dryGain || !wetGain) return;

    const ctx = audioCtx;
    const dry = dryGain;
    const wet = wetGain;

    // Danger overrides theme
    const chords  = isDangerMode ? CHORDS_DANGER   : (activeTheme?.chords  ?? DEFAULT_CHORDS);
    const melody  = isDangerMode ? DANGER_MELODY   : (activeTheme?.melody  ?? DEFAULT_MELODY);
    const bpm     = isDangerMode ? 115             : (activeTheme?.bpm     ?? 82);
    const padType: OscillatorType = isDangerMode ? 'sawtooth' : (activeTheme?.padType   ?? 'sine');
    const melType: OscillatorType = isDangerMode ? 'sawtooth' : (activeTheme?.melodyType ?? 'triangle');

    const beat = 60 / bpm;
    const bar  = beat * 4;

    const now   = ctx.currentTime;
    const chord = chords[currentChordIndex % chords.length];
    const melOffset = (currentChordIndex % chords.length) * 4;

    // ── Pad chords (2 stabs per bar) ──────────────────────────────────────
    chord.forEach(f => {
        tone(ctx, dry, wet, f * 2, now,              bar  * 0.9, padType, isDangerMode ? 0.12 : 0.10, 0.08, 0.40);
        tone(ctx, dry, wet, f * 2, now + beat * 2,   beat * 1.8, padType, isDangerMode ? 0.10 : 0.08, 0.06, 0.30);
    });

    // ── Bass (root beat 1, fifth beat 3) ─────────────────────────────────
    const root  = chord[0];
    const fifth = chord[2] ?? chord[1];
    tone(ctx, dry, wet, root,  now,            beat * 0.85, 'triangle', 0.35, 0.02, 0.20);
    tone(ctx, dry, wet, fifth, now + beat * 2, beat * 0.85, 'triangle', 0.25, 0.02, 0.20);

    // ── Melody (4 quarter notes per bar) ─────────────────────────────────
    for (let i = 0; i < 4; i++) {
        const mfreq = melody[(melOffset + i) % melody.length];
        tone(ctx, dry, wet, mfreq, now + beat * i, beat * 0.75, melType,
            isDangerMode ? 0.12 : 0.09, 0.01, 0.15);
    }

    // ── Percussion pattern (varies by tempo feel) ─────────────────────────
    if (isDangerMode) {
        // Stressed off-beats
        noiseBurst(ctx, dry, now + beat,       0.05, 0.08);
        noiseBurst(ctx, dry, now + beat * 3,   0.05, 0.10);
    } else if (bpm >= 120) {
        // Fast themes: 4-on-the-floor kick-feel hi-hats
        for (let i = 0; i < 4; i++) {
            noiseBurst(ctx, dry, now + beat * i, 0.04, 0.07, 5000);
        }
    } else if (bpm >= 90) {
        // Mid-tempo: swing hi-hats on 2 & 4
        noiseBurst(ctx, dry, now + beat * 1,   0.04, 0.05, 6000);
        noiseBurst(ctx, dry, now + beat * 3,   0.04, 0.05, 6000);
    } else {
        // Slow/lofi: gentle ghost notes
        noiseBurst(ctx, dry, now + beat * 1.5, 0.04, 0.03, 6000);
        noiseBurst(ctx, dry, now + beat * 3.5, 0.04, 0.03, 6000);
    }

    currentChordIndex++;

    const lookahead = bar * 1000 - 80;
    musicTimeout = window.setTimeout(scheduleMeasure, lookahead);
}

// ── Public API ────────────────────────────────────────────────────────────────

export type SoundType = 'select' | 'swipe' | 'game-over' | 'promote';

/**
 * Call this when the player selects a theme (before or during gameplay).
 * Restarts music immediately with new theme parameters.
 */
export function setAudioTheme(config: AudioThemeConfig) {
    const wasPlaying = isMusicPlaying;

    // Update mix levels on live nodes if they exist
    if (dryGain) dryGain.gain.value = config.dryMix;
    if (wetGain) wetGain.gain.value = config.wetMix;
    if (masterGain) masterGain.gain.value = 0.55 * config.volume;

    activeTheme = config;

    // Rebuild reverb for the new tail length
    if (audioCtx && reverbNode) {
        const newReverb = buildReverb(audioCtx, config.reverbDuration);
        wetGain?.disconnect();
        newReverb.connect(masterGain!);
        wetGain?.connect(newReverb);
        reverbNode = newReverb;
    }

    if (wasPlaying) {
        // Restart music to pick up new chords/tempo immediately
        stopBackgroundMusic();
        isMusicPlaying = true;
        currentChordIndex = 0;
        try {
            initAudio();
            scheduleMeasure();
        } catch (e) {
            console.warn('Theme music restart failed', e);
        }
    }
}

export function playSound(type: SoundType) {
    try {
        const { ctx, dry, wet } = initAudio();
        const now = ctx.currentTime;

        switch (type) {
            case 'select': {
                tone(ctx, dry, wet, 880,  now,         0.08, 'sine', 0.4,  0.005, 0.07);
                tone(ctx, dry, wet, 1320, now + 0.05,  0.06, 'sine', 0.25, 0.005, 0.05);
                break;
            }
            case 'swipe': {
                const osc = ctx.createOscillator();
                const env = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.exponentialRampToValueAtTime(120, now + 0.22);
                env.gain.setValueAtTime(0.0001, now);
                env.gain.linearRampToValueAtTime(0.3, now + 0.02);
                env.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
                osc.connect(env); env.connect(dry); env.connect(wet);
                osc.start(now); osc.stop(now + 0.25);
                noiseBurst(ctx, dry, now, 0.18, 0.08, 800);
                break;
            }
            case 'game-over': {
                const notes = [392.00, 369.99, 349.23, 311.13, 293.66];
                notes.forEach((f, i) => {
                    tone(ctx, dry, wet, f,     now + i * 0.28, 0.35, 'triangle', 0.28, 0.01, 0.25);
                    tone(ctx, dry, wet, f / 2, now + i * 0.28, 0.35, 'sine',     0.15, 0.01, 0.30);
                });
                tone(ctx, dry, wet, 55, now + 0.6, 0.8, 'sine', 0.3, 0.05, 0.5);
                break;
            }
            case 'promote': {
                const fanfare: [number, number, number][] = [
                    [523.25, 0.00, 0.12],
                    [659.25, 0.12, 0.12],
                    [783.99, 0.24, 0.12],
                    [1046.50, 0.36, 0.40],
                    [880.00,  0.76, 0.15],
                    [1046.50, 0.91, 0.60],
                ];
                fanfare.forEach(([f, off, dur]) => {
                    tone(ctx, dry, wet, f,     now + off, dur, 'square',   0.18, 0.01, 0.08);
                    tone(ctx, dry, wet, f / 2, now + off, dur, 'triangle', 0.12, 0.02, 0.15);
                });
                for (let i = 0; i < 6; i++) {
                    const cf = 1000 + Math.random() * 1400;
                    tone(ctx, dry, wet, cf, now + 0.05 * i, 0.4, 'sine', 0.06, 0.005, 0.3);
                }
                break;
            }
        }
    } catch (e) {
        console.warn('Audio playback failed', e);
    }
}

export function startBackgroundMusic() {
    if (isMusicPlaying) return;

    isMusicPlaying = true;
    currentChordIndex = 0;

    try {
        const { ctx } = initAudio();
        if (ctx.state === 'suspended') ctx.resume();
        scheduleMeasure();
    } catch (e) {
        console.warn('Background music failed', e);
    }
}

export function stopBackgroundMusic() {
    isMusicPlaying = false;
    if (musicTimeout !== null) {
        window.clearTimeout(musicTimeout);
        musicTimeout = null;
    }
}

export function toggleBackgroundMusic(): boolean {
    if (isMusicPlaying) {
        stopBackgroundMusic();
        return false;
    } else {
        startBackgroundMusic();
        return true;
    }
}

/** Call each frame from the game loop to switch danger mode on/off. */
export function setDangerMode(danger: boolean) {
    if (isDangerMode !== danger) {
        isDangerMode = danger;
    }
}
