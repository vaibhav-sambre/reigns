const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/ic_cards.seed.json', 'utf8'));

// 20 Doomsday cards - both choices only decrease pillars (max 2 per choice)
const doomsdayCards = [
    {
        "id": "doom-001",
        "track": "IC",
        "tags": ["doomsday"],
        "title": "The Company Layoffs",
        "prompt": "Major layoffs are announced. Your team is being 'restructured'. You'll either take on more work or lose respect.",
        "leftChoice": {
            "label": "Absorb extra workload",
            "effects": [{ "pillar": "bandwidth", "delta": -12 }, { "pillar": "life", "delta": -8 }],
            "outcomeText": "You're drowning in work, barely staying afloat."
        },
        "rightChoice": {
            "label": "Push back on scope",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "salary", "delta": -6 }],
            "outcomeText": "You're seen as not a team player during tough times."
        }
    },
    {
        "id": "doom-002",
        "track": "IC",
        "tags": ["doomsday"],
        "title": "The Failed Project",
        "prompt": "A project you worked on is publicly declared a failure. The blame has to land somewhere.",
        "leftChoice": {
            "label": "Accept responsibility",
            "effects": [{ "pillar": "reputation", "delta": -14 }],
            "outcomeText": "You take the fall. It will be remembered."
        },
        "rightChoice": {
            "label": "Deflect to external factors",
            "effects": [{ "pillar": "reputation", "delta": -8 }, { "pillar": "life", "delta": -6 }],
            "outcomeText": "Excuses don't land well. Trust erodes."
        }
    },
    {
        "id": "doom-003",
        "track": "IC",
        "tags": ["doomsday"],
        "title": "The Budget Cuts",
        "prompt": "Company announces across-the-board budget cuts. Benefits and resources are being slashed.",
        "leftChoice": {
            "label": "Accept reduced benefits",
            "effects": [{ "pillar": "salary", "delta": -12 }, { "pillar": "life", "delta": -6 }],
            "outcomeText": "Your compensation package shrinks significantly."
        },
        "rightChoice": {
            "label": "Fight for your benefits",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "bandwidth", "delta": -6 }],
            "outcomeText": "You're labeled as 'difficult' during austerity measures."
        }
    },
    {
        "id": "doom-004",
        "track": "IC",
        "tags": ["doomsday"],
        "title": "The Toxic Client",
        "prompt": "You're assigned to a notoriously difficult client. No one else wants this account.",
        "leftChoice": {
            "label": "Try your best",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "life", "delta": -10 }],
            "outcomeText": "Endless demands and midnight calls drain you completely."
        },
        "rightChoice": {
            "label": "Set boundaries",
            "effects": [{ "pillar": "reputation", "delta": -12 }],
            "outcomeText": "The client escalates. Management is not pleased."
        }
    },
    {
        "id": "doom-005",
        "track": "IC",
        "tags": ["doomsday"],
        "title": "The System Outage",
        "prompt": "A critical system you manage goes down during peak hours. All eyes are on you.",
        "leftChoice": {
            "label": "Work through the night",
            "effects": [{ "pillar": "life", "delta": -14 }, { "pillar": "bandwidth", "delta": -6 }],
            "outcomeText": "Emergency fixed but you're running on empty."
        },
        "rightChoice": {
            "label": "Call for backup",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "bandwidth", "delta": -4 }],
            "outcomeText": "You couldn't handle it alone. That's noted."
        }
    },
    {
        "id": "doom-006",
        "track": "IC",
        "tags": ["doomsday"],
        "title": "The Reorganization",
        "prompt": "Company is reorganizing. Your team is being dissolved and redistributed.",
        "leftChoice": {
            "label": "Accept new assignment",
            "effects": [{ "pillar": "life", "delta": -8 }, { "pillar": "reputation", "delta": -6 }],
            "outcomeText": "You're now working in unfamiliar territory with no connections."
        },
        "rightChoice": {
            "label": "Request preferred team",
            "effects": [{ "pillar": "reputation", "delta": -12 }],
            "outcomeText": "In a reorg, demanding preferences is frowned upon."
        }
    },
    {
        "id": "doom-007",
        "track": "IC",
        "tags": ["doomsday"],
        "title": "The Missed Deadline",
        "prompt": "A critical deadline is missed and it's partially your fault. Consequences are coming.",
        "leftChoice": {
            "label": "Own the mistake publicly",
            "effects": [{ "pillar": "reputation", "delta": -12 }, { "pillar": "salary", "delta": -4 }],
            "outcomeText": "Honesty is noted, but so is the failure."
        },
        "rightChoice": {
            "label": "Work overtime to catch up",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "life", "delta": -8 }],
            "outcomeText": "Damage control consumes your every waking hour."
        }
    },
    {
        "id": "doom-008",
        "track": "IC",
        "tags": ["doomsday"],
        "title": "The Office Politics",
        "prompt": "You've been caught in the middle of a power struggle between two senior leaders.",
        "leftChoice": {
            "label": "Side with one leader",
            "effects": [{ "pillar": "reputation", "delta": -8 }, { "pillar": "life", "delta": -6 }],
            "outcomeText": "You made an enemy. Politics always has casualties."
        },
        "rightChoice": {
            "label": "Stay neutral",
            "effects": [{ "pillar": "reputation", "delta": -6 }, { "pillar": "bandwidth", "delta": -8 }],
            "outcomeText": "Both sides now distrust you. Worse than picking a side."
        }
    },
    {
        "id": "doom-009",
        "track": "IC",
        "tags": ["doomsday"],
        "title": "The Performance Review",
        "prompt": "Your performance review came back worse than expected. Your rating dropped.",
        "leftChoice": {
            "label": "Accept and work harder",
            "effects": [{ "pillar": "life", "delta": -10 }, { "pillar": "bandwidth", "delta": -8 }],
            "outcomeText": "You push yourself to the breaking point trying to recover."
        },
        "rightChoice": {
            "label": "Contest the review",
            "effects": [{ "pillar": "reputation", "delta": -12 }, { "pillar": "salary", "delta": -4 }],
            "outcomeText": "Challenging feedback makes you look defensive."
        }
    },
    {
        "id": "doom-010",
        "track": "IC",
        "tags": ["doomsday"],
        "title": "The New Manager",
        "prompt": "Your supportive manager left. The new one has very different expectations.",
        "leftChoice": {
            "label": "Adapt to new style",
            "effects": [{ "pillar": "life", "delta": -8 }, { "pillar": "bandwidth", "delta": -8 }],
            "outcomeText": "Everything you knew about succeeding here no longer applies."
        },
        "rightChoice": {
            "label": "Maintain your approach",
            "effects": [{ "pillar": "reputation", "delta": -14 }],
            "outcomeText": "The new manager sees you as resistant to change."
        }
    },
    {
        "id": "doom-011",
        "track": "IC",
        "tags": ["doomsday"],
        "title": "The Acquisition",
        "prompt": "Your company is being acquired. Redundancies are expected.",
        "leftChoice": {
            "label": "Prove your value aggressively",
            "effects": [{ "pillar": "bandwidth", "delta": -12 }, { "pillar": "life", "delta": -6 }],
            "outcomeText": "You're working harder than ever just to keep your job."
        },
        "rightChoice": {
            "label": "Keep your head down",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "salary", "delta": -6 }],
            "outcomeText": "Out of sight, possibly out of mind. Risky strategy."
        }
    },
    {
        "id": "doom-012",
        "track": "IC",
        "tags": ["doomsday"],
        "title": "The Urgent Request",
        "prompt": "Leadership demands an impossible task done by end of day. It's 4 PM.",
        "leftChoice": {
            "label": "Attempt the impossible",
            "effects": [{ "pillar": "bandwidth", "delta": -14 }, { "pillar": "life", "delta": -6 }],
            "outcomeText": "You delivered half-baked work. Not your finest moment."
        },
        "rightChoice": {
            "label": "Negotiate timeline",
            "effects": [{ "pillar": "reputation", "delta": -10 }],
            "outcomeText": "They needed a yes-person. You weren't it."
        }
    },
    {
        "id": "doom-013",
        "track": "IC",
        "tags": ["doomsday"],
        "title": "The Sick Week",
        "prompt": "You're genuinely ill but there's a critical project. No one can cover.",
        "leftChoice": {
            "label": "Work while sick",
            "effects": [{ "pillar": "life", "delta": -14 }, { "pillar": "bandwidth", "delta": -4 }],
            "outcomeText": "You pushed through but recovery takes twice as long."
        },
        "rightChoice": {
            "label": "Take sick leave",
            "effects": [{ "pillar": "reputation", "delta": -8 }, { "pillar": "bandwidth", "delta": -8 }],
            "outcomeText": "The project suffered. Questions about your commitment arise."
        }
    },
    {
        "id": "doom-014",
        "track": "IC",
        "tags": ["doomsday"],
        "title": "The Salary Freeze",
        "prompt": "Company announces a salary freeze. No raises this year, no exceptions.",
        "leftChoice": {
            "label": "Accept quietly",
            "effects": [{ "pillar": "salary", "delta": -10 }, { "pillar": "life", "delta": -6 }],
            "outcomeText": "Inflation eats into your real earnings. Morale drops."
        },
        "rightChoice": {
            "label": "Negotiate alternatives",
            "effects": [{ "pillar": "reputation", "delta": -8 }, { "pillar": "salary", "delta": -4 }],
            "outcomeText": "Your request is denied. You're now on a list."
        }
    },
    {
        "id": "doom-015",
        "track": "IC",
        "tags": ["doomsday"],
        "title": "The Data Breach",
        "prompt": "A security incident occurred in your area of responsibility. Investigation incoming.",
        "leftChoice": {
            "label": "Cooperate fully",
            "effects": [{ "pillar": "bandwidth", "delta": -12 }, { "pillar": "reputation", "delta": -6 }],
            "outcomeText": "Weeks of audits and documentation. You're under scrutiny."
        },
        "rightChoice": {
            "label": "Downplay involvement",
            "effects": [{ "pillar": "reputation", "delta": -14 }],
            "outcomeText": "The truth came out anyway. Trust is broken."
        }
    },
    {
        "id": "doom-016",
        "track": "IC",
        "tags": ["doomsday"],
        "title": "The Team Conflict",
        "prompt": "Two colleagues are in open conflict. You're being asked to mediate.",
        "leftChoice": {
            "label": "Try to mediate",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "life", "delta": -6 }],
            "outcomeText": "Drama consumes your energy. Neither side is happy."
        },
        "rightChoice": {
            "label": "Refuse to get involved",
            "effects": [{ "pillar": "reputation", "delta": -10 }],
            "outcomeText": "You're seen as unhelpful when the team needed you."
        }
    },
    {
        "id": "doom-017",
        "track": "IC",
        "tags": ["doomsday"],
        "title": "The RTO Mandate",
        "prompt": "Return-to-office is now mandatory. Your remote setup was working perfectly.",
        "leftChoice": {
            "label": "Comply reluctantly",
            "effects": [{ "pillar": "life", "delta": -12 }, { "pillar": "bandwidth", "delta": -6 }],
            "outcomeText": "Commute returns. Productivity and happiness drop."
        },
        "rightChoice": {
            "label": "Request exemption",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "life", "delta": -4 }],
            "outcomeText": "Request denied. You're now on leadership's radar negatively."
        }
    },
    {
        "id": "doom-018",
        "track": "IC",
        "tags": ["doomsday"],
        "title": "The Skill Gap",
        "prompt": "New technology is being adopted. You're behind on the learning curve.",
        "leftChoice": {
            "label": "Learn on personal time",
            "effects": [{ "pillar": "life", "delta": -12 }, { "pillar": "salary", "delta": -4 }],
            "outcomeText": "Nights and weekends consumed by upskilling."
        },
        "rightChoice": {
            "label": "Wing it at work",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "bandwidth", "delta": -6 }],
            "outcomeText": "Your inexperience shows. Mistakes pile up."
        }
    },
    {
        "id": "doom-019",
        "track": "IC",
        "tags": ["doomsday"],
        "title": "The Impossible Stakeholder",
        "prompt": "A powerful stakeholder keeps changing requirements. Project is in chaos.",
        "leftChoice": {
            "label": "Accommodate all changes",
            "effects": [{ "pillar": "bandwidth", "delta": -14 }, { "pillar": "life", "delta": -6 }],
            "outcomeText": "You're exhausted from constant pivots and rework."
        },
        "rightChoice": {
            "label": "Escalate the issue",
            "effects": [{ "pillar": "reputation", "delta": -12 }],
            "outcomeText": "Escalating against a powerful person rarely ends well."
        }
    },
    {
        "id": "doom-020",
        "track": "IC",
        "tags": ["doomsday"],
        "title": "The Burnout Wave",
        "prompt": "Half your team is burning out. Work keeps redistributing to remaining people.",
        "leftChoice": {
            "label": "Pick up the slack",
            "effects": [{ "pillar": "bandwidth", "delta": -14 }, { "pillar": "life", "delta": -8 }],
            "outcomeText": "You're next in line for burnout."
        },
        "rightChoice": {
            "label": "Protect your capacity",
            "effects": [{ "pillar": "reputation", "delta": -12 }, { "pillar": "life", "delta": -4 }],
            "outcomeText": "In crisis times, boundaries look like abandonment."
        }
    }
];

// Add doomsday cards to the deck
data.push(...doomsdayCards);

fs.writeFileSync('data/ic_cards.seed.json', JSON.stringify(data, null, 4));
console.log('Added', doomsdayCards.length, 'doomsday cards');
console.log('Total cards now:', data.length);
