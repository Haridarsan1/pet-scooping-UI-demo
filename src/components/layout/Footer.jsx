import React from 'react';

export function Footer({ onOpenSignIn }) {
  return (
    <footer
      style={{
        backgroundColor: 'var(--pk-charcoal)',
        color: 'var(--pk-text-light)',
        borderTop: '1px solid #333338'
      }}
    >
      <div
        className="pk-container"
        style={{
          paddingTop: '64px',
          paddingBottom: '40px'
        }}
      >
        {/* Top grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '40px 24px',
            marginBottom: '48px'
          }}
        >
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 2', minWidth: '240px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true">
                <rect width="40" height="40" rx="10" fill="#FFFFFF" />
                <g fill="#C2415B">
                  <ellipse cx="13" cy="15" rx="3" ry="3.8" />
                  <ellipse cx="20" cy="12" rx="3" ry="3.8" />
                  <ellipse cx="27" cy="15" rx="3" ry="3.8" />
                  <path d="M20 19c-4.6 0-8 4.6-8 8 0 2.4 1.8 3.6 3.9 3.6 1.6 0 2.6-.9 4.1-.9s2.5.9 4.1.9c2.1 0 3.9-1.2 3.9-3.6 0-3.4-3.4-8-8-8z" />
                </g>
              </svg>
              <span
                style={{
                  fontFamily: 'var(--font-brand)',
                  fontWeight: 700,
                  fontSize: '22px',
                  color: 'var(--pk-white)'
                }}
              >
                pawkeep
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: '#A5A2AA', maxWidth: '320px' }}>
              Everything your pet needs. One caring team. America’s all-in-one subscription for yard scooping, litter care, grooming, home vet care, and training.
            </p>
            <div style={{ marginTop: '18px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span className="pk-badge pk-badge-prototype">US Prototype</span>
              <span style={{ fontSize: '12px', color: '#888490' }}>Designed for US Pet Families</span>
            </div>
          </div>

          {/* Column 1: Services */}
          <div>
            <p style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--pk-white)', letterSpacing: '0.05em' }}>
              Services
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li><a href="#services" style={{ color: '#C0BDC6' }}>Yard Waste Removal</a></li>
              <li><a href="#services" style={{ color: '#C0BDC6' }}>Litter Box Care</a></li>
              <li><a href="#services" style={{ color: '#C0BDC6' }}>Pet Grooming</a></li>
              <li><a href="#services" style={{ color: '#C0BDC6' }}>Home Veterinary Care</a></li>
              <li><a href="#services" style={{ color: '#C0BDC6' }}>Pet Training</a></li>
              <li><a href="#farewell" style={{ color: '#F4C7CF', fontWeight: 700 }}>Farewell Care</a></li>
            </ul>
          </div>

          {/* Column 2: Customers */}
          <div>
            <p style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--pk-white)', letterSpacing: '0.05em' }}>
              Customers
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li><a href="#how-it-works" style={{ color: '#C0BDC6' }}>How It Works</a></li>
              <li><a href="#plan" style={{ color: '#C0BDC6' }}>Pricing Calculator</a></li>
              <li><a href="#faq" style={{ color: '#C0BDC6' }}>FAQs</a></li>
              <li><button type="button" onClick={onOpenSignIn} style={{ color: '#C0BDC6', cursor: 'pointer', padding: 0, fontSize: '14px' }}>Member Sign In</button></li>
              <li><a href="#why" style={{ color: '#C0BDC6' }}>Booking Apps vs PawKeep</a></li>
            </ul>
          </div>

          {/* Column 3: Communities */}
          <div>
            <p style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--pk-white)', letterSpacing: '0.05em' }}>
              Communities
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li><a href="#communities" style={{ color: '#C0BDC6' }}>Apartment Partnerships</a></li>
              <li><a href="#communities" style={{ color: '#C0BDC6' }}>HOA Lawn & Waste Care</a></li>
              <li><a href="#communities" style={{ color: '#C0BDC6' }}>Request a Property Quote</a></li>
            </ul>
          </div>

          {/* Column 4: Support & Company */}
          <div>
            <p style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--pk-white)', letterSpacing: '0.05em' }}>
              Support & Legal
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <li><span style={{ color: '#A5A2AA' }}>contact@pawkeep.demo</span></li>
              <li><span style={{ color: '#A5A2AA' }}>1-800-PAWKEEP (Demo)</span></li>
              <li><a href="#faq" style={{ color: '#C0BDC6' }}>Subscription Policy</a></li>
              <li><a href="#faq" style={{ color: '#C0BDC6' }}>Privacy Policy</a></li>
              <li><a href="#faq" style={{ color: '#C0BDC6' }}>Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Veterinary Disclosures */}
        <div
          style={{
            borderTop: '1px solid #333338',
            paddingTop: '24px',
            paddingBottom: '24px',
            fontSize: '13px',
            lineHeight: 1.6,
            color: '#8A8792'
          }}
        >
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Veterinary Regulatory Notice:</strong> All clinical medical veterinary examinations, prescription therapies, diagnostic testing, and in-home euthanasia services are provided exclusively by independently licensed and insured veterinary doctors and partner veterinary clinics authorized in your state. PawKeep operates as a care logistics, scheduling, and subscription platform and does not practice veterinary medicine directly.
          </p>
          <p style={{ margin: 0 }}>
            <strong>Pricing Notice:</strong> All subscription rates, service frequencies, and add-on pricing displayed on this website represent sample prototype configurations for planning and demonstration purposes. Final billing terms are established upon service verification.
          </p>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            borderTop: '1px solid #333338',
            paddingTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            fontSize: '13px',
            color: '#8A8792'
          }}
        >
          <span>© {new Date().getFullYear()} PawKeep Inc. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Built for US Pet Care</span>
            <span>Month-to-month flexibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
