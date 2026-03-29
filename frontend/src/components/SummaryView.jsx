import { Sparkles } from 'lucide-react';

export default function SummaryView({ summary, typing, accentColor }) {
  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '20px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>
      {/* Purpose — uses typing animation */}
      <div style={{
        background: 'rgba(139,92,246,0.06)',
        border: '1px solid rgba(139,92,246,0.12)',
        borderRadius: 12,
        padding: '14px 16px',
      }}>
        <div style={{
          fontSize: 9,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: accentColor,
          marginBottom: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          <Sparkles style={{ width: 11, height: 11 }} />
          Purpose
        </div>
        <div style={{
          fontSize: 13,
          color: '#e2e8f0',
          lineHeight: 1.6,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
        }}>
          {typing}
          <span style={{
            display: typing.length < summary.purpose.length ? 'inline-block' : 'none',
            width: 2,
            height: 14,
            background: accentColor,
            marginLeft: 1,
            animation: 'cursor-blink 0.8s step-end infinite',
            verticalAlign: 'text-bottom',
          }} />
        </div>
      </div>

      {/* Key Details */}
      {summary.details && summary.details.length > 0 && (
        <div>
          <div style={{
            fontSize: 9,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#64748b',
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            ▸ Key Details
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {summary.details.map((d, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                fontSize: 12,
                color: '#94a3b8',
                lineHeight: 1.5,
                fontFamily: "'Inter', sans-serif",
              }}>
                <span style={{
                  color: '#334155',
                  fontSize: 8,
                  marginTop: 5,
                  flexShrink: 0,
                }}>●</span>
                {d}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Calls */}
      {summary.calls && summary.calls.length > 0 && (
        <div>
          <div style={{
            fontSize: 9,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#64748b',
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            ↗ Functions Called
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {summary.calls.map((c, i) => (
              <span key={i} style={{
                fontSize: 11,
                fontFamily: "'JetBrains Mono', monospace",
                color: '#c4b5fd',
                background: 'rgba(139,92,246,0.08)',
                border: '1px solid rgba(139,92,246,0.15)',
                borderRadius: 6,
                padding: '3px 10px',
                fontWeight: 500,
              }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Bottom row: Complexity + Side Effects */}
      <div style={{
        display: 'flex',
        gap: 12,
        marginTop: 4,
      }}>
        {/* Complexity */}
        <div style={{
          flex: 1,
          background: 'rgba(15,23,42,0.5)',
          border: '1px solid rgba(71,85,105,0.15)',
          borderRadius: 10,
          padding: '10px 14px',
        }}>
          <div style={{
            fontSize: 9,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#475569',
            marginBottom: 4,
            fontFamily: "'JetBrains Mono', monospace",
          }}>Complexity</div>
          <div style={{
            fontSize: 13,
            fontWeight: 600,
            color: summary.complexity === 'Low' ? '#34d399' :
                   summary.complexity === 'Medium' ? '#fbbf24' : '#f87171',
            fontFamily: "'Inter', sans-serif",
          }}>{summary.complexity}</div>
        </div>

        {/* Side Effects */}
        <div style={{
          flex: 1,
          background: 'rgba(15,23,42,0.5)',
          border: '1px solid rgba(71,85,105,0.15)',
          borderRadius: 10,
          padding: '10px 14px',
        }}>
          <div style={{
            fontSize: 9,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#475569',
            marginBottom: 4,
            fontFamily: "'JetBrains Mono', monospace",
          }}>Side Effects</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {summary.sideEffects.map((s, i) => (
              <span key={i} style={{
                fontSize: 11,
                color: '#94a3b8',
                fontFamily: "'Inter', sans-serif",
              }}>⚡ {s}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
