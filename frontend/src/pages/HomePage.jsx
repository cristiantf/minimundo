import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const { user } = useAuth();
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowCategories(true), 400);
  }, []);

  // Estrellas decorativas de fondo
  const stars = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 50}%`,
    delay: `${Math.random() * 3}s`,
    size: `${Math.random() * 3 + 2}px`
  }));

  const categories = [
    { id: 'lectura', icon: '📖', label: 'Lectura', path: '/lectura' },
    { id: 'matematicas', icon: '🔢', label: 'Matemáticas', path: '/matematicas' },
    { id: 'animales', icon: '🐾', label: 'Animales', path: '/animales' },
    { id: 'colores', icon: '🎨', label: 'Colores', path: '/colores' },
    { id: 'memoria', icon: '🧠', label: 'Memoria', path: '/memoria' },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 200, damping: 15 }
    }
  };

  return (
    <div className="home">
      {/* Estrellas de fondo */}
      <div className="bg-stars">
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

      {/* Barra de estrellas */}
      <motion.div
        className="home__stars-bar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span>⭐</span>
        <span>{user?.total_stars || 0} estrellas</span>
      </motion.div>

      {/* Bienvenida */}
      <motion.div
        className="home__welcome"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="home__greeting">¡Hola, bienvenido!</p>
        <h1 className="home__title">
          ¡Bienvenidos a <span>MiniMundo!</span>
        </h1>
      </motion.div>

      {/* Mascota con burbuja de diálogo */}
      <motion.div
        className="home__mascot-area"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        <div className="home__mascot">🌍</div>
        <div className="home__speech">
          ¡Hola {user?.name || 'amiguito'}! 👋
        </div>
      </motion.div>

      {/* Categorías */}
      {showCategories && (
        <motion.div
          className="home__categories"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              className="home__category"
              variants={cardVariants}
              whileTap={{ scale: 0.9 }}
            >
              <span className="home__category-icon">{cat.icon}</span>
              <span className="home__category-label">{cat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default HomePage;
