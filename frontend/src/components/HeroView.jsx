import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { GodRays } from '@paper-design/shaders-react';

export default function HeroView({ isActive, onOpenWorkspace }) {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-12 sm:py-20"
      style={{ background: '#07070a' }}
    >
      {/* ── Noise grain overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.032,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
          zIndex: 1,
        }}
      />

      {/* ── GodRays Background ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <GodRays
          colorBack="#00000000"
          colors={['#5b21b650', '#4f46e550', '#3b0764 38', '#0284c730']}
          colorBloom="#6d28d9"
          offsetX={0.78}
          offsetY={-0.9}
          intensity={0.55}
          spotty={0.5}
          midSize={8}
          midIntensity={0}
          density={0.34}
          bloom={0.28}
          speed={0.45}
          scale={1.7}
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      </div>

      {/* ── Radial vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, #07070a 100%)',
          zIndex: 2,
        }}
      />

      {/* ── Hero Content ── */}
      <div className="relative flex flex-col items-center gap-5 sm:gap-7 text-center" style={{ zIndex: 3 }}>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative' }}
        >
          {/* Subtle title glow plate */}
          <div
            style={{
              position: 'absolute',
              inset: '-24px -32px',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(109,40,217,0.18), transparent 70%)',
              filter: 'blur(18px)',
              pointerEvents: 'none',
            }}
          />
          <h1
            style={{
              fontFamily: "'Syne', 'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(4rem, 14vw, 9rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              background: 'linear-gradient(160deg, #ffffff 30%, rgba(196,181,253,0.7) 80%, rgba(99,102,241,0.5) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              position: 'relative',
              margin: 0,
            }}
          >
            SHINKEI
          </h1>
        </motion.div>

        {/* Kanji + descriptor row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '13px',
            fontFamily: "'JetBrains Mono', monospace",
            color: 'rgba(148,163,184,0.7)',
            letterSpacing: '0.06em',
          }}
        >
          <span style={{ color: 'rgba(196,181,253,0.5)', fontSize: '18px', fontFamily: 'serif', fontWeight: 300 }}>神経</span>
          <span style={{ width: '1px', height: '14px', background: 'rgba(148,163,184,0.2)' }} />
          <span>Execution Flow Visualizer</span>
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '100%',
            maxWidth: '360px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.35), transparent)',
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          style={{
            maxWidth: '420px',
            fontSize: 'clamp(14px, 2.4vw, 16px)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            lineHeight: 1.7,
            color: 'rgba(148,163,184,0.72)',
            margin: 0,
            textAlign: 'center',
          }}
        >
          Trace every execution path from your entry function to all reachable calls.{' '}
          <span style={{ color: 'rgba(196,181,253,0.55)' }}>Zero runtime overhead.</span>{' '}
          Full AST traversal.
        </motion.p>

        {/* CTA */}
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.45, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'relative', marginTop: '8px' }}
            >
              {/* Button glow */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-8px',
                  borderRadius: '100px',
                  background: 'radial-gradient(ellipse at center, rgba(109,40,217,0.4), transparent 70%)',
                  filter: 'blur(12px)',
                  pointerEvents: 'none',
                }}
              />
              <button
                onClick={onOpenWorkspace}
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  height: '52px',
                  padding: '0 28px',
                  borderRadius: '100px',
                  border: '1px solid rgba(139,92,246,0.4)',
                  background: 'linear-gradient(135deg, rgba(109,40,217,0.9) 0%, rgba(79,70,229,0.9) 100%)',
                  backdropFilter: 'blur(8px)',
                  fontSize: '15px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '0.01em',
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  boxShadow: '0 0 0 1px rgba(139,92,246,0.2) inset, 0 8px 32px rgba(109,40,217,0.3)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(139,92,246,0.25) inset, 0 12px 40px rgba(109,40,217,0.45)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(139,92,246,0.2) inset, 0 8px 32px rgba(109,40,217,0.3)';
                }}
                onMouseDown={e => { e.currentTarget.style.transform = 'translateY(1px) scale(0.99)'; }}
                onMouseUp={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
              >
                Start Analyzing
                <ArrowRight style={{ width: '17px', height: '17px', opacity: 0.9 }} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}