import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import MemoryCard from './MemoryCard';
import MascotWidget from '../common/MascotWidget';

const MemoryGame = ({ activities, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const { playSound } = useAudio();

  const currentActivity = activities[currentIndex];

  // Inicializar el nivel
  useEffect(() => {
    if (!currentActivity) return;

    // Duplicar las cartas para crear parejas
    const levelCards = currentActivity.content.cards;
    const duplicatedCards = [...levelCards, ...levelCards].map((card, index) => ({
      ...card,
      uniqueId: `${card.id}-${index}`, // ID único para React key
      isMatched: false
    }));

    // Mezclar aleatoriamente
    setCards(duplicatedCards.sort(() => 0.5 - Math.random()));
    setFlippedCards([]);
    setMatchedPairs(0);
    setDisabled(false);
  }, [currentIndex, currentActivity]);

  // Manejar click en carta
  const handleCardClick = (clickedCard) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.some(c => c.uniqueId === clickedCard.uniqueId)) return; // Ya está volteada

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    // Si volteó 2 cartas, comprobar si coinciden
    if (newFlippedCards.length === 2) {
      setDisabled(true);
      const [firstCard, secondCard] = newFlippedCards;

      if (firstCard.id === secondCard.id) {
        // Coincidencia
        setTimeout(() => {
          playSound('correct');
          setCards(prevCards => 
            prevCards.map(card => 
              card.id === firstCard.id ? { ...card, isMatched: true } : card
            )
          );
          setMatchedPairs(prev => prev + 1);
          setFlippedCards([]);
          setDisabled(false);
        }, 500);
      } else {
        // No coinciden
        setTimeout(() => {
          playSound('wrong');
          setFlippedCards([]);
          setDisabled(false);
        }, 1200);
      }
    }
  };

  // Comprobar fin de nivel
  useEffect(() => {
    if (!currentActivity) return;
    
    if (matchedPairs > 0 && matchedPairs === currentActivity.content.pairs) {
      setTimeout(() => {
        playSound('celebration');
        if (currentIndex < activities.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          onComplete();
        }
      }, 1000);
    }
  }, [matchedPairs, currentActivity, currentIndex, activities.length, onComplete, playSound]);

  if (!currentActivity) return null;

  // Ajustar grid según la dificultad
  const totalCards = currentActivity.content.pairs * 2;
  const gridCols = totalCards <= 4 ? 'grid-cols-2' : totalCards <= 6 ? 'grid-cols-3' : 'grid-cols-4';

  return (
    <div className="flex-1 flex flex-col items-center w-full max-w-3xl mx-auto gap-6 pb-8 h-full">
      
      {/* Indicador de Progreso */}
      <div className="w-full bg-white/30 rounded-full h-3 mb-2 overflow-hidden shadow-inner">
        <div 
          className="bg-[#E74C3C] h-full transition-all duration-500 ease-out"
          style={{ width: `${(currentIndex / activities.length) * 100}%` }}
        />
      </div>

      <div className="w-full flex justify-between items-center bg-white/40 p-4 rounded-3xl backdrop-blur-sm mb-4 shadow-sm">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#C0392B]">
          {currentActivity.title}
        </h2>
        <div className="text-xl font-bold text-gray-700 bg-white px-4 py-1 rounded-full shadow-sm">
          Parejas: {matchedPairs} / {currentActivity.content.pairs}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`w-full grid ${gridCols} gap-4 px-2 flex-1 items-center justify-center`}
        >
          {cards.map(card => {
            const isFlipped = card.isMatched || flippedCards.some(fc => fc.uniqueId === card.uniqueId);
            return (
              <MemoryCard
                key={card.uniqueId}
                card={card}
                isFlipped={isFlipped}
                onClick={handleCardClick}
                disabled={disabled || card.isMatched}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>

    </div>
  );
};

MemoryGame.propTypes = {
  activities: PropTypes.array.isRequired,
  onComplete: PropTypes.func.isRequired
};

export default MemoryGame;
