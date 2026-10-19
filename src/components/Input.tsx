import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, style, ...props }, ref) => {
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '24px',
    };

    const labelStyle: React.CSSProperties = {
      fontSize: '14px',
      color: 'var(--color-secondary)',
      marginBottom: '8px',
      fontFamily: 'var(--font-body)',
    };

    const inputStyle: React.CSSProperties = {
      WebkitAppearance: 'none',
      border: 'none',
      borderBottom: '1px solid #CCC5B9',
      backgroundColor: 'transparent',
      padding: '8px 0',
      fontSize: '18px',
      color: 'var(--color-text)',
      fontFamily: 'var(--font-heading)',
      outline: 'none',
      transition: 'border-color 0.2s',
      ...style,
    };

    return (
      <div style={containerStyle}>
        {label && <label style={labelStyle}>{label}</label>}
        <input 
          ref={ref} 
          style={inputStyle} 
          {...props} 
          onFocus={(e) => e.target.style.borderBottomColor = 'var(--color-primary)'}
          onBlur={(e) => e.target.style.borderBottomColor = '#CCC5B9'}
        />
        {error && <span style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
