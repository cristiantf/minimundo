import PropTypes from 'prop-types';
import { useAudio } from '../../context/AudioContext';

const GameCard = ({ 
  title, 
  subtitle, 
  icon, 
  onClick, 
  variant = 'default',
  className = ''
}) => {
  const { playSound } = useAudio();

  const handleClick = () => {
    playSound('tap');
    if (onClick) onClick();
  };

  return (
    <div 
      className={`game-card game-card--${variant} ${className}`}
      onClick={handleClick}
    >
      {icon && <div className="game-card__icon text-xxl mb-sm">{icon}</div>}
      {title && <h3 className="game-card__title text-lg font-bold">{title}</h3>}
      {subtitle && <p className="game-card__subtitle text-sm text-secondary mt-xs">{subtitle}</p>}
    </div>
  );
};

GameCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'letter', 'number']),
  className: PropTypes.string
};

export default GameCard;
