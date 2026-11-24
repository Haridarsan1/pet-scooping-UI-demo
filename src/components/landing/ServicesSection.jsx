import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading.jsx';
import { ServiceCard } from '../common/ServiceCard.jsx';
import { SERVICES } from '../../data/services.js';

export function ServicesSection({ onLearnMore, onSelectInPlan }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'dog' | 'cat'

  const filteredServices = SERVICES.filter(service => {
    if (filter === 'all') return true;
    if (filter === 'dog') return service.targetPet === 'dog' || service.targetPet === 'both';
    if (filter === 'cat') return service.targetPet === 'cat' || service.targetPet === 'both';
    return true;
  });

  return (
    <section
      id="services"
      style={{
        padding: '90px 0',
        backgroundColor: 'var(--pk-white)'
      }}
    >
      <div className="pk-container">
        <SectionHeading
          kicker="Our Services"
          title="Complete Care for Dogs and Cats. All in One Plan."
          subtitle="Explore our dedicated services. Yard scooping and cat litter care are managed as distinct, specialized services with appropriate tools and care routines."
        />

        {/* Pet Filter Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '44px'
          }}
        >
          <button
            type="button"
            onClick={() => setFilter('all')}
            style={{
              padding: '10px 22px',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              background: filter === 'all' ? 'var(--pk-charcoal)' : 'var(--pk-cream)',
              color: filter === 'all' ? 'var(--pk-white)' : 'var(--pk-charcoal)',
              transition: 'all 0.18s ease'
            }}
          >
            All 6 Services
          </button>
          <button
            type="button"
            onClick={() => setFilter('dog')}
            style={{
              padding: '10px 22px',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              background: filter === 'dog' ? 'var(--pk-charcoal)' : 'var(--pk-cream)',
              color: filter === 'dog' ? 'var(--pk-white)' : 'var(--pk-charcoal)',
              transition: 'all 0.18s ease'
            }}
          >
            🐶 Dog Services
          </button>
          <button
            type="button"
            onClick={() => setFilter('cat')}
            style={{
              padding: '10px 22px',
              borderRadius: '999px',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              background: filter === 'cat' ? 'var(--pk-charcoal)' : 'var(--pk-cream)',
              color: filter === 'cat' ? 'var(--pk-white)' : 'var(--pk-charcoal)',
              transition: 'all 0.18s ease'
            }}
          >
            🐱 Cat Services
          </button>
        </div>

        {/* Services Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '28px'
          }}
        >
          {filteredServices.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              onLearnMore={onLearnMore}
              onAddToPlan={onSelectInPlan}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
