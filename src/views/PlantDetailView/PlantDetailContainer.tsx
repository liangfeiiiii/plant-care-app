import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import { plantService } from '../../services/plantService';
import { PlantDetailUI } from './PlantDetailUI';

export const PlantDetailContainer: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const { plants, waterPlant, archivePlant } = useStore();
  const navigate = useNavigate();

  const plant = plants.find(p => p.id === id);

  if (!plant) {
    return <div style={{ marginTop: '40px', textAlign: 'center' }}>找不到这株植物</div>;
  }

  const status = plantService.getStatus(plant);

  const handleWater = () => {
    waterPlant(plant.id);
  };

  const handleArchive = () => {
    if (window.confirm(`确定要将"${plant.name}"送往伊甸园吗？它将以永恒的姿态被铭记。`)) {
      archivePlant(plant.id);
      navigate('/eden');
    }
  };

  return (
    <PlantDetailUI
      plant={plant}
      status={status}
      onWater={handleWater}
      onArchive={handleArchive}
      onBack={() => navigate(-1)}
    />
  );
};
