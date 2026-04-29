// Theme picker — shown after persona selection, before name input

import { useState } from 'react';
import { THEMES, DEFAULT_THEME_ID, type ThemeId, type ThemeDefinition } from '../theme';
import './ThemeScreen.css';

interface ThemeScreenProps {
    onSelect: (themeId: ThemeId) => void;
    onBack: () => void;
}

function ThemeCard({
    theme,
    selected,
    onHover,
    onSelect,
}: {
    theme: ThemeDefinition;
    selected: boolean;
    onHover: (id: ThemeId | null) => void;
    onSelect: (id: ThemeId) => void;
}) {
    return (
        <button
            className={`theme-card ${selected ? 'theme-card--selected' : ''}`}
            style={{
                '--swatch-a': theme.swatchA,
                '--swatch-b': theme.swatchB,
            } as React.CSSProperties}
            onClick={() => onSelect(theme.id)}
            onMouseEnter={() => onHover(theme.id)}
            onMouseLeave={() => onHover(null)}
            aria-pressed={selected}
        >
            {/* Colour swatch bar */}
            <span className="theme-card__swatch" aria-hidden="true" />

            <span className="theme-card__emoji">{theme.emoji}</span>
            <span className="theme-card__name">{theme.name}</span>
            <span className="theme-card__tagline">{theme.tagline}</span>

            {selected && <span className="theme-card__check" aria-hidden="true">✓</span>}
        </button>
    );
}

export function ThemeScreen({ onSelect, onBack }: ThemeScreenProps) {
    const [selected, setSelected] = useState<ThemeId>(DEFAULT_THEME_ID);
    const [hovered, setHovered] = useState<ThemeId | null>(null);

    const focusTheme = THEMES.find(t => t.id === (hovered ?? selected))!;

    return (
        <div className="theme-screen">
            {/* Ambient orbs tinted by focused theme */}
            <div
                className="theme-screen__orb theme-screen__orb--a"
                style={{ background: `radial-gradient(circle, ${focusTheme.swatchB}33 0%, transparent 70%)` }}
            />
            <div
                className="theme-screen__orb theme-screen__orb--b"
                style={{ background: `radial-gradient(circle, ${focusTheme.swatchA}44 0%, transparent 70%)` }}
            />

            <div className="theme-screen__content">
                <header className="theme-screen__header">
                    <span className="theme-screen__icon" aria-hidden="true">🎨</span>
                    <h1 className="theme-screen__title">Pick Your Vibe</h1>
                    <p className="theme-screen__subtitle">
                        Each setting has its own look, feel, and soundtrack
                    </p>
                </header>

                <div className="theme-screen__grid">
                    {THEMES.map((theme) => (
                        <ThemeCard
                            key={theme.id}
                            theme={theme}
                            selected={selected === theme.id}
                            onHover={setHovered}
                            onSelect={setSelected}
                        />
                    ))}
                </div>

                {/* Description panel for hovered / selected theme */}
                <div className="theme-screen__desc" key={focusTheme.id}>
                    <span className="theme-screen__desc-emoji">{focusTheme.emoji}</span>
                    <p className="theme-screen__desc-text">{focusTheme.description}</p>
                </div>

                <div className="theme-screen__actions">
                    <button className="theme-screen__back" onClick={onBack}>
                        ← Back
                    </button>
                    <button
                        className="theme-screen__continue"
                        style={{ '--accent': THEMES.find(t => t.id === selected)?.swatchB ?? '#4a9eff' } as React.CSSProperties}
                        onClick={() => onSelect(selected)}
                    >
                        Enter {THEMES.find(t => t.id === selected)?.name} →
                    </button>
                </div>
            </div>
        </div>
    );
}
