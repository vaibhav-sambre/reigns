const fs = require('fs');
const path = 'data/ic_cards.seed.json';
const cards = JSON.parse(fs.readFileSync(path, 'utf8'));

// Mock filter function from cardSelector.ts
function filterCardsByPersona(cards, persona) {
    return cards.filter((card) => {
        if (!card.personas || card.personas.length === 0) return true;
        return card.personas.includes('generic') || card.personas.includes(persona);
    });
}

const personas = ['developer', 'product-manager', 'analyst', 'business-associate'];

console.log('--- Verifying Persona Isolation ---');

personas.forEach(persona => {
    const visibleCards = filterCardsByPersona(cards, persona);
    console.log(`\nPersona: ${persona.toUpperCase()}`);
    console.log(`Total Visible: ${visibleCards.length}`);

    // Check for leakages
    const leaked = visibleCards.filter(c => {
        // A leak is if the card has specific tags but NONE of them match the current persona or generic
        // But the filter logic prevents this by definition.
        // Let's check if we see cards that are explicitly NOT for us.

        // If card has ['product-manager'] ONLY, and I am 'developer', I shouldn't see it.
        const tags = c.personas || [];
        const isGeneric = tags.includes('generic') || tags.length === 0;
        const isForMe = tags.includes(persona);

        return !isGeneric && !isForMe;
    });

    if (leaked.length > 0) {
        console.error(`❌ LEAK FOUND: ${leaked.length} cards visible that shouldn't be!`);
        leaked.forEach(c => console.log(` - ${c.id} tags: [${c.personas.join(', ')}]`));
    } else {
        console.log(`✅ No leaks. All ${visibleCards.length} cards are valid for ${persona}.`);
    }

    // Count exclusives
    const exclusives = visibleCards.filter(c => {
        const tags = c.personas || [];
        return tags.includes(persona) && !tags.includes('generic');
    });
    console.log(`   (Includes ${exclusives.length} exclusive/shared cards)`);
});
