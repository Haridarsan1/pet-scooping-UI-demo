import React from 'react';
import { Button } from '../common/Button.jsx';

export function PlanSummary({
  pricing,
  onProceedToCheckout
}) {
  const { lines, monthlyTotal, activeServicesCount, petName, petType } = pricing;
  const label = petName ? `${petName}’s Plan` : 'Your Personalized Plan';

  return (
    <aside
      aria-label="Subscription plan summary"
      style={{
        borderRadius: '28px',
        background: 'var(--pk-charcoal)',
        color: 'var(--pk-white)',
        padding: '34px 30px',
        position: 'relative',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Decorative Ticket Notches */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-14px',
          top: '160px',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'var(--pk-coral-light)'
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-14px',
          top: '160px',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'var(--pk-coral-light)'
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: 'var(--pk-blush)' }}>
          {label}
        </p>
        <span className="pk-badge pk-badge-prototype" style={{ fontSize: '10px' }}>
          Prototype Pricing
        </span>
      </div>

      <div style={{ margin: '14px 0 6px 0' }}>
        <span
          style={{
            fontFamily: 'var(--font-brand)',
            fontWeight: 700,
            fontSize: '56px',
            letterSpacing: '-2px',
            lineHeight: 1
          }}
        >
          ${monthlyTotal}
        </span>
        <span style={{ fontSize: '16px', color: '#D8D5DA', marginLeft: '6px' }}>/month</span>
      </div>

      <p style={{ margin: 0, fontSize: '13px', color: '#D8D5DA' }}>
        Billed monthly after your first completed visit.
      </p>

      {/* Dashed line */}
      <div
        aria-hidden="true"
        style={{
          margin: '24px 0 20px',
          borderTop: '2px dashed rgba(255, 255, 255, 0.2)'
        }}
      />

      {/* Itemized Line Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '120px', flex: 1 }}>
        {lines.length === 0 ? (
          <p style={{ margin: 0, fontSize: '14px', color: '#B5B2B9', lineHeight: 1.5 }}>
            Pick at least one service from the builder to see your personalized monthly breakdown.
          </p>
        ) : (
          lines.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '12px',
                fontSize: '14px'
              }}
            >
              <div>
                <span style={{ color: '#F8F5F1', fontWeight: 600 }}>{item.service}</span>
                <div style={{ fontSize: '11px', color: '#A5A2AA' }}>{item.detail}</div>
              </div>
              <span style={{ fontWeight: 800, color: 'var(--pk-white)', flexShrink: 0 }}>
                ${item.monthlyAmount}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Prototype Notice */}
      <div
        style={{
          marginTop: '20px',
          marginBottom: '20px',
          padding: '10px 14px',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.08)',
          fontSize: '11px',
          lineHeight: 1.4,
          color: '#B5B2B9'
        }}
      >
        Rates are sample prototype configurations. You can adjust frequency or pause visits anytime in your app.
      </div>

      {/* Checkout CTA */}
      <Button
        variant="primary"
        size="lg"
        disabled={lines.length === 0}
        onClick={onProceedToCheckout}
        style={{ width: '100%' }}
      >
        {monthlyTotal > 0 ? `Review & Subscribe ($${monthlyTotal}/mo)` : 'Select Services to Continue'}
      </Button>
    </aside>
  );
}
