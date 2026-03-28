import { useState } from 'react';
import FlowGraph from './FlowGraph';

export default function FlowViewer({ flowData, graphData, loading }) {
  const [direction, setDirection] = useState('forward');

  if (loading) return null;

  if (!flowData || flowData.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">⬡</div>
        <p className="empty-label">No execution flow loaded yet</p>
      </div>
    );
  }

  return (
    <div className="flow-viewer">

      {/* GRAPH heading + forward/backward subheadings */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        paddingBottom: 12,
      }}>
        <span style={{
          fontSize: 18,
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 700,
          letterSpacing: '0.18em',
          color: '#94a3b8',
          textTransform: 'uppercase',
        }}>
          Graph
        </span>

        <div style={{ display: 'flex', gap: 4 }}>
          {['forward', 'backward'].map(dir => (
            <button
              key={dir}
              onClick={() => setDirection(dir)}
              style={{
                background:    direction === dir ? 'rgba(99,102,241,0.15)' : 'transparent',
                border:        direction === dir ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(71,85,105,0.25)',
                color:         direction === dir ? '#818cf8' : '#475569',
                borderRadius:  8,
                padding:       '10px 36px',
                fontSize:      16,
                fontFamily:    'JetBrains Mono, monospace',
                letterSpacing: '0.1em',
                cursor:        'pointer',
                transition:    'all 0.2s ease',
              }}
            >
              {dir}
            </button>
          ))}
        </div>
      </div>

      <FlowGraph flowData={graphData} direction={direction} />
    </div>
  );
}