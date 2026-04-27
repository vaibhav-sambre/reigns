// Outcome summary overlay with pillar effects

import type { Effect } from '../../engine/types';
import { PILLAR_EMOJIS, PILLAR_LABELS } from '../constants';
import './OutcomeSummary.css';

interface OutcomeSummaryProps {
    outcome: string;
    effects: Effect[];
    onContinue: () => void;
}

export function OutcomeSummary({ outcome, effects, onContinue }: OutcomeSummaryProps) {
    return (
        <div className="outcome-overlay">
            <div className="outcome-card">
                <div className="outcome-card__icon">📊</div>
                <h3 className="outcome-card__title">Outcome</h3>
                <p className="outcome-card__text">{outcome}</p>

                {effects.length > 0 && (
                    <div className="outcome-card__effects">
                        {effects.map((effect, index) => (
                            <div
                                key={index}
                                className={`outcome-card__effect ${effect.delta > 0
                                    ? 'outcome-card__effect--positive'
                                    : 'outcome-card__effect--negative'
                                    }`}
                            >
                                <span className="outcome-card__effect-emoji">
                                    {PILLAR_EMOJIS[effect.pillar]}
                                </span>
                                <span className="outcome-card__effect-label">
                                    {PILLAR_LABELS[effect.pillar]}
                                </span>
                                <span className="outcome-card__effect-delta">
                                    {effect.delta > 0 ? '↑' : '↓'}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                <button
                    className="outcome-card__button"
                    onClick={onContinue}
                >
                    Continue to Next Week →
                </button>
            </div>
        </div>
    );
}
