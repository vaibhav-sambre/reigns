const fs = require('fs');
const path = 'data/ic_cards.seed.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newCards = [
    {
        "id": "ba-001",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Deck Formatting",
        "prompt": "The partner wants the slide deck 'beautified' by 8 AM. It has 40 slides. The fonts are all wrong.",
        "leftChoice": {
            "label": "Pull all-nighter",
            "effects": [{ "pillar": "life", "delta": -15 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "You manually aligned 400 text boxes. It looks perfect. You look like a zombie."
        },
        "rightChoice": {
            "label": "Use template",
            "effects": [{ "pillar": "life", "delta": 0 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You used the default corporate theme. 'It lacks soul,' the partner said. But you slept."
        }
    },
    {
        "id": "ba-002",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Client Dinner",
        "prompt": "The client is in town. They want to go to a steakhouse. You are a vegetarian and exhausted.",
        "leftChoice": {
            "label": "Attend dinner",
            "effects": [{ "pillar": "life", "delta": -10 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "You ate a side salad for $40. The client loved your 'energy'. You went home hungry."
        },
        "rightChoice": {
            "label": "Fake illness",
            "effects": [{ "pillar": "life", "delta": 5 }, { "pillar": "reputation", "delta": -10 }],
            "outcomeText": "You stayed home. The client asked where the 'fun one' was. Your boss is annoyed."
        }
    },
    {
        "id": "ba-003",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Excel Crash",
        "prompt": "Your financial model calculates the GDP of a small nation. Excel just crashed. You didn't save.",
        "leftChoice": {
            "label": "Rebuild from memory",
            "effects": [{ "pillar": "bandwidth", "delta": -15 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You reconstructed the matrix. The numbers don't quite match, but they look plausible."
        },
        "rightChoice": {
            "label": "Use old version",
            "effects": [{ "pillar": "bandwidth", "delta": 0 }, { "pillar": "reputation", "delta": -10 }],
            "outcomeText": "You sent last week's data. 'Growth is flat,' you lied. Nobody checked."
        }
    },
    {
        "id": "ba-004",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "The Cold Call",
        "prompt": "Sales is short-staffed. They need you to cold call 50 leads from a list bought on the dark web.",
        "leftChoice": {
            "label": "Make the calls",
            "effects": [{ "pillar": "life", "delta": -10 }, { "pillar": "salary", "delta": 5 }],
            "outcomeText": "You were yelled at 49 times. One person bought a subscription by mistake. Success?"
        },
        "rightChoice": {
            "label": "Refuse task",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You said 'that's not my job'. It is now technically your job, but you delayed it."
        }
    },
    {
        "id": "ba-005",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Meeting Minutes",
        "prompt": "You are the designated note-taker for a 3-hour strategy session. Everyone is talking over each other.",
        "leftChoice": {
            "label": "Capture everything",
            "effects": [{ "pillar": "bandwidth", "delta": -15 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "You transcribed the chaos. The CEO praised your 'attention to detail'. Your fingers hurt."
        },
        "rightChoice": {
            "label": "Summarize loosely",
            "effects": [{ "pillar": "bandwidth", "delta": -5 }, { "pillar": "reputation", "delta": 0 }],
            "outcomeText": "Action items: 'Do better'. Strategy: 'Win'. Good enough."
        }
    },
    {
        "id": "ba-006",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Coffee Run",
        "prompt": "The VP asks you to grab coffee for the board meeting. You have a PhD in Economics.",
        "leftChoice": {
            "label": "Get the coffee",
            "effects": [{ "pillar": "salary", "delta": 0 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You served lattes with a smile. 'Team player,' they noted. You died a little inside."
        },
        "rightChoice": {
            "label": "Order delivery",
            "effects": [{ "pillar": "salary", "delta": -5 }, { "pillar": "reputation", "delta": 0 }],
            "outcomeText": "You used UberEats and expensed it. The coffee was cold. No one cared."
        }
    },
    {
        "id": "ba-007",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Vendor Negotiation",
        "prompt": "A software vendor is trying to charge us $50k extra. You need to talk them down.",
        "leftChoice": {
            "label": "Play hardball",
            "effects": [{ "pillar": "salary", "delta": 10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You threatened to switch to a competitor. They caved. You saved the company money (and got none of it)."
        },
        "rightChoice": {
            "label": "Accept terms",
            "effects": [{ "pillar": "salary", "delta": -5 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You paid the invoice. It was easier than arguing. Finance is glaring at you."
        }
    },
    {
        "id": "ba-008",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Requirements Gathering",
        "prompt": "The client wants 'an app like Facebook but for dogs'. You need to write the spec sheet.",
        "leftChoice": {
            "label": "Detailed spec",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You defined 'Bark Functionality' in 50 pages. The engineers are laughing at you."
        },
        "rightChoice": {
            "label": "Vague spec",
            "effects": [{ "pillar": "bandwidth", "delta": 0 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "Scope: 'Make dogs connect'. The project is doomed, but the document is done."
        }
    },
    {
        "id": "ba-009",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Flight Economy",
        "prompt": "You are flying to a client site. Policy says 'Economy', but it's a 14-hour flight.",
        "leftChoice": {
            "label": "Upgrade self",
            "effects": [{ "pillar": "salary", "delta": -15 }, { "pillar": "life", "delta": 10 }],
            "outcomeText": "You paid for Business Class. You slept like a baby. Your wallet is weeping."
        },
        "rightChoice": {
            "label": "Sit near toilet",
            "effects": [{ "pillar": "salary", "delta": 0 }, { "pillar": "life", "delta": -10 }],
            "outcomeText": "Middle seat. Crying baby. You arrived with a stiff neck and a hatred for humanity."
        }
    },
    {
        "id": "ba-010",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "PDF Conversion",
        "prompt": "The client sent their data in a PDF. A scanned PDF. Of a handwritten note.",
        "leftChoice": {
            "label": "Manual entry",
            "effects": [{ "pillar": "bandwidth", "delta": -20 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "You typed for 6 hours. Your vision is blurry. Data integrity is 100%."
        },
        "rightChoice": {
            "label": "Estimate numbers",
            "effects": [{ "pillar": "bandwidth", "delta": 0 }, { "pillar": "reputation", "delta": -10 }],
            "outcomeText": "You guessed based on the smudges. 'Trends look positive,' you concluded."
        }
    },
    {
        "id": "ba-011",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Subject Matter Expert",
        "prompt": "Sales introduced you as the 'AI Expert' on the call. You read one article about ChatGPT.",
        "leftChoice": {
            "label": "Fake it",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You threw around buzzwords like 'Large Language Model' and 'Synergy'. They bought it."
        },
        "rightChoice": {
            "label": "Correct them",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "salary", "delta": -5 }],
            "outcomeText": "You admitted ignorance. The client lost confidence. Integrity doesn't pay bills."
        }
    },
    {
        "id": "ba-012",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Weekend urgent",
        "prompt": "Boss texts at 9 PM on Saturday: 'Can you update the font size on slide 12?'.",
        "leftChoice": {
            "label": "Do it now",
            "effects": [{ "pillar": "life", "delta": -5 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You opened your laptop at the bar. You are dedicated. You are also sad."
        },
        "rightChoice": {
            "label": "Ignore till Mon",
            "effects": [{ "pillar": "life", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You left him on read. He fixed it himself. He will remember this."
        }
    },
    {
        "id": "ba-013",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Stakeholder Map",
        "prompt": "You need to create a 'Stakeholder Influence Map'. It's basically a chart of who hates whom.",
        "leftChoice": {
            "label": "Be honest",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You labeled the VP as 'Blocker'. The document leaked. Political suicide."
        },
        "rightChoice": {
            "label": "Flatter everyone",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "Everyone is a 'Key Champion'. The map is useless, but safe."
        }
    },
    {
        "id": "ba-014",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Expense Report",
        "prompt": "You lost the receipt for the client dinner ($400). Finance is blocking your reimbursement.",
        "leftChoice": {
            "label": "Forge receipt",
            "effects": [{ "pillar": "salary", "delta": 5 }, { "pillar": "reputation", "delta": -15 }],
            "outcomeText": "You used Photoshop. You got your money. You are now a criminal."
        },
        "rightChoice": {
            "label": "Eat the cost",
            "effects": [{ "pillar": "salary", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You paid for their steaks. A $400 lesson in paper management."
        }
    },
    {
        "id": "ba-015",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Competitor Research",
        "prompt": "Manager wants a 'Deep Dive' on a competitor. Their product is behind a paywall.",
        "leftChoice": {
            "label": "Buy subscription",
            "effects": [{ "pillar": "salary", "delta": -5 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "You expensed it, but it got rejected. Great insights though."
        },
        "rightChoice": {
            "label": "Use free trial",
            "effects": [{ "pillar": "salary", "delta": 0 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "You created a fake email. You got 7 days of access. Hackerman."
        }
    },
    {
        "id": "ba-016",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Process Improvement",
        "prompt": "You noticed the team wastes 10 hours a week on manual data entry. You suggest automation.",
        "leftChoice": {
            "label": "Lead project",
            "effects": [{ "pillar": "bandwidth", "delta": -15 }, { "pillar": "reputation", "delta": 15 }],
            "outcomeText": "You implemented Zapier. It broke twice, then worked. You are an 'Innovator'."
        },
        "rightChoice": {
            "label": "Stay quiet",
            "effects": [{ "pillar": "bandwidth", "delta": -5 }, { "pillar": "life", "delta": 5 }],
            "outcomeText": "You kept pasting rows. It's meditative. Why rock the boat?"
        }
    },
    {
        "id": "ba-017",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Gift Basket",
        "prompt": "You need to buy a gift for a client's baby shower. Budget is $50. Client has taste.",
        "leftChoice": {
            "label": "Cheap out",
            "effects": [{ "pillar": "salary", "delta": 0 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You bought a generic onesie. They smiled politely. It went in the trash."
        },
        "rightChoice": {
            "label": "Overspend",
            "effects": [{ "pillar": "salary", "delta": -5 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You spent $100 of your own cash on organic cotton. They loved it."
        }
    },
    {
        "id": "ba-018",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Gap Analysis",
        "prompt": "You are comparing our product to the RFP requirements. We match 20% of them.",
        "leftChoice": {
            "label": "Be honest",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "salary", "delta": -5 }],
            "outcomeText": "We lost the bid. You saved everyone months of pain. Management is depressed."
        },
        "rightChoice": {
            "label": "Creative writing",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "salary", "delta": 10 }],
            "outcomeText": "You marked 'In Roadmap' for 80% of items. We won the bid. The engineers are crying."
        }
    },
    {
        "id": "ba-019",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Meeting Facilitator",
        "prompt": "The meeting has gone off-topic for 45 minutes. People are discussing golf.",
        "leftChoice": {
            "label": "Interrupt them",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You forced the agenda. Everyone hates you, but the meeting ended on time."
        },
        "rightChoice": {
            "label": "Join in",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": -10 }],
            "outcomeText": "You talked about your handicap. Networking +1. Productivity -100."
        }
    },
    {
        "id": "ba-020",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Calendar Tetris",
        "prompt": "You need to schedule a meeting with 8 stakeholders across 3 timezones.",
        "leftChoice": {
            "label": "Find a slot",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You found a 15-minute window in 3 weeks. You are a wizard."
        },
        "rightChoice": {
            "label": "Pick 3 AM (for someone)",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "The APAC team hates you. But the meeting is booked."
        }
    },
    {
        "id": "ba-021",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Password Reset",
        "prompt": "The CEO locked himself out of his email. He calls you, bypassing IT.",
        "leftChoice": {
            "label": "Help him",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "You reset it. IT is mad you bypassed protocol, but the King is happy."
        },
        "rightChoice": {
            "label": "Transfer to IT",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "He waited on hold for 20 minutes. He asked 'what do you even do here?'."
        }
    },
    {
        "id": "ba-022",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "LinkedIn Ghost Writer",
        "prompt": "Your boss wants you to write a 'Thought Leadership' post for his LinkedIn.",
        "leftChoice": {
            "label": "Write cringe",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "life", "delta": -5 }],
            "outcomeText": "You wrote 'Hustle grindset'. It got 1000 likes. You feel dirty."
        },
        "rightChoice": {
            "label": "Refuse",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "life", "delta": 5 }],
            "outcomeText": "You have dignity. He wrote it himself. It had typos."
        }
    },
    {
        "id": "ba-023",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Office Party",
        "prompt": "You are in charge of the Holiday Party. Budget is $200 for 50 people.",
        "leftChoice": {
            "label": "Buy Pizza",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "salary", "delta": 0 }],
            "outcomeText": "Two slices per person. It was adequate. Morale remains 'meh'."
        },
        "rightChoice": {
            "label": "Potluck",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You made employees bring their own food. Someone brought cheap chips. Morale plummeted."
        }
    },
    {
        "id": "ba-024",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Jargon Check",
        "prompt": "The presentation contains the phrase 'leverage best-in-class synergies'.",
        "leftChoice": {
            "label": "Keep it",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "The executives nodded sagely. They love empty words."
        },
        "rightChoice": {
            "label": "Rewrite plainly",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "You wrote 'work together well'. They asked for it to be 'more punchy'."
        }
    },
    {
        "id": "ba-025",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Survey Analysis",
        "prompt": "You need to analyze 500 open-text survey responses manually.",
        "leftChoice": {
            "label": "Read all",
            "effects": [{ "pillar": "bandwidth", "delta": -15 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You know what users truly feel. Mostly anger. You need a drink."
        },
        "rightChoice": {
            "label": "Word cloud",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "Big words: 'Slow', 'Expensive', 'Bad'. Analysis complete."
        }
    },
    {
        "id": "ba-026",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Badge Reader",
        "prompt": "You forgot your badge. Security knows you, but asks for ID.",
        "leftChoice": {
            "label": "Show ID",
            "effects": [{ "pillar": "bandwidth", "delta": -5 }, { "pillar": "reputation", "delta": 0 }],
            "outcomeText": "You followed procedure. It took 10 minutes. You were late."
        },
        "rightChoice": {
            "label": "Tailgate",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You snuck in behind an intern. Security saw you. A stern email followed."
        }
    },
    {
        "id": "ba-027",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Printer Jam",
        "prompt": "You need to print 50 copies for the board. PC load letter error.",
        "leftChoice": {
            "label": "Fix printer",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You covered yourself in toner. The meeting started. Handouts delivered."
        },
        "rightChoice": {
            "label": "Go paperless",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You emailed the PDF. The Boomers on the board struggled to open it."
        }
    },
    {
        "id": "ba-028",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Strategy Offsite",
        "prompt": "Two days in a cabin in the woods. 'Trust falls' are on the agenda.",
        "leftChoice": {
            "label": "Participate",
            "effects": [{ "pillar": "life", "delta": -10 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "You caught the CEO. You are now in the inner circle."
        },
        "rightChoice": {
            "label": "Hide in room",
            "effects": [{ "pillar": "life", "delta": 5 }, { "pillar": "reputation", "delta": -10 }],
            "outcomeText": "You claimed a migraine. You watched Netflix. Everyone thinks you're fragile."
        }
    },
    {
        "id": "ba-029",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Swag Management",
        "prompt": "1000 t-shirts arrived. They are all size XS.",
        "leftChoice": {
            "label": "Return them",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "Logistics nightmare. But the team eventually got shirts valid for humans."
        },
        "rightChoice": {
            "label": "Distribute anyway",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "It's the 'Crop Top' collection. The engineers are confused."
        }
    },
    {
        "id": "ba-030",
        "track": "IC",
        "personas": ["business-associate"],
        "tags": [],
        "title": "Dashboard Design",
        "prompt": "You need to sketch a dashboard for the execs. They want 'green lights only'.",
        "leftChoice": {
            "label": "Design truth",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "You included red indicators. They asked 'can we change the threshold?'."
        },
        "rightChoice": {
            "label": "Design fantasy",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "Everything is green. We are losing millions, but the dashboard looks great."
        }
    }
];

// Append to existing data
data.push(...newCards);
fs.writeFileSync(path, JSON.stringify(data, null, 4));

console.log(`Added ${newCards.length} Business Associate cards.`);
console.log(`new Total: ${data.length}`);
