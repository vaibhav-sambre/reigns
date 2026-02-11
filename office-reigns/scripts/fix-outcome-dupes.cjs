const fs = require('fs');
const path = 'data/ic_cards.seed.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// The duplicates we want to replace
const duplicates = new Set([
    "Management loves a suck-up. You're the golden child now.",
    "Visibility increased. Now everyone knows who to blame if it breaks.",
    "Your LinkedIn profile is glowing. Your coworkers, not so much.",
    "You looked great doing it. Perception is reality, right?",
    "You've earned some brownie points. Don't spend them all in one place.",
    "You bought yourself some time. Tick tock.",
    "Efficiency increased! Your reward is more work.",
    "Inbox zero achieved. A mythical state.",
    "You cleared your plate. Here comes a bigger serving.",
    "You feel... human? Is this allowed?",
    "Mental health restored. Back to the grind.",
    "Work-life balance achieved. Don't get used to it.",
    "Your reputation took a hit. Hope your resume is up to date.",
    "You touched grass. It was nice.",
    "Your calendar just exploded. Good luck.",
    "Your plants at home miss you. If they're still alive.",
    "Delegation worked. You're free to doomscroll.",
    "Goodbye, weekend. Hello, fluorescent lights.",
    "You chose happiness. HR is confused.",
    "Your bank account smiles. Your soul winces.",
    "You secured the bag. Now hide it.",
    "Money can't buy happiness, but it buys better coffee."
]);

// Helper to get random item that hasn't been used *recently* for this run, 
// or just pop from a shuffled list
const replacements = {
    gain_reputation: [
        "A star is born. Or at least, a star employee.",
        "The executives nodded in approval. That's worth gold.",
        "You're trending on the internal kudos board.",
        "Your personal brand just appreciated in value.",
        "Influence gained. Use it wisely.",
        "You played the game and won this round.",
        "Promotability +1. Likability... debatable.",
        "Success has a flavor, and it tastes like approval.",
        "You're on the fast track. Don't trip.",
        "Leadership noticed. Try not to mess up now.",
        "A tactical win for your career history.",
        "Your name came up in a good meeting for once.",
        "You are the main character today.",
        "Clout acquired. Don't let it go to your head.",
        "The spotlight is on you. Don't sweat."
    ],
    gain_bandwidth: [
        "Time is money, and you just got rich.",
        "Schedule cleared. A rare victory.",
        "You created a pocket of peace in a chaotic week.",
        "Breathing room secured.",
        "You have capacity! Keep that secret.",
        "Finally, time to focus on what matters.",
        "The backlog shrinks. A miracle.",
        "You optimized your workflow beautifully.",
        "Space to think. Dangerous.",
        "A moment of calm before the next storm."
    ],
    gain_life: [
        "Serotonin levels critical status: OK.",
        "You chose sanity. A bold strategy.",
        "Peace of mind is priceless.",
        "You remembered you have a life outside work.",
        "Burnout delayed by another week.",
        "Your dog/cat/plant appreciates your presence.",
        "Rest is productive too. Tell your boss that.",
        "You feel recharged. Ready to face the screen.",
        "Health is wealth, and you just got paid."
    ],
    gain_salary: [
        "Wallet heavier. Step lighter.",
        "Financial freedom inches closer.",
        "Treat yourself. You earned it.",
        "The numbers in your account look better.",
        "Capitalism rewards you today.",
        "Profit shared. Mission accomplished."
    ],
    lose_reputation: [
        "That didn't go well. Lay low.",
        "Read the room next time. Zero points.",
        "You stepped on some toes. Ouch.",
        "Political capital spent. Hope it was worth it.",
        "Not your best look.",
        "The rumor mill is spinning."
    ],
    lose_bandwidth: [
        "Overwhelmed implies you can be whelmed.",
        "Buried under a mountain of tasks.",
        "Your to-do list is now a scroll.",
        "Busy is an understatement.",
        "You sold your free time for this."
    ],
    neutral: [
        "It is what it is.",
        "Choice made. Consequence pending.",
        "Moving on...",
        "Calculated risk taken."
    ]
};

let replaced = 0;

data.forEach(card => {
    [card.leftChoice, card.rightChoice].forEach(choice => {
        if (!duplicates.has(choice.outcomeText)) return;

        // Determine type again to pick replacement
        let maxDelta = 0;
        let dominantPillar = null;
        choice.effects.forEach(e => {
            if (Math.abs(e.delta) > Math.abs(maxDelta)) {
                maxDelta = e.delta;
                dominantPillar = e.pillar;
            }
        });

        let key = 'neutral';
        if (dominantPillar) {
            key = (maxDelta > 0 ? "gain_" : "lose_") + dominantPillar;
        }

        const options = replacements[key] || replacements.neutral;
        // Pick random
        choice.outcomeText = options[Math.floor(Math.random() * options.length)];
        replaced++;
    });
});

fs.writeFileSync(path, JSON.stringify(data, null, 4));
console.log(`Replaced ${replaced} duplicated outcome texts.`);
