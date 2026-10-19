import React from 'react';
import type { Plant } from '../store';
import { plantService } from '../services/plantService';
import { StatItem } from './StatItem';

interface StatsGridProps {
  plants: Plant[];
}

export const StatsGrid: React.FC<StatsGridProps> = ({ plants }) => {
  const { total, needsWatering, speciesDiversity } = plantService.getWateringStats(plants);

  const stats = [
    { label: '我的花园', value: total, unit: '盆', color: 'var(--color-secondary)' },
    { label: '待浇水', value: needsWatering, unit: '盆', color: 'var(--color-primary)' },
    { label: '品种', value: speciesDiversity, unit: '种', color: 'var(--color-success)' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '12px',
      marginBottom: '32px'
    }}>
      {stats.map((stat, index) => (
        <StatItem
          key={index}
          label={stat.label}
          value={stat.value}
          unit={stat.unit}
          color={stat.color}
        />
      ))}
    </div>
  );
};
