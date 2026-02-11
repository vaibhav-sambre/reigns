const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/ic_cards.seed.json', 'utf8'));

const stats = {
    doomsday: { bandwidth: 0, salary: 0, reputation: 0, life: 0 },
    angel: { bandwidth: 0, salary: 0, reputation: 0, life: 0 }
};
let doomsdayCount = 0;
let angelCount = 0;

data.forEach(card => {
    const type = card.tags.includes('doomsday') ? 'doomsday' : (card.tags.includes('angel') ? 'angel' : null);
    if (!type) return;

    if (type === 'doomsday') doomsdayCount++;
    if (type === 'angel') angelCount++;

    [card.leftChoice, card.rightChoice].forEach(choice => {
        choice.effects.forEach(e => {
            // Divide by 2 to get expected value per card play (since player chooses 1 of 2)
            stats[type][e.pillar] += e.delta / 2;
        });
    });
});

console.log('=== BALANCE REPORT ===');
console.log('Doomsday (' + doomsdayCount + ' cards) vs Angel (' + angelCount + ' cards)');
console.log('--------------------------------------------------');
console.log('Pillar      | Doomsday Neg  | Angel Pos     | Net');
console.log('--------------------------------------------------');

['bandwidth', 'salary', 'reputation', 'life'].forEach(p => {
    const d = stats.doomsday[p];
    const a = stats.angel[p];
    const net = d + a;
    console.log(
        p.padEnd(11) + ' | ' +
        d.toFixed(1).padEnd(13) + ' | ' +
        '+' + a.toFixed(1).padEnd(12) + ' | ' +
        (net > 0 ? '+' : '') + net.toFixed(1)
    );
});
