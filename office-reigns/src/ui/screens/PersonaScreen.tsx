import { useState } from 'react';
import type { Persona } from '../../engine/types';
import './PersonaScreen.css';

interface PersonaScreenProps {
    onSelect: (persona: Persona) => void;
    onBack: () => void;
}

const PERSONAS: { id: Persona; icon: string; name: string; description: string }[] = [
    { id: 'product-manager', icon: '📅', name: 'Product Manager', description: 'Lead products, manage stakeholders' },
    { id: 'developer', icon: '💻', name: 'Developer', description: 'Build features, ship code' },
    { id: 'analyst', icon: '📊', name: 'Analyst', description: 'Crunch data, drive insights' },
    { id: 'business-associate', icon: '💼', name: 'Business Associate', description: 'Drive operations, build relationships' },
    { id: 'consultant', icon: '🧳', name: 'Consultant', description: 'Advise clients, deliver projects' },
    { id: 'marketing-manager', icon: '📣', name: 'Marketer', description: 'Build brands, drive campaigns' },
    { id: 'operations-associate', icon: '⚙️', name: 'Operations Associate', description: 'Optimize processes, keep things running' },
];

export function PersonaScreen({ onSelect, onBack }: PersonaScreenProps) {
    const [selectedPersona, setSelectedPersona] = useState<Persona>('developer');

    return (
        <div className="persona-screen">
            <div className="persona-screen__content">
                <header className="persona-screen__header">
                    <span className="persona-screen__icon">🎭</span>
                    <h1 className="persona-screen__title">Choose Your Role</h1>
                    <p className="persona-screen__subtitle">Each role faces unique challenges and scenarios</p>
                </header>

                <div className="persona-screen__grid">
                    {PERSONAS.map((p) => (
                        <button
                            key={p.id}
                            className={`persona-screen__card ${selectedPersona === p.id ? 'persona-screen__card--selected' : ''}`}
                            onClick={() => setSelectedPersona(p.id)}
                        >
                            <span className="persona-screen__card-icon">{p.icon}</span>
                            <span className="persona-screen__card-name">{p.name}</span>
                            <span className="persona-screen__card-desc">{p.description}</span>
                        </button>
                    ))}
                </div>

                <div className="persona-screen__actions">
                    <button className="persona-screen__back" onClick={onBack}>
                        ← Back
                    </button>
                    <button className="persona-screen__start" onClick={() => onSelect(selectedPersona)}>
                        Continue as {selectedPersona.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} →
                    </button>
                </div>
            </div>
        </div>
    );
}
