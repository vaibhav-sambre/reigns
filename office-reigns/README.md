# 🏢 Office Reigns

A local-first web game inspired by *Reigns*, where you make weekly workplace decisions that affect your career pillars. Navigate corporate life as an Individual Contributor, balancing Bandwidth, Salary, Reputation, and Life to eventually earn your promotion!

![Game Screenshot](/screenshots/game.png)

## 🎮 Game Overview

- **Swipe-style decisions**: Each week presents a scenario with two choices
- **Four pillars to balance**:
  - ⚡ **Bandwidth** – Your time and energy capacity
  - 💰 **Salary** – Your compensation and benefits
  - ⭐ **Reputation** – How you're perceived at work
  - ❤️ **Life** – Work-life balance and wellbeing
- **Visual feedback**: Pillars show qualitative status (Critical → Low → OK → High → Dominant)
- **Win condition**: Get promoted by keeping 2+ pillars above 70% after week 20
- **Lose conditions**: Any pillar hits 0, or reach Week 52 without promotion

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## 📁 Project Structure

```
office-reigns/
├── src/
│   ├── engine/           # Pure game logic (no React)
│   │   ├── types.ts      # Core TypeScript interfaces
│   │   ├── effects.ts    # Pillar effect calculations
│   │   ├── gameState.ts  # Game state transitions
│   │   ├── promotion.ts  # Promotion eligibility logic
│   │   └── cardSelector.ts # Card selection with anti-repeat
│   ├── persistence/      # IndexedDB layer
│   │   └── db.ts         # CRUD for cards, state, settings
│   ├── ui/               # React components
│   │   ├── components/   # Reusable UI (PillarBar, DecisionCard)
│   │   ├── screens/      # Main game screens
│   │   └── hooks/        # Game state context
│   └── admin/            # Admin UI for card management
├── data/
│   └── ic_cards.seed.json # 100+ IC stage cards (balanced effects)
└── README.md
```

## 🔧 Admin Panel

Access the admin at `/admin` to manage cards and settings.

### Features
- **Card List**: View, search, edit, delete cards
- **Card Editor**: Create/edit cards with effect builder
- **Settings**: Configure promotion criteria (min week, pillar thresholds)
- **Import/Export**: Backup/restore cards as JSON

### Card JSON Format
```json
{
  "id": "ic-example",
  "track": "IC",
  "tags": ["promotion-opportunity"],
  "title": "Optional Title",
  "prompt": "The scenario description...",
  "leftChoice": {
    "label": "Option A",
    "effects": [{ "pillar": "bandwidth", "delta": -5 }],
    "outcomeText": "Optional outcome narrative"
  },
  "rightChoice": {
    "label": "Option B",
    "effects": [{ "pillar": "reputation", "delta": 5 }]
  }
}
```

### Effect Ranges
- Delta values: `-20` to `+20` per effect (doubled for 52-week gameplay)
- Pillar range: `0` to `100`
- Status thresholds: `0-20` Critical, `21-40` Low, `41-60` OK, `61-80` High, `81-100` Dominant

## ⚙️ Promotion Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `minWeek` | 20 | Earliest week eligible for promotion |
| `minPillarsAbove70` | 2 | Required pillars at 70%+ status |
| `maxPillarsBelow30` | 0 | Max pillars allowed at Low/Critical |
| `mode` | `card-only` | Trigger: `immediate` or `card-only` |

Cards tagged with `promotion-opportunity` trigger promotion when eligible.

## 🧪 Testing

```bash
# Run unit tests
npm test

# Watch mode
npm run test:watch
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build**: Vite
- **Persistence**: IndexedDB via `idb`
- **Routing**: React Router 7
- **Testing**: Vitest

## 📝 Future Enhancements

- [ ] Manager stage content
- [ ] Sound effects and music
- [ ] Achievement system
- [ ] Cloud sync (optional)
- [ ] Mobile-optimized touch gestures

---

Made with 💼 for corporate warriors everywhere
