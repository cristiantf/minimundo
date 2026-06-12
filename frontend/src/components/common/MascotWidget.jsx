import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const MascotWidget = ({ 
  speech, 
  emoji = '🌍', 
  size = 'md',
  position = 'bottom-left' // 'bottom-left', 'bottom-right', 'center'
}) => {
  
  const sizeClasses = {
    sm: 'w-16 h-16 text-3xl',
    md: 'w-24 h-24 text-5xl',
    lg: 'w-32 h-32 text-7xl'
  };

  // Posicionamiento de la burbuja dependiendo de dónde esté la mascota
  const bubblePositionClass = position.includes('left') 
    ? 'left-full ml-4 bottom-1/2 translate-y-1/2' 
    : 'right-full mr-4 bottom-1/2 translate-y-1/2';

  return (
    <div className={`relative flex items-end ${position === 'center' ? 'flex-col items-center' : ''}`}>
      <motion.div
        className={`rounded-full bg-gradient-to-br from-[#4ECDC4] to-[#3BAEA7] flex items-center justify-center shadow-lg shadow-[#4ECDC4]/40 z-10 ${sizeClasses[size]}`}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        {emoji}
      </motion.div>

      <AnimatePresence>
        {speech && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: position.includes('left') ? -20 : 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`absolute ${position === 'center' ? 'bottom-full mb-4' : bubblePositionClass} bg-white rounded-2xl p-3 shadow-md min-w-[120px] max-w-[200px] text-center z-20`}
          >
            <p className="text-sm font-bold text-gray-800 m-0">{speech}</p>
            {/* Triangulito de la burbuja */}
            <div className={`absolute w-4 h-4 bg-white transform rotate-45 ${
              position === 'center' ? 'bottom-[-6px] left-1/2 -translate-x-1/2' :
              position.includes('left') ? 'left-[-6px] top-1/2 -translate-y-1/2' :
              'right-[-6px] top-1/2 -translate-y-1/2'
            }`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

MascotWidget.propTypes = {
  speech: PropTypes.string,
  emoji: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  position: PropTypes.oneOf(['bottom-left', 'bottom-right', 'center'])
};

export default MascotWidget;
