// Rebalance persona cards to achieve 30-40% win rate
// Target persona-specific card averages (best choice per card):
//   BW: +0.50 → blended ≈ +0.05 (neutral/positive, AI won't sacrifice rep)
//   SAL: +0.40 → blended ≈ +0.07
//   REP: +1.60 → blended ≈ +0.73 (enough to reach 70 by week 40)
//   LIFE: +0.10 → blended ≈ +1.03
const fs = require('fs');

const TARGETS = { bandwidth: 0.50, salary: 0.40, reputation: 1.60, life: 0.10 };
const PILLARS = ['bandwidth', 'salary', 'reputation', 'life'];

const data = JSON.parse(fs.readFileSync('data/ic_cards.seed.json', 'utf8'));

function sumEffects(choice) {
    return choice.effects.reduce((s, e) => s + e.delta, 0);
}

function avgEffects(cards) {
    const totals = { bandwidth: 0, salary: 0, reputation: 0, life: 0 };
    let count = 0;
    for (const card of cards) {
        const better = sumEffects(card.leftChoice) >= sumEffects(card.rightChoice) ? card.leftChoice : card.rightChoice;
        for (const e of better.effects) {
            if (totals[e.pillar] !== undefined) totals[e.pillar] += e.delta;
        }
        count++;
    }
    for (const p of PILLARS) totals[p] = count > 0 ? totals[p] / count : 0;
    return { totals, count };
}

const personas = [
    { id: 'developer', skip: false },
    { id: 'product-manager', skip: false },
    { id: 'analyst', skip: true },  // already at 40.5%, best performing
    { id: 'business-associate', skip: false },
    { id: 'consultant', skip: false },
    { id: 'marketing-manager', skip: false },
    { id: 'operations-associate', skip: false },
];

let totalCardsMod = 0;

for (const { id, skip } of personas) {
    const cards = data.filter(c =>
        c.personas && c.personas.includes(id) &&
        !c.personas.includes('generic') &&
        c.type !== 'doomsday' && c.type !== 'angel'
    );
    if (cards.length === 0 || skip) {
        console.log(`${id}: ${skip ? 'SKIPPED (Analyst)' : 'no cards'}`);
        continue;
    }

    const { totals: current } = avgEffects(cards);
    console.log(`\n${id.toUpperCase()} (${cards.length} cards)`);
    console.log('  Current:', Object.fromEntries(PILLARS.map(p => [p, current[p].toFixed(3)])));

    // Calculate per-card adjustments needed
    const deltas = {};
    for (const p of PILLARS) {
        deltas[p] = TARGETS[p] - current[p];
    }
    console.log('  Needed delta per card:', Object.fromEntries(PILLARS.map(p => [p, deltas[p].toFixed(3)])));

    // Apply adjustments using running-total integer distribution
    const running = { bandwidth: 0, salary: 0, reputation: 0, life: 0 };
    let modCount = 0;

    for (const card of cards) {
        const betterChoice = sumEffects(card.leftChoice) >= sumEffects(card.rightChoice) ? card.leftChoice : card.rightChoice;

        for (const p of PILLARS) {
            if (Math.abs(deltas[p]) < 0.05) continue; // skip negligible adjustments

            running[p] += deltas[p];
            const intAdj = Math.round(running[p]);
            if (intAdj !== 0) {
                running[p] -= intAdj;
                // Find existing effect for this pillar and adjust, or add new one
                const existing = betterChoice.effects.find(e => e.pillar === p);
                if (existing) {
                    existing.delta += intAdj;
                } else {
                    betterChoice.effects.push({ pillar: p, delta: intAdj });
                }
                modCount++;
            }
        }
    }

    totalCardsMod += modCount;
    const { totals: after } = avgEffects(cards);
    console.log('  After:  ', Object.fromEntries(PILLARS.map(p => [p, after[p].toFixed(3)])));
    console.log(`  ${modCount} effect entries modified`);
}

fs.writeFileSync('data/ic_cards.seed.json', JSON.stringify(data, null, 2));
console.log(`\nDone. Total effect entries modified: ${totalCardsMod}`);
