const fs = require('fs');
const path = 'data/ic_cards.seed.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Adjustment map: cardID -> adjustment logic
const adjustments = {
    'an-001': { // Data Discrepancy
        // Fix: Increase reputation gain for hard work, reduce cost slightly
        left: { effects: [{ pillar: 'reputation', delta: 15 }, { pillar: 'bandwidth', delta: -10 }] },
        right: { effects: [{ pillar: 'reputation', delta: -15 }, { pillar: 'bandwidth', delta: 5 }] } // Gain bandwidth for lazy choice
    },
    'an-003': { // SQL Join
        // Optimization should GAIN bandwidth long term or cost less
        left: { effects: [{ pillar: 'bandwidth', delta: 5 }, { pillar: 'reputation', delta: 5 }] } // Fixing it saves future time
    },
    'an-004': { // Excel Dependency
        // Automating with Python should have high upfront cost but huge payoff? 
        // Or just high reputation.
        right: { effects: [{ pillar: 'bandwidth', delta: -15 }, { pillar: 'reputation', delta: 20 }] }
    },
    'an-008': { // Dark Mode
        // Sharing bluntly saves work
        left: { effects: [{ pillar: 'reputation', delta: -5 }, { pillar: 'bandwidth', delta: 5 }] }
    },
    'an-009': { // CSV Export
        // Refusing means less work later
        right: { effects: [{ pillar: 'bandwidth', delta: 5 }, { pillar: 'reputation', delta: -5 }] }
    },
    'an-013': { // Looker switch
        // Opposing switch saves bandwidth
        right: { effects: [{ pillar: 'reputation', delta: -5 }, { pillar: 'bandwidth', delta: 10 }] }
    },
    'an-014': { // Quick Question
        // Ticketing saves immediate bandwidth
        right: { effects: [{ pillar: 'bandwidth', delta: 10 }, { pillar: 'reputation', delta: -5 }] }
    },
    'an-015': { // Meeting
        // Skipping saves bandwidth
        right: { effects: [{ pillar: 'bandwidth', delta: 15 }, { pillar: 'reputation', delta: -10 }] }
    },
    'an-018': { // ML Hype
        // Regression is fast
        right: { effects: [{ pillar: 'reputation', delta: 5 }, { pillar: 'bandwidth', delta: 10 }] }
    },
    'an-022': { // Pipeline Broken
        // Sleep saves Life, maybe slight bandwidth gain from rest?
        right: { effects: [{ pillar: 'reputation', delta: -10 }, { pillar: 'life', delta: 10 }] }
    },
    'an-028': { // Dashboard Perf
        // Caching saves server bandwidth... and maybe your bandwidth from complaints?
        // Let's make caching positive bandwidth
        left: { effects: [{ pillar: 'bandwidth', delta: 5 }, { pillar: 'reputation', delta: 10 }] }
    },
    'an-029': { // Meetings
        // Decline all -> Huge bandwidth gain
        right: { effects: [{ pillar: 'reputation', delta: -10 }, { pillar: 'bandwidth', delta: 20 }] }
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
console.log(`Rebalanced ${count} Analyst card choices.`);
