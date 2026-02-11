const fs = require('fs');
const path = 'data/ic_cards.seed.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Filter for cards visible to Developer
const devCards = data.filter(c => {
    return (!c.personas || c.personas.length === 0 || c.personas.includes('generic') || c.personas.includes('developer'));
});

console.log(`Analyzing ${devCards.length} cards accessible to Developer.`);

let totalDelta = { 'reputation': 0, 'bandwidth': 0, 'salary': 0, 'life': 0 };
let choiceCount = 0;

devCards.forEach(card => {
    ['leftChoice', 'rightChoice'].forEach(side => {
        const choice = card[side];
        choice.effects.forEach(effect => {
            totalDelta[effect.pillar] += effect.delta;
        });
        choiceCount++;
    });
});

console.log('Avg Impact per Choice (All):');
console.log({
    'reputation': (totalDelta['reputation'] / choiceCount).toFixed(2),
    'bandwidth': (totalDelta['bandwidth'] / choiceCount).toFixed(2),
    'salary': (totalDelta['salary'] / choiceCount).toFixed(2),
    'life': (totalDelta['life'] / choiceCount).toFixed(2)
});

// Specific Dev-only cards balance
const specificCards = data.filter(c => c.personas && c.personas.includes('developer') && !c.personas.includes('generic'));
console.log(`\n--- Developer Specific Cards (${specificCards.length}) ---`);

let specificDelta = { 'reputation': 0, 'bandwidth': 0, 'salary': 0, 'life': 0 };
let specificCount = 0;

specificCards.forEach(card => {
    ['leftChoice', 'rightChoice'].forEach(side => {
        const choice = card[side];
        choice.effects.forEach(effect => {
            specificDelta[effect.pillar] += effect.delta;
        });
        specificCount++;
    });
});

console.log('Avg Delta (Specifics):', {
    'reputation': (specificDelta['reputation'] / specificCount).toFixed(2),
    'bandwidth': (specificDelta['bandwidth'] / specificCount).toFixed(2),
    'salary': (specificDelta['salary'] / specificCount).toFixed(2),
    'life': (specificDelta['life'] / specificCount).toFixed(2)
});
