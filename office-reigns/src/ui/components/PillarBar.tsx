// Pillar status bar component with qualitative labels

import { getPillarStatus, type PillarType, type PillarStatus } from '../../engine/types';
import './PillarBar.css';

interface PillarBarProps {
    pillar: PillarType;
    value: number;
}

const PILLAR_LABELS: Record<PillarType, string> = {
    bandwidth: 'Bandwidth',
    salary: 'Salary',
    reputation: 'Reputation',
    life: 'Life',
};

const STATUS_COLORS: Record<PillarStatus, string> = {
    Critical: '#ef4444',
    Low: '#f97316',
    OK: '#eab308',
    High: '#22c55e',
    Dominant: '#3b82f6',
};

export function PillarBar({ pillar, value }: PillarBarProps) {
    const status = getPillarStatus(value);
    const color = STATUS_COLORS[status];
    const percentage = Math.max(0, Math.min(100, value));

    return (
        <div className="pillar-bar">
            <div className="pillar-bar__header">
                <span className="pillar-bar__label">{PILLAR_LABELS[pillar]}</span>
                <span
                    className="pillar-bar__status"
                    style={{ color }}
                >
                    {status}
                </span>
            </div>
            <div className="pillar-bar__track">
                <div
                    className="pillar-bar__fill"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: color,
                    }}
                />
                <div className="pillar-bar__markers">
                    <div className="pillar-bar__marker" style={{ left: '20%' }} />
                    <div className="pillar-bar__marker" style={{ left: '40%' }} />
                    <div className="pillar-bar__marker" style={{ left: '60%' }} />
                    <div className="pillar-bar__marker" style={{ left: '80%' }} />
                </div>
            </div>
        </div>
    );
}
