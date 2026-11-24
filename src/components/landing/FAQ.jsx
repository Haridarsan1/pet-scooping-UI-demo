import React from 'react';
import { SectionHeading } from '../common/SectionHeading.jsx';
import { FAQS } from '../../data/faqs.js';

export function FAQ() {
  return (
    <section
      id="faq"
      style={{
        padding: '90px 0',
        backgroundColor: 'var(--pk-white)'
      }}
    >
      <div className="pk-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            gap: '40px',
            alignItems: 'start'
          }}
          className="bento"
        >
          {/* Left: Heading & Assistance info */}
          <div style={{ gridColumn: 'span 4' }}>
            <SectionHeading
              align="left"
              kicker="Got Questions?"
              title="Frequently Asked Questions"
              subtitle="Everything you need to know about plans, multiple pets, home visits, billing, and partner veterinarians."
              style={{ margin: 0 }}
            />

            <div
              style={{
                marginTop: '32px',
                padding: '20px',
                borderRadius: '18px',
                background: 'var(--pk-cream)',
                border: '1.5px solid var(--pk-border-subtle)'
              }}
            >
              <h4 style={{ margin: '0 0 6px', fontFamily: 'var(--font-brand)', fontSize: '15px' }}>
                Need Personal Guidance?
              </h4>
              <p style={{ margin: '0 0 14px', fontSize: '13px', lineHeight: 1.5, color: 'var(--pk-text-secondary)' }}>
                Our Care Concierge team is happy to answer specific pet care or yard layout questions.
              </p>
              <a
                href="#plan"
                style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  color: 'var(--pk-coral)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                Build a custom quote →
              </a>
            </div>
          </div>

          {/* Right: Accordion Items */}
          <div style={{ gridColumn: 'span 8', borderTop: '1px solid var(--pk-border-subtle)' }}>
            {FAQS.map((faq) => (
              <details
                key={faq.id}
                style={{
                  borderBottom: '1px solid var(--pk-border-subtle)',
                  padding: '6px 0'
                }}
              >
                <summary
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '18px 0',
                    fontSize: '17px',
                    fontWeight: 700,
                    color: 'var(--pk-charcoal)',
                    userSelect: 'none'
                  }}
                >
                  <span>{faq.question}</span>
                  <span
                    className="faq-plus"
                    aria-hidden="true"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'var(--pk-cream)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: 600,
                      flexShrink: 0
                    }}
                  >
                    +
                  </span>
                </summary>

                <div
                  style={{
                    padding: '0 0 20px 0',
                    fontSize: '15px',
                    lineHeight: 1.65,
                    color: 'var(--pk-text-secondary)',
                    maxWidth: '44em'
                  }}
                >
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
