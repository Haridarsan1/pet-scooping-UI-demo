import React from 'react';

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = 'center', // 'left' | 'center'
  theme = 'light',  // 'light' | 'dark'
  style = {}
}) {
  const isCenter = align === 'center';
  const isDark = theme === 'dark';

  return (
    <div
      style={{
        textAlign: isCenter ? 'center' : 'left',
        maxWidth: isCenter ? '760px' : '640px',
        margin: isCenter ? '0 auto 48px auto' : '0 0 40px 0',
        ...style
      }}
    >
      {kicker && (
        <div style={{ marginBottom: '14px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              background: isDark ? 'rgba(255, 255, 255, 0.12)' : 'var(--pk-coral-light)',
              color: isDark ? 'var(--pk-blush)' : 'var(--pk-coral)'
            }}
          >
            {kicker}
          </span>
        </div>
      )}

      <h2
        style={{
          margin: 0,
          fontFamily: 'var(--font-brand)',
          fontWeight: 700,
          fontSize: 'clamp(28px, 3.4vw, 44px)',
          lineHeight: 1.1,
          letterSpacing: '-1.4px',
          color: isDark ? 'var(--pk-white)' : 'var(--pk-charcoal)'
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          style={{
            margin: '16px 0 0',
            fontSize: '18px',
            lineHeight: 1.6,
            color: isDark ? 'var(--pk-text-light)' : 'var(--pk-text-secondary)',
            maxWidth: '38em',
            marginLeft: isCenter ? 'auto' : 0,
            marginRight: isCenter ? 'auto' : 0
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
