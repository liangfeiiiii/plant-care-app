import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './store';
import { Layout } from './components/Layout';
import { HomeView } from './views/HomeView';
import { AddPlantView } from './views/AddPlantView';
import { PlantDetailView } from './views/PlantDetailView/index';
import { EncyclopediaView } from './views/EncyclopediaView';
import { EncyclopediaDetailView } from './views/EncyclopediaDetailView';
import { EdenView } from './views/EdenView';
import './index.css';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeView />} />
            <Route path="add" element={<AddPlantView />} />
            <Route path="encyclopedia" element={<EncyclopediaView />} />
            <Route path="encyclopedia/:id" element={<EncyclopediaDetailView />} />
            <Route path="eden" element={<EdenView />} />
            <Route path="plant/:id" element={<PlantDetailView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
