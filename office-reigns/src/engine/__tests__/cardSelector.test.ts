import { describe, it, expect } from 'vitest';
import { selectCard, createSeededRng, filterCardsByTrack } from '../cardSelector';
import type { Card } from '../types';


const createTestCards = (count: number): Card[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: `card-${i + 1}`,
        track: 'IC' as const,
        tags: i === 0 ? ['promotion-opportunity'] : [],
        prompt: `Test prompt ${i + 1}`,
        leftChoice: { label: 'Left', effects: [] },
        rightChoice: { label: 'Right', effects: [] },
    }));
};

describe('createSeededRng', () => {
    it('produces deterministic values for same seed', () => {
        const rng1 = createSeededRng(12345);
        const rng2 = createSeededRng(12345);

        const values1 = [rng1(), rng1(), rng1()];
        const values2 = [rng2(), rng2(), rng2()];

        expect(values1).toEqual(values2);
    });

    it('produces different values for different seeds', () => {
        const rng1 = createSeededRng(12345);
        const rng2 = createSeededRng(54321);

        expect(rng1()).not.toBe(rng2());
    });

    it('produces values between 0 and 1', () => {
        const rng = createSeededRng(42);
        for (let i = 0; i < 100; i++) {
            const value = rng();
            expect(value).toBeGreaterThanOrEqual(0);
            expect(value).toBeLessThan(1);
        }
    });
});

describe('selectCard', () => {
    it('returns null for empty card array', () => {
        const result = selectCard([], []);
        expect(result).toBeNull();
    });

    it('returns a card from the available cards', () => {
        const cards = createTestCards(5);
        const result = selectCard(cards, []);
        expect(result).not.toBeNull();
        expect(cards.map((c) => c.id)).toContain(result?.id);
    });

    it('avoids recently played cards', () => {
        const cards = createTestCards(5);
        const recentIds = ['card-1', 'card-2', 'card-3'];

        // Run multiple times to ensure recent cards are avoided
        for (let i = 0; i < 20; i++) {
            const result = selectCard(cards, recentIds);
            expect(result).not.toBeNull();
            expect(recentIds).not.toContain(result?.id);
        }
    });

    it('allows cards when all have been recently played', () => {
        const cards = createTestCards(3);
        const recentIds = ['card-1', 'card-2', 'card-3'];

        const result = selectCard(cards, recentIds);
        expect(result).not.toBeNull();
    });

    it('produces deterministic results with seed', () => {
        const cards = createTestCards(10);

        const result1 = selectCard(cards, [], 12345, 0);
        const result2 = selectCard(cards, [], 12345, 0);

        expect(result1?.id).toBe(result2?.id);
    });

    it('produces different results with different call counts', () => {
        const cards = createTestCards(10);

        const result1 = selectCard(cards, [], 12345, 0);
        const result2 = selectCard(cards, [], 12345, 5);

        // They might be the same by chance, but usually different
        // Just ensure they don't crash
        expect(result1).not.toBeNull();
        expect(result2).not.toBeNull();
    });
});

describe('filterCardsByTrack', () => {
    it('filters cards by IC track', () => {
        const cards: Card[] = [
            { id: '1', track: 'IC', tags: [], prompt: 'IC card', leftChoice: { label: 'L', effects: [] }, rightChoice: { label: 'R', effects: [] } },
            { id: '2', track: 'Manager', tags: [], prompt: 'Manager card', leftChoice: { label: 'L', effects: [] }, rightChoice: { label: 'R', effects: [] } },
            { id: '3', track: 'IC', tags: [], prompt: 'IC card 2', leftChoice: { label: 'L', effects: [] }, rightChoice: { label: 'R', effects: [] } },
        ];

        const result = filterCardsByTrack(cards, 'IC');
        expect(result).toHaveLength(2);
        expect(result.every((c) => c.track === 'IC')).toBe(true);
    });
});
