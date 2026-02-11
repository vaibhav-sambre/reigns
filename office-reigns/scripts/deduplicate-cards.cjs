const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/ic_cards.seed.json', 'utf8'));

// Updates map: ID -> New content
const updates = {
    // 1. ic-110 Side Project -> The Podcast
    "ic-110": {
        title: "The Tech Podcast",
        prompt: "You're invited to speak on a popular tech podcast about your work.",
        leftChoice: { label: "Accept", effects: [{ pillar: "reputation", delta: 12 }, { pillar: "bandwidth", delta: -6 }] },
        rightChoice: { label: "Decline", effects: [{ pillar: "bandwidth", delta: 4 }, { pillar: "reputation", delta: -4 }] }
    },
    // 2. ic-101 Mentorship -> The Alumni Talk
    "ic-101": {
        title: "The Alumni Talk",
        prompt: "Your university asks you to give a guest lecture to computer science students.",
        leftChoice: { label: "Give lecture", effects: [{ pillar: "reputation", delta: 10 }, { pillar: "bandwidth", delta: -8 }] },
        rightChoice: { label: "Too busy", effects: [{ pillar: "bandwidth", delta: 4 }, { pillar: "reputation", delta: -2 }] }
    },
    // 3. ic-095 Office Move -> The Desk Swap (Keep existing effects/balance, just flavor change)
    "ic-095": {
        title: "The Desk Swap",
        prompt: "A colleague with a window seat wants to swap desks with you.",
        // Keep original effects roughly or redefine? Let's just update prompt to match context if original fits
        // Original ic-095 was "volunteer to coordinate". 
        // New context: Swap desks.
        leftChoice: { label: "Swap", effects: [{ pillar: "life", delta: 6 }, { pillar: "reputation", delta: -2 }] },
        rightChoice: { label: "Stay put", effects: [{ pillar: "reputation", delta: 2 }, { pillar: "life", delta: 0 }] }
    },
    // 4. ic-087 Gym -> The Wellness Challenge
    "ic-087": {
        title: "The Wellness Challenge",
        prompt: "Office-wide step counting challenge. Prizes for the winner.",
        leftChoice: { label: "Compete hard", effects: [{ pillar: "life", delta: 8 }, { pillar: "bandwidth", delta: -6 }] },
        rightChoice: { label: "Ignore it", effects: [{ pillar: "bandwidth", delta: 4 }, { pillar: "reputation", delta: -2 }] }
    },
    // 5. ic-103 Team Lunch -> The Bagel Friday
    "ic-103": {
        title: "The Bagel Friday",
        prompt: "It's your turn to organize Bagel Friday for the team.",
        leftChoice: { label: "Get the best bagels", effects: [{ pillar: "reputation", delta: 6 }, { pillar: "bandwidth", delta: -4 }] },
        rightChoice: { label: "Forget about it", effects: [{ pillar: "bandwidth", delta: 2 }, { pillar: "reputation", delta: -4 }] }
    },
    // 6. angel-006 New Tool -> The Automation Miracle
    "angel-006": {
        title: "The Automation Miracle"
    },
    // 7. ic-112 Coffee Machine -> The Snack Bar
    "ic-112": {
        title: "The Snack Bar",
        prompt: "They replaced the good snacks with kale chips. A riot is brewing.",
        leftChoice: { label: "Start petition", effects: [{ pillar: "reputation", delta: 8 }, { pillar: "bandwidth", delta: -4 }] },
        rightChoice: { label: "Eat kale", effects: [{ pillar: "life", delta: 4 }, { pillar: "reputation", delta: -2 }] }
    },
    // 8. doom-016 Team Conflict -> The HR Investigation
    "doom-016": {
        title: "The HR Investigation"
    },
    // 9. doom-009 Perf Review -> The PIP
    "doom-009": {
        title: "The PIP",
        prompt: "You've been put on a Performance Improvement Plan. It's serious."
    },
    // 10. doom-012 Urgent Request -> The Impossible Deadline
    "doom-012": {
        title: "The Impossible Deadline"
    },
    // 11. ic-127 Expense -> The Shared Cab
    "ic-127": {
        title: "The Shared Cab",
        prompt: "Colleague asks to share a cab to the airport but forgets to pay you back.",
        leftChoice: { label: "Ask for money", effects: [{ pillar: "salary", delta: 2 }, { pillar: "reputation", delta: -2 }] },
        rightChoice: { label: "Let it slide", effects: [{ pillar: "reputation", delta: 4 }, { pillar: "salary", delta: -4 }] }
    },
    // 12. ic-126 Social Media -> The Blog Post
    "ic-126": {
        title: "The Tech Blog",
        prompt: "Engineering blog needs a new post. You have a draft.",
        leftChoice: { label: "Publish it", effects: [{ pillar: "reputation", delta: 10 }, { pillar: "bandwidth", delta: -6 }] },
        rightChoice: { label: "Keep in drafts", effects: [{ pillar: "bandwidth", delta: 4 }, { pillar: "reputation", delta: -2 }] }
    },
    // 13. ic-120 Feedback -> The Peer Review
    "ic-120": {
        title: "The Peer Review",
        prompt: "You need to write peer reviews for 5 colleagues by tomorrow.",
        leftChoice: { label: "Write detailedly", effects: [{ pillar: "reputation", delta: 8 }, { pillar: "bandwidth", delta: -8 }] },
        rightChoice: { label: "Copy-paste generic", effects: [{ pillar: "bandwidth", delta: 4 }, { pillar: "reputation", delta: -4 }] }
    },
    // 14. ic-128 Clean Up -> The Fridge Purge
    "ic-128": {
        title: "The Fridge Purge",
        prompt: "The office fridge smells terrible. Something has evolved in there.",
        leftChoice: { label: "Purge it", effects: [{ pillar: "life", delta: 4 }, { pillar: "bandwidth", delta: -4 }] },
        rightChoice: { label: "Avoid kitchen", effects: [{ pillar: "bandwidth", delta: 0 }, { pillar: "life", delta: -2 }] }
    },
    // 15. ic-132 Headhunters -> The Competitor Offer
    "ic-132": {
        title: "The Competitor Offer",
        prompt: "A competitor explicitly offers you a 20% raise to join them.",
        leftChoice: { label: "Interview", effects: [{ pillar: "salary", delta: 0, "nextCard": "offer-card" }, { pillar: "reputation", delta: -10 }] }, // Simplified
        rightChoice: { label: "Leverage for raise", effects: [{ pillar: "salary", delta: 10 }, { pillar: "reputation", delta: -6 }] }
    }
};

let updatedCount = 0;
data.forEach(card => {
    if (updates[card.id]) {
        const update = updates[card.id];
        Object.assign(card, update);
        updatedCount++;
    }
});

fs.writeFileSync('data/ic_cards.seed.json', JSON.stringify(data, null, 4));
console.log(`Updated ${updatedCount} cards with unique content.`);
