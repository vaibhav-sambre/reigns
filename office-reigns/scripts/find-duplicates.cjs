const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/ic_cards.seed.json', 'utf8'));

// Simple tokenization
function tokenize(text) {
    return new Set(text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 3));
}

// Jaccard similarity
function jaccard(setA, setB) {
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return intersection.size / union.size;
}

const cards = data.map(c => ({
    id: c.id,
    title: c.title,
    prompt: c.prompt,
    tokens: tokenize(c.title + ' ' + c.prompt)
}));

const similarities = [];

for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
        const c1 = cards[i];
        const c2 = cards[j];

        // Check exact title match
        if (c1.title.toLowerCase() === c2.title.toLowerCase()) {
            similarities.push({
                type: 'Exact Title',
                score: 1.0,
                c1, c2
            });
            continue;
        }

        // Check content similarity
        const score = jaccard(c1.tokens, c2.tokens);
        if (score > 0.35) { // Threshold for "similar context"
            similarities.push({
                type: 'High Similarity',
                score,
                c1, c2
            });
        }
    }
}

console.log(`Found ${similarities.length} potential duplicates:\n`);
similarities.sort((a, b) => b.score - a.score).forEach(sim => {
    console.log(`[${sim.type}] Score: ${sim.score.toFixed(2)}`);
    console.log(`  1. (${sim.c1.id}) ${sim.c1.title}: ${sim.c1.prompt}`);
    console.log(`  2. (${sim.c2.id}) ${sim.c2.title}: ${sim.c2.prompt}`);
    console.log('---');
});
