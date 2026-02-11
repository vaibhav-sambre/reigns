
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Load cards into memory
const cardsPath = path.join(__dirname, 'ic_cards.json');
let cards = [];

try {
    const data = fs.readFileSync(cardsPath, 'utf8');
    cards = JSON.parse(data);
    console.log(`Loaded ${cards.length} cards.`);
} catch (err) {
    console.error("Error loading cards:", err);
}

// Extract unique personas dynamically
const getAvailablePersonas = () => {
    const personaSet = new Set();
    cards.forEach(card => {
        if (card.personas) {
            card.personas.forEach(p => {
                if (p !== 'generic') personaSet.add(p);
            });
        }
    });
    return Array.from(personaSet);
};

// --- Routes ---

app.get('/', (req, res) => {
    res.send('Office Reigns Server is Running! Try /api/cards');
});

app.get('/api/cards', (req, res) => {
    res.json(cards);
});

app.get('/api/config', (req, res) => {
    const config = {
        personas: getAvailablePersonas(),
        promotionSettings: {
            minWeek: 40,
            minPillarsAbove60: 2,
            maxPillarsBelow30: 0,
            mode: 'immediate'
        }
    };
    res.json(config);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`- Cards API: http://localhost:${PORT}/api/cards`);
    console.log(`- Config API: http://localhost:${PORT}/api/config`);
});
