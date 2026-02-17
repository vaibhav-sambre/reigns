/**
 * Simple Audio Synthesizer for Office Reigns
 * Uses Web Audio API to generate sound effects without external assets.
 */

// Singleton AudioContext
let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;

const initAudio = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        masterGain = audioCtx.createGain();
        masterGain.gain.value = 0.5; // Master volume increased
        masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return { ctx: audioCtx, master: masterGain };
};

export type SoundType = 'select' | 'swipe' | 'success' | 'failure' | 'game-over' | 'promote';

export function playSound(type: SoundType) {
    try {
        const { ctx, master } = initAudio();
        if (!ctx || !master) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(master);

        const now = ctx.currentTime;

        switch (type) {
            case 'select':
                // High pitch blip
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
                gain.gain.setValueAtTime(0.5, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;

            case 'swipe':
                // Low wish-wash
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.linearRampToValueAtTime(300, now + 0.2);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
                break;

            case 'success':
                // Major chord arpeggio
                playNote(ctx, master, 523.25, now, 0.1, 'sine'); // C5
                playNote(ctx, master, 659.25, now + 0.1, 0.1, 'sine'); // E5
                playNote(ctx, master, 783.99, now + 0.2, 0.2, 'sine'); // G5
                break;

            case 'failure':
                // Buzzer
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.linearRampToValueAtTime(100, now + 0.3);
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;

            case 'game-over':
                // Sad trombone-ish
                playNote(ctx, master, 392.00, now, 0.3, 'triangle'); // G4
                playNote(ctx, master, 369.99, now + 0.3, 0.3, 'triangle'); // F#4
                playNote(ctx, master, 349.23, now + 0.6, 0.4, 'triangle'); // F4
                playNote(ctx, master, 329.63, now + 0.9, 0.6, 'triangle'); // E4
                break;

            case 'promote':
                // Fanfare
                playNote(ctx, master, 523.25, now, 0.15, 'square'); // C5
                playNote(ctx, master, 523.25, now + 0.15, 0.15, 'square'); // C5
                playNote(ctx, master, 523.25, now + 0.3, 0.15, 'square'); // C5
                playNote(ctx, master, 659.25, now + 0.45, 0.4, 'square'); // E5
                break;
        }
    } catch (e) {
        console.warn("Audio playback failed", e);
    }
}

function playNote(ctx: AudioContext, master: GainNode, freq: number, startTime: number, duration: number, type: OscillatorType = 'sine') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(master);

    osc.type = type;
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(0.3, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

    osc.start(startTime);
    osc.stop(startTime + duration);
}

// Background Music
let musicGain: GainNode | null = null;
let musicInterval: number | null = null;
let isMusicPlaying = false;
let currentNoteIndex = 0;

// Simple "Elevator Bossa Nova" progression
// ii - V - I - VI
// Dm7 - G7 - Cmaj7 - A7
const BASS_LINE = [
    { freq: 146.83, duration: 2 }, // D3
    { freq: 98.00, duration: 2 },  // G2
    { freq: 130.81, duration: 2 }, // C3
    { freq: 110.00, duration: 2 }, // A2
];

const CHORDS = [
    // Dm7 (D F A C)
    [293.66, 349.23, 440.00, 523.25],
    // G7 (G B D F)
    [196.00, 246.94, 293.66, 349.23],
    // Cmaj7 (C E G B)
    [261.63, 329.63, 392.00, 493.88],
    // A7 (A C# E G)
    [220.00, 277.18, 329.63, 392.00]
];

export function startBackgroundMusic() {
    if (isMusicPlaying) {
        console.log("Music already playing");
        return;
    }

    console.log("Starting background music...");
    try {
        const { ctx, master } = initAudio();

        // Ensure context is running (sometimes initAudio returns suspended state)
        if (ctx && ctx.state === 'suspended') {
            ctx.resume().then(() => console.log("AudioContext resumed"));
        }

        if (!ctx || !master) {
            console.error("Audio context not initialized");
            return;
        }

        if (!musicGain) {
            musicGain = ctx.createGain();
            // Increased volume significantly
            musicGain.gain.value = 0.6;
            musicGain.connect(master);
        }

        isMusicPlaying = true;
        currentNoteIndex = 0;
        scheduleNextMeasure();
        console.log("Music scheduled");

    } catch (e) {
        console.warn("Background music failed", e);
    }
}

export function stopBackgroundMusic() {
    isMusicPlaying = false;
    if (musicInterval) {
        window.clearTimeout(musicInterval);
        musicInterval = null;
    }
    // We don't disconnect the node to avoid clicking, just stop scheduling
}

function scheduleNextMeasure() {
    if (!isMusicPlaying || !audioCtx || !musicGain) return;

    const ctx = audioCtx;
    const now = ctx.currentTime;
    const tempo = 100; // BPM
    const beatDuration = 60 / tempo;
    const measureDuration = beatDuration * 4;

    // Play Bass
    playTone(ctx, musicGain, BASS_LINE[currentNoteIndex].freq, now, measureDuration, 'triangle', 0.3);

    // Play Chord Stabs (on beat 2 and 4 - light bossa feel)
    const chord = CHORDS[currentNoteIndex];
    chord.forEach(freq => {
        // Soft stabs
        playTone(ctx, musicGain!, freq, now + beatDuration, 0.2, 'sine', 0.15);
        playTone(ctx, musicGain!, freq, now + beatDuration * 2.5, 0.2, 'sine', 0.1);
        playTone(ctx, musicGain!, freq, now + beatDuration * 3.5, 0.4, 'sine', 0.15);
    });

    // Schedule next measure
    currentNoteIndex = (currentNoteIndex + 1) % BASS_LINE.length;

    // Use setTimeout to schedule the next batch lookahead
    // Schedule slightly before the current measure ends to ensure continuity
    const lookahead = (measureDuration * 1000) - 100;
    musicInterval = window.setTimeout(scheduleNextMeasure, lookahead);
}

function playTone(ctx: AudioContext, dest: GainNode, freq: number, startTime: number, duration: number, type: OscillatorType, maxVol: number) {
    const osc = ctx.createOscillator();
    const env = ctx.createGain();

    osc.type = type;
    osc.frequency.value = freq;

    env.gain.setValueAtTime(0, startTime);
    env.gain.linearRampToValueAtTime(maxVol, startTime + 0.05);
    env.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(env);
    env.connect(dest);

    osc.start(startTime);
    osc.stop(startTime + duration);
}
