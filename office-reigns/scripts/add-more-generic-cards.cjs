const fs = require('fs');
const path = 'data/ic_cards.seed.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newCards = [
    {
        "id": "gen-adv-001",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Zoom Cat Filter",
        "prompt": "You joined the all-hands meeting. You are stuck as a cat. You cannot turn it off.",
        "leftChoice": {
            "label": "Own it",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "life", "delta": 5 }],
            "outcomeText": "You meowed when introduced. The CEO laughed. You are now the office mascot."
        },
        "rightChoice": {
            "label": "Panic quit",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "You disconnected. Everyone thinks you have connection issues. Or feline issues."
        }
    },
    {
        "id": "gen-adv-002",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Reply All Disaster",
        "prompt": "Someone emailed 'Congratulations' to the whole company. 400 people are Replying All 'Stop Replying All'.",
        "leftChoice": {
            "label": "Mute thread",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": 0 }],
            "outcomeText": "Silence. You filtered the noise. You missed one important email buried in the trash."
        },
        "rightChoice": {
            "label": "Reply 'Unsubscribe'",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "life", "delta": 5 }],
            "outcomeText": "You added to the chaos. It felt cathartic. IT is investigating you."
        }
    },
    {
        "id": "gen-adv-003",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Broken Elevator",
        "prompt": "The elevator is broken. Your desk is on the 14th floor.",
        "leftChoice": {
            "label": "Take stairs",
            "effects": [{ "pillar": "life", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You arrived sweaty and gasping. 'Cardio,' you lied. Your legs are jelly."
        },
        "rightChoice": {
            "label": "Work from lobby",
            "effects": [{ "pillar": "productivity", "delta": -5 }, { "pillar": "reputation", "delta": -5 }], // productivity maps to bandwidth implicitly or typo? Should be bandwidth.
            "outcomeText": "You sat on a uncomfortable couch. Security stared at you for 8 hours."
        }
    },
    {
        "id": "gen-adv-004",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Shared Fridge Crime",
        "prompt": "Someone ate your labeled yogurt. You have a suspect.",
        "leftChoice": {
            "label": "Confront Dave",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "life", "delta": 5 }],
            "outcomeText": "It wasn't Dave. Now Dave hates you. But you established dominance."
        },
        "rightChoice": {
            "label": "Passive-aggressive note",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "life", "delta": -5 }],
            "outcomeText": "You wrote 'Thieves will be prosecuted'. Someone drew a smiley face on it."
        }
    },
    {
        "id": "gen-adv-005",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Mandatory Fun",
        "prompt": "HR scheduled 'Virtual Bingo' at 5 PM on a Friday.",
        "leftChoice": {
            "label": "Attend",
            "effects": [{ "pillar": "life", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You won a $5 gift card. You lost 60 minutes of your life."
        },
        "rightChoice": {
            "label": "Skip it",
            "effects": [{ "pillar": "life", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You left early. HR marked you as 'not a team player'. You caught the train."
        }
    },
    // ... adding more to reach high count ...
    {
        "id": "gen-adv-006",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "The Thermostat War",
        "prompt": "It is freezing. Half the office is in parkas. The other half is sweating.",
        "leftChoice": {
            "label": "Touch thermostat",
            "effects": [{ "pillar": "life", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You cranked the heat. A developer threatened to melt. You are warm."
        },
        "rightChoice": {
            "label": "Buy desk heater",
            "effects": [{ "pillar": "salary", "delta": -5 }, { "pillar": "life", "delta": 5 }],
            "outcomeText": "You tripped the circuit breaker. Darkness fell. But you were cozy."
        }
    },
    {
        "id": "gen-adv-007",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Password Expiry",
        "prompt": "Your password expires in 2 days. The new requirements are absurd.",
        "leftChoice": {
            "label": "Use manager",
            "effects": [{ "pillar": "bandwidth", "delta": -5 }, { "pillar": "reputation", "delta": 0 }],
            "outcomeText": "Password changed to P@ssw0rd123!. Security is an illusion."
        },
        "rightChoice": {
            "label": "Forget to change",
            "effects": [{ "pillar": "bandwidth", "delta": -15 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You were locked out. IT made you beg. Productivity zero."
        }
    },
    {
        "id": "gen-adv-008",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Fire Alarm",
        "prompt": "The alarm sounds. It's raining outside. It's probably a drill.",
        "leftChoice": {
            "label": "Evacuate",
            "effects": [{ "pillar": "life", "delta": -5 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "You stood in the rain for 20 minutes. It was burnt popcorn."
        },
        "rightChoice": {
            "label": "Hide in bathroom",
            "effects": [{ "pillar": "life", "delta": -15 }, { "pillar": "bandwidth", "delta": 5 }], // Risk of death?
            "outcomeText": "You kept working. If it was real fire, you'd be dead. But you finished the report."
        }
    },
    {
        "id": "gen-adv-009",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Slack Down",
        "prompt": "Slack is down globally. The office is silent. People are blinking in the light.",
        "leftChoice": {
            "label": "Talk to humans",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "You learned your neighbor's name. It was awful."
        },
        "rightChoice": {
            "label": "Go home",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "life", "delta": 10 }],
            "outcomeText": "If you can't send GIFs, are you even working? You enjoyed the afternoon."
        }
    },
    {
        "id": "gen-adv-010",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Clean Desk Policy",
        "prompt": "New policy: No personal items on desks. No photos, no plants.",
        "leftChoice": {
            "label": "Comply",
            "effects": [{ "pillar": "life", "delta": -5 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "Your desk looks like a prison cell. Management is pleased."
        },
        "rightChoice": {
            "label": "Rebel",
            "effects": [{ "pillar": "life", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You hid a succulent behind your monitor. The resistance lives."
        }
    },
    {
        "id": "gen-adv-011",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "LinkedIn Request",
        "prompt": "A coworker you dislike sent you a LinkedIn connection request.",
        "leftChoice": {
            "label": "Accept",
            "effects": [{ "pillar": "life", "delta": -5 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You endorsed them for 'Microsoft Word'. It felt sarcastic."
        },
        "rightChoice": {
            "label": "Ignore",
            "effects": [{ "pillar": "life", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "They asked you about it in person. 'Must have missed it,' you lied."
        }
    },
    {
        "id": "gen-adv-012",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Leftovers",
        "prompt": "There is leftover pizza from the client meeting. It has been there for 4 hours.",
        "leftChoice": {
            "label": "Eat it",
            "effects": [{ "pillar": "life", "delta": -10 }, { "pillar": "salary", "delta": 5 }], // Free meal
            "outcomeText": "Room temperature pepperoni. You saved $12. Your stomach is rumbling."
        },
        "rightChoice": {
            "label": "Abstain",
            "effects": [{ "pillar": "life", "delta": 5 }, { "pillar": "salary", "delta": 0 }],
            "outcomeText": "You respected your body. You watched others feast like vultures."
        }
    },
    {
        "id": "gen-adv-013",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Software Update",
        "prompt": "Your laptop wants to restart for updates. You have 20 tabs open.",
        "leftChoice": {
            "label": "Restart now",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "Chrome didn't restore the tabs. You are free from your past."
        },
        "rightChoice": {
            "label": "Remind me later",
            "effects": [{ "pillar": "bandwidth", "delta": 0 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You clicked 'Tomorrow' for the 40th day in a row. IT is monitoring you."
        }
    },
    {
        "id": "gen-adv-014",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Ergonomic Assessment",
        "prompt": "A consultant says your chair is too low and your monitor is too high.",
        "leftChoice": {
            "label": "Adjust everything",
            "effects": [{ "pillar": "bandwidth", "delta": -5 }, { "pillar": "life", "delta": 5 }],
            "outcomeText": "You feel weirdly aligned. Productivity increased by 0.1%."
        },
        "rightChoice": {
            "label": "Nod politely",
            "effects": [{ "pillar": "bandwidth", "delta": 0 }, { "pillar": "life", "delta": -5 }],
            "outcomeText": "You returned to your shrimp posture immediately."
        }
    },
    {
        "id": "gen-adv-015",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Headphones Battery",
        "prompt": "Your noise-canceling headphones died. The open office is roaring.",
        "leftChoice": {
            "label": "Suffer raw audio",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "life", "delta": -5 }],
            "outcomeText": "You heard every cough, click, and gossip. Hell is other people."
        },
        "rightChoice": {
            "label": "Hide in phone booth",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You hogged the booth for 3 hours. People tapped on the glass. You ignored them."
        }
    },
    {
        "id": "gen-adv-016",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Survey: Engagement",
        "prompt": "The annual 'Anonymous' Engagement Survey is here. Do you tell the truth?",
        "leftChoice": {
            "label": "Be honest",
            "effects": [{ "pillar": "reputation", "delta": -10 }, { "pillar": "life", "delta": 5 }],
            "outcomeText": "You vented. It felt good. Your manager asked why you seemed 'unhappy'."
        },
        "rightChoice": {
            "label": "Everything is great",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "life", "delta": -5 }],
            "outcomeText": "You lied. Management celebrated the 'positive culture'. Nothing changed."
        }
    },
    {
        "id": "gen-adv-017",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Bathroom Talker",
        "prompt": "A senior VP starts a conversation with you at the urinal.",
        "leftChoice": {
            "label": "Engage",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "life", "delta": -10 }],
            "outcomeText": "Ideally, networking happens elsewhere. But you take what you can get."
        },
        "rightChoice": {
            "label": "Stare at wall",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "life", "delta": 0 }],
            "outcomeText": "Awkward silence. You respected the code. He respects you less."
        }
    },
    {
        "id": "gen-adv-018",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Leaving Early",
        "prompt": "It's 3 PM on Friday. The office is empty.",
        "leftChoice": {
            "label": "Leave now",
            "effects": [{ "pillar": "life", "delta": 10 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You beat the traffic. You felt guilty for 5 minutes, then ordered a drink."
        },
        "rightChoice": {
            "label": "Stay till 5",
            "effects": [{ "pillar": "life", "delta": -5 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You browsed Reddit for 2 hours. 'Visibility' is key."
        }
    },
    {
        "id": "gen-adv-019",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Email Typo",
        "prompt": "You sent an email to 50 people saying 'Bestretards' instead of 'Best regards'.",
        "leftChoice": {
            "label": "Send correction",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "You drew attention to it. Now everyone saw it."
        },
        "rightChoice": {
            "label": "Ignore it",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "Maybe they won't notice? (They noticed. They screenshotted it)."
        }
    },
    {
        "id": "gen-adv-020",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Free Donuts",
        "prompt": "An email announces 'Donuts in the kitchen'. It was sent 10 minutes ago.",
        "leftChoice": {
            "label": "Run",
            "effects": [{ "pillar": "life", "delta": 5 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "You got the last glazed. Victory tastes like sugar and grease."
        },
        "rightChoice": {
            "label": "Too far",
            "effects": [{ "pillar": "life", "delta": -5 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "You stayed seated. You imagined the donut. Sadness ensued."
        }
    },
    {
        "id": "gen-adv-021",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "New Tool",
        "prompt": "Management bought a new tool to replace the old tool. It does less and costs more.",
        "leftChoice": {
            "label": "Complain",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "You are 'resistant to change'. You are also right."
        },
        "rightChoice": {
            "label": "Learn it",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": -10 }],
            "outcomeText": "You spent 3 days learning to do what used to take 3 minutes."
        }
    },
    {
        "id": "gen-adv-022",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Timesheet",
        "prompt": "You forgot to fill out your timesheet. Again. Payroll is closing.",
        "leftChoice": {
            "label": "Fill randomly",
            "effects": [{ "pillar": "bandwidth", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "8 hours, 8 hours, 8 hours. The lie we all agree on."
        },
        "rightChoice": {
            "label": "Calculate exactly",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You audited your own calendar. You billed 40 hours. You worked 50."
        }
    },
    {
        "id": "gen-adv-023",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Unmuted sneeze",
        "prompt": "You sneezed violently on a Zoom call. You were not muted.",
        "leftChoice": {
            "label": "Apologize",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "life", "delta": 0 }],
            "outcomeText": "'Bless you,' said the CEO. The silence after was deafening."
        },
        "rightChoice": {
            "label": "Pretend connection died",
            "effects": [{ "pillar": "reputation", "delta": 0 }, { "pillar": "life", "delta": 5 }],
            "outcomeText": "You froze your face. A tactical disconnection. Genius."
        }
    },
    {
        "id": "gen-adv-024",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Wiki Rot",
        "prompt": "You found a wiki page titled 'New Hire Guide' last updated in 2014.",
        "leftChoice": {
            "label": "Update it",
            "effects": [{ "pillar": "bandwidth", "delta": -10 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "You cleaned the digital ruins. No one reads it, but you know it's there."
        },
        "rightChoice": {
            "label": "Close tab",
            "effects": [{ "pillar": "bandwidth", "delta": 0 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "Let the dead rest in peace."
        }
    },
    {
        "id": "gen-adv-025",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Business Card",
        "prompt": "Someone hands you a business card. Do you even have pockets?",
        "leftChoice": {
            "label": "Keep it",
            "effects": [{ "pillar": "life", "delta": -5 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You put it in your wallet. You will find it in 3 years and ask 'Who?'."
        },
        "rightChoice": {
            "label": "Leave on table",
            "effects": [{ "pillar": "life", "delta": 0 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "A power move. Or just forgetfulness. Same effect."
        }
    },
    {
        "id": "gen-adv-026",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Happy Birthday",
        "prompt": "It's your boss's birthday. Everyone is signing a card. You barely know him.",
        "leftChoice": {
            "label": "Generic message",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "life", "delta": -5 }],
            "outcomeText": "'HBD!' you scrawled. Heartfelt."
        },
        "rightChoice": {
            "label": "Skip card",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "life", "delta": 0 }],
            "outcomeText": "You avoided the ritual. You are a social pariah."
        }
    },
    {
        "id": "gen-adv-027",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Broken Chair",
        "prompt": "Your office chair sinks slowly throughout the day. By 4 PM you are a toddler.",
        "leftChoice": {
            "label": "Steal another chair",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "life", "delta": 10 }],
            "outcomeText": "You raided the conference room. The chair is deluxe. You have enemies now."
        },
        "rightChoice": {
            "label": "Accept gravity",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "life", "delta": -10 }],
            "outcomeText": "You work with your chin on the desk. This is your life now."
        }
    },
    {
        "id": "gen-adv-028",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Mentorship",
        "prompt": "Management assigned you a 'Mentor'. He talks about his boat for 30 minutes.",
        "leftChoice": {
            "label": "Listen feign interest",
            "effects": [{ "pillar": "reputation", "delta": 10 }, { "pillar": "life", "delta": -5 }],
            "outcomeText": "You know everything about the S.S. Synergy. He thinks you have 'potential'."
        },
        "rightChoice": {
            "label": "End meeting early",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You claimed a conflict. He thinks you aren't 'curious'."
        }
    },
    {
        "id": "gen-adv-029",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Desk Plant",
        "prompt": "Your succulent is dying. It represents your will to live.",
        "leftChoice": {
            "label": "Water it",
            "effects": [{ "pillar": "life", "delta": 5 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "It lived. Green is good. Small victories."
        },
        "rightChoice": {
            "label": "Let it go",
            "effects": [{ "pillar": "life", "delta": -5 }, { "pillar": "bandwidth", "delta": 0 }],
            "outcomeText": "It is now brown and crunchy. A monument to neglect."
        }
    },
    {
        "id": "gen-adv-030",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Two Truths One Lie",
        "prompt": "Icebreaker game. You have to participate.",
        "leftChoice": {
            "label": "Be interesting",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "life", "delta": -5 }],
            "outcomeText": "You revealed you play the bagpipes. Now they want you to perform."
        },
        "rightChoice": {
            "label": "Be boring",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "You said you like bread. No follow-up questions. Success."
        }
    },
    {
        "id": "gen-adv-031",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Firewall Block",
        "prompt": "Spotify is blocked on the corporate network. Silence is deafening.",
        "leftChoice": {
            "label": "Use mobile data",
            "effects": [{ "pillar": "salary", "delta": -5 }, { "pillar": "life", "delta": 5 }],
            "outcomeText": "You burned your data plan. The music played. Worth it."
        },
        "rightChoice": {
            "label": "Work in silence",
            "effects": [{ "pillar": "salary", "delta": 0 }, { "pillar": "life", "delta": -10 }],
            "outcomeText": "All you hear is typing and sighing. The sound of despair."
        }
    },
    {
        "id": "gen-adv-032",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Stolen Pen",
        "prompt": "Someone stole your nice Pilot G-2 pen. You see it on Gary's desk.",
        "leftChoice": {
            "label": "Steal it back",
            "effects": [{ "pillar": "life", "delta": 5 }, { "pillar": "reputation", "delta": 0 }],
            "outcomeText": "Justice is restored. Gary looked confused. You felt a rush."
        },
        "rightChoice": {
            "label": "Let it go",
            "effects": [{ "pillar": "life", "delta": -5 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "You used a Bic ballpoint. It splotched. You resent Gary."
        }
    },
    {
        "id": "gen-adv-033",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Construction Noise",
        "prompt": "Drilling has started on the floor above. It vibrates your teeth.",
        "leftChoice": {
            "label": "Buy earplugs",
            "effects": [{ "pillar": "salary", "delta": -5 }, { "pillar": "bandwidth", "delta": 5 }],
            "outcomeText": "Peace at a price."
        },
        "rightChoice": {
            "label": "Complain to HR",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "bandwidth", "delta": -10 }],
            "outcomeText": "HR said it's 'temporary'. It lasted 6 months."
        }
    },
    {
        "id": "gen-adv-034",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Expired Badge",
        "prompt": "Your badge expired. You are locked out of the bathroom.",
        "leftChoice": {
            "label": "Ask coworker",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "life", "delta": 5 }],
            "outcomeText": "You had to ask permission to pee. Humiliating."
        },
        "rightChoice": {
            "label": "Go to security",
            "effects": [{ "pillar": "bandwidth", "delta": -15 }, { "pillar": "reputation", "delta": 0 }],
            "outcomeText": "It took an hour to print plastic. You held it."
        }
    },
    {
        "id": "gen-adv-035",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Casual Friday",
        "prompt": "It's Casual Friday. You wore shorts. The CEO is in a suit.",
        "leftChoice": {
            "label": "Walk confidently",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "life", "delta": 5 }],
            "outcomeText": "You exposed your calves to power. Power frowned."
        },
        "rightChoice": {
            "label": "Hide under desk",
            "effects": [{ "pillar": "reputation", "delta": 0 }, { "pillar": "life", "delta": -5 }],
            "outcomeText": "You avoided eye contact. You are safe but pathetic."
        }
    },
    {
        "id": "gen-adv-036",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Print Quota",
        "prompt": "You exceeded your color printing quota. You need this graph to be red.",
        "leftChoice": {
            "label": "Print BW",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "salary", "delta": 0 }],
            "outcomeText": "The graph is grey and grey. 'As you can see,' you pointed at nothing."
        },
        "rightChoice": {
            "label": "Hack admin code",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "bandwidth", "delta": -5 }],
            "outcomeText": "You found the code on a sticky note. The red is vibrant. You are elite."
        }
    },
    {
        "id": "gen-adv-037",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Rainy Commute",
        "prompt": "It is pouring rain. You forgot your umbrella.",
        "leftChoice": {
            "label": "Run for it",
            "effects": [{ "pillar": "life", "delta": -5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You arrived soaked. You smell like wet dog. Professionalism -10."
        },
        "rightChoice": {
            "label": "Buy umbrella",
            "effects": [{ "pillar": "salary", "delta": -5 }, { "pillar": "life", "delta": 5 }],
            "outcomeText": "You bought a cheap one. It broke instantly, but you stayed mostly dry."
        }
    },
    {
        "id": "gen-adv-038",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Kitchen Duty",
        "prompt": "A passive-aggressive sign says 'Your Mom Doesn't Work Here'. Sink is full.",
        "leftChoice": {
            "label": "Wash dishes",
            "effects": [{ "pillar": "life", "delta": -10 }, { "pillar": "reputation", "delta": 10 }],
            "outcomeText": "You cleaned other people's filth. A martyr for hygiene."
        },
        "rightChoice": {
            "label": "Add dirty cup",
            "effects": [{ "pillar": "life", "delta": 5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You joined the problem. Anarchy is the only law."
        }
    },
    {
        "id": "gen-adv-039",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Slow Laptop",
        "prompt": "Clicking an icon takes 10 seconds. IT says 'reimage required'.",
        "leftChoice": {
            "label": "Reimage",
            "effects": [{ "pillar": "bandwidth", "delta": -20 }, { "pillar": "reputation", "delta": 5 }],
            "outcomeText": "A fresh start. You lost all your bookmarks. But it's fast."
        },
        "rightChoice": {
            "label": "Live with lag",
            "effects": [{ "pillar": "bandwidth", "delta": -5 }, { "pillar": "reputation", "delta": -5 }],
            "outcomeText": "You click and wait. You click and wait. Life passes you by."
        }
    },
    {
        "id": "gen-adv-040",
        "track": "IC",
        "personas": ["generic"],
        "tags": [],
        "title": "Parking Spot",
        "prompt": "You found the perfect spot near the door. It says 'Reserved for Employee of Month'.",
        "leftChoice": {
            "label": "Park anyway",
            "effects": [{ "pillar": "reputation", "delta": -5 }, { "pillar": "life", "delta": 5 }],
            "outcomeText": "You saved 2 minutes walking. You live in fear of towing."
        },
        "rightChoice": {
            "label": "Park in back",
            "effects": [{ "pillar": "reputation", "delta": 5 }, { "pillar": "life", "delta": -5 }],
            "outcomeText": "You walked in the rain. Virtue is wet."
        }
    }
];

// Append to existing data
data.push(...newCards);
fs.writeFileSync(path, JSON.stringify(data, null, 4));

console.log(`Added ${newCards.length} Generic cards.`);
console.log(`new Total: ${data.length}`);
