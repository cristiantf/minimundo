import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAudio } from '../../context/AudioContext';
import { useState } from 'react';

const TopBar = ({ 
  title, 
  showBack = true, 
  backPath = '/home',
  requireHoldToExit = false 
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { playSound } = useAudio();
  const [holding, setHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  
  let holdTimer;

  const handleBackStart = () => {
    playSound('tap');
    if (!requireHoldToExit) {
      navigate(backPath);
      return;
    }

    // Lógica para "Seguro Parental" (mantener presionado)
    setHolding(true);
    let progress = 0;
    holdTimer = setInterval(() => {
      progress += 10;
      setHoldProgress(progress);
      if (progress >= 100) {
        clearInterval(holdTimer);
        setHolding(false);
        playSound('celebration'); // Sonido especial al lograr salir
        navigate(backPath);
      }
    }, 100); // 1 segundo en total (10 * 100ms)
  };

  const handleBackEnd = () => {
    if (requireHoldToExit && holdProgress < 100) {
      clearInterval(holdTimer);
      setHolding(false);
      setHoldProgress(0);
    }
  };

  return (
    <div className="w-full flex items-center justify-between p-4 bg-white/10 backdrop-blur-md rounded-b-3xl shadow-sm z-50">
      <div className="flex items-center gap-4">
        {showBack && (
          <div className="relative">
            <button 
              className="w-12 h-12 rounded-full bg-white text-[#FF9F43] flex items-center justify-center text-2xl shadow-md hover:scale-105 active:scale-95 transition-transform overflow-hidden relative"
              onMouseDown={handleBackStart}
              onMouseUp={handleBackEnd}
              onTouchStart={handleBackStart}
              onTouchEnd={handleBackEnd}
            >
              <span className="relative z-10">⬅️</span>
              {/* Barra de progreso circular o fondo que se llena */}
              {holding && (
                <div 
                  className="absolute bottom-0 left-0 w-full bg-[#FF9F43]/30 transition-all duration-100 ease-linear"
                  style={{ height: `${holdProgress}%` }}
                />
              )}
            </button>
            {requireHoldToExit && holding && (
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-xs text-white bg-black/50 px-2 py-1 rounded-full whitespace-nowrap">
                Mantén presionado
              </span>
            )}
          </div>
        )}
        
        {title && <h2 className="text-2xl font-bold text-white text-shadow m-0">{title}</h2>}
      </div>

      <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
        <span className="text-2xl drop-shadow-md">⭐</span>
        <span className="text-white font-bold text-lg">{user?.total_stars || 0}</span>
      </div>
    </div>
  );
};

TopBar.propTypes = {
  title: PropTypes.string,
  showBack: PropTypes.bool,
  backPath: PropTypes.string,
  requireHoldToExit: PropTypes.bool
};

export default TopBar;
