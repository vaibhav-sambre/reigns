// Decision card component

import type { Card } from '../../engine/types';
import { playSound } from '../../engine/audio';
import './DecisionCard.css';

interface DecisionCardProps {
    card: Card;
    onChoose: (choice: 'left' | 'right') => void;
    disabled?: boolean;
}

export function DecisionCard({ card, onChoose, disabled }: DecisionCardProps) {
    const handleChoice = (choice: 'left' | 'right') => {
        if (!disabled) {
            playSound('swipe');
            onChoose(choice);
        }
    };

    return (
        <div className="decision-card">
            {card.title && <h2 className="decision-card__title">{card.title}</h2>}
            <p className="decision-card__prompt">{card.prompt}</p>

            <div className="decision-card__choices">
                <button
                    className="decision-card__choice decision-card__choice--left"
                    onClick={() => handleChoice('left')}
                    disabled={disabled}
                >
                    <span className="decision-card__choice-icon">←</span>
                    <span className="decision-card__choice-label">
                        {card.leftChoice.label}
                    </span>
                </button>

                <button
                    className="decision-card__choice decision-card__choice--right"
                    onClick={() => handleChoice('right')}
                    disabled={disabled}
                >
                    <span className="decision-card__choice-label">
                        {card.rightChoice.label}
                    </span>
                    <span className="decision-card__choice-icon">→</span>
                </button>
            </div>
        </div>
    );
}
