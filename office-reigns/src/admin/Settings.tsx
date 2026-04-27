// Settings editor for promotion criteria

import { useState, useEffect } from 'react';
import type { PromotionSettings } from '../engine/types';
import { DEFAULT_PROMOTION_SETTINGS } from '../engine/types';
import { getPromotionSettings, savePromotionSettings } from '../persistence/db';
import './Settings.css';

export function Settings() {
    const [settings, setSettings] = useState<PromotionSettings>(DEFAULT_PROMOTION_SETTINGS);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        const currentSettings = await getPromotionSettings();
        setSettings(currentSettings);
    };

    const handleSave = async () => {
        await savePromotionSettings(settings);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="settings">
            <h2 className="settings__title">Game Settings</h2>

            <div className="settings__section">
                <h3>Promotion Criteria</h3>
                <p className="settings__description">
                    Configure when a player becomes eligible for promotion.
                </p>

                <div className="settings__field">
                    <label>Minimum Week:</label>
                    <input
                        type="number"
                        value={settings.minWeek}
                        onChange={(e) =>
                            setSettings({ ...settings, minWeek: parseInt(e.target.value) || 1 })
                        }
                        min={1}
                        max={104}
                    />
                    <small>Player must reach this week before being eligible</small>
                </div>

                <div className="settings__field">
                    <label>Pillars Above 70%:</label>
                    <input
                        type="number"
                        value={settings.minPillarsAbove60}
                        onChange={(e) =>
                            setSettings({ ...settings, minPillarsAbove60: parseInt(e.target.value) || 0 })
                        }
                        min={0}
                        max={4}
                    />
                    <small>Number of pillars that must be above 70%</small>
                </div>

                <div className="settings__field">
                    <label>Max Pillars Below 30%:</label>
                    <input
                        type="number"
                        value={settings.maxPillarsBelow30}
                        onChange={(e) =>
                            setSettings({ ...settings, maxPillarsBelow30: parseInt(e.target.value) || 0 })
                        }
                        min={0}
                        max={4}
                    />
                    <small>Maximum allowed pillars below 30% (0 = none allowed)</small>
                </div>
            </div>

            <div className="settings__section">
                <h3>Promotion Mode</h3>
                <p className="settings__description">
                    Choose when promotion actually triggers after eligibility is met.
                </p>

                <div className="settings__radio-group">
                    <label className="settings__radio">
                        <input
                            type="radio"
                            checked={settings.mode === 'card-only'}
                            onChange={() => setSettings({ ...settings, mode: 'card-only' })}
                        />
                        <span className="settings__radio-label">
                            <strong>Promotion Opportunity Cards Only</strong>
                            <small>Player must draw a promotion card while eligible</small>
                        </span>
                    </label>
                    <label className="settings__radio">
                        <input
                            type="radio"
                            checked={settings.mode === 'immediate'}
                            onChange={() => setSettings({ ...settings, mode: 'immediate' })}
                        />
                        <span className="settings__radio-label">
                            <strong>Immediate Promotion</strong>
                            <small>Promote as soon as eligibility criteria are met</small>
                        </span>
                    </label>
                </div>
            </div>

            <div className="settings__actions">
                <button onClick={handleSave} className="settings__save">
                    {saved ? '✓ Saved!' : 'Save Settings'}
                </button>
            </div>
        </div>
    );
}
