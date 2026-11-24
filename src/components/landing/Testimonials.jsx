import React from 'react';
import { SectionHeading } from '../common/SectionHeading.jsx';
import { TestimonialCard } from '../common/TestimonialCard.jsx';
import { TESTIMONIALS } from '../../data/testimonials.js';

export function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        padding: '90px 0',
        backgroundColor: 'var(--pk-cream)'
      }}
    >
      <div className="pk-container">
        <SectionHeading
          kicker="Customer Stories"
          title="Loved by Busy Pet Parents Across the Nation"
          subtitle="Read how dog and cat families simplify their daily lives with coordinated care. Note: All customer quotes shown represent sample demonstration experiences."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '36px'
          }}
        >
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Clear Demonstration Note */}
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            textAlign: 'center',
            fontSize: '13px',
            color: 'var(--pk-text-muted)'
          }}
        >
          Customer feedback illustrates typical multi-pet service scenarios under PawKeep subscription management.
        </div>
      </div>
    </section>
  );
}
