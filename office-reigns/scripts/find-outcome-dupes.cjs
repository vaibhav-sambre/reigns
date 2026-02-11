const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/ic_cards.seed.json', 'utf8'));

const outcomes = {}; // text -> count
const duplicates = [];

data.forEach(c => {
    [c.leftChoice, c.rightChoice].forEach(ch => {
        if (!ch.outcomeText) return;
        if (!outcomes[ch.outcomeText]) outcomes[ch.outcomeText] = 0;
        outcomes[ch.outcomeText]++;
    });
});

Object.keys(outcomes).forEach(text => {
    if (outcomes[text] > 1) {
        duplicates.push({ text: text, count: outcomes[text] });
    }
});

console.log('Found ' + duplicates.length + ' duplicated outcome texts.');
duplicates.sort((a, b) => b.count - a.count).forEach(d => {
    console.log('[' + d.count + 'x] ' + d.text);
});
