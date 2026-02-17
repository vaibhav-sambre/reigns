// Main game screen component

import { useGame } from '../hooks/useGame';
import { PillarBar } from '../components/PillarBar';
import { DecisionCard } from '../components/DecisionCard';
import { OutcomeSummary } from '../components/OutcomeSummary';
import { formatCardText } from '../../engine/utils';
import './GameScreen.css';

export function GameScreen() {
    const { gameState, currentCard, lastOutcome, lastEffects, makeDecision, acknowledgeOutcome, goToIntro, isLoading, isMusicPlaying, toggleMusic } =
        useGame();

    if (isLoading || !gameState) {
        return (
            <div className="game-screen game-screen--loading">
                <div className="loading-spinner">
                    <div className="loading-spinner__ring" />
                    <p>Loading your career...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="game-screen">
            {/* Header */}
            <header className="game-header">
                <div className="game-header__stage">
                    <button
                        className="music-toggle"
                        onClick={toggleMusic}
                        title={isMusicPlaying ? "Mute Music" : "Play Music"}
                    >
                        {isMusicPlaying ? '🔊' : '🔇'}
                    </button>
                    <span className="game-header__stage-icon">💼</span>
                    <span>IC Stage</span>
                </div>
                <div className="game-header__week">
                    <span className="game-header__week-label">Week</span>
                    <span className="game-header__week-number">{gameState.week}</span>
                </div>
            </header>

            {/* Pillars */}
            <section className="game-pillars">
                <PillarBar pillar="bandwidth" value={gameState.pillars.bandwidth} />
                <PillarBar pillar="salary" value={gameState.pillars.salary} />
                <PillarBar pillar="reputation" value={gameState.pillars.reputation} />
                <PillarBar pillar="life" value={gameState.pillars.life} />
            </section>

            {/* Decision Card */}
            <section className="game-card">
                {currentCard && gameState && (
                    <DecisionCard
                        card={{
                            ...currentCard,
                            title: formatCardText(currentCard.title || '', gameState.characterNames),
                            prompt: formatCardText(currentCard.prompt, gameState.characterNames)
                        }}
                        onChoose={makeDecision}
                        disabled={!!lastOutcome}
                    />
                )}
            </section>

            {/* Restart Button */}
            <footer className="game-footer">
                <div className="game-rules-hint">
                    <p>🏆 <span>Win:</span> 2+ Pillars &gt; 70% (Week 40+)</p>
                    <p>💀 <span>Lose:</span> Any Pillar 0% or No Promo by Week 52</p>
                </div>
                <button className="restart-button" onClick={goToIntro}>
                    🔄 Restart Game
                </button>
            </footer>

            {/* Outcome Overlay */}
            {lastOutcome && gameState && (
                <OutcomeSummary
                    outcome={formatCardText(lastOutcome, gameState.characterNames)}
                    effects={lastEffects}
                    onContinue={acknowledgeOutcome}
                />
            )}
        </div>
    );
}
