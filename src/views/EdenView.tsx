import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { PlantCard } from '../components/PlantCard';
import { Sparkles, ArrowLeft } from 'lucide-react';

export const EdenView: React.FC = () => {
  const { plants } = useStore();
  const archivedPlants = plants.filter(p => p.status === 'archived');
  const navigate = useNavigate();

  return (
    <div className="container" style={{ paddingBottom: '100px' }}>
      <header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Sparkles size={24} color="var(--color-primary)" />
          <h1 className="title" style={{ marginBottom: 0 }}>伊甸园</h1>
        </div>
        <p className="subtitle">那些曾惊艳过时光的绿意，在此永存</p>
      </header>

      <main>
        {archivedPlants.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '64px', opacity: 0.6 }}>
            <p style={{ color: 'var(--color-secondary)', fontSize: '14px' }}>
              这里还没有永生花，每一盆花都值得被珍藏
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {archivedPlants.map(plant => (
              <div 
                key={plant.id} 
                onClick={() => navigate(`/plant/${plant.id}`)}
                style={{ filter: 'grayscale(0.8) contrast(0.9)', opacity: 0.9 }}
              >
                <PlantCard 
                  name={plant.name} 
                  nextWatering="永生" 
                  imageUrl={plant.imageUrl} 
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
