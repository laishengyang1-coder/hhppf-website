import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './studio-base.css';
import ColorStudioPage from './pages/ColorStudioPage';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter><ColorStudioPage /></BrowserRouter>,
);
