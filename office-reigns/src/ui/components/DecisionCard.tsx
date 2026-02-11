// Decision card component

import type { Card } from '../../engine/types';
import './DecisionCard.css';

interface DecisionCardProps {
    card: Card;
    onChoose: (choice: 'left' | 'right') => void;
    disabled?: boolean;
}

export function DecisionCard({ card, onChoose, disabled }: DecisionCardProps) {
    return (
        <div className="decision-card">
            {card.title && <h2 className="decision-card__title">{card.title}</h2>}
            <p className="decision-card__prompt">{card.prompt}</p>

            <div className="decision-card__choices">
                <button
                    className="decision-card__choice decision-card__choice--left"
                    onClick={() => onChoose('left')}
                    disabled={disabled}
                >
                    <span className="decision-card__choice-icon">←</span>
                    <span className="decision-card__choice-label">
                        {card.leftChoice.label}
                    </span>
                </button>

                <button
                    className="decision-card__choice decision-card__choice--right"
                    onClick={() => onChoose('right')}
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
