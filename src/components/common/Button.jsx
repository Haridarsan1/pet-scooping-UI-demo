import React from 'react';

export function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'charcoal' | 'outline' | 'ghost'
  size = 'md',        // 'sm' | 'md' | 'lg'
  href,
  onClick,
  type = 'button',
  fullWidth = false,
  className = '',
  style = {},
  disabled = false,
  ...rest
}) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'inherit',
    fontWeight: 700,
    borderRadius: '14px',
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    textDecoration: 'none',
    width: fullWidth ? '100%' : 'auto',
    textAlign: 'center',
    border: 'none',
    boxSizing: 'border-box'
  };

  const sizeStyles = {
    sm: { minHeight: '38px', padding: '0 14px', fontSize: '13px' },
    md: { minHeight: '48px', padding: '0 20px', fontSize: '15px' },
    lg: { minHeight: '56px', padding: '0 26px', fontSize: '16px' }
  };

  const variantStyles = {
    primary: {
      background: 'var(--pk-coral)',
      color: 'var(--pk-white)',
      boxShadow: '0 4px 14px rgba(194, 65, 91, 0.25)'
    },
    secondary: {
      background: 'var(--pk-blush)',
      color: 'var(--pk-charcoal)'
    },
    charcoal: {
      background: 'var(--pk-charcoal)',
      color: 'var(--pk-white)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--pk-charcoal)',
      border: '1.5px solid var(--pk-border-subtle)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--pk-charcoal)'
    }
  };

  const combinedStyles = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style
  };

  if (href) {
    return (
      <a
        href={href}
        style={combinedStyles}
        className={`pk-btn ${className}`}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      style={combinedStyles}
      className={`pk-btn ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
