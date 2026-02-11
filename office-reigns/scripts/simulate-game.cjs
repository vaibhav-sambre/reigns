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
    // 1. Forced Injection
    const playedCards = history.map(h => cards.find(c => c.id === h.cardId)).filter(Boolean);
    const doomsdayCount = playedCards.filter(c => c.tags.includes('doomsday')).length;
    const angelCount = playedCards.filter(c => c.tags.includes('angel')).length;

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
    if (forceType === 'doomsday') pool = cards.filter(c => c.tags.includes('doomsday'));
    else if (forceType === 'angel') pool = cards.filter(c => c.tags.includes('angel'));
    else {
        // 2:1 Ratio
        const isSpecific = Math.random() < 0.33;
        if (isSpecific) {
            pool = cards.filter(c => c.personas && c.personas.includes(persona) && !c.personas.includes('generic') && !c.tags.includes('doomsday') && !c.tags.includes('angel'));
            if (pool.length === 0) pool = cards.filter(c => (!c.personas || c.personas.includes('generic')) && !c.tags.includes('doomsday') && !c.tags.includes('angel'));
        } else {
            pool = cards.filter(c => (!c.personas || c.personas.includes('generic')) && !c.tags.includes('doomsday') && !c.tags.includes('angel'));
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

    // Penalize death heavily
    if (minVal <= 0) return -1000;

    // Bonus for promotion eligibility (2 > 70)
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
    // Generate Random Stats (Total 225)
    // Redistribution method to match game logic
    const TOTAL = 225;
    let pillars = [Math.random(), Math.random(), Math.random(), Math.random()];
    const sum = pillars.reduce((a, b) => a + b, 0);
    pillars = pillars.map(p => Math.round((p / sum) * TOTAL));

    // Fix rounding
    const currentSum = pillars.reduce((a, b) => a + b, 0);
    pillars[0] += (TOTAL - currentSum);

    // Naive clamp check (if random distribution is too wild, just reset to avoid edge cases in sim)
    // In actual game we might want better logic, but this is fine for Monte Carlo
    if (pillars.some(p => p < 20 || p > 90)) {
        pillars = [56, 56, 56, 57]; // Fallback if too extreme
    }

    let state = {
        week: 1,
        pillars: { bandwidth: pillars[0], salary: pillars[1], reputation: pillars[2], life: pillars[3] },
        persona: persona,
        decisionHistory: [],
        recentCardIds: [],
        status: 'playing'
    };

    while (state.status === 'playing') {
        // Draw Card
        const card = selectCard(data, state.recentCardIds, state.decisionHistory, state.week, state.persona);
        if (!card) break; // Error

        // Decide
        const choice = makeDecision(card, state.pillars);
        const selectedChoice = choice === 'left' ? card.leftChoice : card.rightChoice;

        // Apply
        state.pillars = applyEffects(state.pillars, selectedChoice.effects);
        state.decisionHistory.push({ cardId: card.id, week: state.week }); // Simplified history record
        state.recentCardIds.push(card.id);
        state.week++;

        // Checks
        // Immediate Promotion Mode
        const above70 = Object.values(state.pillars).filter(v => v > 70).length; // 70% Check
        const below30 = Object.values(state.pillars).filter(v => v < 30).length;

        if (state.week >= 40 && above70 >= 2 && below30 === 0) { // Week 40 Check
            state.status = 'promoted';
            state.reason = 'stats-check';
            break;
        }

        const zeroPillar = getZeroPillar(state.pillars);
        if (zeroPillar) {
            state.status = 'game-over';
            state.reason = zeroPillar;
        } else if (state.week > 52) {
            state.status = 'game-over'; // Stagnation
            state.reason = 'stagnation';
        }
    }
    return state;
}

// --- Main ---

const personas = ['developer', 'product-manager', 'analyst', 'business-associate'];
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
