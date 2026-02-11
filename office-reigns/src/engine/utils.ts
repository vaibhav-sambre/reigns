import type { CharacterNames } from './types';

/**
 * Replace placeholders in text with actual character names
 * Placeholders: {{manager}}, {{lead}}, {{colleague}}
 */
export function formatCardText(text: string, names: CharacterNames): string {
    if (!text) return '';

    let formatted = text;
    formatted = formatted.replace(/{{manager}}/g, names.manager);
    formatted = formatted.replace(/{{lead}}/g, names.lead);
    formatted = formatted.replace(/{{colleague}}/g, names.colleague);

    // Also handle capitalized versions if needed (though typically names satisfy this)
    // For now, we assume users enter capitalized names.

    return formatted;
}

export const DEFAULT_CHARACTER_NAMES: CharacterNames = {
    manager: "Manager",
    lead: "Team Lead",
    colleague: "Colleague"
};
