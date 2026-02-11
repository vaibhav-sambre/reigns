const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/ic_cards.seed.json', 'utf8'));

// Calculate balance for NON-DOOMSDAY cards
function calculateBalance() {
    const stats = { bandwidth: 0, salary: 0, reputation: 0, life: 0 };
    let count = 0;
    data.forEach(card => {
        if (card.tags.includes('doomsday')) return;
        count++;
        [card.leftChoice, card.rightChoice].forEach(choice => {
            choice.effects.forEach(e => {
                if (stats[e.pillar] !== undefined) stats[e.pillar] += e.delta;
            });
        });
    });
    return { stats, count };
}

const initial = calculateBalance();
console.log('Initial Balance (Non-Doomsday,', initial.count, 'cards):', initial.stats);

// Strategy: Adjust values to reach 0
// We need to reduce positive sums and negative sums towards 0 net.

let changes = 0;
let iterations = 0;
const MAX_ITERATIONS = 50;

while (iterations < MAX_ITERATIONS) {
    iterations++;
    const { stats } = calculateBalance();

    // Check if balanced enough (within +/- 2)
    const isBalanced = Object.values(stats).every(v => Math.abs(v) <= 2);
    if (isBalanced) break;

    // Apply corrections
    data.forEach((card, i) => {
        if (card.tags.includes('doomsday')) return;

        [card.leftChoice, card.rightChoice].forEach(choice => {
            choice.effects.forEach(e => {
                // If pillar is positive, reduce its positive effects
                if (stats[e.pillar] > 0 && e.delta > 0) {
                    // Reduce by 1, but don't flip small positives to 0 if valuable, or do?
                    if (e.delta > 1) {
                        e.delta -= 1;
                        changes++;
                    }
                }
                // If pillar is negative, increase its negative effects (make them less negative)
                else if (stats[e.pillar] < 0 && e.delta < 0) {
                    if (e.delta < -1) {
                        e.delta += 1;
                        changes++;
                    }
                }
            });
        });
    });
}

fs.writeFileSync('data/ic_cards.seed.json', JSON.stringify(data, null, 4));
const final = calculateBalance();
console.log('Final Balance:', final.stats);
console.log('Total adjustments:', changes);
