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
        masterGain.gain.value = 0.3; // Master volume
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
