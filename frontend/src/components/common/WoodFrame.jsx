import PropTypes from 'prop-types';

const WoodFrame = ({ children, className = '' }) => {
  return (
    <div className={`wood-frame w-full max-w-4xl mx-auto flex-1 flex flex-col ${className}`}>
      <div className="wood-frame-content flex-1 p-4 flex flex-col relative bg-white">
        {/* Tornillos decorativos en las esquinas */}
        <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-[#8B6914] shadow-inner opacity-50"></div>
        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#8B6914] shadow-inner opacity-50"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-[#8B6914] shadow-inner opacity-50"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-[#8B6914] shadow-inner opacity-50"></div>
        
        {children}
      </div>
    </div>
  );
};

WoodFrame.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default WoodFrame;
