import React from 'react';
import { SectionHeading } from '../common/SectionHeading.jsx';
import { Button } from '../common/Button.jsx';

export function HowItWorks({ onBuildPlan }) {
  const steps = [
    {
      num: '01',
      title: 'Tell Us About Your Pet',
      description: 'Select whether you have dogs, cats, or both. Give us your pet’s name, temperament details, and your home gate or access instructions.'
    },
    {
      num: '02',
      title: 'Build Your Care Plan',
      description: 'Choose only the services you need—weekly yard scooping, litter care, in-home grooming, preventative vet care, or obedience training.'
    },
    {
      num: '03',
      title: 'Review and Subscribe',
      description: 'See your transparent itemized monthly rate with no hidden charges. Review your selections and finalize your care schedule prior to onboarding.'
    },
    {
      num: '04',
      title: 'Enjoy Coordinated Care',
      description: 'Connect with your coordinated PawKeep team. Receive visit summaries, care logs, and service updates right inside your member dashboard.'
    }
  ];

  return (
    <section
      id="how-it-works"
      style={{
        padding: '90px 0',
        backgroundColor: 'var(--pk-cream)'
      }}
    >
      <div className="pk-container">
        <SectionHeading
          kicker="How PawKeep Works"
          title="From Sign-Up to Happy Pets in Four Simple Steps"
          subtitle="We eliminate the headache of booking sitters, scheduling groomers, and finding vets separately. Here is how your coordinated care journey unfolds."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            marginBottom: '48px'
          }}
        >
          {steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--pk-white)',
                borderRadius: '24px',
                padding: '32px 26px',
                border: '1.5px solid var(--pk-border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-brand)',
                  fontWeight: 800,
                  fontSize: '28px',
                  color: 'var(--pk-coral)',
                  marginBottom: '16px',
                  display: 'inline-block'
                }}
              >
                {step.num}
              </span>

              <h3
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-brand)',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--pk-charcoal)',
                  letterSpacing: '-0.4px',
                  marginBottom: '12px'
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--pk-text-secondary)'
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Button variant="charcoal" size="lg" href="#plan" onClick={onBuildPlan}>
            Start Step 1: Build Your Pet's Plan
          </Button>
        </div>
      </div>
    </section>
  );
}
