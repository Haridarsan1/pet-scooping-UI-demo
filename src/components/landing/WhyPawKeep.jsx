import React from 'react';
import { SectionHeading } from '../common/SectionHeading.jsx';
import { Button } from '../common/Button.jsx';

export function WhyPawKeep({ onBuildPlan }) {
  const comparisonItems = [
    {
      feature: 'Caregiver Familiarity',
      bookingApps: 'Whoever is free that day; random stranger each booking',
      pawKeep: 'The same dedicated local caretaker every visit'
    },
    {
      feature: 'Scheduling Effort',
      bookingApps: 'Search profiles, message sitters, and re-book every time',
      pawKeep: 'Set once on your chosen cadence; repeats automatically'
    },
    {
      feature: 'Yard Scooping & Waste',
      bookingApps: 'Rarely offered; must find an unrelated lawn scoop service',
      pawKeep: 'Included in your plan with photo gate latch verification'
    },
    {
      feature: 'Preventative Veterinary Care',
      bookingApps: 'Not offered; requires car trips & clinic waiting rooms',
      pawKeep: 'Home wellness visits by state-licensed partner veterinarians'
    },
    {
      feature: 'Cat Litter Box Maintenance',
      bookingApps: 'Treated as an afterthought or extra pet sitting fee',
      pawKeep: 'Dedicated weekly sanitation & complete litter refresh'
    },
    {
      feature: 'Billing & Subscriptions',
      bookingApps: 'Pay per booking with fluctuating surge fees & app surcharges',
      pawKeep: 'One transparent monthly subscription invoice with zero hidden fees'
    }
  ];

  return (
    <section
      id="why"
      style={{
        padding: '90px 0',
        backgroundColor: 'var(--pk-white)'
      }}
    >
      <div className="pk-container">
        <SectionHeading
          kicker="Why PawKeep"
          title="Less Coordination. More Care. That’s PawKeep."
          subtitle="Booking apps find you a temporary sitter. PawKeep gives you a dedicated, coordinated care team who knows your pet by name."
        />

        {/* 2-Column Comparison Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            gap: '24px',
            alignItems: 'stretch'
          }}
          className="bento"
        >
          {/* Left Column: Fragmented Booking Apps */}
          <div
            style={{
              gridColumn: 'span 5',
              borderRadius: '28px',
              background: 'var(--pk-cream)',
              padding: '36px 30px',
              border: '1.5px solid var(--pk-border-subtle)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--pk-text-muted)', letterSpacing: '0.05em' }}>
                The Old Way
              </span>
              <h3
                style={{
                  margin: '6px 0 0',
                  fontFamily: 'var(--font-brand)',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: 'var(--pk-text-secondary)'
                }}
              >
                Fragmented Apps & Sitters
              </h3>
            </div>

            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              {comparisonItems.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    paddingBottom: '14px',
                    borderBottom: '1px solid var(--pk-border-subtle)',
                    fontSize: '14px',
                    lineHeight: 1.5,
                    color: 'var(--pk-text-secondary)'
                  }}
                >
                  <strong style={{ display: 'block', color: 'var(--pk-charcoal)', marginBottom: '4px' }}>
                    {item.feature}:
                  </strong>
                  <span style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: '#9A979E', fontWeight: 800 }}>✕</span>
                    <span>{item.bookingApps}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Coordinated PawKeep Experience */}
          <div
            style={{
              gridColumn: 'span 7',
              borderRadius: '28px',
              background: 'var(--pk-charcoal)',
              color: 'var(--pk-white)',
              padding: '36px 32px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            {/* Glow accent */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '-100px',
                right: '-80px',
                width: '360px',
                height: '360px',
                borderRadius: '50%',
                background: 'var(--pk-coral)',
                filter: 'blur(100px)',
                opacity: 0.35,
                pointerEvents: 'none'
              }}
            />

            <div style={{ position: 'relative', marginBottom: '24px' }}>
              <span className="pk-badge pk-badge-coral" style={{ marginBottom: '8px' }}>
                The PawKeep Model
              </span>
              <h3
                style={{
                  margin: '6px 0 0',
                  fontFamily: 'var(--font-brand)',
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--pk-white)'
                }}
              >
                One Coordinated Subscription
              </h3>
            </div>

            <ul style={{ position: 'relative', listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              {comparisonItems.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    paddingBottom: '14px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                    fontSize: '14px',
                    lineHeight: 1.5,
                    color: '#E7E4E9'
                  }}
                >
                  <strong style={{ display: 'block', color: 'var(--pk-blush)', marginBottom: '4px' }}>
                    {item.feature}:
                  </strong>
                  <span style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: 'var(--pk-blush)', fontWeight: 800 }}>✓</span>
                    <span style={{ fontWeight: 600 }}>{item.pawKeep}</span>
                  </span>
                </li>
              ))}
            </ul>

            {/* Quality Promise Callout */}
            <div
              style={{
                position: 'relative',
                marginTop: '24px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '18px',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px'
              }}
            >
              <div style={{ flex: '1 1 240px' }}>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--pk-blush)' }}>The PawKeep Care Guarantee:</strong> If any yard visit or grooming session is not 100% satisfactory, your caretaker returns within 24 hours to make it right, free.
                </p>
              </div>
              <Button variant="secondary" size="md" href="#plan" onClick={onBuildPlan}>
                Build Your Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
