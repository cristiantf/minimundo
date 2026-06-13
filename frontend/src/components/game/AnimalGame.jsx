import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import MascotWidget from '../common/MascotWidget';
import KidButton from '../common/KidButton';

const AnimalGame = ({ activities, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const { playSound, synthesizeSpeech } = useAudio();

  const currentActivity = activities[currentIndex];

  useEffect(() => {
    setSelectedOption(null);
  }, [currentIndex]);

  if (!currentActivity) return null;

  const handleNext = () => {
    if (currentIndex < activities.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleCorrect = (soundName = 'correct') => {
    playSound(soundName);
    setTimeout(() => {
      playSound('celebration');
      setTimeout(handleNext, 1500);
    }, 500);
  };

  const handleIncorrect = () => {
    playSound('wrong');
  };

  const renderGalleryMode = () => {
    const { animals } = currentActivity.content;
    return (
      <div className="flex justify-center gap-6 mt-8 flex-wrap">
        {animals.map((animal, i) => (
          <motion.button
            key={animal.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: [0, -10, 10, -10, 0] }}
            onClick={() => {
              if (synthesizeSpeech) synthesizeSpeech(`El ${animal.id} hace muuu`); // Simulación simple temporal
              if (i === animals.length - 1 && selectedOption === null) {
                 setSelectedOption(true);
                 setTimeout(handleNext, 2000);
              }
            }}
            className="w-32 h-32 bg-white rounded-3xl shadow-md border-4 border-yellow-400 flex items-center justify-center text-6xl"
          >
            {animal.emoji}
          </motion.button>
        ))}
        <p className="w-full text-center mt-4 text-xl font-bold text-white bg-black/20 rounded-full py-2">
          ¡Toca a los animales para conocerlos!
        </p>
      </div>
    );
  };

  const renderSelectionMode = (targetEmoji, targetText, correctOption, distractors) => {
    const options = [correctOption, ...distractors].sort(() => 0.5 - Math.random());
    
    return (
      <div className="flex flex-col items-center gap-8 w-full">
        <div className="bg-white/80 p-8 rounded-full shadow-lg border-4 border-white">
          <span className="text-8xl">{targetEmoji}</span>
        </div>
        <p className="text-2xl font-bold text-white bg-black/20 rounded-full px-6 py-2">
          {targetText}
        </p>
        <div className="flex gap-4 flex-wrap justify-center w-full">
          {options.map((opt, i) => (
            <motion.div
              key={opt.id + i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full max-w-[150px]"
            >
              <KidButton
                text={opt.emoji}
                color={selectedOption === opt.id ? (opt.id === correctOption.id ? 'green' : 'red') : 'blue'}
                onClick={() => {
                  if (selectedOption) return;
                  setSelectedOption(opt.id);
                  if (opt.id === correctOption.id) handleCorrect();
                  else {
                    handleIncorrect();
                    setTimeout(() => setSelectedOption(null), 1000);
                  }
                }}
                className="text-6xl h-32"
              />
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderShadowMode = () => {
    const { shadowTarget, distractors } = currentActivity.content;
    const options = [shadowTarget, ...distractors].sort(() => 0.5 - Math.random());
    
    return (
      <div className="flex flex-col items-center gap-8 w-full">
        <div className="bg-white/80 p-8 rounded-full shadow-lg border-4 border-white overflow-hidden relative w-48 h-48 flex items-center justify-center">
           {/* Filtro brightness(0) para simular sombra con emoji */}
          <span className="text-9xl filter brightness-0 opacity-80">{shadowTarget.emoji}</span>
        </div>
        <p className="text-2xl font-bold text-white bg-black/20 rounded-full px-6 py-2">
          ¿De quién es esta sombra?
        </p>
        <div className="flex gap-4 flex-wrap justify-center w-full">
          {options.map((opt, i) => (
            <motion.div
              key={opt.id + i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full max-w-[150px]"
            >
              <KidButton
                text={opt.emoji}
                color={selectedOption === opt.id ? (opt.id === shadowTarget.id ? 'green' : 'red') : 'blue'}
                onClick={() => {
                  if (selectedOption) return;
                  setSelectedOption(opt.id);
                  if (opt.id === shadowTarget.id) handleCorrect();
                  else {
                    handleIncorrect();
                    setTimeout(() => setSelectedOption(null), 1000);
                  }
                }}
                className="text-6xl h-32"
              />
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderSoundMode = () => {
    const { soundTarget, distractors } = currentActivity.content;
    const options = [soundTarget, ...distractors].sort(() => 0.5 - Math.random());
    
    return (
      <div className="flex flex-col items-center gap-8 w-full">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-yellow-400 p-8 rounded-full shadow-lg border-4 border-white relative w-40 h-40 flex items-center justify-center cursor-pointer"
          onClick={() => {
            if (synthesizeSpeech) synthesizeSpeech(`Sonido de ${soundTarget.id}`);
            else playSound('tap');
          }}
        >
          <span className="text-7xl">🔊</span>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute -inset-4 border-4 border-yellow-200 rounded-full"
          />
        </motion.button>
        <p className="text-2xl font-bold text-white bg-black/20 rounded-full px-6 py-2">
          ¿Quién hace este sonido? ¡Toca la bocina!
        </p>
        <div className="flex gap-4 flex-wrap justify-center w-full">
          {options.map((opt, i) => (
            <motion.div
              key={opt.id + i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full max-w-[150px]"
            >
              <KidButton
                text={opt.emoji}
                color={selectedOption === opt.id ? (opt.id === soundTarget.id ? 'green' : 'red') : 'purple'}
                onClick={() => {
                  if (selectedOption) return;
                  setSelectedOption(opt.id);
                  if (opt.id === soundTarget.id) handleCorrect();
                  else {
                    handleIncorrect();
                    setTimeout(() => setSelectedOption(null), 1000);
                  }
                }}
                className="text-6xl h-32"
              />
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full max-w-4xl mx-auto items-center">
      {/* Indicador de Progreso */}
      <div className="w-full bg-white/30 rounded-full h-3 mb-6 overflow-hidden shadow-inner">
        <div 
          className="bg-[#2ECC71] h-full transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex + 1) / activities.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentActivity.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="flex-1 w-full flex flex-col items-center justify-center"
        >
          {currentActivity.type === 'animal_gallery' && renderGalleryMode()}
          {currentActivity.type === 'animal_food' && renderSelectionMode(
            currentActivity.content.animal.emoji, 
            "¿Qué come este animal?", 
            currentActivity.content.correctOption, 
            currentActivity.content.distractors
          )}
          {currentActivity.type === 'animal_habitat' && renderSelectionMode(
            currentActivity.content.habitat.emoji, 
            `¿Quién vive en el ${currentActivity.content.habitat.name}?`, 
            currentActivity.content.correctOption, 
            currentActivity.content.distractors
          )}
          {currentActivity.type === 'animal_shadow' && renderShadowMode()}
          {currentActivity.type === 'animal_sound' && renderSoundMode()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

AnimalGame.propTypes = {
  activities: PropTypes.array.isRequired,
  onComplete: PropTypes.func.isRequired
};

export default AnimalGame;
