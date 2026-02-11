// IndexedDB persistence layer using idb library

import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { Card, GameState, PromotionSettings } from '../engine/types';
import { DEFAULT_PROMOTION_SETTINGS } from '../engine/types';

const DB_NAME = 'office-reigns-db';
const DB_VERSION = 1;

interface OfficeReignsDB extends DBSchema {
    cards: {
        key: string;
        value: Card;
        indexes: { 'by-track': string };
    };
    gameState: {
        key: 'current';
        value: GameState;
    };
    settings: {
        key: 'promotion';
        value: PromotionSettings;
    };
}

let dbPromise: Promise<IDBPDatabase<OfficeReignsDB>> | null = null;

/**
 * Initialize the database connection
 */
export async function getDB(): Promise<IDBPDatabase<OfficeReignsDB>> {
    if (!dbPromise) {
        dbPromise = openDB<OfficeReignsDB>(DB_NAME, DB_VERSION, {
            upgrade(db) {
                // Cards store
                if (!db.objectStoreNames.contains('cards')) {
                    const cardStore = db.createObjectStore('cards', { keyPath: 'id' });
                    cardStore.createIndex('by-track', 'track');
                }

                // Game state store (single record)
                if (!db.objectStoreNames.contains('gameState')) {
                    db.createObjectStore('gameState');
                }

                // Settings store
                if (!db.objectStoreNames.contains('settings')) {
                    db.createObjectStore('settings');
                }
            },
        });
    }
    return dbPromise;
}

// ==================== Card Operations ====================

const API_BASE_URL = 'https://reigns-8of4.onrender.com/api';

/**
 * Get all cards from the database (sync with server first if possible)
 */
export async function getAllCards(): Promise<Card[]> {
    const db = await getDB();

    // Try to fetch from server
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout

        const response = await fetch(`${API_BASE_URL}/cards`, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
            const serverCards = await response.json();
            console.log('Fetched cards from server:', serverCards.length);
            // Update local DB with fresh data
            await importCards(serverCards, 'replace');
            return serverCards;
        }
    } catch (err) {
        console.warn('Failed to fetch from server, using local data:', err);
    }

    // Fallback to local DB
    return db.getAll('cards');
}

/**
 * Get cards by track (IC or Manager)
 */
export async function getCardsByTrack(track: 'IC' | 'Manager'): Promise<Card[]> {
    const db = await getDB();
    return db.getAllFromIndex('cards', 'by-track', track);
}

/**
 * Get a single card by ID
 */
export async function getCard(id: string): Promise<Card | undefined> {
    const db = await getDB();
    return db.get('cards', id);
}

/**
 * Save a card (create or update)
 */
export async function saveCard(card: Card): Promise<void> {
    const db = await getDB();
    await db.put('cards', card);
}

/**
 * Delete a card by ID
 */
export async function deleteCard(id: string): Promise<void> {
    const db = await getDB();
    await db.delete('cards', id);
}

/**
 * Import multiple cards (with merge/replace options)
 */
export async function importCards(
    cards: Card[],
    mode: 'merge' | 'replace'
): Promise<void> {
    const db = await getDB();
    const tx = db.transaction('cards', 'readwrite');

    if (mode === 'replace') {
        // Clear existing cards
        await tx.store.clear();
    }

    // Add/update all cards
    for (const card of cards) {
        await tx.store.put(card);
    }

    await tx.done;
}

/**
 * Get card count
 */
export async function getCardCount(): Promise<number> {
    const db = await getDB();
    return db.count('cards');
}

// ==================== Game State Operations ====================

/**
 * Get the current game state
 */
export async function getGameState(): Promise<GameState | undefined> {
    const db = await getDB();
    return db.get('gameState', 'current');
}

/**
 * Save the current game state
 */
export async function saveGameState(state: GameState): Promise<void> {
    const db = await getDB();
    await db.put('gameState', state, 'current');
}

/**
 * Clear the current game state (for new game)
 */
export async function clearGameState(): Promise<void> {
    const db = await getDB();
    await db.delete('gameState', 'current');
}

// ==================== Settings Operations ====================

/**
 * Get promotion settings
 */
export async function getPromotionSettings(): Promise<PromotionSettings> {
    const db = await getDB();

    // Try to fetch from server
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1000); // 1s timeout

        const response = await fetch(`${API_BASE_URL}/config`, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
            const config = await response.json();
            if (config.promotionSettings) {
                console.log('Fetched settings from server', config.promotionSettings);
                await savePromotionSettings(config.promotionSettings);
                return config.promotionSettings;
            }
        }
    } catch (err) {
        console.warn('Failed to fetch settings from server, using local data');
    }

    const settings = await db.get('settings', 'promotion');
    return settings ?? DEFAULT_PROMOTION_SETTINGS;
}

/**
 * Save promotion settings
 */
export async function savePromotionSettings(
    settings: PromotionSettings
): Promise<void> {
    const db = await getDB();
    await db.put('settings', settings, 'promotion');
}

// ==================== Seed Data Operations ====================

/**
 * Check if cards need to be seeded
 */
export async function needsSeeding(): Promise<boolean> {
    const count = await getCardCount();
    return count === 0;
}

/**
 * Seed initial cards from the seed data file
 */
export async function seedCards(seedData: Card[]): Promise<void> {
    await importCards(seedData, 'replace');
}

// ==================== Export Operations ====================

/**
 * Export all cards as JSON
 */
export async function exportCardsAsJson(): Promise<string> {
    const cards = await getAllCards();
    return JSON.stringify(cards, null, 2);
}
