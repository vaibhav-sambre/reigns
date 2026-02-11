const fs = require('fs');
const path = 'data/ic_cards.seed.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

console.log('--- Analyzing Outcome Quality ---');

const SHORT_THRESHOLD = 5; // words

let weakOutcomes = [];

data.forEach(card => {
    ['leftChoice', 'rightChoice'].forEach(side => {
        const choice = card[side];
        const outcome = choice.outcomeText || '';
        const wordCount = outcome.split(' ').filter(w => w.length > 0).length;

        // Criteria for "weak":
        // 1. Too short
        // 2. Generic fillers like "Good job", "Moving on" (if found)

        if (wordCount < SHORT_THRESHOLD) {
            weakOutcomes.push({
                id: card.id,
                title: card.title,
                side,
                prompt: card.prompt,
                choiceLabel: choice.label,
                outcome
            });
        }
    });
});

console.log(`Found ${weakOutcomes.length} outcomes with < ${SHORT_THRESHOLD} words.`);

if (weakOutcomes.length > 0) {
    console.log('\nExamples of weak outcomes:');
    weakOutcomes.slice(0, 20).forEach(w => {
        console.log(`\nCard [${w.id}] "${w.title}"`);
        console.log(`Prompt: ${w.prompt}`);
        console.log(`Choice: ${w.choiceLabel} -> Outcome: "${w.outcome}"`);
    });
}
