import React from 'react';
import { Button } from '../common/Button.jsx';

export function HeroSection({
  onBuildPlan,
  petType,
  setPetType,
  zipAvailability
}) {
  const { zipInput, setZipInput, status, result, errorMessage, checkZip, reset } = zipAvailability;

  const handleZipSubmit = (e) => {
    e.preventDefault();
    checkZip();
  };

  return (
    <section
      id="top"
      style={{
        backgroundColor: 'var(--pk-cream)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '40px',
        paddingBottom: '60px'
      }}
    >
      {/* Background Decorative Accents */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-120px',
          right: '-80px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244,199,207,0.45) 0%, rgba(248,245,241,0) 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="pk-container">
        {/* Main 2-column Hero */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            gap: '40px 32px',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Headline, Copy & CTAs */}
          <div style={{ gridColumn: 'span 7' }} className="pk-hero-left">
            <div style={{ marginBottom: '16px' }}>
              <span className="pk-badge pk-badge-coral">
                All-in-One Pet Care Subscription • US
              </span>
            </div>

            <h1
              style={{
                margin: 0,
                fontFamily: 'var(--font-brand)',
                fontWeight: 700,
                fontSize: 'clamp(34px, 4.2vw, 56px)',
                lineHeight: 1.05,
                letterSpacing: '-1.8px',
                color: 'var(--pk-charcoal)'
              }}
            >
              Everything Your Pet Needs. <span style={{ color: 'var(--pk-coral)' }}>One Caring Team.</span>
            </h1>

            <p
              style={{
                margin: '20px 0 28px',
                fontSize: 'clamp(17px, 1.8vw, 20px)',
                lineHeight: 1.55,
                color: 'var(--pk-text-secondary)',
                maxWidth: '34em'
              }}
            >
              Pet care shouldn't mean juggling multiple providers, appointments and bills. Bring your pet's everyday care together with one flexible monthly plan.
            </p>

            {/* Quick Pet Selection Entry Point */}
            <div
              style={{
                background: 'var(--pk-white)',
                padding: '16px 20px',
                borderRadius: '18px',
                border: '1.5px solid var(--pk-border-subtle)',
                marginBottom: '28px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--pk-charcoal)' }}>
                  I’m caring for:
                </span>
                <div role="group" aria-label="Pet Type" style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setPetType('dog')}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '14px',
                      cursor: 'pointer',
                      background: petType === 'dog' ? 'var(--pk-charcoal)' : 'var(--pk-cream)',
                      color: petType === 'dog' ? 'var(--pk-white)' : 'var(--pk-charcoal)',
                      transition: 'all 0.18s ease'
                    }}
                  >
                    🐶 Dogs
                  </button>
                  <button
                    type="button"
                    onClick={() => setPetType('cat')}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '14px',
                      cursor: 'pointer',
                      background: petType === 'cat' ? 'var(--pk-charcoal)' : 'var(--pk-cream)',
                      color: petType === 'cat' ? 'var(--pk-white)' : 'var(--pk-charcoal)',
                      transition: 'all 0.18s ease'
                    }}
                  >
                    🐱 Cats
                  </button>
                  <button
                    type="button"
                    onClick={() => setPetType('both')}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '14px',
                      cursor: 'pointer',
                      background: petType === 'both' ? 'var(--pk-charcoal)' : 'var(--pk-cream)',
                      color: petType === 'both' ? 'var(--pk-white)' : 'var(--pk-charcoal)',
                      transition: 'all 0.18s ease'
                    }}
                  >
                    🐾 Both
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '32px' }}>
              <Button
                variant="primary"
                size="lg"
                href="#plan"
                onClick={onBuildPlan}
              >
                Build Your Pet's Plan
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="#services"
              >
                Explore Our Services
              </Button>
            </div>

            {/* Key trust bullets */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '13px', color: 'var(--pk-text-secondary)', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--pk-coral)', fontSize: '16px' }}>✓</span> Coordinated care model
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--pk-coral)', fontSize: '16px' }}>✓</span> Licensed partner veterinarians
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--pk-coral)', fontSize: '16px' }}>✓</span> Transparent monthly pricing
              </span>
            </div>
          </div>

          {/* Right Column: Hero Lifestyle Photography */}
          <div style={{ gridColumn: 'span 5' }} className="pk-hero-right">
            <div
              style={{
                position: 'relative',
                borderRadius: '32px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                aspectRatio: '4 / 5',
                maxHeight: '560px',
                background: 'var(--pk-charcoal)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=80"
                alt="Happy healthy dogs and caring pet parent playing outdoors"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              {/* Floating Plan Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  background: 'rgba(255, 255, 255, 0.94)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '20px',
                  padding: '16px 20px',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--pk-coral)' }}>
                    All-in-One Care
                  </span>
                  <p style={{ margin: '2px 0 0', fontWeight: 800, fontSize: '15px', color: 'var(--pk-charcoal)' }}>
                    Scoop + Groom + Vet + Train
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: 'var(--pk-text-muted)' }}>From</span>
                  <p style={{ margin: 0, fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '18px', color: 'var(--pk-charcoal)' }}>
                    $79<span style={{ fontSize: '12px', fontWeight: 500 }}>/mo</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ZIP Code Availability Bar */}
        <div
          style={{
            marginTop: '44px',
            background: 'var(--pk-white)',
            borderRadius: '24px',
            padding: '24px 28px',
            border: '1.5px solid var(--pk-border-subtle)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >
            <div style={{ flex: '1 1 320px', minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '18px' }}>📍</span>
                <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--pk-charcoal)' }}>
                  Check Service Availability in Your Area
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--pk-text-secondary)' }}>
                Active in select US metro areas including Austin, Denver, Seattle, San Francisco, Chicago, and Dallas.
              </p>
            </div>

            {/* ZIP Form */}
            <form
              onSubmit={handleZipSubmit}
              style={{
                display: 'flex',
                gap: '8px',
                flex: '0 1 380px',
                width: '100%'
              }}
            >
              <input
                type="text"
                maxLength="5"
                pattern="[0-9]*"
                inputMode="numeric"
                placeholder="Enter 5-digit US ZIP"
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value)}
                style={{
                  flex: 1,
                  minHeight: '48px',
                  padding: '0 16px',
                  borderRadius: '12px',
                  border: '1.5px solid var(--pk-border-subtle)',
                  background: 'var(--pk-cream)',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--pk-charcoal)'
                }}
              />
              <Button
                type="submit"
                variant="charcoal"
                size="md"
                disabled={status === 'checking'}
              >
                {status === 'checking' ? 'Checking…' : 'Check ZIP'}
              </Button>
            </form>
          </div>

          {/* Availability Result Alert */}
          {errorMessage && (
            <div style={{ marginTop: '14px', color: 'var(--pk-coral)', fontSize: '14px', fontWeight: 700 }}>
              ⚠️ {errorMessage}
            </div>
          )}

          {status === 'available' && result && (
            <div
              style={{
                marginTop: '16px',
                padding: '14px 18px',
                borderRadius: '14px',
                background: 'var(--pk-sage-light)',
                border: '1px solid #B8DCBF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px'
              }}
            >
              <div>
                <strong style={{ color: 'var(--pk-sage)', fontSize: '15px' }}>
                  ✓ Demonstration Match: ZIP {result.zip} ({result.city})
                </strong>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#2B5A36' }}>
                  Sample active territory: yard scooping, litter care, grooming, and licensed home vet visits are shown as available in this demonstration model.
                </p>
              </div>
              <Button variant="charcoal" size="sm" href="#plan" onClick={onBuildPlan}>
                Configure Plan Now →
              </Button>
            </div>
          )}

          {status === 'waitlist' && result && (
            <div
              style={{
                marginTop: '16px',
                padding: '14px 18px',
                borderRadius: '14px',
                background: '#FFF8EB',
                border: '1px solid #FFE08F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px'
              }}
            >
              <div>
                <strong style={{ color: '#8C6200', fontSize: '14px' }}>
                  PawKeep is expanding to ZIP {result.zip} soon!
                </strong>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#6A4A00' }}>
                  Join our launch waitlist to receive priority scheduling and $25 off your initial month.
                </p>
              </div>
              <button
                type="button"
                onClick={() => alert(`Thank you! You will be notified as soon as PawKeep opens in ${result.zip}.`)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  background: '#8C6200',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '13px'
                }}
              >
                Join ZIP Waitlist
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pk-hero-left { grid-column: span 12 !important; }
          .pk-hero-right { grid-column: span 12 !important; max-width: 480px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}
