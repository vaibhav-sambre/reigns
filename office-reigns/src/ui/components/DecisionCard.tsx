// Decision card — swipe animation + 3-D tilt on hover

import { useState, useCallback, useRef } from 'react';
import type { Card } from '../../engine/types';
import { playSound } from '../../engine/audio';
import './DecisionCard.css';

interface DecisionCardProps {
    card: Card;
    onChoose: (choice: 'left' | 'right') => void;
    disabled?: boolean;
}

export function DecisionCard({ card, onChoose, disabled }: DecisionCardProps) {
    const [swipeDir, setSwipeDir] = useState<'left' | 'right' | null>(null);
    const [hoverDir, setHoverDir] = useState<'left' | 'right' | null>(null);
    const inFlight = useRef(false);

    const handleChoice = useCallback((choice: 'left' | 'right') => {
        if (disabled || inFlight.current) return;
        inFlight.current = true;
        playSound('swipe');
        setSwipeDir(choice);
        setTimeout(() => {
            inFlight.current = false;
            setSwipeDir(null);
            onChoose(choice);
        }, 260);
    }, [disabled, onChoose]);

    const cardClass = [
        'decision-card',
        swipeDir === 'left'  && 'decision-card--swipe-left',
        swipeDir === 'right' && 'decision-card--swipe-right',
        hoverDir === 'left'  && !swipeDir && 'decision-card--lean-left',
        hoverDir === 'right' && !swipeDir && 'decision-card--lean-right',
    ].filter(Boolean).join(' ');

    return (
        <div
            className={cardClass}
            onAnimationEnd={() => inFlight.current = false}
        >
            {/* Ambient glow backdrop */}
            <div className="decision-card__glow" />

            {card.title && (
                <h2 className="decision-card__title">{card.title}</h2>
            )}

            <p className="decision-card__prompt">{card.prompt}</p>

            <div className="decision-card__choices">
                <button
                    className="decision-card__choice decision-card__choice--left"
                    onClick={() => handleChoice('left')}
                    onMouseEnter={() => setHoverDir('left')}
                    onMouseLeave={() => setHoverDir(null)}
                    disabled={!!disabled || !!swipeDir}
                    aria-label={`Left: ${card.leftChoice.label}`}
                >
                    <span className="decision-card__choice-arrow">←</span>
                    <span className="decision-card__choice-label">{card.leftChoice.label}</span>
                </button>

                <button
                    className="decision-card__choice decision-card__choice--right"
                    onClick={() => handleChoice('right')}
                    onMouseEnter={() => setHoverDir('right')}
                    onMouseLeave={() => setHoverDir(null)}
                    disabled={!!disabled || !!swipeDir}
                    aria-label={`Right: ${card.rightChoice.label}`}
                >
                    <span className="decision-card__choice-label">{card.rightChoice.label}</span>
                    <span className="decision-card__choice-arrow">→</span>
                </button>
            </div>

            {/* Hint arrows that appear on hover */}
            <div className={`decision-card__hint-arrow decision-card__hint-arrow--left ${hoverDir === 'left' ? 'visible' : ''}`}>
                ← Swipe Left
            </div>
            <div className={`decision-card__hint-arrow decision-card__hint-arrow--right ${hoverDir === 'right' ? 'visible' : ''}`}>
                Swipe Right →
            </div>
        </div>
    );
}
