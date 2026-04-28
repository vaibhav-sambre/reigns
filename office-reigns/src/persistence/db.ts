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

export async function getDB(): Promise<IDBPDatabase<OfficeReignsDB>> {
    if (!dbPromise) {
        dbPromise = openDB<OfficeReignsDB>(DB_NAME, DB_VERSION, {
            upgrade(db) {
                if (!db.objectStoreNames.contains('cards')) {
                    const cardStore = db.createObjectStore('cards', { keyPath: 'id' });
                    cardStore.createIndex('by-track', 'track');
                }
                if (!db.objectStoreNames.contains('gameState')) {
                    db.createObjectStore('gameState');
                }
                if (!db.objectStoreNames.contains('settings')) {
                    db.createObjectStore('settings');
                }
            },
        });
    }
    return dbPromise;
}

// ==================== Card Operations ====================

export async function getAllCards(): Promise<Card[]> {
    const db = await getDB();
    return db.getAll('cards');
}

export async function getCard(id: string): Promise<Card | undefined> {
    const db = await getDB();
    return db.get('cards', id);
}

export async function saveCard(card: Card): Promise<void> {
    const db = await getDB();
    await db.put('cards', card);
}

export async function deleteCard(id: string): Promise<void> {
    const db = await getDB();
    await db.delete('cards', id);
}

export async function importCards(
    cards: Card[],
    mode: 'merge' | 'replace'
): Promise<void> {
    const db = await getDB();
    const tx = db.transaction('cards', 'readwrite');

    if (mode === 'replace') {
        await tx.store.clear();
    }

    for (const card of cards) {
        await tx.store.put(card);
    }

    await tx.done;
}

export async function getCardCount(): Promise<number> {
    const db = await getDB();
    return db.count('cards');
}

// ==================== Game State Operations ====================

export async function getGameState(): Promise<GameState | undefined> {
    const db = await getDB();
    return db.get('gameState', 'current');
}

export async function saveGameState(state: GameState): Promise<void> {
    const db = await getDB();
    await db.put('gameState', state, 'current');
}

export async function clearGameState(): Promise<void> {
    const db = await getDB();
    await db.delete('gameState', 'current');
}

// ==================== Settings Operations ====================

export async function getPromotionSettings(): Promise<PromotionSettings> {
    const db = await getDB();
    const settings = await db.get('settings', 'promotion');
    return settings ?? DEFAULT_PROMOTION_SETTINGS;
}

export async function savePromotionSettings(
    settings: PromotionSettings
): Promise<void> {
    const db = await getDB();
    await db.put('settings', settings, 'promotion');
}

// ==================== Seed Data Operations ====================

export async function needsSeeding(): Promise<boolean> {
    const count = await getCardCount();
    return count === 0;
}

export async function seedCards(seedData: Card[]): Promise<void> {
    await importCards(seedData, 'replace');
}
