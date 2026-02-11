const fs = require('fs');
const path = 'data/ic_cards.seed.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newCards = [
    {
        "id": "pm-001",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "The CEO's Pet Feature",
        "prompt": "The CEO had a 'vision' over the weekend for a feature that involves blockchain and AI. It solves zero user problems but he's excited.",
        "leftChoice": {
            "label": "Build the MVP",
            "effects": [{ "pillar": "reputation", "delta": 15 }, { "pillar": "bandwidth", "delta": -15 }],
            "outcomeText": "You built a shiny object. The CEO high-fived you. The engineering team is actively updating their resumes."
        },
        "rightChoice": {
            "label": "Push back with data",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You showed him the metrics. He called you 'risk-averse' and 'lacking strategic foresight'."
        }
    },
    {
        "id": "pm-002",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "The Sales Promise",
        "prompt": "VP of Sales promised a client a feature that doesn't exist. The contract is worth $1M. It needs to be live in 2 weeks.",
        "leftChoice": {
            "label": "Crunch the team",
            "effects": [{ "pillar": "salary", "delta": 10 }, { "pillar": "reputation", "delta": -10 }],
            "outcomeText": "The deal closed. You got a bonus. The lead engineer refuses to make eye contact with you."
        },
        "rightChoice": {
            "label": "Refund the client",
            "effects": [{ "pillar": "salary", "delta": -5 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "Sales is furious. Engineering considers you a hero. You have integrity, but fewer commission checks."
        }
    },
    {
        "id": "pm-035", // Starting ID higher to avoid overlap if any
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "Roadmap Prioritization",
        "prompt": "You have resources to build one feature: 'Dark Mode' (users begging for it) or 'Admin Analytics' (management demanding it).",
        "leftChoice": {
            "label": "Dark Mode",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "salary", "delta": -5 }],
            "outcomeText": "Users rejoiced on Twitter. Management asked 'how does this move the needle on revenue?'."
        },
        "rightChoice": {
            "label": "Admin Analytics",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "salary", "delta": 5 }],
            "outcomeText": "Management is happy. Users are still blinded by your white background at 2 AM."
        }
    },
    {
        "id": "pm-004",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "The Scope Creep",
        "prompt": "Marketing wants to add 'just one small thing' to the release. It involves rewriting the entire backend authentication flow.",
        "leftChoice": {
            "label": "Say No",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You held the line. Marketing grumbles about 'inflexibility'. The release ships on time."
        },
        "rightChoice": {
            "label": "Squeeze it in",
            "effects": [{ "pillar": "bandwidth", "delta": -15 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "The release was delayed by a month. Nobody remembers why, they just blame you."
        }
    },
    {
        "id": "pm-005",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "A/B Test Results",
        "prompt": "The test results are in: The 'Ugly Red Button' performs 20% better than the 'Elegant Blue Button'. Design is weeping.",
        "leftChoice": {
            "label": "Ship Red Button",
            "effects": [{ "pillar": "salary", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "Conversion is up. The app looks like a scam site. Money has no aesthetic taste."
        },
        "rightChoice": {
            "label": "Keep Blue Button",
            "effects": [{ "pillar": "salary", "delta": -5 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "The brand integrity is preserved. The metrics are flat. Design now owes you a favor."
        }
    },
    {
        "id": "pm-006",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "Engineer Mutiny",
        "prompt": "The engineering team refuses to build the new ad integration. They say it 'ruins the user experience'. They are right.",
        "leftChoice": {
            "label": "Force the build",
            "effects": [{ "pillar": "salary", "delta": 5 }, { "pillar": "reputation", "delta": -15 }],
            "outcomeText": "They built it, but maliciously complied. The ads are technically there, but unclickable."
        },
        "rightChoice": {
            "label": "Cancel feature",
            "effects": [{ "pillar": "salary", "delta": -10 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "You prioritized UX over revenue. The users love you. The CFO is asking who you really work for."
        }
    },
    {
        "id": "pm-007",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "The Press Release",
        "prompt": "Marketing wrote a press release for a feature that hasn't even been designed yet. They are launching it tomorrow.",
        "leftChoice": {
            "label": "Build a fake demo",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You built 'smoke and mirrors'. The press ate it up. Now you have to actually build it."
        },
        "rightChoice": {
            "label": "Leak the truth",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "bandwidth", "delta": 10 }],
            "outcomeText": "The launch was cancelled. Marketing blames 'technical incompetence'. You slept soundly."
        }
    },
    {
        "id": "pm-008",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "Legacy Code Debt",
        "prompt": "Engineers want a 'Refactoring Sprint' to clean up tech debt. Stakeholders see no value in it.",
        "leftChoice": {
            "label": "Fight for the Sprint",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "You secured the time. The code is cleaner. Stakeholders wonder why 'nothing shipped' for two weeks."
        },
        "rightChoice": {
            "label": "Ship features only",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You ignored the rot. Development velocity has slowed to a crawl. But hey, you shipped *something*."
        }
    },
    {
        "id": "pm-009",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "User Interview",
        "prompt": "A user tells you your product is 'confusing trash' during a recorded session. The VP of Product is watching live.",
        "leftChoice": {
            "label": "Defend the vision",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "salary", "delta": 0 }],
            "outcomeText": "You argued with a customer. Bold strategy. It didn't pay off."
        },
        "rightChoice": {
            "label": "Accept feedback",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "You took it on the chin. 'Feedback is a gift,' you muttered through gritted teeth."
        }
    },
    {
        "id": "pm-010",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "Competitor Copycat",
        "prompt": "A competitor just launched the *exact* feature you cut from the roadmap last quarter. Everyone is panicking.",
        "leftChoice": {
            "label": "Copy it back",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You rushed a clone. It's buggy and inferior. Welcome to the feature factory."
        },
        "rightChoice": {
            "label": "Stay course",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You ignored the noise. Strategy means saying no, even when FOMO strikes."
        }
    },
    {
        "id": "pm-011",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "Pricing Change",
        "prompt": "Finance wants to double the subscription price. Data suggests 50% of users will churn.",
        "leftChoice": {
            "label": "Implement hike",
            "effects": [{ "pillar": "salary", "delta": 10 }, { "pillar": "reputation", "delta": -10 }],
            "outcomeText": "Revenue is up, user count is down. It's a 'premium pivot', you tell yourself."
        },
        "rightChoice": {
            "label": "Block change",
            "effects": [{ "pillar": "salary", "delta": -5 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You saved the user base. Finance calls you 'commercially naive'. You are poor but popular."
        }
    },
    {
        "id": "pm-012",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "The 'Vision' Deck",
        "prompt": "You need to present the Q4 roadmap. You have no idea what the strategy is.",
        "leftChoice": {
            "label": "Make it up",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "You used words like 'synergy' and 'paradigm shift'. They loved it. You feel hollow."
        },
        "rightChoice": {
            "label": "Admit uncertainty",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You were honest. Leadership panicked. Transparency is overrated."
        }
    },
    {
        "id": "pm-013",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "Bug Triage",
        "prompt": "You have 500 open bugs. 50 are 'High Priority'. You can only fix 5 in this sprint.",
        "leftChoice": {
            "label": "Fix recent ones",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "Recency bias wins. The old bugs are now 'features'."
        },
        "rightChoice": {
            "label": "Fix oldest ones",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "You fixed a bug from 2019. The two users who encountered it are thrilled."
        }
    },
    {
        "id": "pm-014",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "Legal Review",
        "prompt": "Legal says you can't use the word 'Fast' in the marketing copy because it's 'subjective liability'.",
        "leftChoice": {
            "label": "Change to 'Rapid'",
            "effects": [{ "pillar": "bandwidth", "delta": 0 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You folded. The copy now reads like a terms of service agreement."
        },
        "rightChoice": {
            "label": "Fight Legal",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You argued semantics with lawyers. You won, but your soul is tired."
        }
    },
    {
        "id": "pm-015",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "Failed Experiment",
        "prompt": "A feature you fought hard for has launched. Usage is near zero. It's a ghost town.",
        "leftChoice": {
            "label": "Kill it quietly",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You sunset the feature. 'Fail fast,' you whispered, hoping no one noticed."
        },
        "rightChoice": {
            "label": "Double down",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "bandwidth", "delta": -10 }],
            "outcomeText": "You threw good money after bad. It's the Sunk Cost Fallacy in action."
        }
    },
    {
        "id": "pm-016",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "Remote Team Sync",
        "prompt": "Your engineering team is in a timezone 12 hours ahead. Standup is at 10 PM your time.",
        "leftChoice": {
            "label": "Attend daily",
            "effects": [{ "pillar": "life", "delta": -15 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "You live on caffeine and naps. The team appreciates the face time. Your spouse does not."
        },
        "rightChoice": {
            "label": "Async updates",
            "effects": [{ "pillar": "life", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You slept. The team feels disconnected, but at least you're lucid."
        }
    },
    {
        "id": "pm-017",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "Design Perfectionism",
        "prompt": "Design refuses to sign off because the pixel spacing is off by 2px on mobile screens.",
        "leftChoice": {
            "label": "Override Design",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You shipped 'good enough'. Design is giving you the silent treatment."
        },
        "rightChoice": {
            "label": "Delay launch",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "You waited for perfection. Users didn't notice the 2px, but the vibes are immaculate."
        }
    },
    {
        "id": "pm-018",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "Data Privacy",
        "prompt": "A partner wants to buy user email addresses for 'co-marketing'. It's technically legal in the fine print.",
        "leftChoice": {
            "label": "Sell the list",
            "effects": [{ "pillar": "salary", "delta": 10 }, { "pillar": "reputation", "delta": -10 }],
            "outcomeText": "You made a quick buck. Users are now getting spam for crypto scams. Great job."
        },
        "rightChoice": {
            "label": "Refuse deal",
            "effects": [{ "pillar": "salary", "delta": -5 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You protected the users. Revenue missed the target. You are the moral victor of a failing quarter."
        }
    },
    {
        "id": "pm-019",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "Agile Zealot",
        "prompt": "A new Scrum Master joined. They want to introduce 4 new ceremonies per sprint.",
        "leftChoice": {
            "label": "Accept process",
            "effects": [{ "pillar": "bandwidth", "delta": -15 }, { "pillar": "reputation", "delta": 0 }],
            "outcomeText": "You now spend 50% of your life in Jira. Efficiency logic not found."
        },
        "rightChoice": {
            "label": "Revolt",
            "effects": [{ "pillar": "bandwidth", "delta": 10 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You banned the meetings. The Scrum Master is crying in a retrospective."
        }
    },
    {
        "id": "pm-020",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "The Big Pivot",
        "prompt": "Leadership decided we are now an 'AI-First' company. All current projects are paused.",
        "leftChoice": {
            "label": "Embrace the hype",
            "effects": [{ "pillar": "salary", "delta": 5 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You tacked 'AI' onto every feature name. Stock price goes up. Logic goes down."
        },
        "rightChoice": {
            "label": "Question strategy",
            "effects": [{ "pillar": "salary", "delta": -5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You asked 'Why?'. You were labeled 'legacy mindset'. It's lonely in the real world."
        }
    },
    {
        "id": "pm-021",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "Documentation Void",
        "prompt": "The Wiki is empty. Sales keeps asking 'how does this work?'. You need to write FAQs.",
        "leftChoice": {
            "label": "Write docs",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You wrote the manual. Sales still calls you instead of reading it."
        },
        "rightChoice": {
            "label": "Record video",
            "effects": [{ "pillar": "bandwidth", "delta": -5 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You made a Loom video. It has 0 views. At least you tried."
        }
    },
    {
        "id": "pm-022",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "Influencer Critic",
        "prompt": "A tech influencer on Twitter roasted your product UI. The tweet is viral.",
        "leftChoice": {
            "label": "Clap back",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "You engaged the troll. You are now a meme. PR is hyperventilating."
        },
        "rightChoice": {
            "label": "Ignore it",
            "effects": [{ "pillar": "reputation", "delta": 0 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You stayed silent. The internet forgot about you in 4 hours. Silence is golden."
        }
    },
    {
        "id": "pm-023",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "User Persona Workshop",
        "prompt": "Marketing wants to spend 3 days building 'User Personas'. They brought LEGOs.",
        "leftChoice": {
            "label": "Play along",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You built a LEGO user named 'Dave'. Dave represents our failure to understand real people."
        },
        "rightChoice": {
            "label": "Skip workshop",
            "effects": [{ "pillar": "bandwidth", "delta": 10 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You did real work. Marketing thinks you hate fun. You just hate wasted time."
        }
    },
    {
        "id": "pm-024",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "Feature Flag Hell",
        "prompt": "There are 50 active feature flags. The code is a spaghetti mess of if/else statements.",
        "leftChoice": {
            "label": "Cleanup flags",
            "effects": [{ "pillar": "bandwidth", "delta": -5 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You removed old flags. The app is lighter. Engineers will name their firstborn after you."
        },
        "rightChoice": {
            "label": "Add more flags",
            "effects": [{ "pillar": "bandwidth", "delta": 0 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You punted the complexity. Future You will hate Current You."
        }
    },
    {
        "id": "pm-025",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "Dependency Down",
        "prompt": "AWS is having an outage. The app is down. Customers are screaming at Support.",
        "leftChoice": {
            "label": "Help Support",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "You jumped in the ticket queue. You apologized 400 times. You are a human shield."
        },
        "rightChoice": {
            "label": "Do nothing",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -10 }],
            "outcomeText": "You can't fix AWS. You went for a walk. Support will never forgive you."
        }
    },
    {
        "id": "pm-026",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "Accessibility Audit",
        "prompt": "An audit shows the app isn't screen-reader friendly. Fixing it delays the roadmap by 2 weeks.",
        "leftChoice": {
            "label": "Fix it",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "salary", "delta": -5 }],
            "outcomeText": "You did the right thing. The app is inclusive. Revenue didn't notice, but karma did."
        },
        "rightChoice": {
            "label": "Ignore it",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "salary", "delta": 5 }],
            "outcomeText": "You prioritized speed over access. Shame on you. (But the stakeholders are happy)."
        }
    },
    {
        "id": "pm-027",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "Internal Tooling",
        "prompt": "Support needs a better admin panel. It generates zero revenue but saves their sanity.",
        "leftChoice": {
            "label": "Build tools",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "salary", "delta": -5 }],
            "outcomeText": "Support loves you. You are the champion of the internal downtrodden."
        },
        "rightChoice": {
            "label": "Prioritize Features",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "salary", "delta": 5 }],
            "outcomeText": "You ignored internal needs. Support churn is up to 40%. Not your KPI, not your problem?"
        }
    },
    {
        "id": "pm-028",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "Analyst Conflict",
        "prompt": "The Data Analyst says your feature success metrics are 'statistically impossible'.",
        "leftChoice": {
            "label": "Trust Analyst",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "salary", "delta": -5 }],
            "outcomeText": "You revisited the math. You were wrong. It hurts, but it's true."
        },
        "rightChoice": {
            "label": "Overrule them",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "salary", "delta": 5 }],
            "outcomeText": "You published the fake numbers. The analyst is silently judging you from the corner."
        }
    },
    {
        "id": "pm-029",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "Release Notes",
        "prompt": "It's Friday afternoon. Marketing forgot to write the release notes for the new version.",
        "leftChoice": {
            "label": "Write them",
            "effects": [{ "pillar": "bandwidth", "delta": -5 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You wrote pun-filled release notes. 3 people read them. Worth it."
        },
        "rightChoice": {
            "label": "Skip notes",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "'Bug fixes and improvements.' The classic lie. Nobody noticed."
        }
    },
    {
        "id": "pm-030",
        "track": "IC",
        "personas": ["product-manager"],
        "tags": [],
        "title": "Post-Mortem",
        "prompt": "The site crashed. You have to lead the 'Blameless Post-Mortem'. Someone definitely caused it.",
        "leftChoice": {
            "label": "Point fingers",
            "effects": [{ "pillar": "reputation", "delta": -15 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "You blamed Jerry. Jerry is crying. The culture is toxic, but the scapegoat is identified."
        },
        "rightChoice": {
            "label": "Focus on process",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "You analyzed the system failure. High maturity score. Jerry is relieved."
        }
    }
];

// Append to existing data
data.push(...newCards);
fs.writeFileSync(path, JSON.stringify(data, null, 4));

console.log(`Added ${newCards.length} PM-specific cards.`);
console.log(`new Total: ${data.length}`);
