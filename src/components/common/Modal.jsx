import React, { useEffect } from 'react';

export function Modal({ isOpen, onClose, title, children, maxWidth = '620px' }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="pk-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="pk-modal-dialog"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            paddingBottom: '14px',
            borderBottom: '1px solid var(--pk-border-subtle)'
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: 'var(--font-brand)',
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--pk-charcoal)',
              letterSpacing: '-0.5px'
            }}
          >
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--pk-cream)',
              color: 'var(--pk-charcoal)',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
          >
            ✕
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
