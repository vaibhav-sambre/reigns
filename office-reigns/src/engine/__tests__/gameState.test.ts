import { describe, it, expect } from 'vitest';
import {
    createInitialState,
    checkGameOver,
    advanceWeek,
    getOutcomeDescription,
} from '../gameState';
import type { Card, GameState } from '../types';
import { MAX_WEEK } from '../types';

describe('createInitialState', () => {
    it('creates state with week 1', () => {
        const state = createInitialState();
        expect(state.week).toBe(1);
    });

    it('creates state with all pillars at 50', () => {
        const state = createInitialState();
        expect(state.pillars.bandwidth).toBe(50);
        expect(state.pillars.salary).toBe(50);
        expect(state.pillars.reputation).toBe(50);
        expect(state.pillars.life).toBe(50);
    });

    it('creates state with playing status', () => {
        const state = createInitialState();
        expect(state.status).toBe('playing');
    });

    it('creates empty decision history and recent cards', () => {
        const state = createInitialState();
        expect(state.decisionHistory).toEqual([]);
        expect(state.recentCardIds).toEqual([]);
    });
});

describe('checkGameOver', () => {
    it('returns playing when all pillars are healthy', () => {
        const state: GameState = {
            ...createInitialState(),
            pillars: { bandwidth: 50, salary: 50, reputation: 50, life: 50 },
        };
        const result = checkGameOver(state);
        expect(result.status).toBe('playing');
        expect(result.reason).toBeUndefined();
    });

    it('returns game-over when bandwidth hits zero', () => {
        const state: GameState = {
            ...createInitialState(),
            pillars: { bandwidth: 0, salary: 50, reputation: 50, life: 50 },
        };
        const result = checkGameOver(state);
        expect(result.status).toBe('game-over');
        expect(result.reason).toContain('bandwidth');
    });

    it('returns game-over when salary hits zero', () => {
        const state: GameState = {
            ...createInitialState(),
            pillars: { bandwidth: 50, salary: 0, reputation: 50, life: 50 },
        };
        const result = checkGameOver(state);
        expect(result.status).toBe('game-over');
        expect(result.reason).toContain('salary');
    });

    it('returns game-over when reputation hits zero', () => {
        const state: GameState = {
            ...createInitialState(),
            pillars: { bandwidth: 50, salary: 50, reputation: 0, life: 50 },
        };
        const result = checkGameOver(state);
        expect(result.status).toBe('game-over');
        expect(result.reason).toContain('reputation');
    });

    it('returns game-over when life hits zero', () => {
        const state: GameState = {
            ...createInitialState(),
            pillars: { bandwidth: 50, salary: 50, reputation: 50, life: 0 },
        };
        const result = checkGameOver(state);
        expect(result.status).toBe('game-over');
        expect(result.reason).toContain('life');
    });

    it('returns game-over when exceeding max weeks', () => {
        const state: GameState = {
            ...createInitialState(),
            week: MAX_WEEK + 1,
        };
        const result = checkGameOver(state);
        expect(result.status).toBe('game-over');
        expect(result.reason).toContain('plateau');
    });
});

describe('advanceWeek', () => {
    const testCard: Card = {
        id: 'test-card-1',
        track: 'IC',
        tags: [],
        prompt: 'Test prompt',
        leftChoice: {
            label: 'Left',
            effects: [{ pillar: 'bandwidth', delta: -10 }],
        },
        rightChoice: {
            label: 'Right',
            effects: [{ pillar: 'salary', delta: 10 }],
        },
    };

    it('advances week by 1', () => {
        const state = createInitialState();
        const newState = advanceWeek(state, testCard, 'left');
        expect(newState.week).toBe(2);
    });

    it('applies left choice effects', () => {
        const state = createInitialState();
        const newState = advanceWeek(state, testCard, 'left');
        expect(newState.pillars.bandwidth).toBe(40);
    });

    it('applies right choice effects', () => {
        const state = createInitialState();
        const newState = advanceWeek(state, testCard, 'right');
        expect(newState.pillars.salary).toBe(60);
    });

    it('records decision in history', () => {
        const state = createInitialState();
        const newState = advanceWeek(state, testCard, 'left');
        expect(newState.decisionHistory).toHaveLength(1);
        expect(newState.decisionHistory[0]).toEqual({
            week: 1,
            cardId: 'test-card-1',
            choice: 'left',
        });
    });

    it('adds card to recent cards', () => {
        const state = createInitialState();
        const newState = advanceWeek(state, testCard, 'left');
        expect(newState.recentCardIds).toContain('test-card-1');
    });

    it('triggers game over when pillar hits zero', () => {
        const state: GameState = {
            ...createInitialState(),
            pillars: { bandwidth: 5, salary: 50, reputation: 50, life: 50 },
        };
        const newState = advanceWeek(state, testCard, 'left');
        expect(newState.status).toBe('game-over');
        expect(newState.pillars.bandwidth).toBe(0);
    });
});

describe('getOutcomeDescription', () => {
    it('describes positive effects with up arrow', () => {
        const result = getOutcomeDescription([{ pillar: 'salary', delta: 10 }]);
        expect(result).toContain('Salary');
        expect(result).toContain('↑');
    });

    it('describes negative effects with down arrow', () => {
        const result = getOutcomeDescription([{ pillar: 'bandwidth', delta: -5 }]);
        expect(result).toContain('Bandwidth');
        expect(result).toContain('↓');
    });

    it('describes multiple effects', () => {
        const result = getOutcomeDescription([
            { pillar: 'salary', delta: 10 },
            { pillar: 'life', delta: -5 },
        ]);
        expect(result).toContain('Salary ↑');
        expect(result).toContain('Life ↓');
    });

    it('handles empty effects', () => {
        const result = getOutcomeDescription([]);
        expect(result).toBe('No significant changes.');
    });
});
