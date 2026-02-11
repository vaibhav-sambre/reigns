const fs = require('fs');
const path = 'data/ic_cards.seed.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Adjustment map: cardID -> new effects
const adjustments = {
    'dev-001': { // Friday Deploy
        // Deploying successfully should PAY.
        left: { effects: [{ pillar: 'reputation', delta: 15 }, { pillar: 'salary', delta: 5 }] }, // Was Life -15
    },
    'dev-002': { // Legacy Code
        // Success = Raise
        left: { effects: [{ pillar: 'salary', delta: 10 }, { pillar: 'reputation', delta: 10 }] }
    },
    'dev-003': { // Infinite Loop
        // Hotfix should cost life/bandwidth but give salary/rep?
        right: { effects: [{ pillar: 'reputation', delta: 10 }, { pillar: 'salary', delta: 5 }] }
    },
    'dev-011': { // Recruiter
        // Taking interview risks Life but potential Salary? 
        // Failing interview (Left) -> Life -5 (was -10), Rep 0.
        // Ignoring (Right) -> Salary 0 (was -5).
        right: { effects: [{ pillar: 'life', delta: 5 }, { pillar: 'reputation', delta: 0 }] }
    },
    'dev-013': { // React vs Rust
        // Rust (Right) -> Bandwidth -15 (was -20), Salary +5 (Specialist pay)
        right: { effects: [{ pillar: 'bandwidth', delta: -15 }, { pillar: 'salary', delta: 5 }] }
    },
    'dev-017': { // Coffee
        // Starbucks -> Life +5, Salary -5 (Keep costs, it's funny).
    },
    'dev-023': { // Refactor Addiction
        // Rewrite -> Salary +5 (Skills improve)
        left: { effects: [{ pillar: 'bandwidth', delta: -5 }, { pillar: 'salary', delta: 5 }] }
    },
    'dev-024': { // Merge Conflict
        // Manual resolve: Bandwidth -10 (was -15)
        left: { effects: [{ pillar: 'bandwidth', delta: -10 }, { pillar: 'reputation', delta: 10 }] }
    },
    'dev-025': { // Estimation
        // Vote 13: Rep +5, Bandwidth 0 (You were right)
        left: { effects: [{ pillar: 'reputation', delta: 5 }, { pillar: 'bandwidth', delta: 0 }] }
    },
    'dev-026': { // SSH Prod
        // High risk high reward?
        right: { effects: [{ pillar: 'salary', delta: 10 }, { pillar: 'reputation', delta: -5 }] }
    },
    'dev-028': { // Hacky Fix
        // Fix properly: Bandwidth -10 (was -15), Salary +5
        right: { effects: [{ pillar: 'bandwidth', delta: -10 }, { pillar: 'salary', delta: 5 }] }
    },
    'dev-030': { // Clean Code
        // Ship it: Rep +10, Bandwidth +5 (It runs itself)
        left: { effects: [{ pillar: 'reputation', delta: 10 }, { pillar: 'bandwidth', delta: 5 }] }
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
console.log(`Rebalanced ${count} Developer card choices.`);
