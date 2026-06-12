import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import WoodFrame from '../common/WoodFrame';

// Opciones aleatorias (emojis) para mezclar como distractores
const DUMMY_OPTIONS = ['🍎', '🚗', '🎈', '🐶', '⚽', '🍌', '🌻', '🧸', '🍕'];

const FlashcardGame = ({ activities, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [isCorrecting, setIsCorrecting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(null); // 'correct' | 'wrong' | null
  const { playSound } = useAudio();

  const currentActivity = activities[currentIndex];

  useEffect(() => {
    if (!currentActivity) return;

    // Generar opciones para la actividad actual
    let correctAnswer = '';
    
    // Asignar emoji según la actividad (Mock para desarrollo sin assets finales)
    if (currentActivity.type === 'letter') {
      const emojiMap = { 'Mariposa': '🦋', 'Abeja': '🐝', 'Sol': '☀️', 'Perro': '🐕' };
      correctAnswer = emojiMap[currentActivity.content.word] || '🌟';
    } else if (currentActivity.type === 'number') {
      const emojiMap = { 1: '🐱', 2: '🐻🐻', 3: '🐟🐟🐟' };
      correctAnswer = emojiMap[currentActivity.content.number] || '🔢';
    }

    // Seleccionar 2 distractores aleatorios
    const shuffledDummies = [...DUMMY_OPTIONS].sort(() => 0.5 - Math.random());
    const roundOptions = [correctAnswer, shuffledDummies[0], shuffledDummies[1]];

    // Mezclar las 3 opciones
    setOptions(roundOptions.sort(() => 0.5 - Math.random()));
    
    // Reproducir el audio de la letra/número al mostrar (si estuviera disponible)
    // playAudio(currentActivity.audio_url);

  }, [currentIndex, currentActivity]);

  const handleOptionClick = (option) => {
    if (isCorrecting) return;
    setIsCorrecting(true);

    let isCorrect = false;
    if (currentActivity.type === 'letter') {
      const emojiMap = { 'Mariposa': '🦋', 'Abeja': '🐝', 'Sol': '☀️', 'Perro': '🐕' };
      isCorrect = option === (emojiMap[currentActivity.content.word] || '🌟');
    } else if (currentActivity.type === 'number') {
      const emojiMap = { 1: '🐱', 2: '🐻🐻', 3: '🐟🐟🐟' };
      isCorrect = option === (emojiMap[currentActivity.content.number] || '🔢');
    }

    if (isCorrect) {
      playSound('correct');
      setShowFeedback('correct');
      setTimeout(() => {
        if (currentIndex < activities.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setShowFeedback(null);
          setIsCorrecting(false);
        } else {
          onComplete(); // Juego terminado
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

      <WoodFrame className="w-full relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        
        {/* Flashcard Principal */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(5px)' }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="flex flex-col items-center justify-center p-8 min-h-[250px]"
          >
            <div className="text-[120px] font-extrabold text-[#9B72CF] drop-shadow-md leading-none mb-4">
              {currentActivity.type === 'letter' ? currentActivity.content.letter : currentActivity.content.number}
            </div>
            <p className="text-2xl font-bold text-gray-600 uppercase tracking-widest bg-gray-100 px-6 py-2 rounded-full shadow-sm">
              ¿Dónde está {currentActivity.type === 'letter' ? currentActivity.content.word : currentActivity.content.representation}?
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Feedback visual interactivo (Tick o Cruz gigante) */}
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

      {/* Opciones (Tocar para emparejar) */}
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
            className="bg-white border-4 border-[#FF9F43] rounded-2xl p-4 flex items-center justify-center text-6xl md:text-7xl shadow-lg hover:shadow-xl hover:bg-orange-50 transition-colors aspect-square"
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

FlashcardGame.propTypes = {
  activities: PropTypes.array.isRequired,
  onComplete: PropTypes.func.isRequired
};

export default FlashcardGame;
