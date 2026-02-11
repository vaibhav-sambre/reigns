const fs = require('fs');
const path = 'data/ic_cards.seed.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Helper to get random item
const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Tacky Templates based on dominant effect
const templates = {
    gain_reputation: [
        "Management loves a suck-up. You're the golden child now.",
        "Your LinkedIn profile is glowing. Your coworkers, not so much.",
        "You've earned some brownie points. Don't spend them all in one place.",
        "Visibility increased. Now everyone knows who to blame if it breaks.",
        "You looked great doing it. Perception is reality, right?"
    ],
    lose_reputation: [
        "Your reputation took a hit. Hope your resume is up to date.",
        "People are whispering. And not about your cool shoes.",
        "You stood your ground, and management stood on your neck.",
        "You're technically right, which is the worst kind of right.",
        "Bridge burned. Hope you didn't need to cross it."
    ],
    gain_salary: [
        "Cha-ching! Drinks are on you. Cheap ones.",
        "Money can't buy happiness, but it buys better coffee.",
        "You secured the bag. Now hide it.",
        "Productivity pays off. Literally, for once.",
        "Your bank account smiles. Your soul winces."
    ],
    lose_salary: [
        "Your wallet feels lighter. Maybe skip the avocado toast?",
        "You ignored the money. Very noble. Very broke.",
        "Financial hit taken. Hope you accept 'exposure' as payment.",
        "You saved the company money! You get... nothing.",
        "A costly decision. Literally."
    ],
    gain_life: [
        "You feel... human? Is this allowed?",
        "Work-life balance achieved. Don't get used to it.",
        "You touched grass. It was nice.",
        "Mental health restored. Back to the grind.",
        "You chose happiness. HR is confused."
    ],
    lose_life: [
        "You died a little inside. But the ticket is closed!",
        "Burnout is just a state of mind, right?",
        "Goodbye, weekend. Hello, fluorescent lights.",
        "Your plants at home miss you. If they're still alive.",
        "You sacrificed your sanity. Tycoon style."
    ],
    gain_bandwidth: [
        "Inbox zero achieved. A mythical state.",
        "You cleared your plate. Here comes a bigger serving.",
        "Efficiency increased! Your reward is more work.",
        "You bought yourself some time. Tick tock.",
        "Delegation worked. You're free to doomscroll."
    ],
    lose_bandwidth: [
        "Your calendar just exploded. Good luck.",
        "You are now drowning in tasks. Have a nice swim.",
        "Scope creep is real, and it's eating your lunch.",
        "You said yes. Why did you say yes?",
        "Overwhelmed is the new normal."
    ],
    neutral: [
        "Nothing changed. Just another Tuesday.",
        "Status quo maintained. Exciting.",
        "You made a choice. It happened.",
        "Meh. Could have been worse."
    ]
};

// Specific Overrides for Angel/Doomsday to be extra flavor-rich
const specificOutcomes = {
    // DOOMSDAY
    "doom-011": { // Acquisition
        left: "You updated your resume. Smart. It's nearly perfect.",
        right: "You kept your head down. The axe missed you... for now."
    },
    // ANGEL (Examples)
    "angel-001": { // Spot bonus
        left: "Responsible choice. Boring, but responsible.",
        right: "Treat yo' self! The endorphins are real."
    },
    "angel-020": { // Inflation adjustment
        left: "Finally, a raise that matches the price of eggs!",
        right: "Investing wisely. Future you says thanks."
    }
};

let updatedCount = 0;

data.forEach(card => {
    [card.leftChoice, card.rightChoice].forEach((choice, index) => {
        // Skip if already has text (unless empty/short)
        if (choice.outcomeText && choice.outcomeText.length > 10) return;

        // Check specifics
        const side = index === 0 ? 'left' : 'right';
        if (specificOutcomes[card.id] && specificOutcomes[card.id][side]) {
            choice.outcomeText = specificOutcomes[card.id][side];
            updatedCount++;
            return;
        }

        // Procedural generation
        // Find biggest effect
        let maxDelta = 0;
        let dominantPillar = null;

        choice.effects.forEach(e => {
            if (Math.abs(e.delta) > Math.abs(maxDelta)) {
                maxDelta = e.delta;
                dominantPillar = e.pillar;
            }
        });

        if (dominantPillar) {
            const key = (maxDelta > 0 ? "gain_" : "lose_") + dominantPillar;
            const text = sample(templates[key] || templates.neutral);
            choice.outcomeText = text;
        } else {
            choice.outcomeText = sample(templates.neutral);
        }
        updatedCount++;
    });
});

fs.writeFileSync(path, JSON.stringify(data, null, 4));
console.log(`Updated outcome texts for ${updatedCount} choices.`);
