// Main game screen component

import { useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import { PillarBar } from '../components/PillarBar';
import { DecisionCard } from '../components/DecisionCard';
import { OutcomeSummary } from '../components/OutcomeSummary';
import { formatCardText } from '../../engine/utils';
import { setDangerMode } from '../../engine/audio';
import './GameScreen.css';

export function GameScreen() {
    const {
        gameState, currentCard, lastOutcome, lastEffects,
        makeDecision, acknowledgeOutcome, goToIntro,
        isLoading, isMusicPlaying, toggleMusic,
    } = useGame();

    // Sync danger mode to audio engine whenever pillars change
    const pillars = gameState?.pillars;
    useEffect(() => {
        if (!pillars) return;
        const minPillar = Math.min(pillars.bandwidth, pillars.salary, pillars.reputation, pillars.life);
        setDangerMode(minPillar < 30);
    }, [pillars]);

    const isDanger = pillars
        ? Math.min(pillars.bandwidth, pillars.salary, pillars.reputation, pillars.life) < 30
        : false;

    if (isLoading || !gameState) {
        return (
            <div className="game-screen game-screen--loading">
                <div className="loading-spinner">
                    <div className="loading-spinner__ring" />
                    <p>Loading your career…</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`game-screen${isDanger ? ' game-screen--danger' : ''}`}>
            {/* Header */}
            <header className="game-header">
                <div className="game-header__left">
                    <button
                        className="music-toggle"
                        onClick={toggleMusic}
                        title={isMusicPlaying ? 'Mute music' : 'Play music'}
                    >
                        {isMusicPlaying ? '🔊' : '🔇'}
                    </button>
                    <div className="game-header__stage">
                        <span className="game-header__stage-icon">💼</span>
                        <span>IC Stage</span>
                    </div>
                </div>
                <div className="game-header__week">
                    <span className="game-header__week-label">Week</span>
                    <span className="game-header__week-number">{gameState.week}</span>
                </div>
            </header>

            {/* Pillars */}
            <section className="game-pillars">
                <PillarBar pillar="bandwidth"  value={gameState.pillars.bandwidth} />
                <PillarBar pillar="salary"     value={gameState.pillars.salary} />
                <PillarBar pillar="reputation" value={gameState.pillars.reputation} />
                <PillarBar pillar="life"       value={gameState.pillars.life} />
            </section>

            {/* Decision Card — keyed by card.id so it remounts (plays entrance anim) */}
            <section className="game-card">
                {currentCard && (
                    <DecisionCard
                        key={currentCard.id}
                        card={{
                            ...currentCard,
                            title:  formatCardText(currentCard.title  ?? '', gameState.characterNames),
                            prompt: formatCardText(currentCard.prompt,       gameState.characterNames),
                        }}
                        onChoose={makeDecision}
                        disabled={!!lastOutcome}
                    />
                )}
            </section>

            {/* Footer */}
            <footer className="game-footer">
                <div className="game-rules-hint">
                    <p>🏆 <span>Win:</span> 2+ pillars &gt;70 (wk 40+)</p>
                    <p>💀 <span>Lose:</span> Pillar 0 or wk 52</p>
                </div>
                <button className="restart-button" onClick={goToIntro}>
                    ↩ Restart
                </button>
            </footer>

            {/* Outcome overlay */}
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
