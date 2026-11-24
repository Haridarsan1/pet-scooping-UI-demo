import React from 'react';

export function TestimonialCard({ testimonial }) {
  return (
    <div
      style={{
        borderRadius: '24px',
        background: 'var(--pk-white)',
        border: '1.5px solid var(--pk-border-subtle)',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)',
        position: 'relative'
      }}
    >
      <div>
        {/* Star Rating & Demo Tag */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '3px' }} aria-label={`${testimonial.rating} out of 5 stars`}>
            {[...Array(testimonial.rating)].map((_, i) => (
              <span key={i} style={{ color: '#F5A70A', fontSize: '18px' }}>★</span>
            ))}
          </div>
          {testimonial.isDemo && (
            <span className="pk-badge pk-badge-prototype" style={{ fontSize: '10px' }}>
              Verified Experience
            </span>
          )}
        </div>

        {/* Review Comment */}
        <p
          style={{
            margin: '0 0 20px',
            fontSize: '15px',
            lineHeight: 1.6,
            color: 'var(--pk-text-primary)',
            fontStyle: 'normal'
          }}
        >
          “{testimonial.comment}”
        </p>
      </div>

      {/* Customer profile info */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          paddingTop: '16px',
          borderTop: '1px solid var(--pk-border-subtle)'
        }}
      >
        <img
          src={testimonial.avatar}
          alt={testimonial.customerName}
          loading="lazy"
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid var(--pk-cream)'
          }}
        />
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '15px', color: 'var(--pk-charcoal)' }}>
            {testimonial.customerName}
          </p>
          <p style={{ margin: '2px 0 0', fontSize: '13px', color: 'var(--pk-text-muted)' }}>
            {testimonial.petType} • <span style={{ color: 'var(--pk-coral)', fontWeight: 600 }}>{testimonial.servicesUsed}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
