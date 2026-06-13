import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import WoodFrame from '../common/WoodFrame';
import KidButton from '../common/KidButton';
import MascotWidget from '../common/MascotWidget';

const COLORS = [
  { id: 'red', hex: '#E74C3C' },
  { id: 'blue', hex: '#3498DB' },
  { id: 'yellow', hex: '#F1C40F' },
  { id: 'green', hex: '#2ECC71' },
  { id: 'purple', hex: '#9B59B6' },
  { id: 'black', hex: '#2C3E50' }
];

const CanvasBoard = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(COLORS[0].hex);
  const [lineWidth, setLineWidth] = useState(12);
  const { playSound } = useAudio();

  // Inicializar canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Configurar alta resolución para canvas
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Fondo blanco por defecto
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, rect.width, rect.height);
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const startDrawing = (e) => {
    // Evitar scroll en touch
    if (e.type.includes('touch')) e.preventDefault();
    
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    // Dibujar un punto en caso de solo hacer click sin mover
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  const draw = (e) => {
    if (!isDrawing) return;
    if (e.type.includes('touch')) e.preventDefault();
    
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.closePath();
      setIsDrawing(false);
    }
  };

  const clearCanvas = () => {
    playSound('tap');
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, rect.width, rect.height);
  };

  const handleColorChange = (newColor) => {
    playSound('tap');
    setColor(newColor);
  };

  const handleFinish = () => {
    playSound('celebration');
    onComplete();
  };

  return (
    <div className="flex-1 flex flex-col items-center w-full max-w-4xl mx-auto gap-4 pb-8 h-full">
      <div className="w-full flex justify-between items-center mb-2">
        <MascotWidget speech="¡Dibuja lo que quieras!" size="sm" position="bottom-left" />
        <KidButton variant="secondary" onClick={handleFinish} className="py-2 px-6">
          ¡Terminé! ✨
        </KidButton>
      </div>

      <WoodFrame className="w-full flex-1 relative bg-white touch-none">
        <canvas
          ref={canvasRef}
          className="w-full h-[400px] md:h-[500px] cursor-crosshair rounded-xl"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          onTouchCancel={stopDrawing}
        />
        
        {/* Botón Flotante para Borrar */}
        <button
          onClick={clearCanvas}
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm border-2 border-gray-300 rounded-full p-3 shadow-md hover:bg-gray-100 transition-all active:scale-95"
          title="Borrar todo"
        >
          🗑️
        </button>
      </WoodFrame>

      {/* Paleta de Colores */}
      <div className="bg-white rounded-full p-3 shadow-lg flex gap-3 flex-wrap justify-center mt-4">
        {COLORS.map((c) => (
          <motion.button
            key={c.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleColorChange(c.hex)}
            className={`w-12 h-12 rounded-full border-4 shadow-sm transition-all ${color === c.hex ? 'scale-110 shadow-md ring-4 ring-offset-2 ring-gray-200' : 'border-white'}`}
            style={{ backgroundColor: c.hex, borderColor: color === c.hex ? 'white' : '#f3f4f6' }}
            aria-label={`Color ${c.id}`}
          />
        ))}
        {/* Borrador (Goma) */}
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleColorChange('#FFFFFF')}
            className={`w-12 h-12 rounded-full border-4 shadow-sm transition-all flex items-center justify-center text-xl bg-gray-100 ${color === '#FFFFFF' ? 'scale-110 shadow-md ring-4 ring-offset-2 ring-gray-200 border-white' : 'border-gray-200'}`}
            aria-label="Borrador"
          >
            🧹
        </motion.button>
      </div>
    </div>
  );
};

CanvasBoard.propTypes = {
  onComplete: PropTypes.func.isRequired
};

export default CanvasBoard;
