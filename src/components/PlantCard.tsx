import React from 'react';

interface PlantCardProps {
  name: string;
  nextWatering: string;
  imageUrl: string;
}

export const PlantCard: React.FC<PlantCardProps> = ({ name, nextWatering, imageUrl }) => {
  const cardStyle: React.CSSProperties = {
    position: 'relative',
    height: '240px',
    borderRadius: 'var(--radius-lg)', // 大圆角
    overflow: 'hidden',
    boxShadow: 'var(--shadow-md)', // 阴影区分层级
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  };

  const imageStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 1,
  };

  const gradientStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '50%',
    background: 'linear-gradient(to top, rgba(45, 42, 38, 0.8), transparent)', // 底部渐变遮罩
    zIndex: 2,
  };

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 3,
    padding: '24px',
    color: '#FFF',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  };

  const tagStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)',
    padding: '4px 12px',
    borderRadius: 'var(--radius-sm)', // 小圆角
    fontSize: '12px',
    fontWeight: 'bold',
    fontFamily: 'var(--font-body)',
  };

  return (
    <div 
      className="plant-card" 
      style={cardStyle}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <img src={imageUrl} alt={name} style={imageStyle} />
      <div style={gradientStyle} />
      <div style={contentStyle}>
        <h3 style={{ margin: 0, color: 'white', fontSize: '20px' }}>{name}</h3>
        <div style={tagStyle}>💧 {nextWatering} 浇水</div>
      </div>
    </div>
  );
};
