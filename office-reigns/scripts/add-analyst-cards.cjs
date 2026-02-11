const fs = require('fs');
const path = 'data/ic_cards.seed.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newCards = [
    {
        "id": "an-001",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "The Data Discrepancy",
        "prompt": "You notice a significant discrepancy in the quarterly sales report just hours before the board meeting. Fixing it means missing the deadline, but ignoring it compromises integrity.",
        "leftChoice": {
            "label": "Delay and fix it",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "bandwidth", "delta": -15 }],
            "outcomeText": "You saved the company from a PR nightmare. Your weekend, however, was sacrificed to the SQL gods."
        },
        "rightChoice": {
            "label": "Send it as is",
            "effects": [{ "pillar": "reputation", "delta": -20 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "The board noticed the error immediately. You claimed it was a 'projection variance.' Nobody bought it."
        }
    },
    {
        "id": "an-002",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "The Tableau Transformation",
        "prompt": "Marketing wants a flashy, interactive dashboard that looks like a spaceship control panel. It adds zero value but looks 'cool'.",
        "leftChoice": {
            "label": "Build the spaceship",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": -10 }],
            "outcomeText": "Marketing is thrilled. They don't understand the data, but they love the colors. Success?"
        },
        "rightChoice": {
            "label": "Build a clean chart",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You built a functional tool. They complained it lacks 'jazz.' You assume 'jazz' refers to useless pie charts."
        }
    },
    {
        "id": "an-003",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "SQL Join Nightmare",
        "prompt": "A query you wrote is taking 4 hours to run and locking the production database. The DBA is screaming at you on Slack.",
        "leftChoice": {
            "label": "Kill it and optimize",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You rewrote the query. It now runs in 4 seconds. The DBA has stopped using all-caps. Peace restored."
        },
        "rightChoice": {
            "label": "Let it finish",
            "effects": [{ "pillar": "reputation", "delta": -15 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "The query finished. So did the customers' patience. The site went down for 20 minutes. Whoops."
        }
    },
    {
        "id": "an-004",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "The Excel Dependency",
        "prompt": "The entire finance department relies on a single, brittle Excel macro you wrote 2 years ago. It just broke.",
        "leftChoice": {
            "label": "Fix the macro",
            "effects": [{ "pillar": "bandwidth", "delta": -5 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You applied a band-aid to a bullet wound. The beast lives to crash another day."
        },
        "rightChoice": {
            "label": "Migrate to Python",
            "effects": [{ "pillar": "bandwidth", "delta": -20 }, { "pillar": "reputation", "delta": 15 }],
            "outcomeText": "You automated their entire job. They are simultaneously grateful and terrified of you."
        }
    },
    {
        "id": "an-005",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "Forecast vs Reality",
        "prompt": "Your forecast model predicts a 20% revenue drop. Sales leadership asks you to 'tweak the assumptions' to show growth.",
        "leftChoice": {
            "label": "Hold your ground",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "salary", "delta": -5 }],
            "outcomeText": "You kept your integrity. You also kept your bonus... oh wait, no you didn't."
        },
        "rightChoice": {
            "label": "Adjust the model",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "salary", "delta": 5 }],
            "outcomeText": "You cooked the books. The numbers look great, provided reality doesn't intervene."
        }
    },
    {
        "id": "an-006",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "Null Value Crisis",
        "prompt": "A third-party API changed its schema without notice. Half your data is now 'NULL'. Reporting is due in an hour.",
        "leftChoice": {
            "label": "Impute averages",
            "effects": [{ "pillar": "bandwidth", "delta": -5 }, { "pillar": "reputation", "delta": 0 }],
            "outcomeText": "You filled the gaps with guesses. It's 'data science,' right? Nobody noticed."
        },
        "rightChoice": {
            "label": "Delay report",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "You asked for more time. They asked for a new analyst. Just kidding... mostly."
        }
    },
    {
        "id": "an-007",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "The Ad-Hoc Request",
        "prompt": "The CEO wants to know 'how many users like blue buttons'. There is no tracking for this. He needed it yesterday.",
        "leftChoice": {
            "label": "Estimate blindly",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "You made up a number. He put it in an investor deck. You are now complicit in fraud."
        },
        "rightChoice": {
            "label": "Explain impossibility",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "You explained data tracking limitations to a Boomer. It took 3 hours, but he understood."
        }
    },
    {
        "id": "an-008",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "Dark Mode Data",
        "prompt": "The design team wants usage stats on Dark Mode. You discover only 0.1% of users use it. They just spent 3 months building it.",
        "leftChoice": {
            "label": "Share bluntly",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "You crushed their souls with a single pie chart. You are now the enemy of Design."
        },
        "rightChoice": {
            "label": "Soft-pedal it",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "You emphasized 'potential growth'. They live in denial, but they like you."
        }
    },
    {
        "id": "an-009",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "The CSV Export",
        "prompt": "A stakeholder keeps asking for CSV exports via email instead of using the automated dashboard you built.",
        "leftChoice": {
            "label": "Keep emailing",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "salary", "delta": 0 }],
            "outcomeText": "You are a highly paid email attachment generator. Congratulations."
        },
        "rightChoice": {
            "label": "Refuse & Train",
            "effects": [{ "pillar": "bandwidth", "delta": -5 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You taught a man to fish. He still complains about the fishing rod, but he's fishing."
        }
    },
    {
        "id": "an-010",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "Correlation vs Causation",
        "prompt": "Marketing claims their new email campaign caused a spike in sales. You see the spike started *before* the email went out.",
        "leftChoice": {
            "label": "Burst their bubble",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "life", "delta": 5 }],
            "outcomeText": "You explained time's linear nature. They didn't appreciate the physics lesson."
        },
        "rightChoice": {
            "label": "Let them have it",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "You let them take credit for a coincidence. They owe you a beer. Or a promotion."
        }
    },
    {
        "id": "an-011",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "A/B Test Ambiguity",
        "prompt": "An A/B test result is statistically insignificant (p=0.12). The PM wants to declare a winner anyway.",
        "leftChoice": {
            "label": "Refuse to call it",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "You held the line for statistical rigor. The feature didn't launch. You are a buzzkill."
        },
        "rightChoice": {
            "label": "Call the winner",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "You declared a winner based on vibes. Science wept, but the roadmap moved forward."
        }
    },
    {
        "id": "an-012",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "Missing Tracking",
        "prompt": "Engineering launched a major feature but forgot to implement the tracking events you specified in the spec.",
        "leftChoice": {
            "label": "Demand rollback",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "You forced a rollback. Developers hate you. But hey, at least you have data."
        },
        "rightChoice": {
            "label": "Wait for hotfix",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "You have a two-week hole in your data. You'll label it 'The Dark Ages' in future charts."
        }
    },
    {
        "id": "an-013",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "Looker vs PowerBI",
        "prompt": "Management is considering switching BI tools again. They want your opinion. It will mean rewriting 500 reports.",
        "leftChoice": {
            "label": "Support switch",
            "effects": [{ "pillar": "bandwidth", "delta": -20 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "You agreed to migrate. Your next 6 months will be spent debugging XML. Why do you hate yourself?"
        },
        "rightChoice": {
            "label": "Oppose switch",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You blocked 'innovation' (aka change for the sake of change). You are now 'resistant to change'."
        }
    },
    {
        "id": "an-014",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "The 'Quick' Question",
        "prompt": "VP of Sales: 'Can you quickly pull the LTV of users who joined on a Tuesday in 2019?'",
        "leftChoice": {
            "label": "Do it instantly",
            "effects": [{ "pillar": "bandwidth", "delta": -5 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You did it. Now he asks for 'Wednesday users'. You have opened Pandora's Box."
        },
        "rightChoice": {
            "label": "Ticket it",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You directed a VP to Jira. A bold move. He likely forgot the request 5 minutes later."
        }
    },
    {
        "id": "an-015",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "Data Governance Meeting",
        "prompt": "You are invited to a 3-hour meeting about 'defining what a user is'.",
        "leftChoice": {
            "label": "Attend & contribute",
            "effects": [{ "pillar": "bandwidth", "delta": -15 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You argued about semantics for 180 minutes. Nothing was decided. See you next week."
        },
        "rightChoice": {
            "label": "Skip it",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You skipped the philosophical debate. You are officially 'not a team player' but you got work done."
        }
    },
    {
        "id": "an-016",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "The Outlier",
        "prompt": "One user spent $50,000 in a single transaction, skewing your Average Revenue Per User (ARPU) by 400%.",
        "leftChoice": {
            "label": "Include it",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "salary", "delta": 5 }],
            "outcomeText": "ARPU looks amazing! Management is popping champagne. You feel dirty."
        },
        "rightChoice": {
            "label": "Exclude outlier",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "salary", "delta": 0 }],
            "outcomeText": "You presented the median. It's accurate, but boring. Nobody toasted your integrity."
        }
    },
    {
        "id": "an-017",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "Documentation Duty",
        "prompt": "Your data dictionary is outdated. New hires are querying `user_id` when they mean `account_id`.",
        "leftChoice": {
            "label": "Update docs",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You wrote documentation. Nobody will read it, but you can link it aggressively in Slack."
        },
        "rightChoice": {
            "label": "Let them struggle",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "Chaos reigns. You answer the same question 5 times a day. Job security?"
        }
    },
    {
        "id": "an-018",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "Machine Learning Hype",
        "prompt": "CTO wants to use 'AI' to predict churn. A simple logistic regression would work better and faster.",
        "leftChoice": {
            "label": "Build the AI",
            "effects": [{ "pillar": "bandwidth", "delta": -20 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "You spent weeks tuning a neural net. It performs worse than a coin flip, but it sounds impressive."
        },
        "rightChoice": {
            "label": "Use regression",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You used math from the 19th century. It works perfectly. The CTO is bored."
        }
    },
    {
        "id": "an-019",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "GDPR Audit",
        "prompt": "Legal needs a list of all user PII stored in the warehouse. You know there's a table called `temp_users_final_v3`.",
        "leftChoice": {
            "label": "Audit everything",
            "effects": [{ "pillar": "bandwidth", "delta": -15 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You audited the mess. You found passwords in plain text. You need a drink."
        },
        "rightChoice": {
            "label": "Ignore temp tables",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You ignored the shadow IT. If the EU auditors come, you'll be on vacation."
        }
    },
    {
        "id": "an-020",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "Version Control?",
        "prompt": "You discover the 'source of truth' for revenue is a Google Sheet edited by 15 different sales reps.",
        "leftChoice": {
            "label": "Ingest to Warehouse",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You centralized the data. Sales reps can no longer retroactively hit their quota. They hate you."
        },
        "rightChoice": {
            "label": "Leave it be",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "salary", "delta": 0 }],
            "outcomeText": "You let the chaos act as the ledger. Revenue is whatever Sales says it is."
        }
    },
    {
        "id": "an-021",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "The 'What If' Scenario",
        "prompt": "Strategy team wants a model for 'What if we duplicate our business in Antarctica?'. It's pure fantasy.",
        "leftChoice": {
            "label": "Build the model",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "salary", "delta": 5 }],
            "outcomeText": "You modeled penguin LTV. It was your most creative fiction writing yet."
        },
        "rightChoice": {
            "label": "call it nonsense",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You pointed out the lack of population. They called you 'lacking vision'."
        }
    },
    {
        "id": "an-022",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "Broken Pipeline",
        "prompt": "The ETL pipeline failed at 3 AM. Data is stale. Your phone is buzzing.",
        "leftChoice": {
            "label": "Fix it now",
            "effects": [{ "pillar": "life", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You fixed the pipeline in your pajamas. Heroes don't wear capes, they wear sweatpants."
        },
        "rightChoice": {
            "label": "Sleep anyway",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "life", "delta": 5 }],
            "outcomeText": "You slept. The morning standup was awkward, but you are well-rested."
        }
    },
    {
        "id": "an-023",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "Presentation Day",
        "prompt": "You have to present your quarterly findings to the entire company. Public speaking is not your forte.",
        "leftChoice": {
            "label": "Rehearse all night",
            "effects": [{ "pillar": "life", "delta": -10 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "You nailed it. Nobody knew you were sweating through your shirt."
        },
        "rightChoice": {
            "label": "Wring it",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "life", "delta": 5 }],
            "outcomeText": "You mumbled through the slides. People applauded out of pity."
        }
    },
    {
        "id": "an-024",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "Competitor Data",
        "prompt": "A PM asks you to scrape a competitor's website. It's technically against their TOS, but undetectable.",
        "leftChoice": {
            "label": "Scrape it",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "You got the data. You act like a spy. It's the most excitement you've had all year."
        },
        "rightChoice": {
            "label": "Refuse",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "You cited the TOS. You are technically correct, the best kind of correct. And boring."
        }
    },
    {
        "id": "an-025",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "The KPI Shift",
        "prompt": "Management changed the definition of 'Active User' for the 4th time this year to make numbers look better.",
        "leftChoice": {
            "label": "Update all charts",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "salary", "delta": 0 }],
            "outcomeText": "You updated history. We have always been at war with Eastasia."
        },
        "rightChoice": {
            "label": "Keep internal set",
            "effects": [{ "pillar": "bandwidth", "delta": -15 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You maintain two sets of books. One for the board, one for reality. You are the keeper of truth."
        }
    },
    {
        "id": "an-026",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "Python vs R Debate",
        "prompt": "A new hire insists R is better than Python. They bring it up in every meeting.",
        "leftChoice": {
            "label": "Debate them",
            "effects": [{ "pillar": "bandwidth", "delta": -5 }, { "pillar": "reputation", "delta": 0 }],
            "outcomeText": "You wasted an hour arguing syntax. Nobody won. Everyone else lost."
        },
        "rightChoice": {
            "label": "Ignore them",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "life", "delta": 5 }],
            "outcomeText": "You let them use R. When they need to deploy to production, they'll come crawling back."
        }
    },
    {
        "id": "an-027",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "The 'Insight' Request",
        "prompt": "Marketing: 'Give us some cool insights about our users.' No specific question, just 'insights'.",
        "leftChoice": {
            "label": "Dig for hours",
            "effects": [{ "pillar": "bandwidth", "delta": -15 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You found that users who like cats buy more socks. Marketing is ecstatic."
        },
        "rightChoice": {
            "label": "Send generic stats",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "You sent a user count by country. They responded 'Very insightful!'"
        }
    },
    {
        "id": "an-028",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "Dashboard Performance",
        "prompt": "The main dashboard takes 30 seconds to load. Executives are complaining.",
        "leftChoice": {
            "label": "Cache results",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "It loads instantly now. The data is 24 hours old, but nobody checks the timestamp."
        },
        "rightChoice": {
            "label": "Explain complexity",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "You explained 'big data'. They heard 'I am bad at my job'."
        }
    },
    {
        "id": "an-029",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "Too Many Meetings",
        "prompt": "You are invited to 'Data Strategy Sync', 'Metrics Alignment', and 'KPI Workshop' all in one day.",
        "leftChoice": {
            "label": "Attend all",
            "effects": [{ "pillar": "bandwidth", "delta": -20 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You spent 6 hours talking about work instead of doing it."
        },
        "rightChoice": {
            "label": "Decline all",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 10 }],
            "outcomeText": "You got 6 hours of work done. You are a pariah, but a productive one."
        }
    },
    {
        "id": "an-030",
        "track": "IC",
        "personas": ["analyst"],
        "tags": [],
        "title": "Training the Intern",
        "prompt": "You have an intern. They deleted a production table. It was a small one, but still.",
        "leftChoice": {
            "label": "Cover for them",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You restored the backup. The intern thinks you are a wizard. You are just tired."
        },
        "rightChoice": {
            "label": "Report it",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "salary", "delta": 0 }],
            "outcomeText": "The intern got a stern talking to. You are known as 'The Snitch'."
        }
    }
];

// Append to existing data
data.push(...newCards);
fs.writeFileSync(path, JSON.stringify(data, null, 4));

console.log(`Added ${newCards.length} Analyst-specific cards.`);
console.log(`new Total: ${data.length}`);
