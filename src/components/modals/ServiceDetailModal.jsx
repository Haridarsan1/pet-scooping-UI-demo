import React from 'react';
import { Modal } from '../common/Modal.jsx';
import { Button } from '../common/Button.jsx';

export function ServiceDetailModal({ service, isOpen, onClose, onSelectInPlan }) {
  if (!service) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={service.title} maxWidth="680px">
      <div>
        <div style={{ position: 'relative', height: '220px', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px' }}>
          <img
            src={service.image}
            alt={service.imageAlt || service.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', gap: '8px' }}>
            <span className="pk-badge pk-badge-charcoal">{service.targetPetLabel}</span>
            {service.badge && <span className="pk-badge pk-badge-coral">{service.badge}</span>}
          </div>
        </div>

        <p style={{ margin: '0 0 16px', fontSize: '16px', lineHeight: 1.6, color: 'var(--pk-text-primary)' }}>
          {service.description}
        </p>

        {service.regulatoryDisclosure && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              background: '#EEF2FB',
              border: '1px solid #C8D8FA',
              fontSize: '13px',
              lineHeight: 1.5,
              color: '#1D3B7A',
              marginBottom: '20px'
            }}
          >
            <strong>State Regulatory Compliance:</strong> {service.regulatoryDisclosure}
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 10px', fontFamily: 'var(--font-brand)', fontSize: '15px' }}>
            Detailed Inclusions:
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {service.whatsIncluded.map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                <span style={{ color: 'var(--pk-coral)', fontWeight: 800 }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            padding: '14px',
            borderRadius: '14px',
            background: 'var(--pk-cream)',
            marginBottom: '24px'
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--pk-text-muted)', marginBottom: '4px' }}>
            Pricing Information
          </div>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--pk-text-secondary)', lineHeight: 1.5 }}>
            {service.pricingExplanation}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {service.isSubscriptionService && onSelectInPlan && (
            <Button
              variant="primary"
              href="#plan"
              onClick={() => {
                onSelectInPlan(service);
                onClose();
              }}
            >
              Configure in Plan
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
