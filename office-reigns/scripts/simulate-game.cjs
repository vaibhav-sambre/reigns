const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/ic_cards.seed.json', 'utf8'));

// --- Engine Logic (Simplified Port) ---

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function applyEffects(pillars, effects) {
    const newPillars = { ...pillars };
    effects.forEach(e => {
        newPillars[e.pillar] = clamp(newPillars[e.pillar] + e.delta, 0, 100);
    });
    return newPillars;
}

function getZeroPillar(pillars) {
    if (pillars.bandwidth <= 0) return 'bandwidth';
    if (pillars.salary <= 0) return 'salary';
    if (pillars.reputation <= 0) return 'reputation';
    if (pillars.life <= 0) return 'life';
    return null;
}

function selectCard(cards, recentIds, history, week, persona) {
    // 1. Forced Injection — uses type field (not tags)
    const playedCards = history.map(h => cards.find(c => c.id === h.cardId)).filter(Boolean);
    const doomsdayCount = playedCards.filter(c => c.type === 'doomsday').length;
    const angelCount = playedCards.filter(c => c.type === 'angel').length;

    let forceType = null;
    if (week > 15 && doomsdayCount < 1) forceType = 'doomsday';
    else if (week > 30 && doomsdayCount < 2) forceType = 'doomsday';
    else if (week > 45 && doomsdayCount < 3) forceType = 'doomsday';

    if (!forceType) {
        if (week > 15 && angelCount < 1) forceType = 'angel';
        else if (week > 30 && angelCount < 2) forceType = 'angel';
        else if (week > 45 && angelCount < 3) forceType = 'angel';
    }

    let pool = [];
    if (forceType === 'doomsday') pool = cards.filter(c => c.type === 'doomsday');
    else if (forceType === 'angel') pool = cards.filter(c => c.type === 'angel');
    else {
        // 2:1 Ratio
        const isSpecific = Math.random() < 0.33;
        if (isSpecific) {
            pool = cards.filter(c =>
                c.personas && c.personas.includes(persona) &&
                !c.personas.includes('generic') &&
                c.type !== 'doomsday' && c.type !== 'angel'
            );
            if (pool.length === 0) pool = cards.filter(c =>
                (!c.personas || c.personas.includes('generic')) &&
                c.type !== 'doomsday' && c.type !== 'angel'
            );
        } else {
            pool = cards.filter(c =>
                (!c.personas || c.personas.includes('generic')) &&
                c.type !== 'doomsday' && c.type !== 'angel'
            );
        }
    }

    const eligible = pool.filter(c => !recentIds.includes(c.id));
    const finalPool = eligible.length > 0 ? eligible : pool;
    if (finalPool.length === 0) return null;

    return finalPool[Math.floor(Math.random() * finalPool.length)];
}

// --- AI Player ---

function evaluateState(pillars) {
    const minVal = Math.min(pillars.bandwidth, pillars.salary, pillars.reputation, pillars.life);
    const avgVal = (pillars.bandwidth + pillars.salary + pillars.reputation + pillars.life) / 4;

    if (minVal <= 0) return -1000;

    const above70 = Object.values(pillars).filter(v => v > 70).length;
    return (minVal * 10) + avgVal + (above70 * 20);
}

function makeDecision(card, pillars) {
    const leftPillars = applyEffects(pillars, card.leftChoice.effects);
    const rightPillars = applyEffects(pillars, card.rightChoice.effects);

    const leftScore = evaluateState(leftPillars);
    const rightScore = evaluateState(rightPillars);

    return leftScore >= rightScore ? 'left' : 'right';
}

// --- Simulation Loop ---

function runGame(persona) {
    // Start at balanced state matching game engine (swap-based initialisation)
    const values = [50, 50, 50, 50];
    for (let i = 0; i < 10; i++) {
        const giver = Math.floor(Math.random() * 4);
        const receiver = Math.floor(Math.random() * 4);
        if (giver === receiver) continue;
        if (values[giver] >= 35 && values[receiver] <= 65) {
            values[giver] -= 5;
            values[receiver] += 5;
        }
    }

    let state = {
        week: 1,
        pillars: { bandwidth: values[0], salary: values[1], reputation: values[2], life: values[3] },
        persona,
        decisionHistory: [],
        recentCardIds: [],
        status: 'playing'
    };

    while (state.status === 'playing') {
        const card = selectCard(data, state.recentCardIds, state.decisionHistory, state.week, state.persona);
        if (!card) break;

        const choice = makeDecision(card, state.pillars);
        const selectedChoice = choice === 'left' ? card.leftChoice : card.rightChoice;

        state.pillars = applyEffects(state.pillars, selectedChoice.effects);
        state.decisionHistory.push({ cardId: card.id, week: state.week });
        state.recentCardIds.push(card.id);
        state.week++;

        const above70 = Object.values(state.pillars).filter(v => v > 70).length;
        const below30 = Object.values(state.pillars).filter(v => v < 30).length;

        if (state.week >= 40 && above70 >= 2 && below30 === 0) {
            state.status = 'promoted';
            state.reason = 'stats-check';
            break;
        }

        const zeroPillar = getZeroPillar(state.pillars);
        if (zeroPillar) {
            state.status = 'game-over';
            state.reason = zeroPillar;
        } else if (state.week > 52) {
            state.status = 'game-over';
            state.reason = 'stagnation';
        }
    }
    return state;
}

// --- Main ---

const personas = [
    'developer',
    'product-manager',
    'analyst',
    'business-associate',
    'consultant',
    'marketing-manager',
    'operations-associate',
];
const ITERATIONS = 1000;

console.log(`Running ${ITERATIONS} simulations per persona...`);

personas.forEach(p => {
    let wins = 0;
    let losses = 0;
    let reasons = {};
    let avgWeek = 0;

    for (let i = 0; i < ITERATIONS; i++) {
        const res = runGame(p);
        if (res.status === 'promoted') wins++;
        else {
            losses++;
            reasons[res.reason] = (reasons[res.reason] || 0) + 1;
        }
        avgWeek += res.week;
    }

    console.log(`\n--- ${p.toUpperCase()} ---`);
    console.log(`Win Rate: ${((wins / ITERATIONS) * 100).toFixed(1)}%`);
    console.log(`Avg Week: ${(avgWeek / ITERATIONS).toFixed(1)}`);
    console.log('Death Causes:', reasons);
});
