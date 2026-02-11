// Card selection with anti-repeat logic and deterministic RNG

import type { Card, Persona } from './types';


/**
 * Seeded pseudo-random number generator (Mulberry32)
 * Returns a function that generates numbers between 0 and 1
 */
export function createSeededRng(seed: number): () => number {
    let state = seed;
    return () => {
        state |= 0;
        state = (state + 0x6d2b79f5) | 0;
        let t = Math.imul(state ^ (state >>> 15), 1 | state);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/**
 * Select a random card from the deck, avoiding recently played cards
 * 
 * @param cards - All available cards
 * @param recentCardIds - IDs of recently played cards to avoid
 * @param seed - Optional seed for deterministic selection
 * @param callCount - Number of times RNG has been called (for deterministic seeds)
 */
/**
 * Select a random card from the deck with advanced distribution logic
 * 
 * @param cards - All available cards
 * @param recentCardIds - IDs of recently played cards to avoid
 * @param history - Full decision history to track special events
 * @param currentWeek - Current game week
 * @param currentPersona - Active persona for weighting
 * @param seed - Optional seed for deterministic selection
 * @param callCount - Number of times RNG has been called
 */
export function selectCard(
    cards: Card[],
    recentCardIds: string[],
    history: { cardId: string }[],
    currentWeek: number,
    currentPersona: Persona,
    seed?: number,
    callCount: number = 0
): Card | null {
    if (cards.length === 0) return null;

    // Helper for RNG
    const getRandom = () => {
        if (seed !== undefined) {
            // Re-create generator and advance state to match call count
            const generator = createSeededRng(seed);
            for (let i = 0; i < callCount; i++) generator();
            callCount++; // Local increment for subsequent calls within this function
            return generator();
        }
        return Math.random();
    };


    // 1. Analyze History for Special Cards
    const playedCards = history.map(h => cards.find(c => c.id === h.cardId)).filter((c): c is Card => !!c);
    const doomsdayCount = playedCards.filter(c => c.tags.includes('doomsday')).length;
    const angelCount = playedCards.filter(c => c.tags.includes('angel')).length;

    let forceType: 'doomsday' | 'angel' | null = null;

    // Forced Injection Logic (Guarantee 3 of each per 52 weeks)
    // Benchmarks: Week 17 (1), Week 34 (2), Week 48 (3) 
    if (currentWeek > 15 && doomsdayCount < 1) forceType = 'doomsday';
    else if (currentWeek > 30 && doomsdayCount < 2) forceType = 'doomsday';
    else if (currentWeek > 45 && doomsdayCount < 3) forceType = 'doomsday';

    // Angel logic (similar pacing but check if doomsday is already forced)
    if (!forceType) {
        if (currentWeek > 15 && angelCount < 1) forceType = 'angel';
        else if (currentWeek > 30 && angelCount < 2) forceType = 'angel';
        else if (currentWeek > 45 && angelCount < 3) forceType = 'angel';
    }

    // 2. Define Pools
    let pool: Card[] = [];

    if (forceType === 'doomsday') {
        pool = cards.filter(c => c.tags.includes('doomsday'));
    } else if (forceType === 'angel') {
        pool = cards.filter(c => c.tags.includes('angel'));
    } else {
        // Standard Gameplay: 2:1 Ratio (Generic : Specific)
        // 33% chance for Specific, 66% chance for Generic
        // But wait, the user asked for 2:1 Ratio of Generic + Specific... 
        // "2:1 ratio of generic + persona specific cards" 
        // Typically implies 2 Generic for every 1 Specific. (66% Generic, 33% Specific).

        const isSpecific = getRandom() < 0.33;

        if (isSpecific) {
            // Specific Pool: Cards strictly FOR this persona (not generic)
            pool = cards.filter(c =>
                c.personas?.includes(currentPersona) &&
                !c.personas?.includes('generic') &&
                !c.tags.includes('doomsday') &&
                !c.tags.includes('angel')
            );
            // Fallback if empty specific pool
            if (pool.length === 0) {
                pool = cards.filter(c =>
                    (c.personas?.includes('generic') || !c.personas || c.personas.length === 0) &&
                    !c.tags.includes('doomsday') &&
                    !c.tags.includes('angel')
                );
            }
        } else {
            // Generic Pool
            pool = cards.filter(c =>
                (c.personas?.includes('generic') || !c.personas || c.personas.length === 0) &&
                !c.tags.includes('doomsday') &&
                !c.tags.includes('angel')
            );
        }
    }

    // 3. Apply Recent Filter
    const eligiblePool = pool.filter(c => !recentCardIds.includes(c.id));
    const finalPool = eligiblePool.length > 0 ? eligiblePool : pool; // Reset if exhausted

    if (finalPool.length === 0) return null; // Should never happen unless DB is empty

    const index = Math.floor(getRandom() * finalPool.length);
    return finalPool[index];
}

/**
 * Filter cards by track (IC or Manager)
 */
export function filterCardsByTrack(cards: Card[], track: 'IC' | 'Manager'): Card[] {
    return cards.filter((card) => card.track === track);
}

/**
 * Filter cards by tag
 */
export function filterCardsByTag(cards: Card[], tag: string): Card[] {
    return cards.filter((card) => card.tags.includes(tag));
}

/**
 * Shuffle an array using Fisher-Yates algorithm with optional seed
 */
export function shuffleArray<T>(array: T[], seed?: number): T[] {
    const result = [...array];
    const rng = seed !== undefined ? createSeededRng(seed) : Math.random;

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor((typeof rng === 'function' ? rng() : Math.random()) * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

/**
 * Filter cards by persona
 * Cards are included if:
 * 1. They have no persona tags (undefined or empty)
 * 2. They contain the 'generic' tag
 * 3. They contain the specific target persona tag
 */
export function filterCardsByPersona(cards: Card[], persona: Persona): Card[] {
    return cards.filter((card) => {
        // If no personas defined, assume generic/avail to all
        if (!card.personas || card.personas.length === 0) {
            return true;
        }

        // Check for 'generic' or matching persona
        return card.personas.includes('generic') || card.personas.includes(persona);
    });
}
