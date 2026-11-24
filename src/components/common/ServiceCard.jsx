import React from 'react';
import { Button } from './Button.jsx';

export function ServiceCard({ service, onLearnMore, onAddToPlan }) {
  const isDogOnly = service.targetPet === 'dog';
  const isCatOnly = service.targetPet === 'cat';

  return (
    <div
      style={{
        borderRadius: '24px',
        background: 'var(--pk-white)',
        border: '1.5px solid var(--pk-border-subtle)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all 0.25s ease',
        position: 'relative'
      }}
      className="pk-service-card"
    >
      {/* Service Image with Badges */}
      <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden' }}>
        <img
          src={service.image}
          alt={service.imageAlt || service.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          className="pk-card-img"
        />
        <div
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap'
          }}
        >
          <span
            style={{
              padding: '4px 10px',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              background: isDogOnly ? '#EEF5EF' : isCatOnly ? '#EEF2FB' : '#FFF0F3',
              color: isDogOnly ? '#2B6A3E' : isCatOnly ? '#1C4FB8' : 'var(--pk-coral)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}
          >
            {service.targetPetLabel}
          </span>
          {service.badge && (
            <span
              style={{
                padding: '4px 10px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 800,
                background: 'rgba(35, 35, 38, 0.85)',
                color: 'var(--pk-white)',
                backdropFilter: 'blur(4px)'
              }}
            >
              {service.badge}
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3
          style={{
            margin: 0,
            fontFamily: 'var(--font-brand)',
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--pk-charcoal)',
            letterSpacing: '-0.5px'
          }}
        >
          {service.title}
        </h3>

        <p style={{ margin: '8px 0 16px', fontSize: '14px', lineHeight: 1.5, color: 'var(--pk-text-secondary)', flex: '0 0 auto' }}>
          {service.shortDescription}
        </p>

        {/* Key Benefits List */}
        <div style={{ margin: '0 0 20px', flex: 1 }}>
          <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--pk-text-muted)', letterSpacing: '0.05em' }}>
            What’s Included
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--pk-text-primary)' }}>
            {service.benefits.slice(0, 3).map((benefit, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: 'var(--pk-coral)', fontWeight: 800, flexShrink: 0 }}>✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing Explanation */}
        <div
          style={{
            padding: '10px 14px',
            borderRadius: '12px',
            background: 'var(--pk-cream)',
            fontSize: '12px',
            color: 'var(--pk-text-secondary)',
            marginBottom: '18px',
            lineHeight: 1.4
          }}
        >
          <strong>Pricing:</strong> {service.pricingExplanation}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onLearnMore(service)}
            style={{ flex: 1 }}
          >
            Learn More
          </Button>

          {service.isSubscriptionService && onAddToPlan ? (
            <Button
              variant="charcoal"
              size="sm"
              href="#plan"
              onClick={() => onAddToPlan(service)}
              style={{ flex: 1 }}
            >
              Add to Plan
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              href="#farewell"
              style={{ flex: 1 }}
            >
              Learn More
            </Button>
          )}
        </div>
      </div>

      <style>{`
        .pk-service-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--pk-border-strong);
        }
        .pk-service-card:hover .pk-card-img {
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
}
