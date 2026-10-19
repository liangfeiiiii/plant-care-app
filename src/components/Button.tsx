import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, style, ...props }) => {
  const isPrimary = variant === 'primary';
  
  const baseStyle: React.CSSProperties = {
    backgroundColor: isPrimary ? 'var(--color-primary)' : 'transparent',
    color: isPrimary ? 'white' : 'var(--color-secondary)',
    border: 'none',
    borderRadius: 'var(--radius-lg)', // 大圆角
    padding: '16px 32px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.2s ease',
    boxShadow: isPrimary ? 'var(--shadow-sm)' : 'none',
    ...style,
  };

  return (
    <button 
      style={baseStyle}
      {...props}
      onMouseOver={(e) => {
        if (isPrimary) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        }
      }}
      onMouseOut={(e) => {
        if (isPrimary) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        }
      }}
    >
      {children}
    </button>
  );
};
