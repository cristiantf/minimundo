import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import WoodFrame from '../common/WoodFrame';

const DUMMY_EMOJIS = ['⭐', '🎈', '🚗', '🌻', '🧸', '🍕', '🦋', '🐝', '☀️', '🐕'];
const DUMMY_COLORS = ['#34495E', '#95A5A6', '#E67E22', '#1ABC9C', '#8E44AD'];

const ShapeSorter = ({ activities, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [isCorrecting, setIsCorrecting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(null); // 'correct' | 'wrong' | null
  const { playSound } = useAudio();

  const currentActivity = activities[currentIndex];

  useEffect(() => {
    if (!currentActivity) return;

    // Generar opciones falsas (distractores)
    const generateDummies = (correctOption) => {
      let dummies = [];
      if (currentActivity.type === 'color') {
        const otherColors = DUMMY_COLORS.filter(c => c !== currentActivity.content.hex);
        const shuffledColors = otherColors.sort(() => 0.5 - Math.random());
        dummies = [
          { type: 'color', value: shuffledColors[0], emoji: currentActivity.content.emoji },
          { type: 'color', value: shuffledColors[1], emoji: currentActivity.content.emoji }
        ];
      } else if (currentActivity.type === 'shape') {
        const otherEmojis = DUMMY_EMOJIS.filter(e => e !== currentActivity.content.emoji);
        const shuffledEmojis = otherEmojis.sort(() => 0.5 - Math.random());
        dummies = [
          { type: 'shape', value: shuffledEmojis[0] },
          { type: 'shape', value: shuffledEmojis[1] }
        ];
      }
      
      const allOptions = [correctOption, ...dummies];
      setOptions(allOptions.sort(() => 0.5 - Math.random()));
    };

    if (currentActivity.type === 'color') {
      generateDummies({ 
        type: 'color', 
        value: currentActivity.content.hex, 
        emoji: currentActivity.content.emoji,
        isCorrect: true 
      });
    } else if (currentActivity.type === 'shape') {
      generateDummies({ 
        type: 'shape', 
        value: currentActivity.content.emoji,
        isCorrect: true 
      });
    }

  }, [currentIndex, currentActivity]);

  const handleOptionClick = (option) => {
    if (isCorrecting) return;
    setIsCorrecting(true);

    if (option.isCorrect) {
      playSound('correct');
      setShowFeedback('correct');
      setTimeout(() => {
        if (currentIndex < activities.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setShowFeedback(null);
          setIsCorrecting(false);
        } else {
          onComplete(); // Juego terminado, desencadena el premio
        }
      }, 1500);
    } else {
      playSound('wrong');
      setShowFeedback('wrong');
      setTimeout(() => {
        setShowFeedback(null);
        setIsCorrecting(false);
      }, 1000);
    }
  };

  if (!currentActivity) return null;

  return (
    <div className="flex-1 flex flex-col items-center w-full max-w-2xl mx-auto gap-6 pb-8">
      
      {/* Indicador de Progreso */}
      <div className="w-full bg-white/30 rounded-full h-3 mb-2 overflow-hidden shadow-inner">
        <div 
          className="bg-[#2ECC71] h-full transition-all duration-500 ease-out"
          style={{ width: `${(currentIndex / activities.length) * 100}%` }}
        />
      </div>

      <WoodFrame className="w-full relative overflow-hidden bg-gradient-to-b from-purple-50 to-white">
        
        {/* Pregunta Principal */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(5px)' }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="flex flex-col items-center justify-center p-8 min-h-[250px]"
          >
            <div className="text-[100px] font-extrabold text-[#9B72CF] drop-shadow-md leading-none mb-6">
              {currentActivity.type === 'color' ? '🎨' : '🧩'}
            </div>
            <p className="text-2xl font-bold text-gray-600 uppercase tracking-widest bg-gray-100 px-6 py-4 rounded-3xl shadow-sm text-center">
              Encuentra el {currentActivity.type === 'color' ? currentActivity.content.color : currentActivity.content.shape}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Feedback visual interactivo */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10"
            >
              <div className={`text-[150px] drop-shadow-2xl ${showFeedback === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
                {showFeedback === 'correct' ? '✅' : '❌'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </WoodFrame>

      {/* Opciones (Tocar para seleccionar) */}
      <div className="w-full grid grid-cols-3 gap-4 px-2">
        {options.map((option, idx) => (
          <motion.button
            key={`${currentIndex}-${idx}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOptionClick(option)}
            disabled={isCorrecting}
            className="border-4 border-[#FF9F43] rounded-3xl p-4 flex items-center justify-center text-7xl shadow-lg hover:shadow-xl hover:bg-orange-50 transition-colors aspect-square"
            style={option.type === 'color' ? { backgroundColor: option.value } : { backgroundColor: 'white' }}
          >
            {option.type === 'shape' ? option.value : <span style={{filter: 'grayscale(100%) brightness(200%) opacity(0.5)'}}>{option.emoji}</span>}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

ShapeSorter.propTypes = {
  activities: PropTypes.array.isRequired,
  onComplete: PropTypes.func.isRequired
};

export default ShapeSorter;
