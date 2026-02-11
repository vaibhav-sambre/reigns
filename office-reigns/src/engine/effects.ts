// Effects application logic with clamping

import type { Effect, PillarState, PillarType } from './types';


/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}

/**
 * Apply a single effect to pillar state
 */
export function applyEffect(pillars: PillarState, effect: Effect): PillarState {
    const newValue = clamp(pillars[effect.pillar] + effect.delta, 0, 100);
    return {
        ...pillars,
        [effect.pillar]: newValue,
    };
}

/**
 * Apply multiple effects to pillar state
 * Returns new PillarState with all effects applied and values clamped to [0, 100]
 */
export function applyEffects(pillars: PillarState, effects: Effect[]): PillarState {
    return effects.reduce((state, effect) => applyEffect(state, effect), pillars);
}

/**
 * Check if any pillar has hit zero
 * Returns the pillar name if one hit zero, null otherwise
 */
export function getZeroPillar(pillars: PillarState): PillarType | null {
    const pillarEntries: [PillarType, number][] = [
        ['bandwidth', pillars.bandwidth],
        ['salary', pillars.salary],
        ['reputation', pillars.reputation],
        ['life', pillars.life],
    ];

    for (const [pillar, value] of pillarEntries) {
        if (value === 0) {
            return pillar;
        }
    }
    return null;
}

/**
 * Get the number of pillars above a threshold
 */
export function getPillarsAbove(pillars: PillarState, threshold: number): number {
    const values = [pillars.bandwidth, pillars.salary, pillars.reputation, pillars.life];
    return values.filter((v) => v > threshold).length;
}

/**
 * Get the number of pillars below a threshold
 */
export function getPillarsBelow(pillars: PillarState, threshold: number): number {
    const values = [pillars.bandwidth, pillars.salary, pillars.reputation, pillars.life];
    return values.filter((v) => v < threshold).length;
}
