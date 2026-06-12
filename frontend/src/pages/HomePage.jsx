import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';
import TopBar from '../components/common/TopBar';
import MascotWidget from '../components/common/MascotWidget';

function HomePage() {
  const { user } = useAuth();
  const { playSound } = useAudio();
  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowCategories(true), 400);
  }, []);

  const handleCategoryClick = (path) => {
    playSound('tap');
    navigate(path);
  };

  // Estrellas decorativas de fondo
  const stars = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 50}%`,
    delay: `${Math.random() * 3}s`,
    size: `${Math.random() * 3 + 2}px`
  }));

  const categories = [
    { id: 'lectura', icon: '📖', label: 'Lectura', path: '/modulo/lectura' },
    { id: 'matematicas', icon: '🔢', label: 'Matemáticas', path: '/modulo/matematicas' },
    { id: 'animales', icon: '🐾', label: 'Animales', path: '/modulo/animales' },
    { id: 'colores', icon: '🎨', label: 'Colores', path: '/modulo/colores' },
    { id: 'memoria', icon: '🧠', label: 'Memoria', path: '/modulo/memoria' },
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
    <div className="home p-0 pb-6 gap-0">
      <TopBar showBack={false} />

      {/* Estrellas de fondo */}
      <div className="bg-stars mt-16">
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

      <div className="flex-1 flex flex-col items-center gap-6 px-4 pt-6 w-full max-w-4xl mx-auto">
        {/* Bienvenida */}
        <motion.div
          className="home__welcome mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="home__greeting">¡Hola, bienvenido!</p>
          <h1 className="home__title">
            ¡Bienvenidos a <span>MiniMundo!</span>
          </h1>
        </motion.div>

        {/* Mascota Interactiva */}
        <div className="z-10 my-4">
          <MascotWidget
            speech={`¡Hola ${user?.name || 'amiguito'}! 👋 ¿A qué jugaremos hoy?`}
            position="center"
            size="md"
          />
        </div>

        {/* Categorías */}
        {showCategories && (
          <motion.div
            className="home__categories mt-4"
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
                onClick={() => handleCategoryClick(cat.path)}
              >
                <span className="home__category-icon">{cat.icon}</span>
                <span className="home__category-label">{cat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default HomePage;

