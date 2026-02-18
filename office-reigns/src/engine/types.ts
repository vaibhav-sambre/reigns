// Core type definitions for Office Reigns game engine

export type PillarType = 'bandwidth' | 'salary' | 'reputation' | 'life';

export interface Effect {
  pillar: PillarType;
  delta: number; // -15 to +15
}

export interface Choice {
  label: string;
  effects: Effect[];
  outcomeText?: string;
}

export type Persona = 'developer' | 'product-manager' | 'analyst' | 'business-associate' | 'consultant';

export type CardType = 'standard' | 'doomsday' | 'angel';

export interface Card {
  id: string;
  type?: CardType; // defaults to 'standard' if absent
  track: 'IC' | 'Manager';
  tags: string[];
  personas?: string[]; // 'generic' or specific persona IDs
  title?: string;
  prompt: string;
  leftChoice: Choice;
  rightChoice: Choice;
}

export interface PillarState {
  bandwidth: number;
  salary: number;
  reputation: number;
  life: number;
}

export type PillarStatus = 'Critical' | 'Low' | 'OK' | 'High' | 'Dominant';

export interface PromotionSettings {
  minWeek: number;
  minPillarsAbove60: number;
  maxPillarsBelow30: number;
  mode: 'immediate' | 'card-only';
}

export interface DecisionRecord {
  week: number;
  cardId: string;
  choice: 'left' | 'right';
}

export type GameStatus = 'playing' | 'game-over' | 'promoted';

export interface CharacterNames {
  manager: string;
  lead: string;
  colleague: string;
}

export interface GameState {
  week: number;
  pillars: PillarState;
  persona: Persona; // Selected persona
  decisionHistory: DecisionRecord[];
  recentCardIds: string[];
  promotionSettings: PromotionSettings;
  rngSeed?: number;
  status: GameStatus;
  endReason?: string;
  characterNames: CharacterNames;
}

// Utility function to get qualitative status from value
export function getPillarStatus(value: number): PillarStatus {
  if (value <= 20) return 'Critical';
  if (value <= 40) return 'Low';
  if (value <= 60) return 'OK';
  if (value <= 80) return 'High';
  return 'Dominant';
}

// Default promotion settings
export const DEFAULT_PROMOTION_SETTINGS: PromotionSettings = {
  minWeek: 40, // Can be eligible for promotion after week 40
  minPillarsAbove60: 2, // Need 2 pillars above 70%
  maxPillarsBelow30: 0,
  mode: 'immediate', // Win as soon as criteria are met
};

// Constants
export const MAX_WEEK = 52; // One year to get promoted
export const RECENT_CARDS_LIMIT = 52; // Track all cards played in session
export const PROMOTION_TAG = 'promotion-opportunity';
