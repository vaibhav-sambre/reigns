// Outcome summary overlay with pillar effect chips

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
        <div className="outcome-overlay" onClick={onContinue}>
            {/* Stop propagation so clicking the card doesn't also dismiss */}
            <div className="outcome-card" onClick={e => e.stopPropagation()}>
                <span className="outcome-card__icon">📋</span>
                <h3 className="outcome-card__title">Outcome</h3>
                <p className="outcome-card__text">{outcome}</p>

                {effects.length > 0 && (
                    <div className="outcome-card__effects">
                        {effects.map((effect, i) => (
                            <div
                                key={i}
                                className={`outcome-card__effect ${
                                    effect.delta >= 0
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
                                    {effect.delta > 0 ? '+' : ''}{effect.delta}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                <button className="outcome-card__button" onClick={onContinue}>
                    Next Week →
                </button>
            </div>
        </div>
    );
}
