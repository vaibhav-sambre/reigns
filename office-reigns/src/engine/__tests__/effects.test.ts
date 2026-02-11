import { describe, it, expect } from 'vitest';
import {
    clamp,
    applyEffect,
    applyEffects,
    getZeroPillar,
    getPillarsAbove,
    getPillarsBelow,
} from '../effects';
import type { PillarState, Effect } from '../types';

describe('clamp', () => {
    it('returns value when within range', () => {
        expect(clamp(50, 0, 100)).toBe(50);
    });

    it('clamps to minimum', () => {
        expect(clamp(-10, 0, 100)).toBe(0);
    });

    it('clamps to maximum', () => {
        expect(clamp(120, 0, 100)).toBe(100);
    });

    it('handles edge cases at boundaries', () => {
        expect(clamp(0, 0, 100)).toBe(0);
        expect(clamp(100, 0, 100)).toBe(100);
    });
});

describe('applyEffect', () => {
    const basePillars: PillarState = {
        bandwidth: 50,
        salary: 50,
        reputation: 50,
        life: 50,
    };

    it('applies positive effect', () => {
        const effect: Effect = { pillar: 'bandwidth', delta: 10 };
        const result = applyEffect(basePillars, effect);
        expect(result.bandwidth).toBe(60);
        expect(result.salary).toBe(50); // unchanged
    });

    it('applies negative effect', () => {
        const effect: Effect = { pillar: 'salary', delta: -15 };
        const result = applyEffect(basePillars, effect);
        expect(result.salary).toBe(35);
    });

    it('clamps at 0', () => {
        const effect: Effect = { pillar: 'life', delta: -60 };
        const result = applyEffect(basePillars, effect);
        expect(result.life).toBe(0);
    });

    it('clamps at 100', () => {
        const effect: Effect = { pillar: 'reputation', delta: 60 };
        const result = applyEffect(basePillars, effect);
        expect(result.reputation).toBe(100);
    });
});

describe('applyEffects', () => {
    const basePillars: PillarState = {
        bandwidth: 50,
        salary: 50,
        reputation: 50,
        life: 50,
    };

    it('applies multiple effects', () => {
        const effects: Effect[] = [
            { pillar: 'bandwidth', delta: -10 },
            { pillar: 'salary', delta: 15 },
            { pillar: 'reputation', delta: 5 },
        ];
        const result = applyEffects(basePillars, effects);
        expect(result.bandwidth).toBe(40);
        expect(result.salary).toBe(65);
        expect(result.reputation).toBe(55);
        expect(result.life).toBe(50); // unchanged
    });

    it('handles empty effects array', () => {
        const result = applyEffects(basePillars, []);
        expect(result).toEqual(basePillars);
    });

    it('applies effects to same pillar cumulatively', () => {
        const effects: Effect[] = [
            { pillar: 'bandwidth', delta: 10 },
            { pillar: 'bandwidth', delta: 10 },
        ];
        const result = applyEffects(basePillars, effects);
        expect(result.bandwidth).toBe(70);
    });
});

describe('getZeroPillar', () => {
    it('returns null when no pillar is zero', () => {
        const pillars: PillarState = { bandwidth: 50, salary: 50, reputation: 50, life: 50 };
        expect(getZeroPillar(pillars)).toBeNull();
    });

    it('returns the pillar name when one hits zero', () => {
        const pillars: PillarState = { bandwidth: 0, salary: 50, reputation: 50, life: 50 };
        expect(getZeroPillar(pillars)).toBe('bandwidth');
    });

    it('returns first zero pillar when multiple are zero', () => {
        const pillars: PillarState = { bandwidth: 0, salary: 0, reputation: 50, life: 50 };
        expect(getZeroPillar(pillars)).toBe('bandwidth');
    });
});

describe('getPillarsAbove', () => {
    it('counts pillars above threshold', () => {
        const pillars: PillarState = { bandwidth: 70, salary: 80, reputation: 50, life: 65 };
        expect(getPillarsAbove(pillars, 60)).toBe(3); // 70, 80, 65 are > 60
    });

    it('returns 0 when none above threshold', () => {
        const pillars: PillarState = { bandwidth: 30, salary: 40, reputation: 50, life: 20 };
        expect(getPillarsAbove(pillars, 60)).toBe(0);
    });
});

describe('getPillarsBelow', () => {
    it('counts pillars below threshold', () => {
        const pillars: PillarState = { bandwidth: 20, salary: 25, reputation: 50, life: 65 };
        expect(getPillarsBelow(pillars, 30)).toBe(2); // 20, 25 are < 30
    });

    it('returns 0 when none below threshold', () => {
        const pillars: PillarState = { bandwidth: 50, salary: 60, reputation: 70, life: 80 };
        expect(getPillarsBelow(pillars, 30)).toBe(0);
    });
});
