const fs = require('fs');
const path = 'data/ic_cards.seed.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const updates = {
    'ic-076': { // Loud conversation
        'leftChoice': "You spent 45 minutes debating pizza toppings. The logic bug is still there, mocking you."
    },
    'ic-079': { // Snacks
        'leftChoice': "The donut was stale, but the dopamine hit was fresh. Your focus has crashed."
    },
    'ic-087': { // Wellness Challenge
        'leftChoice': "You sat still while others sprinted past your desk. You are the immovable object of productivity."
    },
    'ic-091': { // Fire Drill
        'leftChoice': "You risked immolation for a commit. Security wrote you up, but the PM is crying tears of joy."
    },
    'ic-095': { // Desk Swap
        'leftChoice': "You defended your territory like a badger. The window seat remains a dream, but at least you didn't pack boxes."
    },
    'ic-099': { // Parking Ticket
        'rightChoice': "You paid the fine with your own money. It felt like burning cash, but your conscience is clear-ish."
    },
    'ic-103': { // Bagel Friday
        'leftChoice': "You bought artisanal hand-rolled sourdough bagels. They were gone in 3 minutes. No one said thank you."
    },
    'ic-104': { // Conference
        'leftChoice': "The company paid. You attended one talk and spent the rest of the time 'networking' at the open bar."
    },
    'ic-108': { // Hackathon
        'leftChoice': "You worked all weekend for free pizza and a t-shirt. Management loves your 'passion' (and free labor)."
    },
    'ic-111': { // Interview Panel
        'rightChoice': "You prioritized the backlog over hiring. The team remains understaffed, but at least your ticket is done."
    },
    'ic-113': { // Standing Desk
        'rightChoice': "You chose comfort over ergonomics. Your spine will remember this in 20 years."
    },
    'ic-116': { // Code Review
        'leftChoice': "You rubber-stamped a monster PR. If it breaks production, it's a 'team failure', right?"
    },
    'ic-121': { // Town Hall
        'leftChoice': "You watched the CEO read a script at midnight. You are now a compliant corporate zombie."
    },
    'ic-123': { // Gym Subsidy
        'leftChoice': "You spent 3 hours scanning receipts for $20. Your hourly rate just plummeted."
    },
    'ic-124': { // Referral
        'leftChoice': "You referred mediocrity to your own team. Friendship is magic, until you have to fix their code."
    },
    'ic-126': { // Tech Blog
        'leftChoice': "The world doesn't need another 'Intro to React' post. You saved the internet some bandwidth."
    },
    'ic-128': { // Fridge Purge
        'leftChoice': "You avoided the biohazard zone. Someone else will deal with the sentient tuna sandwich."
    },
    'ic-138': { // Bug Bash
        'rightChoice': "You waited for the summary report. Why hunt for bugs when users will find them for free?"
    },
    'angel-009': { // Stock Grant
        'leftChoice': "You calculated your net worth on a napkin. You can almost afford a nice dinner now."
    },
    'angel-014': { // Referral Bonus
        'leftChoice': "The check cleared. You have successfully monetized your friendship."
    }
};

let count = 0;

data.forEach(card => {
    if (updates[card.id]) {
        if (updates[card.id].leftChoice) {
            card.leftChoice.outcomeText = updates[card.id].leftChoice;
            count++;
        }
        if (updates[card.id].rightChoice) {
            card.rightChoice.outcomeText = updates[card.id].rightChoice;
            count++;
        }
    }
});

fs.writeFileSync(path, JSON.stringify(data, null, 4));
console.log(`Rewrote ${count} weak outcome texts.`);
