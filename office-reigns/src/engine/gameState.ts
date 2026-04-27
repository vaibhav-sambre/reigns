// Game state management

import { applyEffects, getZeroPillar } from './effects';
import type {
    Card,
    DecisionRecord,
    Effect,
    GameState,
    GameStatus,
    Persona,
    PillarState,
    PromotionSettings,
    CharacterNames,
} from './types';
import {
    MAX_WEEK,
    PROMOTION_TAG,
    DEFAULT_PROMOTION_SETTINGS,
} from './types';
import { DEFAULT_CHARACTER_NAMES } from './utils';
import { isEligibleForPromotion } from './promotion';

/**
 * Create initial pillar state with balanced random values.
 * Starts at [50,50,50,50] and performs up to 10 swaps of 5 points
 * between random pairs, keeping each pillar in [30, 70] and sum at 200.
 */
export function createInitialPillars(): PillarState {
    const values = [50, 50, 50, 50];
    for (let i = 0; i < 10; i++) {
        const giver = Math.floor(Math.random() * 4);
        const receiver = Math.floor(Math.random() * 4);
        if (giver === receiver) continue;

        if (values[giver] >= 35 && values[receiver] <= 65) {
            values[giver] -= 5;
            values[receiver] += 5;
        }
    }

    return {
        bandwidth: values[0],
        salary: values[1],
        reputation: values[2],
        life: values[3],
    };
}

/**
 * Create a fresh game state for a new run
 */
export function createInitialState(
    persona: Persona = 'developer',
    promotionSettings: PromotionSettings = DEFAULT_PROMOTION_SETTINGS,
    rngSeed?: number,
    characterNames: CharacterNames = DEFAULT_CHARACTER_NAMES
): GameState {
    return {
        week: 1,
        pillars: createInitialPillars(),
        persona,
        decisionHistory: [],
        recentCardIds: [],
        promotionSettings,
        rngSeed,
        status: 'playing',
        endReason: undefined,
        characterNames,
    };
}

/**
 * Career ending narratives for each pillar
 */
const PILLAR_ENDINGS: Record<string, string> = {
    bandwidth:
        "Your bandwidth completely collapsed. Overwhelmed by endless tasks and impossible deadlines, you suffered a severe burnout. The company 'let you go' to focus on your health. Your career at this company has ended.",
    salary:
        "Your salary negotiations failed catastrophically. Unable to afford basic living expenses in the city, you had no choice but to resign and seek employment elsewhere. Your career at this company has ended.",
    reputation:
        "Your reputation in the office hit rock bottom. After one too many failed projects and broken promises, leadership decided it was time to 'explore other opportunities.' Your career at this company has ended.",
    life: "Your work-life balance completely collapsed. The constant stress and neglected personal life led to serious consequences. Your relationships fell apart, and you realized this job wasn't worth losing everything else. Your career at this company has ended.",
};

const STAGNATION_ENDING =
    "A full year has passed without a promotion. Despite your efforts, you've remained an IC while peers advanced. The writing is on the wall - you've hit a career plateau. Feeling stagnant and undervalued, you decide to look for opportunities elsewhere. Your career at this company has ended.";

/**
 * Check game over conditions
 * Returns game status and reason if game is over
 */
export function checkGameOver(
    state: GameState
): { status: GameStatus; reason?: string } {
    // Check if any pillar hit zero
    const zeroPillar = getZeroPillar(state.pillars);
    if (zeroPillar) {
        return {
            status: 'game-over',
            reason: PILLAR_ENDINGS[zeroPillar],
        };
    }

    // Check if exceeded max weeks without promotion
    if (state.week > MAX_WEEK) {
        return {
            status: 'game-over',
            reason: STAGNATION_ENDING,
        };
    }

    return { status: 'playing' };
}

/**
 * Check if player should be promoted based on current state and card
 */
export function checkPromotion(
    state: GameState,
    currentCard: Card
): boolean {
    const { promotionSettings } = state;
    const eligible = isEligibleForPromotion(state.pillars, state.week, promotionSettings);

    if (!eligible) {
        return false;
    }

    if (promotionSettings.mode === 'immediate') {
        return true;
    }

    // card-only mode: check if current card is a promotion opportunity
    return currentCard.tags.includes(PROMOTION_TAG);
}

/**
 * Advance the game state by one decision
 */
export function advanceWeek(
    state: GameState,
    card: Card,
    choice: 'left' | 'right'
): GameState {
    const selectedChoice = choice === 'left' ? card.leftChoice : card.rightChoice;
    const newPillars = applyEffects(state.pillars, selectedChoice.effects);

    const decision: DecisionRecord = {
        week: state.week,
        cardId: card.id,
        choice,
    };

    // Track all played cards in session (no repeat until all cards exhausted)
    const newRecentCardIds = [...state.recentCardIds, card.id];

    const newState: GameState = {
        ...state,
        week: state.week + 1,
        pillars: newPillars,
        decisionHistory: [...state.decisionHistory, decision],
        recentCardIds: newRecentCardIds,
    };

    // Check for promotion first (before game over, as promotion is a win)
    if (checkPromotion(newState, card)) {
        return {
            ...newState,
            status: 'promoted',
            endReason: "Congratulations! Your hard work and strategic decisions have paid off. Management has recognized your contributions and you've been promoted to Manager! A new chapter of your career begins...",
        };
    }

    // Check for game over conditions
    const gameOverCheck = checkGameOver(newState);
    if (gameOverCheck.status === 'game-over') {
        return {
            ...newState,
            status: 'game-over',
            endReason: gameOverCheck.reason,
        };
    }

    return newState;
}

/**
 * Get formatted outcome text for a decision
 */
export function getOutcomeDescription(effects: Effect[]): string {
    if (effects.length === 0) {
        return 'No significant changes.';
    }

    const descriptions = effects.map((effect) => {
        const pillarName = effect.pillar.charAt(0).toUpperCase() + effect.pillar.slice(1);
        const arrow = effect.delta > 0 ? '↑' : '↓';
        return `${pillarName} ${arrow}`;
    });

    return descriptions.join(', ');
}
