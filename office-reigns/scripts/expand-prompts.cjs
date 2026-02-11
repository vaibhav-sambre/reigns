const fs = require('fs');
const path = 'data/ic_cards.seed.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Map of ID -> New Descriptive Prompt
const expansions = {
    "ic-018": "Sprint planning is officially underway, but the product manager's proposed scope for the next two weeks seems wildly optimistic given current tech debt.",
    "ic-068": "A recruiter from a major competitor slides into your DMs with a very flattering note about your recent work and a hint about strictly higher compensation.",
    "ic-070": "The meeting has started, but no one has volunteered to take notes. The awkward silence is stretching past 30 seconds as everyone avoids eye contact.",
    "ic-071": "You accidentally caused a massive paper jam in the main corridor printer. It looks complicated to fix, and miraculously, no one saw you do it.",
    "ic-072": "HR has launched a company-wide step-count challenge to promote wellness. There are gift cards for the top walkers, but it might distract from actual work.",
    "ic-076": "Two colleagues are having a very loud, animated conversation right behind your desk about their weekend plans. You're trying to focus on complex logic.",
    "ic-083": "It's your birthday coming up next week. HR has sent a form asking if they can announce it in the company-wide newsletter and Slack channel.",
    "ic-087": "The 'Wellness Challenge' is in full swing. People are pacing around the office to get steps in. You could join the competitive frenzy or stay focused.",
    "ic-089": "Your desk neighbor has started playing their 'focus playlist' without headphones. It's quiet, but you can definitely hear the repetitive techno beat.",
    "ic-091": "A mandatory fire drill is scheduled for 2 PM today, exactly when you need to be heads-down finishing a critical deployment for a client.",
    "ic-094": "You are officially on a 'staycation' to recharge, but a colleague just messaged you on your personal number about a production issue only you know how to fix.",
    "ic-096": "New company swag—hoodies and backpacks—has arrived at the front desk. A long line is forming, and supplies are limited. Do you join the queue?",
    "doom-011": "Rumors are confirmed: the company is being acquired by a larger competitor. Redundancies are expected, and the atmosphere is tense and uncertain.",
    "ic-106": "It's the annual Company Charity Day. Everyone is encouraged to take a full day off work to volunteer at local non-profits, but your deadlines haven't moved.",
    "ic-107": "The CEO is visiting your office today and has specifically requested a demo of the feature you've been building. It's working, but it's not polished.",
    "ic-108": "There's an internal hackathon happening this weekend. It's a great opportunity for visibility with leadership, but it means working through your days off.",
    "ic-109": "The onboarding documentation is woefully outdated. Updating it would be incredibly helpful for new hires, but it's tedious work that won't get much praise.",
    "ic-111": "HR is desperate for more engineers to conduct technical interviews. It helps the company grow, but it eats up valuable coding time.",
    "ic-113": "Facilities just announced that new standing desks are available. You can claim one, but you'll have to spend hours dismantling your current setup to move.",
    "ic-115": "A renowned external expert is hosting a half-day workshop on new tech trends. It looks fascinating, but attendance means falling behind on your sprint.",
    "ic-116": "A massive Pull Request (2,000+ lines) is waiting for your review. It's complex, critical code, and reviewing it properly will take your entire afternoon.",
    "ic-117": "The team has organized an escape room event for after work hours. It's meant to be fun team bonding, but you're exhausted and just want to go home.",
    "ic-118": "The team is discussing switching to a new, \"better\" project management tool. Migrating all tickets will be a nightmare, but the new tool is shiny.",
    "ic-119": "A colleague has a family emergency and wants to swap on-call shifts with you. This means you'll be on-call this weekend instead of next month.",
    "ic-121": "There's a Global Town Hall meeting scheduled for 9 PM your time to accommodate HQ. Leadership says it's 'strongly recommended' to watch live.",
    "ic-122": "The annual Employee Engagement Survey is out. It's very detailed and will take at least 30 minutes of thoughtful writing to complete properly.",
    "ic-123": "The company introduced a new gym subsidy benefit! You can get reimbursed, but the paperwork process is notoriously bureaucratic and time-consuming.",
    "ic-124": "An old friend wants a referral for an open role on your team. You know they're a decent person, but their coding skills are only 'okay-ish'.",
    "ic-125": "Traffic is exceptionally bad today due to a protest downtown. You can attempt the commute to show face, or work from home and risk missing hallway chatter.",
    "ic-129": "The Platform team needs beta testers for a new internal developer tool. It's likely buggy, but your feedback could shape the final product.",
    "ic-130": "The office is holding a 'Best Decorated Desk' contest for the holidays. Some people are going all out. Do you participate or keep it professional?",
    "ic-131": "A meeting has been scheduled for 5:30 PM significantly cutting into your personal time. It's marked as 'optional' but the organizer is your skip-level manager.",
    "ic-133": "You've received the final reminder for mandatory security training. If you don't complete the 1-hour module today, your access might be revoked.",
    "ic-134": "It's a popular teammate's birthday. An envelope is going around for a collective gift, and the suggested contribution is slightly higher than you'd like.",
    "ic-135": "A critical OS security update requires a restart. It estimates 20 minutes of downtime, right in the middle of your coding flow.",
    "ic-136": "The VP of Engineering sent an open call for input on the annual strategy. You have thoughts, but writing a coherent memo will take hours.",
    "ic-137": "A slot has opened up for the weekly 'Knowledge Share' session tomorrow. It's a chance to present, but you'd have to prepare slides tonight.",
    "ic-138": "A 'Bug Bash' is scheduled before the release. It involves manually testing the app for two hours to find edge cases. It's dull but necessary.",
    "ic-139": "It's Sprint Planning. The Product Manager is pushing for three new features. You know the code is fragile and really needs a 'tech debt' sprint.",
    "ic-140": "HR has flagged that you haven't taken any leave in for 6 months. You're feeling fine, but they are encouraging you to take a week off soon.",
    "angel-003": "The CEO just announced a surprise 'Mental Health Day' for this Friday, effectively giving everyone a 3-day weekend to disconnect and recharge.",
    "angel-008": "You check your calendar and realize a miracle has occurred: you have absolutely no meetings scheduled for this entire week. It's pure deep work time.",
    "angel-013": "The team hit a major quarterly OKR three weeks early! Leadership is thrilled and has allocated budget for a celebration.",
    "angel-014": "Great news! The candidate you referred last month passed all interviews and accepted the offer. The referral bonus will be in your next check.",
    "angel-015": "The company has started a new luxury shuttle service that stops right in your neighborhood, promising a comfortable commute with Wi-Fi.",
    "angel-016": "Your Pull Request to a major open-source library was just merged and publicly acknowledged by the maintainers. It's a nice feather in your cap.",
    "angel-017": "HR has announced a 'use it or lose it' wellness budget of $500 that needs to be spent by the end of the month on health-related items.",
    "angel-018": "The new summer intern has taken initiative and updated all your project documentation perfectly, saving you days of tedious work.",
    "angel-020": "A surprise 'Cost of Living Adjustment' has been processed for all employees. You'll see a nice bump in your base salary starting this cycle."
};

let updated = 0;
data.forEach(card => {
    if (expansions[card.id]) {
        card.prompt = expansions[card.id];
        updated++;
    }
});

fs.writeFileSync(path, JSON.stringify(data, null, 4));
console.log(`Expanded descriptions for ${updated} cards.`);
