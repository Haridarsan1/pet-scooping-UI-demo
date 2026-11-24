import React from 'react';
import { SectionHeading } from '../common/SectionHeading.jsx';
import { Button } from '../common/Button.jsx';

export function FarewellCare({ onOpenFarewellModal }) {
  const offerings = [
    {
      title: 'Peaceful Passing at Home',
      description: 'Coordination with an independent, state-licensed partner veterinarian who visits your home so your companion rests in comfort.'
    },
    {
      title: 'Dignified Aftercare Transport',
      description: 'Private cremation or communal burial coordination arranged gently with local pet memorial providers.'
    },
    {
      title: 'Handcrafted Keepsakes',
      description: 'Clay paw impressions, lockets of fur, and custom memorial certificates prepared with reverence when you are ready.'
    },
    {
      title: 'Family Bereavement Support',
      description: 'Supportive guidance and grief resources for adults and children navigating pet bereavement.'
    }
  ];

  return (
    <section
      id="farewell"
      style={{
        padding: '100px 0',
        backgroundColor: '#F5F0F3',
        color: '#3E3540'
      }}
    >
      <div className="pk-container" style={{ maxWidth: '1040px' }}>
        <SectionHeading
          kicker="Compassionate Support"
          title="When Love Means Letting Go, We’re Here."
          subtitle="Saying goodbye is one of the hardest moments a family endures. Our specialized farewell coordinators guide every detail gently and at your pace, allowing you to focus on loving your pet."
          style={{ marginBottom: '48px' }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '18px',
            marginBottom: '44px'
          }}
        >
          {offerings.map((item, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.75)',
                border: '1px solid #E6DEE2',
                padding: '28px 24px',
                boxShadow: '0 4px 12px rgba(62, 53, 64, 0.04)'
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-brand)',
                  fontWeight: 600,
                  fontSize: '17px',
                  color: '#3E3540',
                  lineHeight: 1.3
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  margin: '10px 0 0',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: '#574D59'
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Button
              variant="charcoal"
              size="lg"
              onClick={onOpenFarewellModal}
              style={{ background: '#4A3F50', color: '#FFFFFF' }}
            >
              Talk with a Farewell Coordinator
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onOpenFarewellModal}
              style={{ border: '1.5px solid #9A8E9E', color: '#3E3540' }}
            >
              Plan Ahead Gently
            </Button>
          </div>

          <p style={{ margin: 0, fontSize: '14px', color: '#6A5F6D' }}>
            Available to all pet families 7 days a week • No active subscription required
          </p>
          <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#877B8A' }}>
            Notice: PawKeep provides care coordination and grief support resources. In-home clinical veterinary euthanasia is performed exclusively by independent licensed veterinary professionals.
          </p>
        </div>
      </div>
    </section>
  );
}
