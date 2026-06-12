import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AudioProvider } from './context/AudioContext';
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import ModulePagePlaceholder from './pages/ModulePagePlaceholder';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AudioProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/modulo/:moduleId" element={<ModulePagePlaceholder />} />
          </Routes>
        </BrowserRouter>
      </AudioProvider>
    </AuthProvider>
  );
}

export default App;
