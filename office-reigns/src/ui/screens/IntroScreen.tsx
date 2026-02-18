import './IntroScreen.css';

interface IntroScreenProps {
    onContinue: () => void;
}

export function IntroScreen({ onContinue }: IntroScreenProps) {
    return (
        <div className="intro-screen">
            <div className="intro-content">
                <header className="intro-header">
                    <span className="intro-icon">🏢</span>
                    <h1 className="intro-title">Office Reigns</h1>
                    <p className="intro-subtitle">Navigate your corporate career</p>
                </header>

                <section className="intro-instructions">
                    <h2>How to Play</h2>
                    <p>
                        Each week, you'll face a workplace scenario with two choices.
                        Your decisions affect four key pillars:
                    </p>

                    <div className="intro-pillars">
                        <div className="intro-pillar">
                            <span className="pillar-icon">⚡</span>
                            <span className="pillar-name">Bandwidth</span>
                            <span className="pillar-desc">Your time & energy</span>
                        </div>
                        <div className="intro-pillar">
                            <span className="pillar-icon">💰</span>
                            <span className="pillar-name">Salary</span>
                            <span className="pillar-desc">Your compensation</span>
                        </div>
                        <div className="intro-pillar">
                            <span className="pillar-icon">⭐</span>
                            <span className="pillar-name">Reputation</span>
                            <span className="pillar-desc">How you're perceived</span>
                        </div>
                        <div className="intro-pillar">
                            <span className="pillar-icon">❤️</span>
                            <span className="pillar-name">Life</span>
                            <span className="pillar-desc">Work-life balance</span>
                        </div>
                    </div>
                </section>

                <section className="intro-conditions">
                    <div className="condition win">
                        <h3>🏆 Win Condition</h3>
                        <p>Get promoted! Keep 2+ pillars above 70% after week 40.</p>
                    </div>
                    <div className="condition lose">
                        <h3>💀 Lose Conditions</h3>
                        <ul>
                            <li>Any pillar drops to 0</li>
                            <li>Reach Week 52 without promotion</li>
                        </ul>
                    </div>
                </section>

                <button className="start-button" onClick={onContinue}>
                    Choose Your Role →
                </button>
            </div>
        </div>
    );
}
