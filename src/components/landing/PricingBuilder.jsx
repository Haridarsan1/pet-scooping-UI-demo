import React from 'react';
import { SectionHeading } from '../common/SectionHeading.jsx';
import { PetSelector } from '../pricing/PetSelector.jsx';
import { PlanSummary } from '../pricing/PlanSummary.jsx';
import { PRICING_CONFIG } from '../../data/pricing.js';

export function PricingBuilder({ pricing, onProceedToCheckout }) {
  const {
    petType,
    setPetType,
    petName,
    setPetName,
    dogCount,
    setDogCount,
    catCount,
    setCatCount,
    yardFrequency,
    setYardFrequency,
    litterFrequency,
    setLitterFrequency,
    groomFrequency,
    setGroomFrequency,
    vetEnabled,
    setVetEnabled,
    trainingEnabled,
    setTrainingEnabled,
    isDogEligible,
    isCatEligible,
    groomPetCount
  } = pricing;

  return (
    <section
      id="plan"
      style={{
        padding: '90px 0',
        backgroundColor: 'var(--pk-coral-light)'
      }}
    >
      <div className="pk-container">
        <SectionHeading
          kicker="Personalized Pricing Builder"
          title="Customize Your Plan. See Your Price in Real Time."
          subtitle="Select your pets and configure your routine services. Explore sample monthly pricing tailored to your household."
        />

        {/* 2-Column Bento: Configuration on Left, Live Summary on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            gap: '24px',
            alignItems: 'start'
          }}
          className="bento"
        >
          {/* Left: Configuration Form */}
          <div
            style={{
              gridColumn: 'span 7',
              borderRadius: '28px',
              background: 'var(--pk-white)',
              padding: '36px',
              border: '1.5px solid var(--pk-border-subtle)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px'
            }}
          >
            {/* Step 1: Pet Type & Counts */}
            <PetSelector
              petType={petType}
              setPetType={setPetType}
              petName={petName}
              setPetName={setPetName}
              dogCount={dogCount}
              setDogCount={setDogCount}
              catCount={catCount}
              setCatCount={setCatCount}
            />

            <hr style={{ border: 'none', borderTop: '1px solid var(--pk-border-subtle)', margin: 0 }} />

            {/* Step 2: Service Configurations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
              <div style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '16px', color: 'var(--pk-charcoal)' }}>
                2. Select Services & Frequency
              </div>

              {/* Dog Service: Yard Scooping */}
              {isDogEligible && (
                <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <legend style={{ padding: 0, fontWeight: 700, fontSize: '15px', color: 'var(--pk-charcoal)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--pk-coral)' }} />
                      🐶 Yard Waste Removal (Dogs)
                    </legend>
                    <span style={{ fontSize: '12px', color: 'var(--pk-text-muted)' }}>From $79/mo</span>
                  </div>
                  <p style={{ margin: '0 0 10px', fontSize: '13px', color: 'var(--pk-text-secondary)' }}>
                    Lawn scooped, bagged, hauled away with photo gate latch check.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {PRICING_CONFIG.services.yardWaste.frequencies.map((tier) => (
                      <button
                        key={tier.value}
                        type="button"
                        onClick={() => setYardFrequency(tier.value)}
                        style={{
                          minHeight: '44px',
                          padding: '0 16px',
                          borderRadius: '12px',
                          border: yardFrequency === tier.value ? '2px solid var(--pk-charcoal)' : '1.5px solid var(--pk-border-subtle)',
                          background: yardFrequency === tier.value ? 'var(--pk-charcoal)' : 'var(--pk-white)',
                          color: yardFrequency === tier.value ? 'var(--pk-white)' : 'var(--pk-charcoal)',
                          fontWeight: 700,
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        {tier.label} {tier.monthlyPrice > 0 ? `($${tier.monthlyPrice}/mo)` : ''}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {/* Cat Service: Litter Box Care */}
              {isCatEligible && (
                <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <legend style={{ padding: 0, fontWeight: 700, fontSize: '15px', color: 'var(--pk-charcoal)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3861B5' }} />
                      🐱 Litter Box Care (Cats)
                    </legend>
                    <span style={{ fontSize: '12px', color: 'var(--pk-text-muted)' }}>From $45/mo</span>
                  </div>
                  <p style={{ margin: '0 0 10px', fontSize: '13px', color: 'var(--pk-text-secondary)' }}>
                    Litter sifted, box sanitized, floor swept and waste hauled off-site.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {PRICING_CONFIG.services.litterCare.frequencies.map((tier) => (
                      <button
                        key={tier.value}
                        type="button"
                        onClick={() => setLitterFrequency(tier.value)}
                        style={{
                          minHeight: '44px',
                          padding: '0 16px',
                          borderRadius: '12px',
                          border: litterFrequency === tier.value ? '2px solid var(--pk-charcoal)' : '1.5px solid var(--pk-border-subtle)',
                          background: litterFrequency === tier.value ? 'var(--pk-charcoal)' : 'var(--pk-white)',
                          color: litterFrequency === tier.value ? 'var(--pk-white)' : 'var(--pk-charcoal)',
                          fontWeight: 700,
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        {tier.label} {tier.monthlyPrice > 0 ? `($${tier.monthlyPrice}/mo)` : ''}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {/* Grooming */}
              <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <legend style={{ padding: 0, fontWeight: 700, fontSize: '15px', color: 'var(--pk-charcoal)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D8576F' }} />
                    🛁 In-Home Pet Grooming
                  </legend>
                  <span style={{ fontSize: '12px', color: 'var(--pk-text-muted)' }}>
                    $69 / pet per session {groomPetCount > 1 ? `(${groomPetCount} eligible pets)` : ''}
                  </span>
                </div>
                <p style={{ margin: '0 0 10px', fontSize: '13px', color: 'var(--pk-text-secondary)' }}>
                  Warm bath, brush blowout, gentle nail trim and ear cleaning at your home.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {PRICING_CONFIG.services.grooming.frequencies.map((tier) => {
                    const tierMonthlyPrice = tier.value * (groomPetCount || 1) * PRICING_CONFIG.services.grooming.sessionPricePerPet;
                    return (
                      <button
                        key={tier.value}
                        type="button"
                        onClick={() => setGroomFrequency(tier.value)}
                        style={{
                          minHeight: '44px',
                          padding: '0 16px',
                          borderRadius: '12px',
                          border: groomFrequency === tier.value ? '2px solid var(--pk-charcoal)' : '1.5px solid var(--pk-border-subtle)',
                          background: groomFrequency === tier.value ? 'var(--pk-charcoal)' : 'var(--pk-white)',
                          color: groomFrequency === tier.value ? 'var(--pk-white)' : 'var(--pk-charcoal)',
                          fontWeight: 700,
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        {tier.label} {tier.value > 0 ? `($${tierMonthlyPrice}/mo)` : ''}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Vet & Training 2-Col Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                {/* Veterinary */}
                <div
                  style={{
                    padding: '18px',
                    borderRadius: '16px',
                    border: vetEnabled ? '2px solid var(--pk-coral)' : '1.5px solid var(--pk-border-subtle)',
                    background: vetEnabled ? 'var(--pk-blush-soft)' : 'var(--pk-white)',
                    transition: 'all 0.18s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '14px', color: 'var(--pk-charcoal)' }}>🩺 Home Vet Care</strong>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--pk-coral)' }}>+$49/mo</span>
                  </div>
                  <p style={{ margin: '6px 0 12px', fontSize: '12px', lineHeight: 1.4, color: 'var(--pk-text-secondary)' }}>
                    Quarterly exams & messaging coordination with licensed partner veterinarians.
                  </p>
                  <button
                    type="button"
                    onClick={() => setVetEnabled(!vetEnabled)}
                    style={{
                      width: '100%',
                      minHeight: '38px',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '13px',
                      background: vetEnabled ? 'var(--pk-charcoal)' : 'var(--pk-cream)',
                      color: vetEnabled ? 'var(--pk-white)' : 'var(--pk-charcoal)',
                      cursor: 'pointer'
                    }}
                  >
                    {vetEnabled ? '✓ Included in Plan' : '+ Add Vet Care'}
                  </button>
                </div>

                {/* Training (Dog only) */}
                {isDogEligible && (
                  <div
                    style={{
                      padding: '18px',
                      borderRadius: '16px',
                      border: trainingEnabled ? '2px solid var(--pk-coral)' : '1.5px solid var(--pk-border-subtle)',
                      background: trainingEnabled ? 'var(--pk-blush-soft)' : 'var(--pk-white)',
                      transition: 'all 0.18s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <strong style={{ fontSize: '14px', color: 'var(--pk-charcoal)' }}>🎓 Dog Training</strong>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--pk-coral)' }}>+$119/mo</span>
                    </div>
                    <p style={{ margin: '6px 0 12px', fontSize: '12px', lineHeight: 1.4, color: 'var(--pk-text-secondary)' }}>
                      Two 60-min in-home positive manners and leash sessions monthly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setTrainingEnabled(!trainingEnabled)}
                      style={{
                        width: '100%',
                        minHeight: '38px',
                        borderRadius: '10px',
                        fontWeight: 800,
                        fontSize: '13px',
                        background: trainingEnabled ? 'var(--pk-charcoal)' : 'var(--pk-cream)',
                        color: trainingEnabled ? 'var(--pk-white)' : 'var(--pk-charcoal)',
                        cursor: 'pointer'
                      }}
                    >
                      {trainingEnabled ? '✓ Included in Plan' : '+ Add Training'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Plan Summary Ticket */}
          <div style={{ gridColumn: 'span 5' }}>
            <PlanSummary
              pricing={pricing}
              onProceedToCheckout={onProceedToCheckout}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
