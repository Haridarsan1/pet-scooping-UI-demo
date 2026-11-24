import React from 'react';
import { Button } from '../common/Button.jsx';

export function FinalCTA({ onBuildPlan }) {
  return (
    <section
      style={{
        padding: '0 0 90px 0',
        backgroundColor: 'var(--pk-white)'
      }}
    >
      <div className="pk-container">
        <div
          style={{
            position: 'relative',
            borderRadius: '32px',
            backgroundColor: 'var(--pk-coral)',
            color: 'var(--pk-white)',
            padding: 'clamp(36px, 5vw, 68px)',
            overflow: 'hidden',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          {/* Paw Watermark SVG */}
          <svg
            aria-hidden="true"
            width="320"
            height="320"
            viewBox="0 0 40 40"
            style={{
              position: 'absolute',
              right: '-60px',
              top: '-80px',
              opacity: 0.16,
              pointerEvents: 'none'
            }}
          >
            <g fill="#FFFFFF">
              <ellipse cx="13" cy="15" rx="3" ry="3.8" />
              <ellipse cx="20" cy="12" rx="3" ry="3.8" />
              <ellipse cx="27" cy="15" rx="3" ry="3.8" />
              <path d="M20 19c-4.6 0-8 4.6-8 8 0 2.4 1.8 3.6 3.9 3.6 1.6 0 2.6-.9 4.1-.9s2.5.9 4.1.9c2.1 0 3.9-1.2 3.9-3.6 0-3.4-3.4-8-8-8z" />
            </g>
          </svg>

          {/* Headline & supporting text */}
          <div style={{ position: 'relative', maxWidth: '640px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.2)',
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '14px'
              }}
            >
              Simple Month-to-Month Subscription
            </span>

            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-brand)',
                fontWeight: 700,
                fontSize: 'clamp(30px, 3.8vw, 48px)',
                letterSpacing: '-1.6px',
                lineHeight: 1.05
              }}
            >
              Your Pet Deserves Care That’s Easier to Manage.
            </h2>

            <p
              style={{
                margin: '16px 0 0',
                fontSize: '17px',
                lineHeight: 1.6,
                color: '#FBE9EC'
              }}
            >
              Bring everyday pet care together with one simple, personalized PawKeep plan. Yard scooping, litter care, grooming, and licensed vet care on your schedule.
            </p>
          </div>

          {/* Action CTA */}
          <div style={{ position: 'relative' }}>
            <Button
              variant="charcoal"
              size="lg"
              href="#plan"
              onClick={onBuildPlan}
              style={{
                background: 'var(--pk-white)',
                color: 'var(--pk-charcoal)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.18)'
              }}
            >
              Build My Pet's Plan
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
