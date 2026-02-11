const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/ic_cards.seed.json', 'utf8'));

// Double effects for cards ic-101 to ic-140 (indices roughly 126-165, but better to check ID)
let doubled = 0;
data.forEach(card => {
    if (card.id >= 'ic-101' && card.id <= 'ic-140') {
        [card.leftChoice, card.rightChoice].forEach(choice => {
            choice.effects.forEach(e => {
                e.delta *= 2;
                // Cap at +/- 25
                if (e.delta > 25) e.delta = 25;
                if (e.delta < -25) e.delta = -25;
            });
        });
        doubled++;
    }
});

fs.writeFileSync('data/ic_cards.seed.json', JSON.stringify(data, null, 4));
console.log('Doubled effects for', doubled, 'new cards to match 52-week intensity');
