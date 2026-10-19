import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'surface' | 'transparent';
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md';
  style?: React.CSSProperties;
}

const paddingMap = {
  sm: '12px',
  md: '16px',
  lg: '24px',
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'surface',
  padding = 'md',
  shadow = 'sm',
  style,
}) => {
  return (
    <div
      style={{
        backgroundColor: variant === 'surface' ? 'var(--color-surface)' : 'transparent',
        padding: paddingMap[padding],
        borderRadius: 'var(--radius-lg)',
        boxShadow: shadow === 'none' ? 'none' : `var(--shadow-${shadow})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
