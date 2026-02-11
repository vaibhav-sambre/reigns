const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/ic_cards.seed.json', 'utf8'));

// 40 New Generic Workplace Scenarios (ic-101 to ic-140)
const newCards = [
    {
        "id": "ic-101",
        "track": "IC",
        "tags": [],
        "title": "The Mentorship Request",
        "prompt": "A junior engineer asks you to mentor them. It's rewarding but time-consuming.",
        "leftChoice": {
            "label": "Agree to mentor",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "bandwidth", "delta": -8 }]
        },
        "rightChoice": {
            "label": "Decline politely",
            "effects": [{ "pillar": "bandwidth", "delta": 4 }, { "pillar": "reputation", "delta": -4 }]
        }
    },
    {
        "id": "ic-102",
        "track": "IC",
        "tags": [],
        "title": "The Legacy Code",
        "prompt": "You find a critical bug in legacy code no one touches. Fixing it is risky.",
        "leftChoice": {
            "label": "Fix it anyway",
            "effects": [{ "pillar": "reputation", "delta": 12 }, { "pillar": "bandwidth", "delta": -10 }]
        },
        "rightChoice": {
            "label": "Ignore it",
            "effects": [{ "pillar": "bandwidth", "delta": 0 }, { "pillar": "reputation", "delta": -2 }]
        }
    },
    {
        "id": "ic-103",
        "track": "IC",
        "tags": [],
        "title": "The Team Lunch",
        "prompt": "Team is going for a long lunch. You have deadlines.",
        "leftChoice": {
            "label": "Join them",
            "effects": [{ "pillar": "life", "delta": 8 }, { "pillar": "bandwidth", "delta": -8 }]
        },
        "rightChoice": {
            "label": "Skip it",
            "effects": [{ "pillar": "bandwidth", "delta": 6 }, { "pillar": "reputation", "delta": -4 }]
        }
    },
    {
        "id": "ic-104",
        "track": "IC",
        "tags": [],
        "title": "The Conference",
        "prompt": "There's an industry conference happening. Tickets are expensive but it's good networking.",
        "leftChoice": {
            "label": "Ask company to pay",
            "effects": [{ "pillar": "reputation", "delta": 8 }, { "pillar": "salary", "delta": -4 }] // Budget hit
        },
        "rightChoice": {
            "label": "Stay in office",
            "effects": [{ "pillar": "bandwidth", "delta": 6 }, { "pillar": "reputation", "delta": -2 }]
        }
    },
    {
        "id": "ic-105",
        "track": "IC",
        "tags": [],
        "title": "The Refactor",
        "prompt": "The codebase is messy. You want to spend week refactoring.",
        "leftChoice": {
            "label": "Refactor now",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 8 }]
        },
        "rightChoice": {
            "label": "New features only",
            "effects": [{ "pillar": "reputation", "delta": -4 }, { "pillar": "bandwidth", "delta": 0 }] // Tech debt accrues
        }
    },
    {
        "id": "ic-106",
        "track": "IC",
        "tags": [],
        "title": "The Volunteer Event",
        "prompt": "Company charity day. Requires a full day off work.",
        "leftChoice": {
            "label": "Participate",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "bandwidth", "delta": -8 }]
        },
        "rightChoice": {
            "label": "Keep working",
            "effects": [{ "pillar": "bandwidth", "delta": 6 }, { "pillar": "reputation", "delta": -6 }]
        }
    },
    {
        "id": "ic-107",
        "track": "IC",
        "tags": ["promotion-opportunity"],
        "title": "The Big Demo",
        "prompt": "CEO is visiting and wants a demo of your feature.",
        "leftChoice": {
            "label": "Present it yourself",
            "effects": [{ "pillar": "reputation", "delta": 16 }, { "pillar": "bandwidth", "delta": -6 }]
        },
        "rightChoice": {
            "label": "Let manager present",
            "effects": [{ "pillar": "reputation", "delta": 4 }, { "pillar": "life", "delta": 4 }]
        }
    },
    {
        "id": "ic-108",
        "track": "IC",
        "tags": [],
        "title": "The Hackathon",
        "prompt": "Internal hackathon this weekend. Great for visibility.",
        "leftChoice": {
            "label": "Join a team",
            "effects": [{ "pillar": "reputation", "delta": 12 }, { "pillar": "life", "delta": -10 }]
        },
        "rightChoice": {
            "label": "Relax at home",
            "effects": [{ "pillar": "life", "delta": 10 }, { "pillar": "reputation", "delta": -4 }]
        }
    },
    {
        "id": "ic-109",
        "track": "IC",
        "tags": [],
        "title": "The Documentation",
        "prompt": "Docs are outdated. Updating them is boring but helpful.",
        "leftChoice": {
            "label": "Update docs",
            "effects": [{ "pillar": "reputation", "delta": 6 }, { "pillar": "bandwidth", "delta": -8 }]
        },
        "rightChoice": {
            "label": "Focus on code",
            "effects": [{ "pillar": "bandwidth", "delta": 4 }, { "pillar": "reputation", "delta": -2 }]
        }
    },
    {
        "id": "ic-110",
        "track": "IC",
        "tags": [],
        "title": "The Side Project",
        "prompt": "You have an idea for a tool that could help the team.",
        "leftChoice": {
            "label": "Build it",
            "effects": [{ "pillar": "bandwidth", "delta": -12 }, { "pillar": "reputation", "delta": 10 }]
        },
        "rightChoice": {
            "label": "Stick to roadmap",
            "effects": [{ "pillar": "bandwidth", "delta": 2 }, { "pillar": "reputation", "delta": -2 }]
        }
    },
    {
        "id": "ic-111",
        "track": "IC",
        "tags": [],
        "title": "The Interview Panel",
        "prompt": "HR needs more interviewers for candidates.",
        "leftChoice": {
            "label": "Help interview",
            "effects": [{ "pillar": "reputation", "delta": 8 }, { "pillar": "bandwidth", "delta": -6 }]
        },
        "rightChoice": {
            "label": "Focus on work",
            "effects": [{ "pillar": "bandwidth", "delta": 4 }, { "pillar": "reputation", "delta": -2 }]
        }
    },
    {
        "id": "ic-112",
        "track": "IC",
        "tags": [],
        "title": "The Coffee Machine",
        "prompt": "The coffee machine is broken. You know how to fix it.",
        "leftChoice": {
            "label": "Fix it",
            "effects": [{ "pillar": "reputation", "delta": 6 }, { "pillar": "bandwidth", "delta": -2 }]
        },
        "rightChoice": {
            "label": "Not my job",
            "effects": [{ "pillar": "bandwidth", "delta": 0 }, { "pillar": "reputation", "delta": -1 }]
        }
    },
    {
        "id": "ic-113",
        "track": "IC",
        "tags": [],
        "title": "The Standing Desk",
        "prompt": "New standing desks available, but require setup time.",
        "leftChoice": {
            "label": "Get one",
            "effects": [{ "pillar": "life", "delta": 6 }, { "pillar": "bandwidth", "delta": -2 }]
        },
        "rightChoice": {
            "label": "Keep old desk",
            "effects": [{ "pillar": "bandwidth", "delta": 0 }, { "pillar": "life", "delta": -2 }]
        }
    },
    {
        "id": "ic-114",
        "track": "IC",
        "tags": [],
        "title": "The Production Incident",
        "prompt": "Minor issue in prod. You can patch it quickly or file a ticket.",
        "leftChoice": {
            "label": "Quick patch",
            "effects": [{ "pillar": "reputation", "delta": 8 }, { "pillar": "bandwidth", "delta": -4 }]
        },
        "rightChoice": {
            "label": "File ticket",
            "effects": [{ "pillar": "bandwidth", "delta": 0 }, { "pillar": "reputation", "delta": -2 }]
        }
    },
    {
        "id": "ic-115",
        "track": "IC",
        "tags": [],
        "title": "The Workshop",
        "prompt": "External expert hosting a workshop on new tech.",
        "leftChoice": {
            "label": "Attend",
            "effects": [{ "pillar": "reputation", "delta": 6 }, { "pillar": "bandwidth", "delta": -6 }]
        },
        "rightChoice": {
            "label": "Skip",
            "effects": [{ "pillar": "bandwidth", "delta": 4 }, { "pillar": "reputation", "delta": -2 }]
        }
    },
    {
        "id": "ic-116",
        "track": "IC",
        "tags": [],
        "title": "The Code Review",
        "prompt": "Huge PR waiting for review. It's complex.",
        "leftChoice": {
            "label": "Review thoroughly",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "bandwidth", "delta": -8 }]
        },
        "rightChoice": {
            "label": "LGTM fast",
            "effects": [{ "pillar": "bandwidth", "delta": 4 }, { "pillar": "reputation", "delta": -4 }]
        }
    },
    {
        "id": "ic-117",
        "track": "IC",
        "tags": [],
        "title": "The Team Building",
        "prompt": "Escape room event after work.",
        "leftChoice": {
            "label": "Go",
            "effects": [{ "pillar": "reputation", "delta": 6 }, { "pillar": "life", "delta": -4 }]
        },
        "rightChoice": {
            "label": "Go home",
            "effects": [{ "pillar": "life", "delta": 6 }, { "pillar": "reputation", "delta": -4 }]
        }
    },
    {
        "id": "ic-118",
        "track": "IC",
        "tags": [],
        "title": "The New Tool",
        "prompt": "Team wants to try a new project management tool.",
        "leftChoice": {
            "label": "Champion it",
            "effects": [{ "pillar": "reputation", "delta": 8 }, { "pillar": "bandwidth", "delta": -6 }]
        },
        "rightChoice": {
            "label": "Skepticism",
            "effects": [{ "pillar": "reputation", "delta": -2 }, { "pillar": "bandwidth", "delta": 0 }]
        }
    },
    {
        "id": "ic-119",
        "track": "IC",
        "tags": [],
        "title": "The Oncall Shift",
        "prompt": "Colleague wants to swap oncall shifts.",
        "leftChoice": {
            "label": "Swap",
            "effects": [{ "pillar": "reputation", "delta": 6 }, { "pillar": "life", "delta": -4 }]
        },
        "rightChoice": {
            "label": "Keep yours",
            "effects": [{ "pillar": "life", "delta": 2 }, { "pillar": "reputation", "delta": -2 }]
        }
    },
    {
        "id": "ic-120",
        "track": "IC",
        "tags": [],
        "title": "The Feedback",
        "prompt": "Colleague asks for honest feedback on their work.",
        "leftChoice": {
            "label": "Be honest",
            "effects": [{ "pillar": "reputation", "delta": 8 }, { "pillar": "life", "delta": -2 }] // Social friction
        },
        "rightChoice": {
            "label": "Be nice",
            "effects": [{ "pillar": "reputation", "delta": 2 }, { "pillar": "life", "delta": 0 }]
        }
    },
    {
        "id": "ic-121",
        "track": "IC",
        "tags": [],
        "title": "The Town Hall",
        "prompt": "Global town hall meeting at 9 PM your time.",
        "leftChoice": {
            "label": "Watch live",
            "effects": [{ "pillar": "reputation", "delta": 6 }, { "pillar": "life", "delta": -6 }]
        },
        "rightChoice": {
            "label": "Watch recording",
            "effects": [{ "pillar": "life", "delta": 4 }, { "pillar": "reputation", "delta": -2 }]
        }
    },
    {
        "id": "ic-122",
        "track": "IC",
        "tags": [],
        "title": "The Survey",
        "prompt": "Detailed engagement survey. Takes 30 mins.",
        "leftChoice": {
            "label": "Fill it out",
            "effects": [{ "pillar": "reputation", "delta": 4 }, { "pillar": "bandwidth", "delta": -4 }]
        },
        "rightChoice": {
            "label": "Ignore",
            "effects": [{ "pillar": "bandwidth", "delta": 2 }, { "pillar": "reputation", "delta": -2 }]
        }
    },
    {
        "id": "ic-123",
        "track": "IC",
        "tags": [],
        "title": "The Gym Subsidy",
        "prompt": "Company offers gym subsidy but requires paperwork.",
        "leftChoice": {
            "label": "Submit claim",
            "effects": [{ "pillar": "salary", "delta": 4 }, { "pillar": "bandwidth", "delta": -2 }]
        },
        "rightChoice": {
            "label": "Too much hassle",
            "effects": [{ "pillar": "bandwidth", "delta": 0 }, { "pillar": "salary", "delta": -2 }] // Opportunity cost
        }
    },
    {
        "id": "ic-124",
        "track": "IC",
        "tags": [],
        "title": "The Referral",
        "prompt": "Friend wants a referral. They're okay-ish.",
        "leftChoice": {
            "label": "Refer them",
            "effects": [{ "pillar": "salary", "delta": 10 }, { "pillar": "reputation", "delta": -4 }] // Risk
        },
        "rightChoice": {
            "label": "Don't refer",
            "effects": [{ "pillar": "reputation", "delta": 2 }, { "pillar": "salary", "delta": 0 }]
        }
    },
    {
        "id": "ic-125",
        "track": "IC",
        "tags": [],
        "title": "The Commute",
        "prompt": "Traffic is bad. Work from home or brave it?",
        "leftChoice": {
            "label": "Commute",
            "effects": [{ "pillar": "reputation", "delta": 4 }, { "pillar": "life", "delta": -6 }]
        },
        "rightChoice": {
            "label": "WFH",
            "effects": [{ "pillar": "life", "delta": 4 }, { "pillar": "reputation", "delta": -2 }]
        }
    },
    {
        "id": "ic-126",
        "track": "IC",
        "tags": [],
        "title": "The Social Media",
        "prompt": "Marketing wants you to share company post on LinkedIn.",
        "leftChoice": {
            "label": "Share it",
            "effects": [{ "pillar": "reputation", "delta": 4 }, { "pillar": "life", "delta": -2 }]
        },
        "rightChoice": {
            "label": "Don't share",
            "effects": [{ "pillar": "reputation", "delta": -2 }, { "pillar": "life", "delta": 2 }]
        }
    },
    {
        "id": "ic-127",
        "track": "IC",
        "tags": [],
        "title": "The Expense Report",
        "prompt": "You lost a receipt for $50 lunch.",
        "leftChoice": {
            "label": "Claim anyway",
            "effects": [{ "pillar": "salary", "delta": 2 }, { "pillar": "reputation", "delta": -4 }]
        },
        "rightChoice": {
            "label": "Eat the cost",
            "effects": [{ "pillar": "salary", "delta": -2 }, { "pillar": "reputation", "delta": 2 }] // Honesty
        }
    },
    {
        "id": "ic-128",
        "track": "IC",
        "tags": [],
        "title": "The Clean Up",
        "prompt": "Kitchen is a mess. It's not your mess.",
        "leftChoice": {
            "label": "Clean it",
            "effects": [{ "pillar": "reputation", "delta": 6 }, { "pillar": "bandwidth", "delta": -4 }]
        },
        "rightChoice": {
            "label": "Leave it",
            "effects": [{ "pillar": "bandwidth", "delta": 0 }, { "pillar": "reputation", "delta": -2 }]
        }
    },
    {
        "id": "ic-129",
        "track": "IC",
        "tags": [],
        "title": "The Beta Test",
        "prompt": "Platform team needs beta testers for internal tool.",
        "leftChoice": {
            "label": "Test it",
            "effects": [{ "pillar": "reputation", "delta": 6 }, { "pillar": "bandwidth", "delta": -4 }]
        },
        "rightChoice": {
            "label": "Too busy",
            "effects": [{ "pillar": "bandwidth", "delta": 2 }, { "pillar": "reputation", "delta": -1 }]
        }
    },
    {
        "id": "ic-130",
        "track": "IC",
        "tags": [],
        "title": "The Desk Decoration",
        "prompt": "Desk decorating contest.",
        "leftChoice": {
            "label": "Decorate",
            "effects": [{ "pillar": "reputation", "delta": 4 }, { "pillar": "bandwidth", "delta": -4 }]
        },
        "rightChoice": {
            "label": "Skip",
            "effects": [{ "pillar": "bandwidth", "delta": 2 }, { "pillar": "reputation", "delta": -1 }]
        }
    },
    {
        "id": "ic-131",
        "track": "IC",
        "tags": [],
        "title": "The Late Meeting",
        "prompt": "Meeting scheduled for 5:30 PM.",
        "leftChoice": {
            "label": "Accept",
            "effects": [{ "pillar": "reputation", "delta": 4 }, { "pillar": "life", "delta": -4 }]
        },
        "rightChoice": {
            "label": "Decline",
            "effects": [{ "pillar": "life", "delta": 4 }, { "pillar": "reputation", "delta": -4 }]
        }
    },
    {
        "id": "ic-132",
        "track": "IC",
        "tags": [],
        "title": "The Headhunters",
        "prompt": "Recruiter message on LinkedIn.",
        "leftChoice": {
            "label": "Reply",
            "effects": [{ "pillar": "salary", "delta": 8 }, { "pillar": "reputation", "delta": -8 }] // Risk of being seen
        },
        "rightChoice": {
            "label": "Ignore",
            "effects": [{ "pillar": "reputation", "delta": 4 }, { "pillar": "salary", "delta": -2 }] // Loyalty
        }
    },
    {
        "id": "ic-133",
        "track": "IC",
        "tags": [],
        "title": "The Training",
        "prompt": "Mandatory security training due.",
        "leftChoice": {
            "label": "Do it now",
            "effects": [{ "pillar": "reputation", "delta": 2 }, { "pillar": "bandwidth", "delta": -4 }]
        },
        "rightChoice": {
            "label": "Procrastinate",
            "effects": [{ "pillar": "bandwidth", "delta": 4 }, { "pillar": "reputation", "delta": -4 }]
        }
    },
    {
        "id": "ic-134",
        "track": "IC",
        "tags": [],
        "title": "The Birthday",
        "prompt": "It's a teammate's birthday. Everyone chipping in for gift.",
        "leftChoice": {
            "label": "Chip in",
            "effects": [{ "pillar": "reputation", "delta": 4 }, { "pillar": "salary", "delta": -2 }]
        },
        "rightChoice": {
            "label": "Pass",
            "effects": [{ "pillar": "salary", "delta": 2 }, { "pillar": "reputation", "delta": -4 }]
        }
    },
    {
        "id": "ic-135",
        "track": "IC",
        "tags": [],
        "title": "The Update",
        "prompt": "OS update requires restart. Takes 20 mins.",
        "leftChoice": {
            "label": "Update now",
            "effects": [{ "pillar": "bandwidth", "delta": -4 }, { "pillar": "reputation", "delta": 2 }]
        },
        "rightChoice": {
            "label": "Remind later",
            "effects": [{ "pillar": "bandwidth", "delta": 2 }, { "pillar": "reputation", "delta": -2 }]
        }
    },
    {
        "id": "ic-136",
        "track": "IC",
        "tags": ["promotion-opportunity"],
        "title": "The Strategy",
        "prompt": "VP asking for input on annual strategy.",
        "leftChoice": {
            "label": "Write detailed memo",
            "effects": [{ "pillar": "reputation", "delta": 18 }, { "pillar": "bandwidth", "delta": -12 }]
        },
        "rightChoice": {
            "label": "Quick email",
            "effects": [{ "pillar": "reputation", "delta": 4 }, { "pillar": "bandwidth", "delta": -2 }]
        }
    },
    {
        "id": "ic-137",
        "track": "IC",
        "tags": [],
        "title": "The Knowledge Share",
        "prompt": "Weekly knowledge share slot open.",
        "leftChoice": {
            "label": "Present topic",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "bandwidth", "delta": -8 }]
        },
        "rightChoice": {
            "label": "Attend only",
            "effects": [{ "pillar": "bandwidth", "delta": 2 }, { "pillar": "reputation", "delta": -2 }]
        }
    },
    {
        "id": "ic-138",
        "track": "IC",
        "tags": [],
        "title": "The Bug Bash",
        "prompt": "Pre-release bug bash.",
        "leftChoice": {
            "label": "Hunt bugs",
            "effects": [{ "pillar": "reputation", "delta": 6 }, { "pillar": "bandwidth", "delta": -6 }]
        },
        "rightChoice": {
            "label": "Wait for report",
            "effects": [{ "pillar": "bandwidth", "delta": 4 }, { "pillar": "reputation", "delta": -2 }]
        }
    },
    {
        "id": "ic-139",
        "track": "IC",
        "tags": [],
        "title": "The Tech Debt",
        "prompt": "Sprint planning. PM wants features.",
        "leftChoice": {
            "label": "Push for debt",
            "effects": [{ "pillar": "reputation", "delta": -4 }, { "pillar": "life", "delta": 4 }] // Easier future
        },
        "rightChoice": {
            "label": "Accept features",
            "effects": [{ "pillar": "reputation", "delta": 4 }, { "pillar": "life", "delta": -6 }] // Harder work
        }
    },
    {
        "id": "ic-140",
        "track": "IC",
        "tags": [],
        "title": "The Vacation",
        "prompt": "You haven't taken leave in a while.",
        "leftChoice": {
            "label": "Take week off",
            "effects": [{ "pillar": "life", "delta": 14 }, { "pillar": "reputation", "delta": -4 }]
        },
        "rightChoice": {
            "label": "Work through",
            "effects": [{ "pillar": "reputation", "delta": 4 }, { "pillar": "life", "delta": -8 }]
        }
    }
];

// Combine and write
data.push(...newCards);
fs.writeFileSync('data/ic_cards.seed.json', JSON.stringify(data, null, 4));
console.log('Added 40 new cards (ic-101 to ic-140)');
console.log('Total cards:', data.length);
