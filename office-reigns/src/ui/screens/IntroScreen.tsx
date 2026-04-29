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
                    <p className="intro-subtitle">Navigate your corporate survival</p>
                </header>

                <section className="intro-instructions">
                    <h2>How to Play</h2>
                    <p>
                        Every week brings a workplace dilemma. Choose wisely — each decision shifts
                        your four career pillars.
                    </p>
                    <div className="intro-pillars">
                        <div className="intro-pillar">
                            <span className="pillar-icon">⚡</span>
                            <div className="pillar-info">
                                <span className="pillar-name">Bandwidth</span>
                                <span className="pillar-desc">Time &amp; energy</span>
                            </div>
                        </div>
                        <div className="intro-pillar">
                            <span className="pillar-icon">💰</span>
                            <div className="pillar-info">
                                <span className="pillar-name">Salary</span>
                                <span className="pillar-desc">Compensation</span>
                            </div>
                        </div>
                        <div className="intro-pillar">
                            <span className="pillar-icon">⭐</span>
                            <div className="pillar-info">
                                <span className="pillar-name">Reputation</span>
                                <span className="pillar-desc">How you're seen</span>
                            </div>
                        </div>
                        <div className="intro-pillar">
                            <span className="pillar-icon">❤️</span>
                            <div className="pillar-info">
                                <span className="pillar-name">Life</span>
                                <span className="pillar-desc">Work-life balance</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="intro-conditions">
                    <div className="condition win">
                        <h3>🏆 Win</h3>
                        <p>Get promoted! Keep 2+ pillars above 70 after Week 40.</p>
                    </div>
                    <div className="condition lose">
                        <h3>💀 Lose</h3>
                        <ul>
                            <li>Any pillar drops to 0</li>
                            <li>Week 52 with no promotion</li>
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
