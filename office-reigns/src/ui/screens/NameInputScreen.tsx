import { useState } from 'react';
import type { CharacterNames, Persona } from '../../engine/types';
import { DEFAULT_CHARACTER_NAMES } from '../../engine/utils';
import './NameInputScreen.css';

interface NameInputScreenProps {
    persona: Persona;
    onComplete: (names: CharacterNames) => void;
}

export function NameInputScreen({ persona, onComplete }: NameInputScreenProps) {
    const [names, setNames] = useState<CharacterNames>({
        manager: '',
        lead: '',
        colleague: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Use entered names or fall back to defaults if empty
        const finalNames: CharacterNames = {
            manager: names.manager.trim() || DEFAULT_CHARACTER_NAMES.manager,
            lead: names.lead.trim() || DEFAULT_CHARACTER_NAMES.lead,
            colleague: names.colleague.trim() || DEFAULT_CHARACTER_NAMES.colleague
        };
        onComplete(finalNames);
    };

    const handleSkip = () => {
        onComplete(DEFAULT_CHARACTER_NAMES);
    };

    const getRoleLabel = (role: keyof CharacterNames): string => {
        switch (role) {
            case 'manager':
                switch (persona) {
                    case 'developer': return 'Engineering Manager';
                    case 'product-manager': return 'Group PM';
                    case 'analyst': return 'Analytics Manager';
                    case 'business-associate': return 'Vice President';
                    case 'consultant': return 'Engagement Manager';
                    case 'marketing-manager': return 'Marketing Director';
                    case 'operations-associate': return 'Operations Manager';
                }
            case 'lead':
                switch (persona) {
                    case 'developer': return 'Tech Lead';
                    case 'product-manager': return 'Lead PM';
                    case 'analyst': return 'Senior Analyst';
                    case 'business-associate': return 'Engagement Mgr';
                    case 'consultant': return 'Senior Consultant';
                    case 'marketing-manager': return 'Brand Strategist';
                    case 'operations-associate': return 'Ops Lead';
                }
            case 'colleague':
                switch (persona) {
                    case 'developer': return 'Senior Engineer';
                    case 'product-manager': return 'Data Analyst';
                    case 'analyst': return 'Data Scientist';
                    case 'business-associate': return 'Consultant';
                    case 'consultant': return 'Associate';
                    case 'marketing-manager': return 'Content Strategist';
                    case 'operations-associate': return 'Process Analyst';
                }
        }
    };

    return (
        <div className="name-input-screen">
            <div className="name-input-content">
                <header className="name-input-header">
                    <h2>Meet Your Team</h2>
                    <p>Customize your journey as a {persona.replace('-', ' ')}</p>
                </header>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="manager">{getRoleLabel('manager')}</label>
                        <input
                            type="text"
                            id="manager"
                            placeholder="e.g. Michael Scott"
                            value={names.manager}
                            onChange={(e) => setNames({ ...names, manager: e.target.value })}
                            autoComplete="off"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="lead">{getRoleLabel('lead')}</label>
                        <input
                            type="text"
                            id="lead"
                            placeholder="e.g. Jim Halpert"
                            value={names.lead}
                            onChange={(e) => setNames({ ...names, lead: e.target.value })}
                            autoComplete="off"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="colleague">{getRoleLabel('colleague')}</label>
                        <input
                            type="text"
                            id="colleague"
                            placeholder="e.g. Dwight Schrute"
                            value={names.colleague}
                            onChange={(e) => setNames({ ...names, colleague: e.target.value })}
                            autoComplete="off"
                        />
                    </div>

                    <div className="button-group">
                        <button type="button" className="skip-button" onClick={handleSkip}>
                            Skip (Use Defaults)
                        </button>
                        <button type="submit" className="start-button">
                            Start Career
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
