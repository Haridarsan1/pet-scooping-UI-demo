import React, { useState } from 'react';
import { Modal } from '../common/Modal.jsx';
import { Button } from '../common/Button.jsx';

export function SignInModal({ isOpen, onClose }) {
  const [authMode, setAuthMode] = useState('magic'); // 'magic' | 'password'
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="PawKeep Member Portal">
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--pk-sage-light)',
              color: 'var(--pk-sage)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              margin: '0 auto 16px auto'
            }}
          >
            ✓
          </div>
          <h4 style={{ margin: '0 0 8px 0', fontFamily: 'var(--font-brand)', fontSize: '20px' }}>
            Check your email
          </h4>
          <p style={{ margin: '0 0 20px 0', fontSize: '15px', color: 'var(--pk-text-secondary)', lineHeight: 1.5 }}>
            We sent a secure demo sign-in link to <strong>{email}</strong>.
          </p>
          <div
            style={{
              padding: '14px',
              borderRadius: '12px',
              background: '#FFF8EB',
              border: '1px solid #FFE08F',
              fontSize: '13px',
              color: '#8C6200',
              marginBottom: '20px',
              textAlign: 'left'
            }}
          >
            <strong>Demonstration Notice:</strong> This is a frontend demo interface. No email was transmitted and no live database account was accessed. Full authentication requires backend identity provider integration.
          </div>
          <Button variant="charcoal" onClick={handleReset} fullWidth>
            Return to PawKeep
          </Button>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--pk-border-subtle)', paddingBottom: '12px' }}>
            <button
              type="button"
              onClick={() => setAuthMode('magic')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 700,
                background: authMode === 'magic' ? 'var(--pk-charcoal)' : 'transparent',
                color: authMode === 'magic' ? 'var(--pk-white)' : 'var(--pk-text-secondary)'
              }}
            >
              Sign In with Email Link
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('password')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 700,
                background: authMode === 'password' ? 'var(--pk-charcoal)' : 'transparent',
                color: authMode === 'password' ? 'var(--pk-white)' : 'var(--pk-text-secondary)'
              }}
            >
              Password
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label htmlFor="signin-email" style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>
                Account Email
              </label>
              <input
                id="signin-email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '48px',
                  padding: '0 14px',
                  borderRadius: '12px',
                  border: '1.5px solid var(--pk-border-subtle)',
                  background: 'var(--pk-cream)'
                }}
              />
            </div>

            {authMode === 'password' && (
              <div>
                <label htmlFor="signin-password" style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>
                  Password
                </label>
                <input
                  id="signin-password"
                  type="password"
                  required
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    minHeight: '48px',
                    padding: '0 14px',
                    borderRadius: '12px',
                    border: '1.5px solid var(--pk-border-subtle)',
                    background: 'var(--pk-cream)'
                  }}
                />
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" fullWidth style={{ marginTop: '8px' }}>
              {authMode === 'magic' ? 'Send Secure Sign-In Link' : 'Sign In to Dashboard'}
            </Button>
          </form>

          <p style={{ margin: '18px 0 0', fontSize: '13px', textAlign: 'center', color: 'var(--pk-text-muted)' }}>
            Need to start a new subscription? <a href="#plan" onClick={onClose} style={{ color: 'var(--pk-coral)', fontWeight: 700 }}>Build your plan</a>
          </p>
        </div>
      )}
    </Modal>
  );
}
