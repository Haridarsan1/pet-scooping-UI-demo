import React, { useState } from 'react';
import { Button } from '../common/Button.jsx';

export function CommunitySection() {
  const [formData, setFormData] = useState({
    propertyName: '',
    contactName: '',
    workEmail: '',
    phone: '',
    zip: '',
    units: '',
    notes: '',
    interestedServices: {
      commonAreas: true,
      wasteStations: true,
      residentDiscounts: true,
      groomingPopups: false
    }
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (serviceKey) => {
    setFormData({
      ...formData,
      interestedServices: {
        ...formData.interestedServices,
        [serviceKey]: !formData.interestedServices[serviceKey]
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend validation
    if (!formData.propertyName.trim()) {
      setStatus('error');
      setErrorMessage('Please enter the property or community name.');
      return;
    }
    if (!formData.workEmail.includes('@') || !formData.workEmail.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid business work email.');
      return;
    }
    if (!formData.zip.trim() || formData.zip.length !== 5) {
      setStatus('error');
      setErrorMessage('Please enter a valid 5-digit US ZIP code.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    // Simulate inquiry transmission
    setTimeout(() => {
      setStatus('success');
    }, 700);
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({
      propertyName: '',
      contactName: '',
      workEmail: '',
      phone: '',
      zip: '',
      units: '',
      notes: '',
      interestedServices: {
        commonAreas: true,
        wasteStations: true,
        residentDiscounts: true,
        groomingPopups: false
      }
    });
  };

  return (
    <section
      id="communities"
      style={{
        padding: '90px 0',
        backgroundColor: 'var(--pk-white)'
      }}
    >
      <div className="pk-container">
        <div
          style={{
            borderRadius: '32px',
            background: 'var(--pk-charcoal)',
            color: 'var(--pk-white)',
            padding: 'clamp(32px, 5vw, 64px)',
            position: 'relative',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            gap: '40px',
            alignItems: 'center',
            boxShadow: 'var(--shadow-lg)'
          }}
          className="bento"
        >
          {/* Subtle Glow */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '-140px',
              left: '-100px',
              width: '420px',
              height: '420px',
              borderRadius: '50%',
              background: 'var(--pk-coral)',
              filter: 'blur(120px)',
              opacity: 0.35,
              pointerEvents: 'none'
            }}
          />

          {/* Left Column: Proposition */}
          <div style={{ gridColumn: 'span 5', position: 'relative' }}>
            <span className="pk-badge pk-badge-coral" style={{ marginBottom: '16px' }}>
              HOAs & Commercial Properties
            </span>

            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-brand)',
                fontWeight: 700,
                fontSize: 'clamp(28px, 3.2vw, 42px)',
                lineHeight: 1.1,
                letterSpacing: '-1.4px',
                color: 'var(--pk-white)'
              }}
            >
              Better Pet Care. Happier Communities.
            </h2>

            <p
              style={{
                margin: '18px 0 28px',
                fontSize: '16px',
                lineHeight: 1.6,
                color: '#D8D5DA'
              }}
            >
              Clean common lawns, regularly stocked pet waste stations, resident subscription discounts on every service, and one transparent monthly property invoice with GPS visit logs.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--pk-blush)', fontWeight: 800 }}>✓</span>
                <span>Scheduled common grounds walking & waste extraction</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--pk-blush)', fontWeight: 800 }}>✓</span>
                <span>Commercial station restocking & bag supply management</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--pk-blush)', fontWeight: 800 }}>✓</span>
                <span>Exclusive resident amenity discounts & custom portal</span>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div style={{ gridColumn: 'span 7', position: 'relative' }}>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderRadius: '24px',
                padding: '32px 28px'
              }}
            >
              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'var(--pk-sage-light)',
                      color: 'var(--pk-sage)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '26px',
                      margin: '0 auto 16px auto'
                    }}
                  >
                    ✓
                  </div>
                  <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--font-brand)', fontSize: '22px' }}>
                    Demonstration Proposal Form Validated
                  </h3>
                  <p style={{ margin: '0 0 20px', fontSize: '15px', color: '#D8D5DA', lineHeight: 1.6 }}>
                    Frontend inputs for <strong>{formData.propertyName}</strong> were successfully validated locally. As this website is a design prototype without live CRM routing, no proposal inquiry was transmitted and no team follow-up will occur.
                  </p>
                  <div
                    style={{
                      padding: '12px 14px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      fontSize: '12px',
                      color: '#B5B2B9',
                      marginBottom: '20px',
                      textAlign: 'left'
                    }}
                  >
                    <strong>Architecture Note:</strong> In production deployment, this form will connect directly to the commercial accounts webhook or CRM API.
                  </div>
                  <Button variant="secondary" onClick={handleReset}>
                    Reset Demonstration Form
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--font-brand)', fontSize: '20px' }}>
                    Request a Property Proposal
                  </h3>

                  {errorMessage && (
                    <div style={{ padding: '10px 14px', borderRadius: '10px', background: '#FFD9DF', color: '#8C1D36', fontSize: '13px', fontWeight: 700 }}>
                      ⚠️ {errorMessage}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#D8D5DA', marginBottom: '4px' }}>
                        Community or Property Name *
                      </label>
                      <input
                        required
                        name="propertyName"
                        placeholder="e.g. Oakridge Park HOA or The Bellview Apts"
                        value={formData.propertyName}
                        onChange={handleChange}
                        style={{ width: '100%', minHeight: '44px', padding: '0 12px', borderRadius: '10px', border: 'none', background: 'var(--pk-white)', color: 'var(--pk-charcoal)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#D8D5DA', marginBottom: '4px' }}>
                        Contact Name *
                      </label>
                      <input
                        required
                        name="contactName"
                        placeholder="Taylor Vance"
                        value={formData.contactName}
                        onChange={handleChange}
                        style={{ width: '100%', minHeight: '44px', padding: '0 12px', borderRadius: '10px', border: 'none', background: 'var(--pk-white)', color: 'var(--pk-charcoal)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#D8D5DA', marginBottom: '4px' }}>
                        Work Email *
                      </label>
                      <input
                        required
                        type="email"
                        name="workEmail"
                        placeholder="taylor@management.com"
                        value={formData.workEmail}
                        onChange={handleChange}
                        style={{ width: '100%', minHeight: '44px', padding: '0 12px', borderRadius: '10px', border: 'none', background: 'var(--pk-white)', color: 'var(--pk-charcoal)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#D8D5DA', marginBottom: '4px' }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="(555) 000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                        style={{ width: '100%', minHeight: '44px', padding: '0 12px', borderRadius: '10px', border: 'none', background: 'var(--pk-white)', color: 'var(--pk-charcoal)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#D8D5DA', marginBottom: '4px' }}>
                        ZIP Code *
                      </label>
                      <input
                        required
                        maxLength={5}
                        name="zip"
                        placeholder="78701"
                        value={formData.zip}
                        onChange={handleChange}
                        style={{ width: '100%', minHeight: '44px', padding: '0 12px', borderRadius: '10px', border: 'none', background: 'var(--pk-white)', color: 'var(--pk-charcoal)' }}
                      />
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#D8D5DA', marginBottom: '4px' }}>
                        Approximate Residential Units / Homes
                      </label>
                      <input
                        name="units"
                        placeholder="e.g. 150 units"
                        value={formData.units}
                        onChange={handleChange}
                        style={{ width: '100%', minHeight: '44px', padding: '0 12px', borderRadius: '10px', border: 'none', background: 'var(--pk-white)', color: 'var(--pk-charcoal)' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: '6px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#D8D5DA', marginBottom: '6px' }}>
                      Services Needed:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '13px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={formData.interestedServices.commonAreas}
                          onChange={() => handleCheckboxChange('commonAreas')}
                        />
                        <span>Common Lawns</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={formData.interestedServices.wasteStations}
                          onChange={() => handleCheckboxChange('wasteStations')}
                        />
                        <span>Waste Stations</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={formData.interestedServices.residentDiscounts}
                          onChange={() => handleCheckboxChange('residentDiscounts')}
                        />
                        <span>Resident Discounts</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={formData.interestedServices.groomingPopups}
                          onChange={() => handleCheckboxChange('groomingPopups')}
                        />
                        <span>Grooming Days</span>
                      </label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    fullWidth
                    disabled={status === 'submitting'}
                    style={{ marginTop: '8px' }}
                  >
                    {status === 'submitting' ? 'Submitting Request…' : 'Request Custom Property Quote'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
