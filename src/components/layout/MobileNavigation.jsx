import React from 'react';
import { Button } from '../common/Button.jsx';

export function MobileNavigation({
  isOpen,
  onClose,
  links,
  onOpenSignIn,
  onOpenPlanBuilder
}) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 89,
        background: 'rgba(35, 35, 38, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: 'var(--pk-white)',
          padding: '88px 24px 32px 24px',
          boxShadow: 'var(--shadow-lg)',
          borderBottomLeftRadius: '24px',
          borderBottomRightRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        <p style={{ margin: 0, fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--pk-text-muted)', letterSpacing: '0.05em' }}>
          Navigation
        </p>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                fontSize: '17px',
                fontWeight: 700,
                color: 'var(--pk-charcoal)',
                background: 'var(--pk-cream)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>{link.label}</span>
              <span style={{ color: 'var(--pk-coral)', fontWeight: 800 }}>→</span>
            </a>
          ))}
        </nav>

        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button
            variant="charcoal"
            size="lg"
            fullWidth
            href="#plan"
            onClick={onOpenPlanBuilder}
          >
            Build My Pet’s Plan
          </Button>

          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={onOpenSignIn}
          >
            Member Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
