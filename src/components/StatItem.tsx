import React from 'react';

interface StatItemProps {
  label: string;
  value: number | string;
  unit: string;
  color?: string;
}

export const StatItem: React.FC<StatItemProps> = ({
  label,
  value,
  unit,
  color = 'var(--color-secondary)',
}) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        padding: '16px 12px',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <span
        style={{
          fontSize: '12px',
          color: 'var(--color-secondary)',
          fontWeight: 300,
          marginBottom: '4px',
        }}
      >
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
        <span
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: color,
            fontFamily: 'var(--font-heading)',
          }}
        >
          {value}
        </span>
        <span
          style={{
            fontSize: '10px',
            color: 'var(--color-secondary)',
            opacity: 0.8,
          }}
        >
          {unit}
        </span>
      </div>
    </div>
  );
};
