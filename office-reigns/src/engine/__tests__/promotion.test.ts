import { describe, it, expect } from 'vitest';
import { isEligibleForPromotion, getPromotionBlockers } from '../promotion';
import type { PillarState, PromotionSettings } from '../types';
import { DEFAULT_PROMOTION_SETTINGS } from '../types';


describe('isEligibleForPromotion', () => {
    const goodPillars: PillarState = {
        bandwidth: 70,
        salary: 75,
        reputation: 80,
        life: 65,
    };

    const defaultSettings = DEFAULT_PROMOTION_SETTINGS;

    it('returns false when week is below minimum', () => {
        const result = isEligibleForPromotion(goodPillars, 30, defaultSettings);
        expect(result).toBe(false);
    });

    it('returns false when not enough pillars above 60%', () => {
        const lowPillars: PillarState = {
            bandwidth: 70,
            salary: 50,
            reputation: 45,
            life: 40,
        };
        const result = isEligibleForPromotion(lowPillars, 50, defaultSettings);
        expect(result).toBe(false);
    });

    it('returns false when pillars are below 30%', () => {
        const mixedPillars: PillarState = {
            bandwidth: 70,
            salary: 75,
            reputation: 25, // below 30%
            life: 65,
        };
        const result = isEligibleForPromotion(mixedPillars, 50, defaultSettings);
        expect(result).toBe(false);
    });

    it('returns true when all criteria met', () => {
        const result = isEligibleForPromotion(goodPillars, 50, defaultSettings);
        expect(result).toBe(true);
    });

    it('respects custom settings', () => {
        const customSettings: PromotionSettings = {
            minWeek: 20,
            minPillarsAbove60: 2,
            maxPillarsBelow30: 1,
            mode: 'immediate',
        };
        const pillars: PillarState = {
            bandwidth: 70,
            salary: 65,
            reputation: 40,
            life: 25, // below 30%, but allowed with maxPillarsBelow30: 1
        };
        const result = isEligibleForPromotion(pillars, 25, customSettings);
        expect(result).toBe(true);
    });

    it('handles edge case at exactly minWeek', () => {
        const result = isEligibleForPromotion(goodPillars, 40, defaultSettings);
        expect(result).toBe(true);
    });
});

describe('getPromotionBlockers', () => {
    const defaultSettings = DEFAULT_PROMOTION_SETTINGS;

    it('returns empty array when all criteria met', () => {
        const pillars: PillarState = {
            bandwidth: 70,
            salary: 75,
            reputation: 80,
            life: 65,
        };
        const blockers = getPromotionBlockers(pillars, 50, defaultSettings);
        expect(blockers).toEqual([]);
    });

    it('lists week requirement blocker', () => {
        const pillars: PillarState = {
            bandwidth: 70,
            salary: 75,
            reputation: 80,
            life: 65,
        };
        const blockers = getPromotionBlockers(pillars, 30, defaultSettings);
        expect(blockers).toHaveLength(1);
        expect(blockers[0]).toContain('10 more weeks');
    });

    it('lists multiple blockers', () => {
        const lowPillars: PillarState = {
            bandwidth: 50,
            salary: 45,
            reputation: 25,
            life: 40,
        };
        const blockers = getPromotionBlockers(lowPillars, 30, defaultSettings);
        expect(blockers.length).toBeGreaterThan(1);
    });
});
