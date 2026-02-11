// Promotion screen component

import { getPillarStatus, type PillarType } from '../../engine/types';
import { useGame } from '../hooks/useGame';
import './PromotionScreen.css';

const PILLAR_EMOJIS: Record<PillarType, string> = {
    bandwidth: '⚡',
    salary: '💰',
    reputation: '⭐',
    life: '❤️',
};

export function PromotionScreen() {
    const { gameState, goToIntro } = useGame();

    if (!gameState || gameState.status !== 'promoted') {
        return null;
    }

    return (
        <div className="promotion-screen">
            <div className="promotion-card">
                <div className="promotion-card__confetti" />

                <div className="promotion-card__icon">🎉</div>
                <h1 className="promotion-card__title">Promoted!</h1>
                <h2 className="promotion-card__subtitle">You're now a Manager</h2>

                <div className="promotion-card__narrative">
                    <p>{gameState.endReason}</p>
                </div>

                <div className="promotion-card__stats">
                    <div className="promotion-card__stat">
                        <span className="promotion-card__stat-label">Weeks to Promotion</span>
                        <span className="promotion-card__stat-value">{gameState.week - 1}</span>
                    </div>
                    <div className="promotion-card__pillars">
                        {(Object.keys(gameState.pillars) as PillarType[]).map((pillar) => {
                            const value = gameState.pillars[pillar];
                            const status = getPillarStatus(value);
                            return (
                                <div key={pillar} className="promotion-card__pillar">
                                    <span className="promotion-card__pillar-emoji">
                                        {PILLAR_EMOJIS[pillar]}
                                    </span>
                                    <span
                                        className={`promotion-card__pillar-status promotion-card__pillar-status--${status.toLowerCase()}`}
                                    >
                                        {status}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="promotion-card__coming-soon">
                    <p>Manager Stage Coming Soon!</p>
                </div>

                <button className="promotion-card__button" onClick={goToIntro}>
                    🔄 Play Again
                </button>
            </div>
        </div>
    );
}
