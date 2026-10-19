import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useStore } from '../store';
import type { Plant } from '../store';
import { PlantCard } from '../components/PlantCard';
import { Button } from '../components/Button';
import { StatsGrid } from '../components/StatsGrid';
import { plantService } from '../services/plantService';

export const HomeView: React.FC = () => {
  const { plants } = useStore();
  const activePlants = plants.filter(p => p.status === 'active');
  const navigate = useNavigate();

  const getWateringStatus = (plant: Plant) => plantService.getStatus(plant).statusText;

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 className="title">绿意日记</h1>
          <p className="subtitle" style={{ marginBottom: 0 }}>你的私人植物养护馆</p>
        </div>
        <button 
          onClick={() => navigate('/add')}
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-md)',
            cursor: 'pointer',
            marginTop: '4px'
          }}
        >
          <Plus size={24} />
        </button>
      </header>

      <main>
        {activePlants.length > 0 && <StatsGrid plants={activePlants} />}
        {activePlants.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '64px' }}>
            <p style={{ color: 'var(--color-secondary)', marginBottom: '24px' }}>
              你的花园还空空如也，快去添加植物吧
            </p>
            <Button onClick={() => navigate('/add')}>添加新植物</Button>
          </div>
        ) : (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
            {activePlants.map(plant => (
              <div key={plant.id} onClick={() => navigate(`/plant/${plant.id}`)}>
                <PlantCard 
                  name={plant.name} 
                  nextWatering={getWateringStatus(plant)} 
                  imageUrl={plant.imageUrl} 
                />
              </div>
            ))}
          </section>
        )}
      </main>
    </>
  );
};
