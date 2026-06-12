import PropTypes from 'prop-types';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { motion, AnimatePresence } from 'framer-motion';
import KidButton from './KidButton';
import { useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';

const RewardModal = ({ isOpen, onClose, starsEarned = 1, title = '¡Felicidades!' }) => {
  const { width, height } = useWindowSize();
  const { playSound } = useAudio();

  useEffect(() => {
    if (isOpen) {
      playSound('celebration');
    }
  }, [isOpen, playSound]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={400}
            gravity={0.15}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ type: 'spring', damping: 15 }}
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center border-8 border-[#FECA57] relative overflow-hidden"
          >
            {/* Rayos de fondo decorativos */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-100 to-transparent opacity-50 pointer-events-none" />

            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-8xl drop-shadow-lg mb-4"
            >
              🏆
            </motion.div>

            <h2 className="text-3xl font-extrabold text-[#FF9F43] mb-2 text-shadow-sm">
              {title}
            </h2>
            
            <p className="text-gray-600 font-bold text-lg mb-6">
              ¡Has ganado {starsEarned} estrella{starsEarned > 1 ? 's' : ''}!
            </p>

            <div className="flex justify-center gap-2 mb-8">
              {Array.from({ length: starsEarned }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (i * 0.2) }}
                  className="text-4xl drop-shadow-md"
                >
                  ⭐
                </motion.div>
              ))}
            </div>

            <KidButton variant="primary" onClick={onClose} className="w-full text-xl py-3 shadow-lg">
              Continuar ➡️
            </KidButton>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

RewardModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  starsEarned: PropTypes.number,
  title: PropTypes.string
};

export default RewardModal;
