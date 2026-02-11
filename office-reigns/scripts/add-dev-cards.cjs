const fs = require('fs');
const path = 'data/ic_cards.seed.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newCards = [
    {
        "id": "dev-001",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "The Friday Deploy",
        "prompt": "It's 4:30 PM on a Friday. Sales wants the new landing page live 'for the weekend traffic'. It hasn't been tested.",
        "leftChoice": {
            "label": "Deploy it",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "life", "delta": -15 }],
            "outcomeText": "You deployed. It crashed. Your weekend is now a hackathon of one."
        },
        "rightChoice": {
            "label": "Refuse deploy",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "life", "delta": 5 }],
            "outcomeText": "You saved your weekend. Sales called you 'uncooperative'. You drank a beer in peace."
        }
    },
    {
        "id": "dev-002",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Legacy Code Archaeologist",
        "prompt": "You found a file named 'DO_NOT_TOUCH.js' written 5 years ago by a guy named 'Dave'. It powers the entire billing system.",
        "leftChoice": {
            "label": "Refactor it",
            "effects": [{ "pillar": "bandwidth", "delta": -15 }, { "pillar": "reputation", "delta": 15 }],
            "outcomeText": "You touched it. It broke. You fixed it. You are now the God of Billing."
        },
        "rightChoice": {
            "label": "Close file",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You slowly backed away. Let sleeping dragons lie. Dave knew what he was doing."
        }
    },
    {
        "id": "dev-003",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "The Infinite Loop",
        "prompt": "A junior dev pushed code that causes an infinite loop in production. CPU usage is at 100%.",
        "leftChoice": {
            "label": "Rollback",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "Service restored. The junior dev is crying in the bathroom. You bought them a coffee."
        },
        "rightChoice": {
            "label": "Hotfix forward",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "bandwidth", "delta": -10 }],
            "outcomeText": "You cowboy-coded a fix in 3 minutes. Adrenaline spike: High. Code quality: Low."
        }
    },
    {
        "id": "dev-004",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Spaces vs Tabs",
        "prompt": "A new hire reformatted the entire codebase from spaces to tabs in a single PR. The diff is 10,000 lines.",
        "leftChoice": {
            "label": "Reject PR",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You cited the style guide. They think you're petty. You are, but you're also right."
        },
        "rightChoice": {
            "label": "Merge it",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "Git blame is now useless. The history is ruined. Anarchy reigns."
        }
    },
    {
        "id": "dev-005",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Stack Overflow Down",
        "prompt": "Stack Overflow is down for maintenance. You have absolutely no idea how to center a div.",
        "leftChoice": {
            "label": "Guess CSS",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You tried 'margin: auto'. It didn't work. You are a fraud."
        },
        "rightChoice": {
            "label": "Wait it out",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "salary", "delta": 0 }],
            "outcomeText": "You took a nap. The site came back up. Productivity resumed."
        }
    },
    {
        "id": "dev-006",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Tech Debt Bankruptcy",
        "prompt": "The database schema is so bad that adding a column takes 3 days. The PM wants a new feature NOW.",
        "leftChoice": {
            "label": "Add another hack",
            "effects": [{ "pillar": "bandwidth", "delta": -5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You added 'user_address_v2_final_real'. The debt mountain grows taller."
        },
        "rightChoice": {
            "label": "Demand refactor",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": -15 }],
            "outcomeText": "You spent the week migrating tables. No features shipped. You feel clean."
        }
    },
    {
        "id": "dev-007",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "The QA Reject",
        "prompt": "QA kicked back your ticket because 'the button is 1px off'. You measured it, it's correct.",
        "leftChoice": {
            "label": "Argue with QA",
            "effects": [{ "pillar": "bandwidth", "delta": -5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You fought over a pixel. You won the battle but lost the war. QA now hates you."
        },
        "rightChoice": {
            "label": "Change it anyway",
            "effects": [{ "pillar": "bandwidth", "delta": -5 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You moved it 1px. Now it's wrong, but QA passed it. Life is absurd."
        }
    },
    {
        "id": "dev-008",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Works on My Machine",
        "prompt": "A critical bug is reported in production. You cannot reproduce it locally. It works perfectly for you.",
        "leftChoice": {
            "label": "Close 'Cannot Repro'",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -10 }],
            "outcomeText": "You closed the ticket. The user is still suffering. Ignorance is bliss."
        },
        "rightChoice": {
            "label": "Debug Prod",
            "effects": [{ "pillar": "life", "delta": -10 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "You added console logs to production. A chaotic evil move, but you found the bug."
        }
    },
    {
        "id": "dev-009",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "PM's wireframe",
        "prompt": "The PM sketched a feature on a napkin. 'Can you build this? It should take like, 2 hours.'",
        "leftChoice": {
            "label": "Say '2 weeks'",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You gave a real estimate. They called you slow. You called them delusional (internally)."
        },
        "rightChoice": {
            "label": "Try to rush",
            "effects": [{ "pillar": "bandwidth", "delta": -15 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You built the napkin. It works, barely. The code is held together by hope."
        }
    },
    {
        "id": "dev-010",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Dark Mode Request",
        "prompt": "Design finally finished the Dark Mode specs. It touches every single CSS file in the project.",
        "leftChoice": {
            "label": "Do it correctly",
            "effects": [{ "pillar": "bandwidth", "delta": -20 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "You implemented CSS variables properly. It took forever. Your eyes thank you."
        },
        "rightChoice": {
            "label": "Filter: invert(1)",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -10 }],
            "outcomeText": "You used a CSS hack. Images look like X-rays. It's 'Avant-Garde'."
        }
    },
    {
        "id": "dev-011",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "The Recruiter",
        "prompt": "A recruiter from a FAANG company DMs you. 'Exciting opportunity! 200% salary increase.'",
        "leftChoice": {
            "label": "Take interview",
            "effects": [{ "pillar": "life", "delta": -10 }, { "pillar": "salary", "delta": 0 }],
            "outcomeText": "You failed the LeetCode hard problem. You return to your desk, humbled."
        },
        "rightChoice": {
            "label": "Ignore it",
            "effects": [{ "pillar": "life", "delta": 5 }, { "pillar": "salary", "delta": -5 }],
            "outcomeText": "You chose peace over money. Your bank account weeps, but your soul sighs."
        }
    },
    {
        "id": "dev-012",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Documentation Day",
        "prompt": "It's 'Documentation Day'. No coding allowed. Just updating the wiki.",
        "leftChoice": {
            "label": "Write docs",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You described the API. Future You will be grateful. Present You is bored."
        },
        "rightChoice": {
            "label": "Code anyway",
            "effects": [{ "pillar": "bandwidth", "delta": 0 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You hid your coding window. You shipped a feature. The wiki remains a wasteland."
        }
    },
    {
        "id": "dev-013",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Choosing the Stack",
        "prompt": "New project! You get to pick the frontend framework. The team knows React.",
        "leftChoice": {
            "label": "Choose React",
            "effects": [{ "pillar": "bandwidth", "delta": 10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You made the boring choice. Productivity is high. Excitement is low."
        },
        "rightChoice": {
            "label": "Choose Rust/WASM",
            "effects": [{ "pillar": "bandwidth", "delta": -20 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "You rewrote the web in Rust. It's blazing fast. Nobody else can maintain it."
        }
    },
    {
        "id": "dev-014",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Meeting Hell",
        "prompt": "You are invited to 6 hours of 'Agile Ceremonies' today. Refinement, Retro, Planning, Pre-Planning...",
        "leftChoice": {
            "label": "Decline all",
            "effects": [{ "pillar": "bandwidth", "delta": 15 }, { "pillar": "reputation", "delta": -10 }],
            "outcomeText": "You coded for 6 hours. The Scrum Master put you on a naughty list."
        },
        "rightChoice": {
            "label": "Attend",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You survived. You remember nothing. You moved sticky notes on a screen."
        }
    },
    {
        "id": "dev-015",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Missing Tests",
        "prompt": "You finished the feature. It works. You haven't written a single test.",
        "leftChoice": {
            "label": "Ship it",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You live dangerously. QA didn't catch it. The ticking time bomb is ticking."
        },
        "rightChoice": {
            "label": "Write tests",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "You reached 100% coverage. It took twice as long. You sleep the sleep of the just."
        }
    },
    {
        "id": "dev-016",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Open Source Library",
        "prompt": "A library you rely on has a critical vulnerability. The maintainer abandoned it 3 years ago.",
        "leftChoice": {
            "label": "Fork and fix",
            "effects": [{ "pillar": "bandwidth", "delta": -15 }, { "pillar": "reputation", "delta": 15 }],
            "outcomeText": "You are now an Open Source Maintainer. Condolences on your new unpaid job."
        },
        "rightChoice": {
            "label": "Ignore warning",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -10 }],
            "outcomeText": "It's just a warning. What's the worst that could happen? (Famous last words)."
        }
    },
    {
        "id": "dev-017",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Coffee Outage",
        "prompt": "The office coffee machine is broken. This is a P0 emergency.",
        "leftChoice": {
            "label": "Fix machine",
            "effects": [{ "pillar": "bandwidth", "delta": -5 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "You applied engineering principles to the grinder. Coffee flows. You are a hero."
        },
        "rightChoice": {
            "label": "Go to Starbucks",
            "effects": [{ "pillar": "salary", "delta": -5 }, { "pillar": "life", "delta": 5 }],
            "outcomeText": "You left the building. The fresh air was nice. The $7 latte hurt."
        }
    },
    {
        "id": "dev-018",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Code Review Revenge",
        "prompt": "The guy who nitpicked your PR last week just submitted a massive PR. It's full of sloppy mistakes.",
        "leftChoice": {
            "label": "Nitpick back",
            "effects": [{ "pillar": "life", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You left 50 comments. 'Nit: trailing space'. Revenge is sweet."
        },
        "rightChoice": {
            "label": "Be graceful",
            "effects": [{ "pillar": "life", "delta": -5 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "You approved it with kind notes. You are the bigger person. It's annoying."
        }
    },
    {
        "id": "dev-019",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Server Costs",
        "prompt": "You forgot to shut down a GPU instance over the weekend. The bill is $5,000.",
        "leftChoice": {
            "label": "Confess",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "salary", "delta": -5 }],
            "outcomeText": "The CTO sighed. 'We've all done it.' You won't get a raise this year."
        },
        "rightChoice": {
            "label": "Hide it",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "You buried the cost in 'R&D expenses'. You live in fear of the audit."
        }
    },
    {
        "id": "dev-020",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "The Intern",
        "prompt": "The intern asks for help setting up their environment. It's Windows. You use a Mac.",
        "leftChoice": {
            "label": "Help them",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You spent 4 hours fighting PowerShell. You succeeded. You need a shower."
        },
        "rightChoice": {
            "label": "Send link",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You sent a link to a wiki page from 2018. 'Good luck,' you said."
        }
    },
    {
        "id": "dev-021",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "API Breaking Change",
        "prompt": "The backend team changed the API response format without telling anyone. Frontend is crashing.",
        "leftChoice": {
            "label": "Patch frontend",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You wrote adapter code to handle their mess. The user sees nothing wrong."
        },
        "rightChoice": {
            "label": "Yell in Slack",
            "effects": [{ "pillar": "bandwidth", "delta": 0 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You posted the rage-face emoji. It felt good. The site is still down."
        }
    },
    {
        "id": "dev-022",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Keyboard Noise",
        "prompt": "You bought a mechanical keyboard with Blue switches. It's loud. Your neighbors are glaring.",
        "leftChoice": {
            "label": "Keep clicking",
            "effects": [{ "pillar": "life", "delta": 5 }, { "pillar": "reputation", "delta": -10 }],
            "outcomeText": "CLICK CLACK CLICK. You typed 100 WPM. You have no friends."
        },
        "rightChoice": {
            "label": "Use dampeners",
            "effects": [{ "pillar": "life", "delta": -5 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "The mushy feeling is awful. But your coworkers stopped buying earplugs."
        }
    },
    {
        "id": "dev-023",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Refactor Addiction",
        "prompt": "You see a piece of ugly code. It's not part of your current ticket. You itch to rewrite it.",
        "leftChoice": {
            "label": "Rewrite it",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "Yak shaving complete. The code is beautiful. You missed your deadline."
        },
        "rightChoice": {
            "label": "Ignore it",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "life", "delta": -5 }],
            "outcomeText": "It pained you physically to leave it. But you shipped on time."
        }
    },
    {
        "id": "dev-024",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Merge Conflict",
        "prompt": "You rebased your branch. 50 files have conflicts. It's a massacre.",
        "leftChoice": {
            "label": "Resolve manually",
            "effects": [{ "pillar": "bandwidth", "delta": -15 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "It took hours. You reconstructed the logic. You are a surgeon."
        },
        "rightChoice": {
            "label": "Force push",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -15 }],
            "outcomeText": "You overwrote everyone else's work. 'My version is correct,' you lied."
        }
    },
    {
        "id": "dev-025",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Estimation Game",
        "prompt": "Planning Poker. The task is complex. The team votes '3'. You think it's '13'.",
        "leftChoice": {
            "label": "Vote 13",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "You explained the hidden complexity. They groaned. The sprint was saved."
        },
        "rightChoice": {
            "label": "Conform (Vote 3)",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": -10 }],
            "outcomeText": "You agreed to '3'. You worked weekends to finish it. Peer pressure wins."
        }
    },
    {
        "id": "dev-026",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Production Config",
        "prompt": "You need to change a config var. The process requires 3 approvals and a change request form.",
        "leftChoice": {
            "label": "Follow process",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You filled out the forms in triplicate. Bureaucracy satisfied."
        },
        "rightChoice": {
            "label": "Ssh and vi",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -10 }],
            "outcomeText": "You edited the file live on the server. You felt alive. The audit logs saw everything."
        }
    },
    {
        "id": "dev-027",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Headphones On",
        "prompt": "You have your noise-canceling headphones on. A PM is tapping your shoulder.",
        "leftChoice": {
            "label": "Ignore tap",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You pretended to be in 'the zone'. The PM walked away, defeated."
        },
        "rightChoice": {
            "label": "Remove headphones",
            "effects": [{ "pillar": "bandwidth", "delta": -5 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You listened. It was a question that could have been an email."
        }
    },
    {
        "id": "dev-028",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "The Hacky Fix",
        "prompt": "You wrote a terrible hack to fix a bug. It involves a `setTimeout` of 500ms.",
        "leftChoice": {
            "label": "Commit it",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "// TODO: Fix this later. (Narrator: They never fixed it)."
        },
        "rightChoice": {
            "label": "Find root cause",
            "effects": [{ "pillar": "bandwidth", "delta": -15 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "It was a race condition in the router. You fixed it properly. You are exhausted."
        }
    },
    {
        "id": "dev-029",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Pair Programming",
        "prompt": "The new guy wants to pair program for the entire day.",
        "leftChoice": {
            "label": "Accept",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You typed while he breathed on your neck. 'Knowledge transfer', they call it."
        },
        "rightChoice": {
            "label": "Refuse",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You prefer solitude. He thinks you're antisocial. Correct."
        }
    },
    {
        "id": "dev-030",
        "track": "IC",
        "personas": ["developer"],
        "tags": [],
        "title": "Clean Code",
        "prompt": "You wrote the most beautiful, abstract, generic code of your life. It handles every edge case.",
        "leftChoice": {
            "label": "Ship it",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "Nobody understands it. They fear it. It is your legacy."
        },
        "rightChoice": {
            "label": "Simplify it",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "You dumbed it down for mortals. It's readable, but less 'clever'."
        }
    }
];

// Append to existing data
data.push(...newCards);
fs.writeFileSync(path, JSON.stringify(data, null, 4));

console.log(`Added ${newCards.length} Developer-specific cards.`);
console.log(`new Total: ${data.length}`);
