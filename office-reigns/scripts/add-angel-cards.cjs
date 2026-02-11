const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/ic_cards.seed.json', 'utf8'));

// Target totals to match Doomsday negatives:
// Rep: +244, Bandwidth: +172, Life: +168, Salary: +50

const angelCards = [
    {
        "id": "angel-001",
        "track": "IC",
        "tags": ["angel"],
        "title": "The Spot Bonus",
        "prompt": "You received a spot bonus for your recent hard work!",
        "leftChoice": {
            "label": "Save it",
            "effects": [{ "pillar": "salary", "delta": 10 }, { "pillar": "life", "delta": 4 }]
        },
        "rightChoice": {
            "label": "Treat yourself",
            "effects": [{ "pillar": "life", "delta": 12 }, { "pillar": "salary", "delta": 2 }]
        }
    },
    {
        "id": "angel-002",
        "track": "IC",
        "tags": ["angel"],
        "title": "The Project Success",
        "prompt": "Your project launched successfully with zero bugs. Everyone is impressed.",
        "leftChoice": {
            "label": "Accept praise",
            "effects": [{ "pillar": "reputation", "delta": 14 }, { "pillar": "bandwidth", "delta": 4 }]
        },
        "rightChoice": {
            "label": "Share credit",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "bandwidth", "delta": 6 }] // Team morale boosts bandwidth
        }
    },
    {
        "id": "angel-003",
        "track": "IC",
        "tags": ["angel"],
        "title": "The Unexpected Holiday",
        "prompt": "CEO announces a surprise 3-day weekend for mental health.",
        "leftChoice": {
            "label": "Disconnect fully",
            "effects": [{ "pillar": "life", "delta": 14 }, { "pillar": "bandwidth", "delta": 8 }]
        },
        "rightChoice": {
            "label": "Light learning",
            "effects": [{ "pillar": "reputation", "delta": 6 }, { "pillar": "bandwidth", "delta": 10 }]
        }
    },
    {
        "id": "angel-004",
        "track": "IC",
        "tags": ["angel"],
        "title": "The Viral Feature",
        "prompt": "A feature you built went viral on social media. Users love it.",
        "leftChoice": {
            "label": "Write blog post",
            "effects": [{ "pillar": "reputation", "delta": 16 }, { "pillar": "salary", "delta": 4 }]
        },
        "rightChoice": {
            "label": "Enjoy the feedback",
            "effects": [{ "pillar": "reputation", "delta": 12 }, { "pillar": "life", "delta": 6 }]
        }
    },
    {
        "id": "angel-005",
        "track": "IC",
        "tags": ["angel"],
        "title": "The Mentor",
        "prompt": "A senior leader takes an interest in your career growth.",
        "leftChoice": {
            "label": "Accept guidance",
            "effects": [{ "pillar": "reputation", "delta": 14 }, { "pillar": "bandwidth", "delta": 6 }]
        },
        "rightChoice": {
            "label": "Ask for sponsorship",
            "effects": [{ "pillar": "reputation", "delta": 12 }, { "pillar": "salary", "delta": 4 }]
        }
    },
    {
        "id": "angel-006",
        "track": "IC",
        "tags": ["angel"],
        "title": "The New Tool",
        "prompt": "The team adopted a new tool that automates half your grunt work.",
        "leftChoice": {
            "label": "Automate everything",
            "effects": [{ "pillar": "bandwidth", "delta": 16 }]
        },
        "rightChoice": {
            "label": "Use spare time efficiently",
            "effects": [{ "pillar": "bandwidth", "delta": 10 }, { "pillar": "reputation", "delta": 6 }]
        }
    },
    {
        "id": "angel-007",
        "track": "IC",
        "tags": ["angel"],
        "title": "The Client Praise",
        "prompt": "A major client specifically praised your work in a meeting.",
        "leftChoice": {
            "label": "Thank them",
            "effects": [{ "pillar": "reputation", "delta": 12 }, { "pillar": "salary", "delta": 4 }]
        },
        "rightChoice": {
            "label": "Leverage for visibility",
            "effects": [{ "pillar": "reputation", "delta": 14 }, { "pillar": "bandwidth", "delta": 2 }]
        }
    },
    {
        "id": "angel-008",
        "track": "IC",
        "tags": ["angel"],
        "title": "The Quiet Week",
        "prompt": "Miraculously, you have no meetings this entire week.",
        "leftChoice": {
            "label": "Deep work mode",
            "effects": [{ "pillar": "bandwidth", "delta": 14 }, { "pillar": "reputation", "delta": 8 }]
        },
        "rightChoice": {
            "label": "Recover energy",
            "effects": [{ "pillar": "life", "delta": 12 }, { "pillar": "bandwidth", "delta": 10 }]
        }
    },
    {
        "id": "angel-009",
        "track": "IC",
        "tags": ["angel"],
        "title": "The Stock Grant",
        "prompt": "Company stock went up, and you get a refresher grant.",
        "leftChoice": {
            "label": "Celebrate",
            "effects": [{ "pillar": "salary", "delta": 12 }, { "pillar": "life", "delta": 4 }]
        },
        "rightChoice": {
            "label": "Plan future",
            "effects": [{ "pillar": "salary", "delta": 10 }, { "pillar": "bandwidth", "delta": 4 }]
        }
    },
    {
        "id": "angel-010",
        "track": "IC",
        "tags": ["angel"],
        "title": "The Healthy Snacks",
        "prompt": "Office kitchen is stocked with premium healthy snacks and fancy coffee.",
        "leftChoice": {
            "label": "Indulge",
            "effects": [{ "pillar": "life", "delta": 8 }, { "pillar": "bandwidth", "delta": 6 }]
        },
        "rightChoice": {
            "label": "Socialize over coffee",
            "effects": [{ "pillar": "reputation", "delta": 6 }, { "pillar": "life", "delta": 6 }]
        }
    },
    {
        "id": "angel-011",
        "track": "IC",
        "tags": ["angel"],
        "title": "The Cancelled Project",
        "prompt": "A stressful project you hated just got cancelled. You're free!",
        "leftChoice": {
            "label": "Breathe relief",
            "effects": [{ "pillar": "bandwidth", "delta": 14 }, { "pillar": "life", "delta": 10 }]
        },
        "rightChoice": {
            "label": "Pick new fun task",
            "effects": [{ "pillar": "bandwidth", "delta": 8 }, { "pillar": "reputation", "delta": 8 }]
        }
    },
    {
        "id": "angel-012",
        "track": "IC",
        "tags": ["angel"],
        "title": "The Conference Talk",
        "prompt": "Your proposal to speak at a big conference was accepted.",
        "leftChoice": {
            "label": "Prepare amazingly",
            "effects": [{ "pillar": "reputation", "delta": 18 }]
        },
        "rightChoice": {
            "label": "Wing it casually",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "life", "delta": 4 }]
        }
    },
    {
        "id": "angel-013",
        "track": "IC",
        "tags": ["angel"],
        "title": "The Team Victory",
        "prompt": "The team hit a major quarterly goal early.",
        "leftChoice": {
            "label": "Team party",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "life", "delta": 8 }]
        },
        "rightChoice": {
            "label": "Slack off",
            "effects": [{ "pillar": "bandwidth", "delta": 12 }, { "pillar": "life", "delta": 6 }]
        }
    },
    {
        "id": "angel-014",
        "track": "IC",
        "tags": ["angel"],
        "title": "The Referral Bonus",
        "prompt": "Someone you referred got hired!",
        "leftChoice": {
            "label": "Cash the check",
            "effects": [{ "pillar": "salary", "delta": 10 }, { "pillar": "reputation", "delta": 4 }]
        },
        "rightChoice": {
            "label": "Buy them lunch",
            "effects": [{ "pillar": "salary", "delta": 6 }, { "pillar": "reputation", "delta": 8 }]
        }
    },
    {
        "id": "angel-015",
        "track": "IC",
        "tags": ["angel"],
        "title": "The Commute Fix",
        "prompt": "Company started a luxury shuttle from your neighborhood.",
        "leftChoice": {
            "label": "Ride and sleep",
            "effects": [{ "pillar": "life", "delta": 10 }, { "pillar": "bandwidth", "delta": 8 }]
        },
        "rightChoice": {
            "label": "Ride and network",
            "effects": [{ "pillar": "reputation", "delta": 8 }, { "pillar": "bandwidth", "delta": 6 }]
        }
    },
    {
        "id": "angel-016",
        "track": "IC",
        "tags": ["angel"],
        "title": "The Open Source Fix",
        "prompt": "Your PR to a popular open source repo was merged.",
        "leftChoice": {
            "label": "Brag internally",
            "effects": [{ "pillar": "reputation", "delta": 14 }]
        },
        "rightChoice": {
            "label": "Feel proud",
            "effects": [{ "pillar": "reputation", "delta": 8 }, { "pillar": "life", "delta": 6 }]
        }
    },
    {
        "id": "angel-017",
        "track": "IC",
        "tags": ["angel"],
        "title": "The Wellness Stipend",
        "prompt": "HR sends a 'use it or lose it' wellness budget.",
        "leftChoice": {
            "label": "Massage",
            "effects": [{ "pillar": "life", "delta": 14 }, { "pillar": "salary", "delta": 2 }] // Value
        },
        "rightChoice": {
            "label": "Running shoes",
            "effects": [{ "pillar": "life", "delta": 10 }, { "pillar": "bandwidth", "delta": 4 }] // Energy
        }
    },
    {
        "id": "angel-018",
        "track": "IC",
        "tags": ["angel"],
        "title": "The Helper",
        "prompt": "An intern does all your documentation work perfectly.",
        "leftChoice": {
            "label": "Praise them",
            "effects": [{ "pillar": "reputation", "delta": 8 }, { "pillar": "bandwidth", "delta": 10 }]
        },
        "rightChoice": {
            "label": "Take credit",
            "effects": [{ "pillar": "reputation", "delta": 4 }, { "pillar": "bandwidth", "delta": 12 }]
        }
    },
    {
        "id": "angel-019",
        "track": "IC",
        "tags": ["angel"],
        "title": "The Perfect Flow",
        "prompt": "You entered a flow state and finished a week's work in one day.",
        "leftChoice": {
            "label": "Keep going",
            "effects": [{ "pillar": "bandwidth", "delta": 6 }, { "pillar": "reputation", "delta": 12 }]
        },
        "rightChoice": {
            "label": "Take rest of week easy",
            "effects": [{ "pillar": "bandwidth", "delta": 14 }, { "pillar": "life", "delta": 10 }]
        }
    },
    {
        "id": "angel-020",
        "track": "IC",
        "tags": ["angel"],
        "title": "The Inflation Adjustment",
        "prompt": "Surprise cost-of-living adjustment added to paycheck.",
        "leftChoice": {
            "label": "Nice!",
            "effects": [{ "pillar": "salary", "delta": 14 }, { "pillar": "life", "delta": 4 }]
        },
        "rightChoice": {
            "label": "Invest it",
            "effects": [{ "pillar": "salary", "delta": 12 }, { "pillar": "bandwidth", "delta": 2 }] // Less financial stress
        }
    }
];

// Combine and write
data.push(...angelCards);
fs.writeFileSync('data/ic_cards.seed.json', JSON.stringify(data, null, 4));
console.log('Added 20 Angel cards');
console.log('Total cards:', data.length);
