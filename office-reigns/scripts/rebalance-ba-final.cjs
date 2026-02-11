const fs = require('fs');
const path = 'data/ic_cards.seed.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Adjustment map: cardID -> new effects
const adjustments = {
    // --- BA BUFFS (Need 2nd Pillar > 70, likely Life or Salary) ---
    'ba-002': { // Client Dinner
        // Attend: Life -10, Rep +5 -> Life -5, Rep +5, Salary +5 (Expensed + Perk)
        left: { effects: [{ pillar: 'life', delta: -5 }, { pillar: 'reputation', delta: 5 }, { pillar: 'salary', delta: 5 }] }
    },
    'ba-006': { // Coffee Run
        // Get coffee: Rep 0, Salary 0 -> Rep +5, Bandwidth +5 (Walking break)
        left: { effects: [{ pillar: 'reputation', delta: 5 }, { pillar: 'bandwidth', delta: 5 }] }
    },
    'ba-009': { // Flight Economy
        // Upgrade: Salary -10, Life +10 -> Salary -5, Life +15 (Worth it)
        left: { effects: [{ pillar: 'salary', delta: -5 }, { pillar: 'life', delta: 15 }] }
    },
    'ba-012': { // Weekend Urgent
        // Ignore: Life +5 -> Life +10 (Reclaim time)
        right: { effects: [{ pillar: 'life', delta: 10 }, { pillar: 'reputation', delta: -5 }] }
    },
    'ba-016': { // Process Improvement
        // Lead project: Bandwidth -15, Rep +15 -> Bandwidth -10, Rep +15, Salary +5 (Bonus)
        left: { effects: [{ pillar: 'bandwidth', delta: -10 }, { pillar: 'reputation', delta: 15 }, { pillar: 'salary', delta: 5 }] }
    },

    // --- ANALYST NERFS (Too easy to get rich) ---
    // Analysts were getting rich from "Data Insights".
    // I need to find Analyst cards with high salary/rep and nerf them.
    'an-001': { // SQL Query
        // Optimize: Rep +10, Bandwidth -10 -> Rep +5, Bandwidth -10
        left: { effects: [{ pillar: 'reputation', delta: 5 }, { pillar: 'bandwidth', delta: -10 }] }
    },
    'an-003': { // Dashboard
        // Automate: Bandwidth -15, Rep +15 -> Bandwidth -15, Rep +10
        left: { effects: [{ pillar: 'bandwidth', delta: -15 }, { pillar: 'reputation', delta: 10 }] }
    },
    'an-007': { // Forecast
        // Perfect Model: Rep +15, Bandwidth -20 -> Rep +10, Bandwidth -20
        left: { effects: [{ pillar: 'reputation', delta: 10 }, { pillar: 'bandwidth', delta: -20 }] }
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
console.log(`Rebalanced ${count} cards (BA Buffs / Analyst Nerfs).`);
