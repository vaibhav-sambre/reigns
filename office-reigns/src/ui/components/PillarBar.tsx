// Pillar bar — animated fill, delta float, critical pulse

import { useEffect, useRef, useState } from 'react';
import { getPillarStatus, type PillarType, type PillarStatus } from '../../engine/types';
import { PILLAR_LABELS, PILLAR_EMOJIS } from '../constants';
import './PillarBar.css';

interface PillarBarProps {
    pillar: PillarType;
    value: number;
}

const STATUS_COLORS: Record<PillarStatus, string> = {
    Critical:  '#ef4444',
    Low:       '#f97316',
    OK:        '#eab308',
    High:      '#22c55e',
    Dominant:  '#4a9eff',
};

export function PillarBar({ pillar, value }: PillarBarProps) {
    const status     = getPillarStatus(value);
    const color      = STATUS_COLORS[status];
    const percentage = Math.max(0, Math.min(100, value));

    // Delta float — track previous value to compute delta
    const prevValue  = useRef<number | null>(null);
    const [delta, setDelta]     = useState<number | null>(null);
    const [deltaKey, setDeltaKey] = useState(0); // remount delta span to re-trigger animation

    useEffect(() => {
        if (prevValue.current !== null && prevValue.current !== value) {
            const diff = value - prevValue.current;
            setDelta(diff);
            setDeltaKey(k => k + 1);
            // Clear after animation ends
            const id = setTimeout(() => setDelta(null), 1300);
            return () => clearTimeout(id);
        }
        prevValue.current = value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    // Keep prevValue in sync without triggering delta on first render
    useEffect(() => { prevValue.current = value; }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const statusClass = status.toLowerCase(); // 'critical' | 'low' | 'ok' | 'high' | 'dominant'

    return (
        <div className={`pillar-bar pillar-bar--${statusClass}`}>
            <div className="pillar-bar__header">
                <div className="pillar-bar__meta">
                    <span className="pillar-bar__emoji">{PILLAR_EMOJIS[pillar]}</span>
                    <span className="pillar-bar__label">{PILLAR_LABELS[pillar]}</span>
                </div>
                <div className="pillar-bar__right">
                    <span className="pillar-bar__value">{Math.round(percentage)}</span>
                    <span
                        className="pillar-bar__status"
                        style={{ color, borderColor: `${color}55` }}
                    >
                        {status}
                    </span>
                </div>
            </div>

            <div className="pillar-bar__track">
                <div
                    className="pillar-bar__fill"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: color,
                        '--bar-color': color,
                    } as React.CSSProperties}
                />

                {/* Threshold markers */}
                <div className="pillar-bar__markers">
                    <div className="pillar-bar__marker" style={{ left: '20%' }} />
                    <div className="pillar-bar__marker pillar-bar__marker--danger" style={{ left: '30%' }} />
                    <div className="pillar-bar__marker" style={{ left: '50%' }} />
                    <div className="pillar-bar__marker pillar-bar__marker--promo" style={{ left: '70%' }} />
                    <div className="pillar-bar__marker" style={{ left: '80%' }} />
                </div>

                {/* Delta float */}
                {delta !== null && (
                    <span
                        key={deltaKey}
                        className={`pillar-bar__delta pillar-bar__delta--${delta >= 0 ? 'positive' : 'negative'}`}
                    >
                        {delta >= 0 ? '+' : ''}{Math.round(delta)}
                    </span>
                )}
            </div>
        </div>
    );
}
