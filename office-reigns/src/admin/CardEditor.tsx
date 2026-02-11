// Card editor with effects editor

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Card, Choice, Effect, PillarType } from '../engine/types';
import { getCard, saveCard } from '../persistence/db';
import './CardEditor.css';

const PILLAR_OPTIONS: PillarType[] = ['bandwidth', 'salary', 'reputation', 'life'];

const createEmptyChoice = (): Choice => ({
    label: '',
    effects: [],
    outcomeText: '',
});

const createEmptyCard = (): Card => ({
    id: `ic-${Date.now()}`,
    track: 'IC',
    tags: [],
    title: '',
    prompt: '',
    leftChoice: createEmptyChoice(),
    rightChoice: createEmptyChoice(),
});

interface EffectEditorProps {
    effects: Effect[];
    onChange: (effects: Effect[]) => void;
}

function EffectEditor({ effects, onChange }: EffectEditorProps) {
    const addEffect = () => {
        onChange([...effects, { pillar: 'bandwidth', delta: 0 }]);
    };

    const removeEffect = (index: number) => {
        onChange(effects.filter((_, i) => i !== index));
    };

    const updateEffect = (index: number, field: keyof Effect, value: string | number) => {
        const newEffects = [...effects];
        if (field === 'delta') {
            const numValue = typeof value === 'string' ? parseInt(value) : value;
            newEffects[index] = { ...newEffects[index], delta: Math.max(-15, Math.min(15, numValue || 0)) };
        } else if (field === 'pillar') {
            newEffects[index] = { ...newEffects[index], pillar: value as PillarType };
        }
        onChange(newEffects);
    };

    return (
        <div className="effect-editor">
            <label className="effect-editor__label">Effects:</label>
            {effects.map((effect, index) => (
                <div key={index} className="effect-editor__row">
                    <select
                        value={effect.pillar}
                        onChange={(e) => updateEffect(index, 'pillar', e.target.value)}
                        className="effect-editor__select"
                    >
                        {PILLAR_OPTIONS.map((p) => (
                            <option key={p} value={p}>
                                {p.charAt(0).toUpperCase() + p.slice(1)}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={effect.delta}
                        onChange={(e) => updateEffect(index, 'delta', e.target.value)}
                        min={-15}
                        max={15}
                        className="effect-editor__input"
                    />
                    <button
                        type="button"
                        onClick={() => removeEffect(index)}
                        className="effect-editor__remove"
                    >
                        ×
                    </button>
                </div>
            ))}
            <button type="button" onClick={addEffect} className="effect-editor__add">
                + Add Effect
            </button>
        </div>
    );
}

interface ChoiceEditorProps {
    label: string;
    choice: Choice;
    onChange: (choice: Choice) => void;
}

function ChoiceEditor({ label, choice, onChange }: ChoiceEditorProps) {
    return (
        <div className="choice-editor">
            <h4 className="choice-editor__title">{label}</h4>
            <div className="choice-editor__field">
                <label>Button Label:</label>
                <input
                    type="text"
                    value={choice.label}
                    onChange={(e) => onChange({ ...choice, label: e.target.value })}
                    placeholder="e.g., Accept the offer"
                />
            </div>
            <div className="choice-editor__field">
                <label>Outcome Text (optional):</label>
                <textarea
                    value={choice.outcomeText || ''}
                    onChange={(e) => onChange({ ...choice, outcomeText: e.target.value })}
                    placeholder="What happens when the player makes this choice..."
                    rows={2}
                />
            </div>
            <EffectEditor
                effects={choice.effects}
                onChange={(effects) => onChange({ ...choice, effects })}
            />
        </div>
    );
}

export function CardEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = id === 'new';

    const [card, setCard] = useState<Card>(createEmptyCard());
    const [tagsInput, setTagsInput] = useState('');
    const [isLoading, setIsLoading] = useState(!isNew);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isNew && id) {
            loadCard(id);
        }
    }, [id, isNew]);

    const loadCard = async (cardId: string) => {
        setIsLoading(true);
        const existingCard = await getCard(cardId);
        if (existingCard) {
            setCard(existingCard);
            setTagsInput(existingCard.tags.join(', '));
        } else {
            setError('Card not found');
        }
        setIsLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!card.id.trim()) {
            setError('Card ID is required');
            return;
        }
        if (!card.prompt.trim()) {
            setError('Prompt is required');
            return;
        }
        if (!card.leftChoice.label.trim() || !card.rightChoice.label.trim()) {
            setError('Both choice labels are required');
            return;
        }

        // Parse tags
        const tags = tagsInput
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t.length > 0);

        await saveCard({ ...card, tags });
        navigate('/admin');
    };

    if (isLoading) {
        return <div className="card-editor__loading">Loading card...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="card-editor">
            <h2 className="card-editor__title">{isNew ? 'Create Card' : 'Edit Card'}</h2>

            {error && <div className="card-editor__error">{error}</div>}

            <div className="card-editor__section">
                <h3>Basic Info</h3>
                <div className="card-editor__field">
                    <label>Card ID:</label>
                    <input
                        type="text"
                        value={card.id}
                        onChange={(e) => setCard({ ...card, id: e.target.value })}
                        disabled={!isNew}
                        placeholder="e.g., ic-001"
                    />
                </div>
                <div className="card-editor__field">
                    <label>Title (optional):</label>
                    <input
                        type="text"
                        value={card.title || ''}
                        onChange={(e) => setCard({ ...card, title: e.target.value })}
                        placeholder="e.g., The Urgent Request"
                    />
                </div>
                <div className="card-editor__field">
                    <label>Prompt:</label>
                    <textarea
                        value={card.prompt}
                        onChange={(e) => setCard({ ...card, prompt: e.target.value })}
                        placeholder="The scenario that the player faces..."
                        rows={4}
                    />
                </div>
                <div className="card-editor__field">
                    <label>Tags (comma-separated):</label>
                    <input
                        type="text"
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        placeholder="e.g., promotion-opportunity, high-stakes"
                    />
                    <small>Use "promotion-opportunity" tag for promotion cards</small>
                </div>
            </div>

            <div className="card-editor__choices">
                <ChoiceEditor
                    label="Left Choice"
                    choice={card.leftChoice}
                    onChange={(leftChoice) => setCard({ ...card, leftChoice })}
                />
                <ChoiceEditor
                    label="Right Choice"
                    choice={card.rightChoice}
                    onChange={(rightChoice) => setCard({ ...card, rightChoice })}
                />
            </div>

            <div className="card-editor__actions">
                <button type="button" onClick={() => navigate('/admin')} className="card-editor__cancel">
                    Cancel
                </button>
                <button type="submit" className="card-editor__save">
                    {isNew ? 'Create Card' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}
