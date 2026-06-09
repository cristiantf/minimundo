import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function SplashScreen() {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Mostrar contenido con delay
    setTimeout(() => setShowContent(true), 300);

    // Navegar a home después de la animación
    const timer = setTimeout(() => {
      navigate('/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Generar estrellas decorativas aleatorias
  const stars = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 60}%`,
    delay: `${Math.random() * 2}s`,
    size: `${Math.random() * 3 + 2}px`
  }));

  return (
    <div className="splash">
      {/* Estrellas de fondo */}
      <div className="splash__stars">
        {stars.map((star) => (
          <div
            key={star.id}
            className="splash__star"
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.delay,
              width: star.size,
              height: star.size
            }}
          />
        ))}
      </div>

      {/* Mascota */}
      {showContent && (
        <motion.div
          className="splash__mascot"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.8 }}
        >
          🌍
        </motion.div>
      )}

      {/* Título */}
      {showContent && (
        <motion.h1
          className="splash__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          ¡Bienvenidos a<span>MiniMundo!</span>
        </motion.h1>
      )}

      {/* Subtítulo */}
      {showContent && (
        <motion.p
          className="splash__subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Aprende jugando 🎮✨
        </motion.p>
      )}

      {/* Barra de carga */}
      <div className="splash__loader">
        <div className="splash__loader-bar" />
      </div>
    </div>
  );
}

export default SplashScreen;
