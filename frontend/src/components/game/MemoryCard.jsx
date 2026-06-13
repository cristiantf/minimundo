import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';

const MemoryCard = ({ card, isFlipped, onClick, disabled }) => {
  const { playSound } = useAudio();

  const handleClick = () => {
    if (!disabled && !isFlipped) {
      playSound('tap');
      onClick(card);
    }
  };

  return (
    <div 
      className="relative w-full aspect-[3/4] cursor-pointer perspective-1000"
      onClick={handleClick}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Reverso de la carta (Oculta) */}
        <div 
          className={`absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-[#FF9F43] to-[#FF7F00] rounded-2xl border-4 border-white shadow-md flex items-center justify-center`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="text-6xl md:text-7xl drop-shadow-md opacity-80 text-white">❓</span>
        </div>

        {/* Anverso de la carta (Revelada) */}
        <div 
          className={`absolute inset-0 w-full h-full backface-hidden bg-white rounded-2xl border-4 border-[#2ECC71] shadow-md flex items-center justify-center`}
          style={{ 
            backfaceVisibility: 'hidden', 
            transform: 'rotateY(180deg)' 
          }}
        >
          <span className="text-7xl md:text-8xl drop-shadow-sm">{card.emoji}</span>
          
          {/* Overlay verde sutil si está emparejada */}
          {card.isMatched && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-green-400/20 rounded-xl"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

MemoryCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    uniqueId: PropTypes.string.isRequired,
    isMatched: PropTypes.bool
  }).isRequired,
  isFlipped: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default MemoryCard;
