import React, { useState } from 'react';
import { Modal } from '../common/Modal.jsx';
import { Button } from '../common/Button.jsx';

export function FarewellModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [isImmediate, setIsImmediate] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="Farewell Care Support" maxWidth="580px">
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#F4EFF2',
              color: '#4A3F50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              margin: '0 auto 16px auto'
            }}
          >
            ♥
          </div>
          <h4 style={{ margin: '0 0 8px', fontFamily: 'var(--font-brand)', fontSize: '20px', color: '#3E3540' }}>
            We have received your message
          </h4>
          <p style={{ margin: '0 0 20px', fontSize: '15px', color: '#574D59', lineHeight: 1.6 }}>
            A compassionate PawKeep care coordinator will reach out to <strong>{phone}</strong> to discuss care options, scheduling, and guidance with kindness.
          </p>
          <div
            style={{
              padding: '14px',
              borderRadius: '12px',
              background: '#F4EFF2',
              border: '1px solid #E6DEE2',
              fontSize: '13px',
              color: '#574D59',
              marginBottom: '20px',
              textAlign: 'left'
            }}
          >
            <strong>Demonstration Notice:</strong> This modal is a design demonstration. No dispatch or consultation request was transmitted. For urgent medical emergencies, please consult your nearest local emergency veterinary hospital directly.
          </div>
          <Button variant="charcoal" onClick={handleReset} fullWidth>
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p style={{ margin: '0 0 16px', fontSize: '15px', lineHeight: 1.6, color: 'var(--pk-text-secondary)' }}>
            Losing a pet is deeply painful. Tell us how we can support you, and a dedicated farewell coordinator will reach out with kindness and guidance.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>
                Your Name *
              </label>
              <input
                required
                placeholder="Your name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
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
                placeholder="(555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: '100%', minHeight: '44px', padding: '0 12px', borderRadius: '10px', border: '1.5px solid var(--pk-border-subtle)' }}
              />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isImmediate}
                onChange={(e) => setIsImmediate(e.target.checked)}
                style={{ width: '18px', height: '18px' }}
              />
              <span>This is urgent / needed within 24–48 hours</span>
            </label>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <Button variant="outline" type="button" onClick={handleReset}>
              Cancel
            </Button>
            <Button variant="charcoal" type="submit">
              Speak with a Coordinator
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
