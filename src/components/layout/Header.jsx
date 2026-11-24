import React, { useState, useEffect } from 'react';
import { Button } from '../common/Button.jsx';
import { MobileNavigation } from './MobileNavigation.jsx';

export function Header({ onOpenSignIn, onOpenPlanBuilder }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why PawKeep', href: '#why' },
    { label: 'Pricing', href: '#plan' },
    { label: 'For Communities', href: '#communities' }
  ];

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 90,
          width: '100%',
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: isScrolled ? '1px solid var(--pk-border-subtle)' : '1px solid transparent',
          transition: 'all 0.25s ease'
        }}
      >
        <div
          className="pk-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: isScrolled ? '68px' : '78px',
            transition: 'height 0.25s ease'
          }}
        >
          {/* Logo */}
          <a
            href="#top"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: 'var(--pk-charcoal)'
            }}
            aria-label="PawKeep Home"
          >
            <svg width="36" height="36" viewBox="0 0 40 40" aria-hidden="true">
              <rect width="40" height="40" rx="12" fill="#232326" />
              <g fill="#F4C7CF">
                <ellipse cx="13" cy="15" rx="3" ry="3.8" />
                <ellipse cx="20" cy="12" rx="3" ry="3.8" />
                <ellipse cx="27" cy="15" rx="3" ry="3.8" />
                <path d="M20 19c-4.6 0-8 4.6-8 8 0 2.4 1.8 3.6 3.9 3.6 1.6 0 2.6-.9 4.1-.9s2.5.9 4.1.9c2.1 0 3.9-1.2 3.9-3.6 0-3.4-3.4-8-8-8z" />
              </g>
            </svg>
            <span
              style={{
                fontFamily: 'var(--font-brand)',
                fontWeight: 700,
                fontSize: '22px',
                letterSpacing: '-0.6px',
                color: 'var(--pk-charcoal)'
              }}
            >
              pawkeep
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary"
            style={{
              display: 'none',
              gap: '6px',
              padding: '6px 8px',
              borderRadius: '16px',
              background: 'var(--pk-cream)',
              border: '1px solid var(--pk-border-subtle)'
            }}
            className="pk-desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--pk-charcoal)',
                  transition: 'background 0.18s ease, color 0.18s ease'
                }}
                className="pk-nav-pill"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={onOpenSignIn}
              style={{
                display: 'none',
                padding: '10px 14px',
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--pk-charcoal)',
                cursor: 'pointer'
              }}
              className="pk-desktop-signin"
            >
              Sign In
            </button>

            <Button
              variant="charcoal"
              size="sm"
              href="#plan"
              onClick={onOpenPlanBuilder}
              style={{ display: 'none' }}
              className="pk-desktop-cta"
            >
              Build My Plan
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="pk-mobile-toggle"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'var(--pk-cream)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
        onOpenSignIn={() => {
          setMobileMenuOpen(false);
          onOpenSignIn();
        }}
        onOpenPlanBuilder={() => {
          setMobileMenuOpen(false);
          if (onOpenPlanBuilder) onOpenPlanBuilder();
        }}
      />

      <style>{`
        @media (min-width: 960px) {
          .pk-desktop-nav { display: flex !important; }
          .pk-desktop-signin { display: inline-flex !important; }
          .pk-desktop-cta { display: inline-flex !important; }
          .pk-mobile-toggle { display: none !important; }
        }
        .pk-nav-pill:hover {
          background: #FFFFFF;
          color: var(--pk-coral);
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
        }
      `}</style>
    </>
  );
}
