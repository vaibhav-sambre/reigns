const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/ic_cards.seed.json', 'utf8'));

let effectsDoubled = 0;

data.forEach((card) => {
    [card.leftChoice, card.rightChoice].forEach((choice) => {
        choice.effects.forEach(effect => {
            // Double all effect values, cap at +/- 20
            const newDelta = effect.delta * 2;
            effect.delta = Math.max(-20, Math.min(20, newDelta));
            effectsDoubled++;
        });
    });
});

fs.writeFileSync('data/ic_cards.seed.json', JSON.stringify(data, null, 4));
console.log('Doubled', effectsDoubled, 'effect values');
console.log('All effects now have 2x impact for faster 52-week gameplay');
