const fs = require('fs');
const path = 'data/ic_cards.seed.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Adjustment map: cardID -> new effects
const adjustments = {
    'ba-001': { // Deck Formatting
        // All-nighter: Rep +10 -> +5 (It's expected work)
        left: { effects: [{ pillar: 'life', delta: -15 }, { pillar: 'reputation', delta: 5 }] }
    },
    'ba-002': { // Client Dinner
        // Attend: Life -10, Rep +10 -> Rep +5. Salary -? No, let's say reimbursed.
        // Wait, current effect says nothing about Salary. But outcomes imply it.
        // Let's explicitly Add Salary +5 (Per diem profit?) or just 0.
        // Let's leave as is but reduce Rep.
        left: { effects: [{ pillar: 'life', delta: -10 }, { pillar: 'reputation', delta: 5 }] }
    },
    'ba-006': { // Coffee Run
        // Get coffee: Rep +5 -> Rep +0 (It's a low task)
        left: { effects: [{ pillar: 'salary', delta: 0 }, { pillar: 'reputation', delta: 0 }] }
    },
    'ba-007': { // Vendor Negotiation
        // Play hardball: Salary +10 -> +5 (You saved THEIR money not yours)
        left: { effects: [{ pillar: 'salary', delta: 5 }, { pillar: 'reputation', delta: 5 }] }
    },
    'ba-009': { // Flight Economy
        // Upgrade self: Salary -15 -> -10 (Less penalty)
        left: { effects: [{ pillar: 'salary', delta: -10 }, { pillar: 'life', delta: 10 }] }
    },
    'ba-014': { // Expense Report
        // Eat cost: Salary -10 -> -5
        right: { effects: [{ pillar: 'salary', delta: -5 }, { pillar: 'reputation', delta: 5 }] }
    },
    'ba-017': { // Gift Basket
        // Overspend: Salary -5 -> -2? No, let's reimburse it via Rep?
        // Let's make Cheap Out (Left) cost MORE Rep (-10).
        left: { effects: [{ pillar: 'salary', delta: 0 }, { pillar: 'reputation', delta: -10 }] }
    },
    'ba-020': { // Calendar Tetris
        // Find slot: Rep +5 -> +10 (This IS magic)
        left: { effects: [{ pillar: 'bandwidth', delta: -10 }, { pillar: 'reputation', delta: 10 }] }
    },
    'ba-021': { // Password Reset
        // Help CEO: Rep +10 -> +15 (King is happy)
        left: { effects: [{ pillar: 'reputation', delta: 15 }, { pillar: 'bandwidth', delta: -5 }] }
    },
    'ba-028': { // Strategy Offsite
        // Participate: Rep +10 -> +5
        left: { effects: [{ pillar: 'life', delta: -10 }, { pillar: 'reputation', delta: 5 }] }
    }
};

let count = 0;

data.forEach(card => {
    if (adjustments[card.id]) {
        const adj = adjustments[card.id];
        if (adj.left) {
            card.leftChoice.effects = adj.left.effects;
            count++;
        }
        if (adj.right) {
            card.rightChoice.effects = adj.right.effects;
            count++;
        }
    }
});

fs.writeFileSync(path, JSON.stringify(data, null, 4));
console.log(`Rebalanced ${count} BA card choices.`);
