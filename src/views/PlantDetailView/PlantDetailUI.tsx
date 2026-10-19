import React from 'react';
import type { Plant } from '../../store';
import type { PlantStatus } from '../../services/plantService';
import { Button } from '../../components/Button';
import { Droplet, ArrowLeft } from 'lucide-react';

interface PlantDetailUIProps {
  plant: Plant;
  status: PlantStatus;
  onWater: () => void;
  onArchive: () => void;
  onBack: () => void;
}

export const PlantDetailUI: React.FC<PlantDetailUIProps> = ({
  plant,
  status,
  onWater,
  onArchive,
  onBack,
}) => {
  return (
    <div>
      {/* Header Image */}
      <div style={headerStyle}>
        <img
          src={plant.imageUrl}
          alt={plant.name}
          style={{
            ...imageStyle,
            filter: plant.status === 'archived' ? 'grayscale(0.8) contrast(0.9)' : 'none',
          }}
        />
        <button style={backButtonStyle} onClick={onBack}>
          <ArrowLeft size={20} color="var(--color-text)" />
        </button>
      </div>

      {/* Title */}
      <h2 style={{ fontSize: '28px', marginBottom: '4px' }}>{plant.name}</h2>
      {plant.species && (
        <p style={{ color: 'var(--color-secondary)', marginBottom: '24px' }}>
          {plant.species}
        </p>
      )}

      {/* Stats Card */}
      <div style={statsCardStyle}>
        <div>
          <h4 style={labelStyle}>最近浇水</h4>
          <p style={valueStyle}>
            {new Date(plant.lastWatered).toLocaleDateString()}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h4 style={labelStyle}>浇水频率</h4>
          <p style={valueStyle}>每 {plant.waterIntervalDays} 天</p>
        </div>
      </div>

      {/* Water Button or Archived State */}
      {plant.status === 'active' ? (
        <Button
          onClick={onWater}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <Droplet size={20} /> 打卡浇水
        </Button>
      ) : (
        <div style={archivedStyle}>
          已入驻伊甸园，化作永恒绿意
        </div>
      )}

      {/* Growth Diary */}
      <div style={{ marginTop: '32px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>成长日记</h3>
        {plant.status === 'active' ? (
          <p style={diaryStyle}>
            相遇的第 {Math.floor(status.daysSinceLastWatered / 7) + 1} 星期。
            {status.isOverdue
              ? '该浇水了！💧'
              : status.isDueTomorrow
              ? '明天记得浇水哦'
              : '植物状态很好，叶片翠绿。'}
          </p>
        ) : (
          <p style={diaryStyle}>
            于 {new Date(plant.archiveDate!).toLocaleDateString()} 进入伊甸园。那些共度的时光，已被星辰珍藏。
          </p>
        )}
      </div>

      {/* Archive Button */}
      {plant.status === 'active' && (
        <button onClick={onArchive} style={archiveButtonStyle}>
          送往伊甸园
        </button>
      )}
    </div>
  );
};

// Styles
const headerStyle: React.CSSProperties = {
  position: 'relative',
  height: '320px',
  margin: '-32px -24px 24px -24px',
  borderBottomLeftRadius: '32px',
  borderBottomRightRadius: '32px',
  overflow: 'hidden',
  boxShadow: 'var(--shadow-sm)',
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const backButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '32px',
  left: '24px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  boxShadow: 'var(--shadow-sm)',
  backdropFilter: 'blur(4px)',
  cursor: 'pointer',
};

const statsCardStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-surface)',
  padding: '24px',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-sm)',
  marginBottom: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const labelStyle: React.CSSProperties = {
  fontSize: '14px',
  color: 'var(--color-secondary)',
};

const valueStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 'bold',
};

const archivedStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '20px',
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--color-secondary)',
  border: '1px dashed var(--color-secondary)',
  opacity: 0.8,
};

const diaryStyle: React.CSSProperties = {
  color: 'var(--color-secondary)',
  fontSize: '14px',
  textAlign: 'center',
  padding: '24px',
};

const archiveButtonStyle: React.CSSProperties = {
  width: '100%',
  marginTop: '24px',
  background: 'none',
  border: 'none',
  color: 'var(--color-secondary)',
  fontSize: '12px',
  textDecoration: 'underline',
  cursor: 'pointer',
  opacity: 0.6,
};
