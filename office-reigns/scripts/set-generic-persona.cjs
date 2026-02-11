const fs = require('fs');
const path = 'data/ic_cards.seed.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

let updated = 0;

data.forEach(card => {
    // If no personas field, set to generic
    if (!card.personas) {
        card.personas = ['generic'];
        updated++;
    }
});

fs.writeFileSync(path, JSON.stringify(data, null, 4));
console.log(`Updated ${updated} cards to have ['generic'] persona.`);
