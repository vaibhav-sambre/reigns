// Game context and state management for React

import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useState,
    type ReactNode,
} from 'react';
import type { Card, Effect, GameState, PromotionSettings, Persona, CharacterNames } from '../../engine/types';
import { DEFAULT_CHARACTER_NAMES } from '../../engine/utils';
import {
    createInitialState,
    advanceWeek,
    getOutcomeDescription,
} from '../../engine/gameState';
import { selectCard, filterCardsByTrack, filterCardsByPersona } from '../../engine/cardSelector';
import {
    getAllCards,
    getGameState,
    saveGameState,
    clearGameState,
    getPromotionSettings,
    needsSeeding,
    seedCards,
} from '../../persistence/db';
import seedData from '../../../data/ic_cards.seed.json';

// Game actions
type GameAction =
    | { type: 'INIT'; payload: { state: GameState; cards: Card[] } }
    | { type: 'MAKE_DECISION'; payload: { choice: 'left' | 'right' } }
    | { type: 'NEW_GAME' }
    | { type: 'DRAW_CARD' }
    | { type: 'SET_SETTINGS'; payload: PromotionSettings };

interface GameContextState {
    gameState: GameState | null;
    currentCard: Card | null;
    allCards: Card[];
    lastOutcome: string | null;
    lastEffects: Effect[];
    isLoading: boolean;
}

interface GameContextValue extends GameContextState {
    makeDecision: (choice: 'left' | 'right') => void;
    startNewGame: (persona?: Persona, characterNames?: CharacterNames) => void;
    acknowledgeOutcome: () => void;
    showIntro: boolean;
    goToIntro: () => void;
    dismissIntro: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

function gameReducer(
    state: GameContextState,
    action: GameAction
): GameContextState {
    switch (action.type) {
        case 'INIT':
            return {
                ...state,
                gameState: action.payload.state,
                allCards: action.payload.cards,
                isLoading: false,
            };

        case 'DRAW_CARD': {
            if (!state.gameState || state.allCards.length === 0) return state;

            const icCards = filterCardsByTrack(state.allCards, 'IC');
            const personaCards = filterCardsByPersona(icCards, state.gameState.persona);

            const card = selectCard(
                personaCards,
                state.gameState.recentCardIds,
                state.gameState.decisionHistory,
                state.gameState.week,
                state.gameState.persona,
                state.gameState.rngSeed,
                state.gameState.decisionHistory.length
            );

            return {
                ...state,
                currentCard: card,
                lastOutcome: null,
            };
        }

        case 'MAKE_DECISION': {
            if (!state.gameState || !state.currentCard) return state;

            const choice = state.currentCard[
                action.payload.choice === 'left' ? 'leftChoice' : 'rightChoice'
            ];
            const outcome = choice.outcomeText ?? getOutcomeDescription(choice.effects);
            const newGameState = advanceWeek(
                state.gameState,
                state.currentCard,
                action.payload.choice
            );

            return {
                ...state,
                gameState: newGameState,
                lastOutcome: outcome,
                lastEffects: choice.effects,
            };
        }

        case 'NEW_GAME': {
            return {
                ...state,
                gameState: null,
                currentCard: null,
                lastOutcome: null,
                lastEffects: [],
                isLoading: true,
            };
        }

        case 'SET_SETTINGS': {
            if (!state.gameState) return state;
            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    promotionSettings: action.payload,
                },
            };
        }

        default:
            return state;
    }
}

export function GameProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(gameReducer, {
        gameState: null,
        currentCard: null,
        allCards: [],
        lastOutcome: null,
        lastEffects: [],
        isLoading: true,
    });

    const [showOutcome, setShowOutcome] = useState(false);
    const [showIntro, setShowIntro] = useState(true);

    const goToIntro = () => setShowIntro(true);
    const dismissIntro = () => setShowIntro(false);

    // Initialize on mount
    useEffect(() => {
        async function init() {
            // Seed cards if needed
            if (await needsSeeding()) {
                await seedCards(seedData as Card[]);
            }

            // Load cards
            const cards = await getAllCards();

            // Load or create game state
            let gameState = await getGameState();
            if (!gameState) {
                const settings = await getPromotionSettings();
                // Default to developer if creating fresh without explict start (rare, usually goes via startNewGame)
                gameState = createInitialState('developer', settings);
            }

            dispatch({ type: 'INIT', payload: { state: gameState, cards } });
        }
        init();
    }, []);

    // Draw initial card when game state is ready
    useEffect(() => {
        if (state.gameState && !state.currentCard && state.gameState.status === 'playing') {
            dispatch({ type: 'DRAW_CARD' });
        }
    }, [state.gameState, state.currentCard]);

    // Persist game state changes
    useEffect(() => {
        if (state.gameState && !state.isLoading) {
            saveGameState(state.gameState);
        }
    }, [state.gameState, state.isLoading]);

    const makeDecision = (choice: 'left' | 'right') => {
        dispatch({ type: 'MAKE_DECISION', payload: { choice } });
        setShowOutcome(true);
    };

    const startNewGame = async (
        persona: Persona = 'developer',
        characterNames: CharacterNames = DEFAULT_CHARACTER_NAMES
    ) => {
        await clearGameState();
        const settings = await getPromotionSettings();
        const newState = createInitialState(persona, settings, undefined, characterNames);
        const cards = await getAllCards();
        dispatch({ type: 'INIT', payload: { state: newState, cards } });
    };

    const acknowledgeOutcome = () => {
        setShowOutcome(false);
        if (state.gameState?.status === 'playing') {
            dispatch({ type: 'DRAW_CARD' });
        }
    };

    return (
        <GameContext.Provider
            value={{
                ...state,
                lastOutcome: showOutcome ? state.lastOutcome : null,
                makeDecision,
                startNewGame,
                acknowledgeOutcome,
                showIntro,
                goToIntro,
                dismissIntro,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}
