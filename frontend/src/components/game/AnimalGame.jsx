import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import MascotWidget from '../common/MascotWidget';
import KidButton from '../common/KidButton';

const AnimalGame = ({ activities, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [listenedAnimals, setListenedAnimals] = useState([]);
  const [currentQuestionData, setCurrentQuestionData] = useState(null);
  
  const { playSound, synthesizeSpeech } = useAudio();

  const getAnimalSoundText = (id) => {
    const sounds = {
      vaca: 'Soy una vaca. ¡Muuuu!',
      cerdo: 'Soy un cerdo. ¡Oink oink!',
      pato: 'Soy un pato. ¡Cuac cuac!',
      perro: 'Soy un perro. ¡Guau guau!',
      gato: 'Soy un gato. ¡Miau miau!',
      caballo: 'Soy un caballo. ¡Hiii hiii!',
      mono: 'Soy un mono. ¡Uh uh ah ah!',
      delfin: 'Soy un delfín. ¡Iii iii!',
      leon: 'Soy un león. ¡Rooaar!',
      aguila: 'Soy un águila. ¡Iiiik!',
      elefante: 'Soy un elefante. ¡Fruuu!',
      jirafa: 'Soy una jirafa. ¡Ñam ñam!',
      tigre: 'Soy un tigre. ¡Grrr!'
    };
    return sounds[id] || `Este es el ${id}`;
  };

  const getJustAnimalSound = (id) => {
    const sounds = {
      vaca: '¡Muuuu!',
      cerdo: '¡Oink oink!',
      pato: '¡Cuac cuac!',
      perro: '¡Guau guau!',
      gato: '¡Miau miau!',
      caballo: '¡Hiii hiii!'
    };
    return sounds[id] || `Sonido de ${id}`;
  };

  const currentActivity = activities[currentIndex];

  useEffect(() => {
    setSelectedOption(null);
    setListenedAnimals([]);
    if (currentActivity?.content?.questions) {
      // Pick a random question for the current activity
      const questions = currentActivity.content.questions;
      const randomQ = questions[Math.floor(Math.random() * questions.length)];
      setCurrentQuestionData(randomQ);
    } else {
      setCurrentQuestionData(null);
    }
  }, [currentIndex, currentActivity]);

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
        {animals.map((animal) => {
          const isListened = listenedAnimals.includes(animal.id);
          return (
            <motion.button
              key={animal.id}
              animate={{ rotate: isListened ? 10 : 0, scale: isListened ? 0.95 : 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (synthesizeSpeech) synthesizeSpeech(getAnimalSoundText(animal.id));
                if (!isListened) {
                  const newList = [...listenedAnimals, animal.id];
                  setListenedAnimals(newList);
                  if (newList.length === animals.length) {
                    setSelectedOption(true);
                    setTimeout(handleNext, 3000); // Dar más tiempo si completó todos
                  }
                }
              }}
              className={`w-32 h-32 rounded-3xl shadow-md border-4 flex flex-col items-center justify-center text-6xl relative transition-colors ${isListened ? 'bg-green-100 border-green-500' : 'bg-white border-yellow-400'}`}
            >
              {animal.emoji}
              {isListened && (
                <div className="absolute -top-3 -right-3 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center text-white text-xl shadow-md">
                  ✓
                </div>
              )}
            </motion.button>
          );
        })}
        <p className="w-full text-center mt-4 text-xl font-bold text-white bg-black/20 rounded-full py-2">
          ¡Toca a todos los animales para conocerlos! ({listenedAnimals.length}/{animals.length})
        </p>
      </div>
    );
  };

  const renderSelectionMode = (targetEmoji, targetText, correctOption, distractors) => {
    // Si no tenemos los datos aún, no renderizamos
    if (!correctOption || !distractors) return null;

    // Use a ref or state if you don't want options to shuffle on every render.
    // For simplicity, we just sort them if they aren't already handled.
    // But since selectedOption triggers a re-render, sorting here causes them to swap places!
    // We should compute options only once per question.
    // To do this inline safely without a new state, we can use useMemo, but since we have a parent component, 
    // we'll just seed the `options` array deterministically or use useMemo.
    
    // We can map them inside useMemo if needed. For now, we'll sort them deterministically by ID.
    const options = [correctOption, ...distractors].sort((a, b) => a.id.localeCompare(b.id));
    
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
              className="w-full max-w-[180px]"
            >
              <KidButton
                variant={selectedOption === opt.id ? (opt.id === correctOption.id ? 'success' : 'accent') : 'primary'}
                onClick={() => {
                  if (selectedOption) return;
                  setSelectedOption(opt.id);
                  if (opt.id === correctOption.id) handleCorrect();
                  else {
                    handleIncorrect();
                    setTimeout(() => setSelectedOption(null), 1000);
                  }
                }}
                className="text-8xl h-40 w-full flex items-center justify-center"
              >
                {opt.emoji}
              </KidButton>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderShadowMode = () => {
    if (!currentQuestionData) return null;
    const { shadowTarget, distractors } = currentQuestionData;
    const options = [shadowTarget, ...distractors].sort((a, b) => a.id.localeCompare(b.id));
    
    return (
      <div className="flex flex-col items-center gap-8 w-full">
        <div className="bg-white/80 p-8 rounded-full shadow-lg border-4 border-white overflow-hidden relative w-48 h-48 flex items-center justify-center">
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
              className="w-full max-w-[180px]"
            >
              <KidButton
                variant={selectedOption === opt.id ? (opt.id === shadowTarget.id ? 'success' : 'accent') : 'primary'}
                onClick={() => {
                  if (selectedOption) return;
                  setSelectedOption(opt.id);
                  if (opt.id === shadowTarget.id) handleCorrect();
                  else {
                    handleIncorrect();
                    setTimeout(() => setSelectedOption(null), 1000);
                  }
                }}
                className="text-8xl h-40 w-full flex items-center justify-center"
              >
                {opt.emoji}
              </KidButton>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderSoundMode = () => {
    if (!currentQuestionData) return null;
    const { soundTarget, distractors } = currentQuestionData;
    const options = [soundTarget, ...distractors].sort((a, b) => a.id.localeCompare(b.id));
    
    return (
      <div className="flex flex-col items-center gap-8 w-full">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-yellow-400 p-8 rounded-full shadow-lg border-4 border-white relative w-40 h-40 flex items-center justify-center cursor-pointer"
          onClick={() => {
            if (synthesizeSpeech) synthesizeSpeech(getJustAnimalSound(soundTarget.id));
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
              className="w-full max-w-[180px]"
            >
              <KidButton
                variant={selectedOption === opt.id ? (opt.id === soundTarget.id ? 'success' : 'accent') : 'secondary'}
                onClick={() => {
                  if (selectedOption) return;
                  setSelectedOption(opt.id);
                  if (opt.id === soundTarget.id) handleCorrect();
                  else {
                    handleIncorrect();
                    setTimeout(() => setSelectedOption(null), 1000);
                  }
                }}
                className="text-8xl h-40 w-full flex items-center justify-center"
              >
                {opt.emoji}
              </KidButton>
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
          {currentActivity.type === 'animal_food' && currentQuestionData && renderSelectionMode(
            currentQuestionData.animal.emoji, 
            "¿Qué come este animal?", 
            currentQuestionData.correctOption, 
            currentQuestionData.distractors
          )}
          {currentActivity.type === 'animal_habitat' && currentQuestionData && renderSelectionMode(
            currentQuestionData.habitat.emoji, 
            `¿Quién vive en el ${currentQuestionData.habitat.name}?`, 
            currentQuestionData.correctOption, 
            currentQuestionData.distractors
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
