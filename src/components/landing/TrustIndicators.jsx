import React from 'react';

export function TrustIndicators() {
  const indicators = [
    {
      icon: '🛡️',
      title: 'Coordinated Care',
      description: 'One dedicated local team handles scheduling, gates, and routine visits.'
    },
    {
      icon: '🔄',
      title: 'Flexible Plans',
      description: 'Month-to-month subscription. Adjust services, change frequency, or pause anytime.'
    },
    {
      icon: '🩺',
      title: 'Licensed Professionals',
      description: 'Clinical medical checkups provided exclusively by state-licensed partner veterinarians.'
    },
    {
      icon: '📱',
      title: 'Convenient Scheduling',
      description: 'Photo gate verification, arrival alerts, and central digital visit history.'
    }
  ];

  return (
    <section
      style={{
        backgroundColor: 'var(--pk-white)',
        borderTop: '1px solid var(--pk-border-subtle)',
        borderBottom: '1px solid var(--pk-border-subtle)',
        padding: '36px 0'
      }}
    >
      <div className="pk-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px 32px'
          }}
        >
          {indicators.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px'
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '14px',
                  background: 'var(--pk-cream)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  flexShrink: 0
                }}
              >
                {item.icon}
              </div>
              <div>
                <h4
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-brand)',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--pk-charcoal)',
                    letterSpacing: '-0.3px'
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    margin: '4px 0 0',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    color: 'var(--pk-text-secondary)'
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
