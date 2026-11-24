import React, { useState } from 'react';
import { Modal } from '../common/Modal.jsx';
import { Button } from '../common/Button.jsx';

export function CheckoutModal({ isOpen, onClose, pricing }) {
  const [step, setStep] = useState(1); // 1: Plan Review, 2: Customer Info, 3: Confirmation
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    zip: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 2) {
      setStep(3);
    } else {
      setStep(step + 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="PawKeep Subscription Review" maxWidth="640px">
      {step === 1 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span className="pk-badge pk-badge-coral">Step 1 of 2: Review Services</span>
            <span className="pk-badge pk-badge-prototype">Prototype Checkout</span>
          </div>

          <div
            style={{
              padding: '16px 20px',
              borderRadius: '16px',
              background: 'var(--pk-charcoal)',
              color: 'var(--pk-white)',
              marginBottom: '20px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--pk-blush)', fontWeight: 800 }}>
                  Selected Plan for {pricing.petName ? `"${pricing.petName}"` : 'Your Companion'}
                </p>
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#D8D5DA' }}>
                  {pricing.petType === 'both' ? 'Dogs & Cats' : pricing.petType === 'cat' ? 'Cat Care' : 'Dog Care'}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontFamily: 'var(--font-brand)', fontSize: '32px', fontWeight: 700 }}>
                  ${pricing.monthlyTotal}
                </span>
                <span style={{ fontSize: '14px', color: '#D8D5DA' }}>/mo</span>
              </div>
            </div>
          </div>

          <h4 style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--pk-text-muted)' }}>
            Itemized Services
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {pricing.lines.length === 0 ? (
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--pk-text-secondary)' }}>
                No recurring services selected yet. Please select at least one service in the pricing builder.
              </p>
            ) : (
              pricing.lines.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'var(--pk-cream)',
                    fontSize: '14px'
                  }}
                >
                  <div>
                    <strong>{item.service}</strong>
                    <div style={{ fontSize: '12px', color: 'var(--pk-text-secondary)' }}>{item.detail}</div>
                  </div>
                  <div style={{ fontWeight: 800, color: 'var(--pk-charcoal)' }}>
                    ${item.monthlyAmount}/mo
                  </div>
                </div>
              ))
            )}
          </div>

          <div
            style={{
              padding: '12px 14px',
              borderRadius: '12px',
              background: '#FFF8EB',
              border: '1px solid #FFE08F',
              fontSize: '12px',
              color: '#8C6200',
              marginBottom: '20px'
            }}
          >
            <strong>Note:</strong> Billing begins only after your initial service visit is completed. You can modify, pause, or cancel your subscription anytime with zero penalty fees.
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Button variant="outline" onClick={handleReset}>
              Edit Plan
            </Button>
            <Button
              variant="primary"
              disabled={pricing.lines.length === 0}
              onClick={() => setStep(2)}
            >
              Continue to Details →
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleNext}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span className="pk-badge pk-badge-coral">Step 2 of 2: Service Location</span>
            <span style={{ fontSize: '13px', color: 'var(--pk-text-muted)' }}>US Addresses</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>
                Full Name *
              </label>
              <input
                required
                name="fullName"
                placeholder="Jane Smith"
                value={formData.fullName}
                onChange={handleChange}
                style={{ width: '100%', minHeight: '44px', padding: '0 12px', borderRadius: '10px', border: '1.5px solid var(--pk-border-subtle)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>
                Email *
              </label>
              <input
                required
                type="email"
                name="email"
                placeholder="jane@example.com"
                value={formData.email}
                onChange={handleChange}
                style={{ width: '100%', minHeight: '44px', padding: '0 12px', borderRadius: '10px', border: '1.5px solid var(--pk-border-subtle)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>
                Phone Number *
              </label>
              <input
                required
                type="tel"
                name="phone"
                placeholder="(555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                style={{ width: '100%', minHeight: '44px', padding: '0 12px', borderRadius: '10px', border: '1.5px solid var(--pk-border-subtle)' }}
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>
                Street Address *
              </label>
              <input
                required
                name="address"
                placeholder="123 Dogwood Lane"
                value={formData.address}
                onChange={handleChange}
                style={{ width: '100%', minHeight: '44px', padding: '0 12px', borderRadius: '10px', border: '1.5px solid var(--pk-border-subtle)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>
                ZIP Code *
              </label>
              <input
                required
                maxLength="5"
                name="zip"
                placeholder="78701"
                value={formData.zip}
                onChange={handleChange}
                style={{ width: '100%', minHeight: '44px', padding: '0 12px', borderRadius: '10px', border: '1.5px solid var(--pk-border-subtle)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>
                Gate Code / Access Info
              </label>
              <input
                name="notes"
                placeholder="Side gate latch #404"
                value={formData.notes}
                onChange={handleChange}
                style={{ width: '100%', minHeight: '44px', padding: '0 12px', borderRadius: '10px', border: '1.5px solid var(--pk-border-subtle)' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Button variant="outline" type="button" onClick={() => setStep(1)}>
              ← Back
            </Button>
            <Button variant="primary" type="submit">
              Complete Demonstration Setup
            </Button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
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
          <h4 style={{ margin: '0 0 8px', fontFamily: 'var(--font-brand)', fontSize: '22px' }}>
            Demonstration Order Confirmed!
          </h4>
          <p style={{ margin: '0 0 20px', fontSize: '15px', color: 'var(--pk-text-secondary)', lineHeight: 1.5 }}>
            Thank you, <strong>{formData.fullName || 'Pet Parent'}</strong>. Your personalized care plan has been compiled.
          </p>

          <div
            style={{
              padding: '16px',
              borderRadius: '16px',
              background: 'var(--pk-cream)',
              textAlign: 'left',
              fontSize: '13px',
              marginBottom: '20px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Monthly Recurring:</span>
              <strong>${pricing.monthlyTotal}/month</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Service Location:</span>
              <strong>{formData.address ? `${formData.address}, ${formData.zip}` : 'Austin, TX'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Assigned Care Coordinator:</span>
              <strong>Jamie R. (Demo Coordinator)</strong>
            </div>
          </div>

          <div
            style={{
              padding: '12px 14px',
              borderRadius: '12px',
              background: '#FFF8EB',
              border: '1px solid #FFE08F',
              fontSize: '12px',
              color: '#8C6200',
              marginBottom: '20px',
              textAlign: 'left'
            }}
          >
            <strong>Backend API Requirement:</strong> This completes the frontend subscription checkout demonstration. Production deployment requires connecting Stripe Subscription Billing and the Caregiver Dispatch API.
          </div>

          <Button variant="charcoal" onClick={handleReset} fullWidth>
            Return to Homepage
          </Button>
        </div>
      )}
    </Modal>
  );
}
