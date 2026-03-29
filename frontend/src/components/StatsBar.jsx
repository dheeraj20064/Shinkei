import { useState, useEffect } from 'react';
import { Layers, Monitor, Server, Zap } from 'lucide-react';

function AnimatedNumber({ value, delay = 0 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 700;
      const startTime = performance.now();

      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return display;
}

const STAT_CONFIG = [
  {
    key: 'total',
    label: 'Total Nodes',
    color: '#a78bfa',
    bgAlpha: '0.06',
    borderAlpha: '0.12',
    glowColor: 'rgba(167,139,250,0.12)',
    Icon: Layers,
  },
  {
    key: 'frontend',
    label: 'Frontend',
    color: '#60a5fa',
    bgAlpha: '0.06',
    borderAlpha: '0.12',
    glowColor: 'rgba(96,165,250,0.12)',
    Icon: Monitor,
  },
  {
    key: 'backend',
    label: 'Backend',
    color: '#34d399',
    bgAlpha: '0.06',
    borderAlpha: '0.12',
    glowColor: 'rgba(52,211,153,0.12)',
    Icon: Server,
  },
  {
    key: 'api',
    label: 'API Calls',
    color: '#fbbf24',
    bgAlpha: '0.06',
    borderAlpha: '0.12',
    glowColor: 'rgba(251,191,36,0.12)',
    Icon: Zap,
  },
];

export default function StatsBar({ flow }) {
  const values = {
    total: flow.length,
    frontend: flow.filter(
      s => ['event', 'function'].includes(s.type) &&
        !s.file.includes('Controller') &&
        !s.file.includes('Service') &&
        !s.file.includes('routes')
    ).length,
    backend: flow.filter(
      s => s.file && (
        s.file.includes('Controller') ||
        s.file.includes('Service') ||
        s.file.includes('routes')
      )
    ).length,
    api: flow.filter(s => s.type === 'api').length,
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '8px',
      marginBottom: '12px',
    }}>
      {STAT_CONFIG.map((s, i) => (
        <div
          key={s.key}
          style={{
            position: 'relative',
            background: 'rgba(26,16,53,0.5)',
            border: `1px solid ${s.color}${Math.round(parseFloat(s.borderAlpha) * 255).toString(16).padStart(2, '0')}`,
            borderRadius: '12px',
            padding: '14px 12px 12px',
            textAlign: 'center',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
            cursor: 'default',
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = s.color + '45';
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = `0 8px 24px -4px ${s.glowColor}`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = s.color + Math.round(parseFloat(s.borderAlpha) * 255).toString(16).padStart(2, '0');
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Top glow accent */}
          <div style={{
            position: 'absolute',
            top: '-1px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40px',
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${s.color}50, transparent)`,
            borderRadius: '0 0 4px 4px',
          }} />

          {/* Icon */}
          <div style={{
            marginBottom: '8px',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <s.Icon style={{
              width: 14, height: 14,
              color: s.color,
              opacity: 0.45,
            }} />
          </div>

          {/* Value */}
          <div style={{
            fontSize: '24px',
            fontWeight: 800,
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1,
            color: s.color,
            position: 'relative',
          }}>
            <AnimatedNumber value={values[s.key]} delay={i * 80 + 250} />
          </div>

          {/* Label */}
          <div style={{
            fontSize: '10px',
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginTop: '7px',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 600,
          }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
