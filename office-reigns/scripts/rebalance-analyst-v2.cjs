const fs = require('fs');
const path = 'data/ic_cards.seed.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Adjustment map V2: Drastic Bandwidth Cost Reduction
// Many tasks that were -10 or -15 are now -5 or even +5 (efficiency shortcuts)
const adjustments = {
    'an-001': { // Data Discrepancy
        // Fix: -10 bandwidth -> -5 (It's hard but not that hard)
        left: { effects: [{ pillar: 'reputation', delta: 15 }, { pillar: 'bandwidth', delta: -5 }] }
    },
    'an-002': { // Tableau Spaceship
        // Building it: -10 -> -5
        left: { effects: [{ pillar: 'reputation', delta: 5 }, { pillar: 'bandwidth', delta: -5 }] }
    },
    'an-004': { // Excel Dependency
        // Fix macro: -5 -> 0 (Routine work)
        // Migrate to Python: -20 -> -10 (It's an investment, but not a death sentence)
        left: { effects: [{ pillar: 'bandwidth', delta: 0 }, { pillar: 'reputation', delta: 5 }] },
        right: { effects: [{ pillar: 'bandwidth', delta: -10 }, { pillar: 'reputation', delta: 20 }] }
    },
    'an-006': { // Null Value Crisis
        // Impute averages: -5 -> +5 (Quick hack saves time!)
        left: { effects: [{ pillar: 'bandwidth', delta: 5 }, { pillar: 'reputation', delta: 0 }] }
    },
    'an-012': { // Missing Tracking
        // Wait for hotfix: -5 -> +5 (You are literally waiting, thus resting)
        right: { effects: [{ pillar: 'reputation', delta: 5 }, { pillar: 'bandwidth', delta: 5 }] }
    },
    'an-015': { // Meeting
        // Attend: -15 -> -10
        left: { effects: [{ pillar: 'bandwidth', delta: -10 }, { pillar: 'reputation', delta: 5 }] }
    },
    'an-019': { // GDPR Audit
        // Audit: -15 -> -10
        // Ignore: +5 -> +10 (You gained time by doing nothing)
        left: { effects: [{ pillar: 'bandwidth', delta: -10 }, { pillar: 'reputation', delta: 5 }] },
        right: { effects: [{ pillar: 'reputation', delta: -10 }, { pillar: 'bandwidth', delta: 10 }] }
    },
    'an-020': { // Version Control (Google Sheet)
        // Leave it be: 0 -> +5 (You avoided a project)
        right: { effects: [{ pillar: 'reputation', delta: -5 }, { pillar: 'bandwidth', delta: 5 }] }
    },
    'an-025': { // KPI Shift
        // Update charts: -10 -> -5
        // Keep internal set: -15 -> -5 (It's just a spreadsheet copy)
        left: { effects: [{ pillar: 'bandwidth', delta: -5 }, { pillar: 'salary', delta: 0 }] },
        right: { effects: [{ pillar: 'bandwidth', delta: -5 }, { pillar: 'reputation', delta: 5 }] }
    },
    'an-027': { // Insight Request
        // Dig for hours: -15 -> -10
        left: { effects: [{ pillar: 'bandwidth', delta: -10 }, { pillar: 'reputation', delta: 5 }] }
    },
    'an-029': { // Meetings
        // Attend: -20 -> -10 (It's boring but not physical labor)
        left: { effects: [{ pillar: 'bandwidth', delta: -10 }, { pillar: 'reputation', delta: 5 }] }
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
console.log(`Rebalanced (v2) ${count} Analyst card choices.`);
