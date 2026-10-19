import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface Plant {
  id: string;
  name: string;
  species?: string;
  imageUrl: string;
  lastWatered: string; // ISO date string
  waterIntervalDays: number;
  status: 'active' | 'archived';
  archiveDate?: string;
}

// Deep module: 调用者只需关心意图，不用知道内部结构
export interface NewPlantInput {
  name: string;
  species?: string;
  imageUrl: string;
  waterIntervalDays: number;
}

interface AppState {
  plants: Plant[];
  addPlant: (input: NewPlantInput) => void;
  waterPlant: (id: string) => void;
  archivePlant: (id: string) => void;
}

const StoreContext = createContext<AppState | undefined>(undefined);

const initialPlants: Plant[] = [
  {
    id: '1',
    name: '我的小龟背',
    species: '龟背竹 (Monstera)',
    imageUrl: '/plant1.png',
    lastWatered: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    waterIntervalDays: 7,
    status: 'active',
  },
  {
    id: '2',
    name: '客厅的树',
    species: '琴叶榕 (Fiddle Leaf Fig)',
    imageUrl: '/plant2.png',
    lastWatered: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    waterIntervalDays: 14,
    status: 'active',
  }
];

export const StoreProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [plants, setPlants] = useState<Plant[]>(initialPlants);

  // Deep module: 内部自动处理 id、status、lastWatered
  const addPlant = (input: NewPlantInput) => {
    const newPlant: Plant = {
      ...input,
      id: Date.now().toString(),
      status: 'active',
      lastWatered: new Date().toISOString(),
    };
    setPlants(prev => [newPlant, ...prev]);
  };

  const waterPlant = (id: string) => {
    setPlants(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, lastWatered: new Date().toISOString() };
      }
      return p;
    }));
  };

  const archivePlant = (id: string) => {
    setPlants(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: 'archived', archiveDate: new Date().toISOString() };
      }
      return p;
    }));
  };

  return (
    <StoreContext.Provider value={{ plants, addPlant, waterPlant, archivePlant }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
