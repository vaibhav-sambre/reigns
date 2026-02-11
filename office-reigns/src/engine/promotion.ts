// Promotion eligibility logic

import { getPillarsAbove, getPillarsBelow } from './effects';
import type { PillarState, PromotionSettings } from './types';


/**
 * Check if player meets promotion eligibility criteria
 * Based on configurable settings
 */
export function isEligibleForPromotion(
    pillars: PillarState,
    week: number,
    settings: PromotionSettings
): boolean {
    // Check minimum week requirement
    if (week < settings.minWeek) {
        return false;
    }

    // Check minimum pillars above 70%
    const pillarsAbove70 = getPillarsAbove(pillars, 70);
    if (pillarsAbove70 < settings.minPillarsAbove60) {
        return false;
    }

    // Check maximum pillars below 30%
    const pillarsBelow30 = getPillarsBelow(pillars, 30);
    if (pillarsBelow30 > settings.maxPillarsBelow30) {
        return false;
    }

    return true;
}

/**
 * Get a description of why the player is not yet eligible for promotion
 */
export function getPromotionBlockers(
    pillars: PillarState,
    week: number,
    settings: PromotionSettings
): string[] {
    const blockers: string[] = [];

    if (week < settings.minWeek) {
        blockers.push(`Need ${settings.minWeek - week} more weeks of experience`);
    }

    const pillarsAbove70 = getPillarsAbove(pillars, 70);
    if (pillarsAbove70 < settings.minPillarsAbove60) {
        const needed = settings.minPillarsAbove60 - pillarsAbove70;
        blockers.push(`Need ${needed} more pillar(s) above 70%`);
    }

    const pillarsBelow30 = getPillarsBelow(pillars, 30);
    if (pillarsBelow30 > settings.maxPillarsBelow30) {
        const excess = pillarsBelow30 - settings.maxPillarsBelow30;
        blockers.push(`${excess} pillar(s) are too low (below 30%)`);
    }

    return blockers;
}
