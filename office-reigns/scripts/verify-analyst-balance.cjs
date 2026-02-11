const fs = require('fs');
const path = 'data/ic_cards.seed.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Filter for cards visible to Analyst
const analystCards = data.filter(c => {
    return (!c.personas || c.personas.length === 0 || c.personas.includes('generic') || c.personas.includes('analyst'));
});

console.log(`Analyzing ${analystCards.length} cards accessible to Analyst.`);

let totalDelta = {
    'reputation': 0,
    'bandwidth': 0,
    'salary': 0,
    'life': 0
};

let choiceCount = 0;

analystCards.forEach(card => {
    ['leftChoice', 'rightChoice'].forEach(side => {
        const choice = card[side];
        choice.effects.forEach(effect => {
            totalDelta[effect.pillar] += effect.delta;
        });
        choiceCount++;
    });
});

console.log('Total Net Delta across all choices (if picked randomly):');
console.log(totalDelta);

const avgDelta = {
    'reputation': (totalDelta['reputation'] / choiceCount).toFixed(2),
    'bandwidth': (totalDelta['bandwidth'] / choiceCount).toFixed(2),
    'salary': (totalDelta['salary'] / choiceCount).toFixed(2),
    'life': (totalDelta['life'] / choiceCount).toFixed(2)
};

console.log('Average Impact per Choice:');
console.log(avgDelta);

// Specific Analyst-only cards balance
const specificCards = data.filter(c => c.personas && c.personas.includes('analyst') && !c.personas.includes('generic'));
console.log(`\n--- Analyst Specific Cards (${specificCards.length}) ---`);

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

console.log('Net Delta (Specifics):', specificDelta);
console.log('Avg Delta (Specifics):', {
    'reputation': (specificDelta['reputation'] / specificCount).toFixed(2),
    'bandwidth': (specificDelta['bandwidth'] / specificCount).toFixed(2),
    'salary': (specificDelta['salary'] / specificCount).toFixed(2),
    'life': (specificDelta['life'] / specificCount).toFixed(2)
});
