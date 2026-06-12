import PropTypes from 'prop-types';
import { useAudio } from '../../context/AudioContext';

const KidButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  sound = 'tap',
  ...props 
}) => {
  const { playSound } = useAudio();

  const handleClick = (e) => {
    if (!disabled) {
      if (sound) playSound(sound);
      if (onClick) onClick(e);
    }
  };

  const baseClass = 'btn-kid';
  const variantClass = `btn-kid--${variant}`;

  return (
    <button
      className={`${baseClass} ${variantClass} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

KidButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'success']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  sound: PropTypes.string
};

export default KidButton;
