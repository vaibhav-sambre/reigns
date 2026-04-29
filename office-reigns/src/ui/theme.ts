/**
 * Office Reigns — Theme System
 *
 * 4 distinct themes, each with:
 *  • Visual identity (CSS custom-property overrides via data-theme attribute)
 *  • Audio identity  (different chord progression, BPM, oscillator types)
 */

export type ThemeId = 'corporate' | 'startup' | 'founder' | 'coworking';

export interface AudioThemeConfig {
    bpm: number;
    /** 4 chords, each an array of frequencies in Hz (played as pads & bass) */
    chords: number[][];
    /** 16 melody notes — 4 per chord */
    melody: number[];
    padType: OscillatorType;
    melodyType: OscillatorType;
    /** reverb tail length in seconds */
    reverbDuration: number;
    /** 0–1 dry mix */
    dryMix: number;
    /** 0–1 wet (reverb) mix */
    wetMix: number;
    /** per-theme master volume scalar (applied on top of global) */
    volume: number;
}

export interface ThemeDefinition {
    id: ThemeId;
    name: string;
    tagline: string;
    emoji: string;
    description: string;
    /** Two representative hex colors for the preview swatch */
    swatchA: string;
    swatchB: string;
    audio: AudioThemeConfig;
}

// ── Music theory helpers ──────────────────────────────────────────────────────

// Corporate Tower — smooth jazz, Cmaj7 → Am7 → Dm7 → G7  @75 BPM
const CORP_CHORDS: number[][] = [
    [65.41, 82.41, 98.00, 123.47],   // Cmaj7 (C E G B)
    [110.00, 130.81, 164.81, 196.00], // Am7  (A C E G)
    [73.42, 87.31, 110.00, 130.81],   // Dm7  (D F A C)
    [98.00, 123.47, 146.83, 174.61],  // G7   (G B D F)
];
const CORP_MELODY: number[] = [
    523.25, 587.33, 659.25, 698.46,
    659.25, 523.25, 440.00, 523.25,
    587.33, 523.25, 493.88, 440.00,
    392.00, 440.00, 493.88, 523.25,
];

// Startup Chaos — indie/pop, D → A → Bm → G  @130 BPM
const START_CHORDS: number[][] = [
    [73.42, 92.50, 110.00, 146.83],   // D   (D F# A D)
    [110.00, 138.59, 164.81, 220.00], // A   (A C# E A)
    [123.47, 146.83, 185.00, 246.94], // Bm  (B D F# B)
    [98.00, 123.47, 146.83, 196.00],  // G   (G B D G)
];
const START_MELODY: number[] = [
    587.33, 659.25, 739.99, 880.00,
    739.99, 659.25, 587.33, 523.25,
    659.25, 739.99, 880.00, 739.99,
    659.25, 587.33, 659.25, 587.33,
];

// Founder Mode — lo-fi jazz, Fmaj7 → Dm7 → Bbmaj7 → Gm7  @65 BPM
const FOUND_CHORDS: number[][] = [
    [87.31, 110.00, 130.81, 164.81],  // Fmaj7  (F A C E)
    [73.42, 87.31, 110.00, 130.81],   // Dm7    (D F A C)
    [58.27, 73.42, 87.31, 110.00],    // Bbmaj7 (Bb D F A)
    [98.00, 116.54, 146.83, 174.61],  // Gm7    (G Bb D F)
];
const FOUND_MELODY: number[] = [
    349.23, 392.00, 440.00, 392.00,
    349.23, 329.63, 349.23, 392.00,
    440.00, 466.16, 440.00, 392.00,
    349.23, 329.63, 311.13, 329.63,
];

// Co-working — bossa nova, Gmaj7 → Em7 → Cmaj7 → D9  @98 BPM
const COWK_CHORDS: number[][] = [
    [98.00, 123.47, 146.83, 185.00],  // Gmaj7 (G B D F#)
    [82.41, 98.00, 123.47, 146.83],   // Em7   (E G B D)
    [65.41, 82.41, 98.00, 123.47],    // Cmaj7 (C E G B)
    [73.42, 92.50, 110.00, 164.81],   // D9    (D F# A E)
];
const COWK_MELODY: number[] = [
    392.00, 440.00, 493.88, 523.25,
    493.88, 440.00, 392.00, 369.99,
    392.00, 440.00, 493.88, 440.00,
    392.00, 369.99, 392.00, 440.00,
];

// ── Theme catalogue ───────────────────────────────────────────────────────────

export const THEMES: ThemeDefinition[] = [
    {
        id: 'corporate',
        name: 'Corporate Tower',
        tagline: 'Glass offices & late-night hustle',
        emoji: '🏢',
        description: 'Polished floors, hushed corridors, a view from the 40th floor. The stakes are high and the coffee is free.',
        swatchA: '#0a0e1a',
        swatchB: '#d4a843',
        audio: {
            bpm: 75,
            chords: CORP_CHORDS,
            melody: CORP_MELODY,
            padType: 'sine',
            melodyType: 'triangle',
            reverbDuration: 2.4,
            dryMix: 0.6,
            wetMix: 0.4,
            volume: 1.0,
        },
    },
    {
        id: 'startup',
        name: 'Startup Chaos',
        tagline: 'Move fast, break things, pivot at noon',
        emoji: '⚡',
        description: 'Sticky notes on every surface, a ping-pong table nobody uses, and a runway that just got shorter. Let\'s ship.',
        swatchA: '#1a0800',
        swatchB: '#ff6b35',
        audio: {
            bpm: 130,
            chords: START_CHORDS,
            melody: START_MELODY,
            padType: 'square',
            melodyType: 'sawtooth',
            reverbDuration: 0.8,
            dryMix: 0.85,
            wetMix: 0.15,
            volume: 0.85,
        },
    },
    {
        id: 'founder',
        name: 'Founder Mode',
        emoji: '🌙',
        tagline: 'Alone, determined, 2am and still at it',
        description: 'One monitor. One idea. The whole company on your shoulders. The world doesn\'t know your name yet — but it will.',
        swatchA: '#0d0a1e',
        swatchB: '#7c3aed',
        audio: {
            bpm: 65,
            chords: FOUND_CHORDS,
            melody: FOUND_MELODY,
            padType: 'triangle',
            melodyType: 'sine',
            reverbDuration: 3.2,
            dryMix: 0.5,
            wetMix: 0.5,
            volume: 0.9,
        },
    },
    {
        id: 'coworking',
        name: 'Co-working Space',
        emoji: '🌿',
        tagline: 'Chic vibes, strangers with laptops',
        description: 'Exposed brick, trailing plants, someone\'s dog under a standing desk. The WiFi password is on the chalkboard.',
        swatchA: '#0a1a0f',
        swatchB: '#0d9488',
        audio: {
            bpm: 98,
            chords: COWK_CHORDS,
            melody: COWK_MELODY,
            padType: 'sine',
            melodyType: 'triangle',
            reverbDuration: 1.6,
            dryMix: 0.68,
            wetMix: 0.32,
            volume: 0.95,
        },
    },
];

export const DEFAULT_THEME_ID: ThemeId = 'corporate';

export function getTheme(id: ThemeId): ThemeDefinition {
    return THEMES.find(t => t.id === id) ?? THEMES[0];
}
