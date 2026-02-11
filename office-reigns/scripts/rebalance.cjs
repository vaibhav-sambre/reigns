const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/ic_cards.seed.json', 'utf8'));

function calculateBalance() {
    const stats = { bandwidth: 0, salary: 0, reputation: 0, life: 0 };
    data.forEach(card => {
        [card.leftChoice, card.rightChoice].forEach(choice => {
            choice.effects.forEach(e => {
                if (stats[e.pillar] !== undefined) stats[e.pillar] += e.delta;
            });
        });
    });
    return stats;
}

console.log('Current:', calculateBalance());

// Need: bandwidth -9, salary -39, reputation -10, life -10
// Find positive effects and reduce them precisely

let toReduce = { bandwidth: 9, salary: 39, reputation: 10, life: 10 };

data.forEach((card) => {
    [card.leftChoice, card.rightChoice].forEach((choice) => {
        choice.effects.forEach(effect => {
            const pillar = effect.pillar;
            if (toReduce[pillar] > 0 && effect.delta > 1) {
                const reduction = Math.min(toReduce[pillar], effect.delta - 1);
                effect.delta -= reduction;
                toReduce[pillar] -= reduction;
            }
        });
    });
});

fs.writeFileSync('data/ic_cards.seed.json', JSON.stringify(data, null, 4));
console.log('Final:', calculateBalance());
console.log('Remaining to reduce:', toReduce);
