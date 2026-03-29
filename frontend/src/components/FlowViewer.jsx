import { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp, Network } from 'lucide-react';
import FlowGraph from './FlowGraph';

export default function FlowViewer({ flowData, graphData, loading, initialDirection = 'forward', maxSteps = 10 }) {
  const [direction, setDirection] = useState(initialDirection);

  // Sync with form input when it changes
  useEffect(() => {
    setDirection(initialDirection);
  }, [initialDirection]);

  if (loading) return null;

  if (!flowData || flowData.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        gap: '16px',
      }}>
        <Network style={{ width: 32, height: 32, color: '#1e293b', opacity: 0.5 }} />
        <p style={{
          margin: 0,
          color: '#94a3b8',
          fontSize: '14px',
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '0.01em',
        }}>
          No execution flow loaded yet
        </p>
      </div>
    );
  }

  const dirs = [
    { key: 'forward',  label: 'Forward',  Icon: ArrowDown, desc: 'Root → Leaves' },
    { key: 'backward', label: 'Backward', Icon: ArrowUp,   desc: 'Leaves → Root' },
  ];

  return (
    <div className="flow-viewer">
      {/* Direction selector */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        paddingBottom: 16,
      }}>
        <div style={{
          display: 'flex',
          gap: 2,
          background: 'rgba(26,16,53,0.5)',
          border: '1px solid rgba(139,92,246,0.12)',
          borderRadius: 12,
          padding: 3,
          backdropFilter: 'blur(12px)',
        }}>
          {dirs.map(d => {
            const active = direction === d.key;
            return (
              <button
                key={d.key}
                onClick={() => setDirection(d.key)}
                style={{
                  position: 'relative',
                  background: active
                    ? 'linear-gradient(135deg, rgba(109,40,217,0.18), rgba(99,102,241,0.12))'
                    : 'transparent',
                  border: active
                    ? '1px solid rgba(139,92,246,0.3)'
                    : '1px solid transparent',
                  color: active ? '#e2e8f0' : '#64748b',
                  borderRadius: 9,
                  padding: '8px 20px',
                  fontSize: 12,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: active ? 600 : 500,
                  letterSpacing: '0.02em',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.color = '#cbd5e1';
                    e.currentTarget.style.background = 'rgba(139,92,246,0.06)';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.color = '#64748b';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {/* Active indicator glow */}
                {active && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 50% 100%, rgba(139,92,246,0.12), transparent 70%)',
                    pointerEvents: 'none',
                  }} />
                )}
                <d.Icon style={{
                  width: 13, height: 13,
                  opacity: active ? 1 : 0.6,
                  transition: 'opacity 0.2s',
                }} />
                <span>{d.label}</span>
                <span style={{
                  fontSize: 10,
                  opacity: active ? 0.65 : 0.45,
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  marginLeft: 1,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>{d.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      <FlowGraph flowData={graphData} direction={direction} maxSteps={maxSteps} />
    </div>
  );
}