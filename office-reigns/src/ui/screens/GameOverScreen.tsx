// Game over screen component

import { getPillarStatus, type PillarType } from '../../engine/types';
import { useGame } from '../hooks/useGame';
import './GameOverScreen.css';

const PILLAR_EMOJIS: Record<PillarType, string> = {
    bandwidth: '⚡',
    salary: '💰',
    reputation: '⭐',
    life: '❤️',
};

export function GameOverScreen() {
    const { gameState, goToIntro } = useGame();

    if (!gameState || gameState.status !== 'game-over') {
        return null;
    }

    return (
        <div className="game-over-screen">
            <div className="game-over-card">
                <div className="game-over-card__icon">💀</div>
                <h1 className="game-over-card__title">Career Over</h1>

                <div className="game-over-card__narrative">
                    <p>{gameState.endReason}</p>
                </div>

                <div className="game-over-card__stats">
                    <div className="game-over-card__stat">
                        <span className="game-over-card__stat-label">Weeks Survived</span>
                        <span className="game-over-card__stat-value">{gameState.week - 1}</span>
                    </div>
                    <div className="game-over-card__pillars">
                        {(Object.keys(gameState.pillars) as PillarType[]).map((pillar) => {
                            const value = gameState.pillars[pillar];
                            const status = getPillarStatus(value);
                            return (
                                <div key={pillar} className="game-over-card__pillar">
                                    <span className="game-over-card__pillar-emoji">
                                        {PILLAR_EMOJIS[pillar]}
                                    </span>
                                    <span
                                        className={`game-over-card__pillar-status game-over-card__pillar-status--${status.toLowerCase()}`}
                                    >
                                        {status}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <button className="game-over-card__button" onClick={goToIntro}>
                    🔄 Start New Run
                </button>
            </div>
        </div>
    );
}
