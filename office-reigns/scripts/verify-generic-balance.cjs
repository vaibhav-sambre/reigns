const fs = require('fs');
const path = 'data/ic_cards.seed.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Filter for generic cards
const genericCards = data.filter(c => {
    return (!c.personas || c.personas.length === 0 || c.personas.includes('generic'));
});

console.log(`Analyzing ${genericCards.length} Generic cards.`);

let totalDelta = { 'reputation': 0, 'bandwidth': 0, 'salary': 0, 'life': 0 };
let choiceCount = 0;

genericCards.forEach(card => {
    ['leftChoice', 'rightChoice'].forEach(side => {
        const choice = card[side];
        choice.effects.forEach(effect => {
            totalDelta[effect.pillar] += effect.delta;
        });
        choiceCount++;
    });
});

console.log('Avg Impact per Choice (Generic Only):');
console.log({
    'reputation': (totalDelta['reputation'] / choiceCount).toFixed(2),
    'bandwidth': (totalDelta['bandwidth'] / choiceCount).toFixed(2),
    'salary': (totalDelta['salary'] / choiceCount).toFixed(2),
    'life': (totalDelta['life'] / choiceCount).toFixed(2)
});
