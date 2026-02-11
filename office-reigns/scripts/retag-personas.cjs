const fs = require('fs');
const path = 'data/ic_cards.seed.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Keywords for each persona
const KEYWORDS = {
    'developer': [
        'code', 'bug', 'deploy', 'git', 'server', 'database', 'api', 'tech stack', 'latency',
        'refactor', 'debug', 'ide', 'terminal', 'crash', 'unit test', 'integration', 'algorithm',
        'linux', 'compiler', 'framework', 'legacy code', 'production'
    ],
    'product-manager': [
        'roadmap', 'stakeholder', 'user story', 'backlog', 'prioritiz', 'feature', 'launch',
        'scope', 'mvp', 'vision', 'strategy', 'user research', 'metrics', 'retention', 'churn',
        'market', 'competitor', 'product', 'jira', 'sprint'
    ],
    'analyst': [
        'data', 'excel', 'spreadsheet', 'dashboard', 'report', 'sql', 'query', 'trend',
        'forecast', 'statistics', 'analysis', 'numbers', 'tableau', 'powerbi', 'chart',
        'visualization', 'dataset', 'outlier'
    ],
    'business-associate': [
        'client', 'proposal', 'contract', 'presentation', 'deck', 'slide', 'meeting',
        'sales', 'revenue', 'negotiat', 'partner', 'deal', 'budget', 'finance', 'marketing',
        'campaign', 'customer'
    ]
};

let stats = {
    'generic': 0,
    'developer': 0,
    'product-manager': 0,
    'analyst': 0,
    'business-associate': 0
};

data.forEach(card => {
    // Combine title and prompt for analysis
    const text = ((card.title || '') + ' ' + card.prompt).toLowerCase();

    // Find matching personas
    const matchedPersonas = new Set();

    // Check specific keywords
    Object.entries(KEYWORDS).forEach(([persona, words]) => {
        if (words.some(word => text.includes(word))) {
            matchedPersonas.add(persona);
        }
    });

    // Heuristics for "Doomsday" or "Angel" cards (usually generic events)
    // But let's check content primarily.

    // If "Doomsday" or "Angel", they are often generic events (fire alarm, lottery, free food)
    // UNLESS they specifically mention a role.
    // The previous keyword check handles this.

    // Assign personas
    if (matchedPersonas.size === 0) {
        card.personas = ['generic'];
        stats['generic']++;
    } else {
        card.personas = Array.from(matchedPersonas);
        card.personas.forEach(p => stats[p]++);
    }
});

fs.writeFileSync(path, JSON.stringify(data, null, 4));

console.log('Retagging Complete!');
console.log('Stats:', stats);
console.log(`Total Cards: ${data.length}`);
