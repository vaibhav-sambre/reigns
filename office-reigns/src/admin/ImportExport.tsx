// Import/Export cards JSON

import { useState, useRef } from 'react';
import type { Card } from '../engine/types';
import { getAllCards, importCards } from '../persistence/db';
import './ImportExport.css';

export function ImportExport() {
    const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleExport = async () => {
        try {
            const cards = await getAllCards();
            const json = JSON.stringify(cards, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `office-reigns-cards-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            setStatus({ type: 'success', message: `Exported ${cards.length} cards successfully!` });
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to export cards' });
        }
    };

    const handleImport = async (mode: 'merge' | 'replace') => {
        const file = fileInputRef.current?.files?.[0];
        if (!file) {
            setStatus({ type: 'error', message: 'Please select a file first' });
            return;
        }

        try {
            const text = await file.text();
            const cards = JSON.parse(text) as Card[];

            // Basic validation
            if (!Array.isArray(cards)) {
                throw new Error('Invalid format: expected an array');
            }

            for (const card of cards) {
                if (!card.id || !card.prompt || !card.leftChoice || !card.rightChoice) {
                    throw new Error(`Invalid card format: ${card.id || 'unknown'}`);
                }
            }

            await importCards(cards, mode);
            setStatus({
                type: 'success',
                message: `Imported ${cards.length} cards (${mode} mode)`,
            });

            // Clear file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: error instanceof Error ? error.message : 'Failed to import cards',
            });
        }
    };

    return (
        <div className="import-export">
            <h2 className="import-export__title">Import / Export</h2>

            {status && (
                <div className={`import-export__status import-export__status--${status.type}`}>
                    {status.message}
                </div>
            )}

            <div className="import-export__section">
                <h3>Export Cards</h3>
                <p className="import-export__description">
                    Download all cards as a JSON file for backup or sharing.
                </p>
                <button onClick={handleExport} className="import-export__btn import-export__btn--export">
                    📥 Export All Cards
                </button>
            </div>

            <div className="import-export__section">
                <h3>Import Cards</h3>
                <p className="import-export__description">
                    Import cards from a JSON file. Choose merge to add to existing cards, or replace to
                    remove all existing cards first.
                </p>

                <div className="import-export__file">
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept=".json"
                        className="import-export__file-input"
                    />
                </div>

                <div className="import-export__import-actions">
                    <button
                        onClick={() => handleImport('merge')}
                        className="import-export__btn import-export__btn--merge"
                    >
                        ➕ Import & Merge
                    </button>
                    <button
                        onClick={() => handleImport('replace')}
                        className="import-export__btn import-export__btn--replace"
                    >
                        🔄 Import & Replace All
                    </button>
                </div>
            </div>

            <div className="import-export__section import-export__section--info">
                <h3>Card JSON Format</h3>
                <pre className="import-export__example">
                    {`[
  {
    "id": "ic-example",
    "track": "IC",
    "tags": ["example"],
    "title": "Example Card",
    "prompt": "This is an example scenario...",
    "leftChoice": {
      "label": "Option A",
      "effects": [
        { "pillar": "bandwidth", "delta": -5 }
      ],
      "outcomeText": "You chose option A..."
    },
    "rightChoice": {
      "label": "Option B",
      "effects": [
        { "pillar": "reputation", "delta": 5 }
      ],
      "outcomeText": "You chose option B..."
    }
  }
]`}
                </pre>
            </div>
        </div>
    );
}
