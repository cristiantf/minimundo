import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getModuleActivities, updateProgress } from '../services/api';
import { useAuth } from '../context/AuthContext';
import TopBar from '../components/common/TopBar';
import MascotWidget from '../components/common/MascotWidget';
import FlashcardGame from '../components/game/FlashcardGame';
import RewardModal from '../components/common/RewardModal';

const MODULE_INFO = {
  lectura: { id: 1, title: 'Lectura', color: 'from-[#FF9F43] to-[#FF7F00]' },
  matematicas: { id: 2, title: 'Matemáticas', color: 'from-[#4ECDC4] to-[#3BAEA7]' },
  animales: { id: 3, title: 'Animales', color: 'from-[#2ECC71] to-[#27AE60]' },
  colores: { id: 4, title: 'Colores y Formas', color: 'from-[#9B59B6] to-[#8E44AD]' },
  memoria: { id: 5, title: 'Memoria', color: 'from-[#E74C3C] to-[#C0392B]' }
};

const ModulePage = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { user, login } = useAuth(); // Usamos login para actualizar el estado del usuario localmente temporalmente

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const [starsEarned] = useState(5); // 5 estrellas por completar

  const currentModule = MODULE_INFO[moduleId];

  useEffect(() => {
    if (!currentModule) {
      setLoading(false);
      return;
    }

    const fetchActivities = async () => {
      try {
        setLoading(true);
        // Llama a la API (Asumiendo que el ID del módulo en BD coincide con currentModule.id)
        const response = await getModuleActivities(currentModule.id);
        
        // Si la API devuelve los datos anidados (dependiendo del formato)
        const rawData = Array.isArray(response) ? response : response.data || [];
        
        // Asegurarnos de que "content" sea un objeto (algunas BD devuelven string JSON)
        const parsedData = rawData.map(act => ({
          ...act,
          content: typeof act.content === 'string' ? JSON.parse(act.content) : act.content
        }));

        setActivities(parsedData);
      } catch (err) {
        console.error('Error cargando actividades:', err);
        setError('No pudimos cargar los juegos. 😢');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [currentModule]);

  const handleGameComplete = async () => {
    // Mostrar modal de recompensa
    setShowReward(true);

    // Actualizar progreso en backend si el usuario está logueado
    if (user?.id) {
      try {
        await updateProgress(user.id, currentModule.id, {
          completed_activities: activities.length,
          stars_earned: starsEarned
        });
        
        // Actualizar el estado local (idealmente desde AuthContext)
        login({ ...user, total_stars: (user.total_stars || 0) + starsEarned });
      } catch (err) {
        console.error('Error guardando progreso:', err);
      }
    } else {
      // Mock para testeo sin login
      login({ id: 999, name: 'Invitado', total_stars: (user?.total_stars || 0) + starsEarned });
    }
  };

  const handleRewardClose = () => {
    setShowReward(false);
    navigate('/home');
  };

  if (!currentModule) {
    return (
      <div className="screen flex flex-col items-center justify-center bg-gray-100">
        <TopBar showBack={true} requireHoldToExit={false} />
        <h1 className="text-2xl mt-10 text-gray-500 font-bold">Módulo no encontrado</h1>
      </div>
    );
  }

  return (
    <div className={`screen screen--activity bg-gradient-to-b ${currentModule.color} min-h-[100dvh] flex flex-col relative overflow-hidden`}>
      {/* Fondo decorativo de estrellas */}
      <div className="absolute inset-0 bg-[url('/assets/images/backgrounds/stars-pattern.png')] opacity-10 pointer-events-none" />

      <TopBar title={currentModule.title} requireHoldToExit={true} />

      <div className="flex-1 flex flex-col p-4 md:p-8 z-10 w-full max-w-4xl mx-auto h-full">
        {loading && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="animate-spin text-6xl mb-4">🌟</div>
            <p className="text-white font-bold text-xl">Cargando juegos...</p>
          </div>
        )}

        {error && (
          <div className="flex-1 flex flex-col items-center justify-center bg-white/20 rounded-3xl p-8 backdrop-blur-md">
            <MascotWidget speech={error} size="lg" position="center" />
          </div>
        )}

        {!loading && !error && activities.length > 0 && (
          <div className="flex-1 flex flex-col w-full animate-fade-in h-full pb-10">
            <div className="mb-4 hidden md:block">
              <MascotWidget 
                speech={`¡Vamos a jugar con ${currentModule.title}!`} 
                size="sm" 
                position="bottom-left" 
              />
            </div>
            
            {/* Contenedor del Juego */}
            <FlashcardGame 
              activities={activities} 
              onComplete={handleGameComplete} 
            />
          </div>
        )}

        {!loading && !error && activities.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center bg-white/20 rounded-3xl p-8 backdrop-blur-md text-center">
            <MascotWidget speech="Aún no hay juegos aquí. ¡Vuelve pronto!" size="lg" position="center" />
          </div>
        )}
      </div>

      <RewardModal 
        isOpen={showReward} 
        onClose={handleRewardClose} 
        starsEarned={starsEarned}
        title={`¡${currentModule.title} Completado!`}
      />
    </div>
  );
};

export default ModulePage;
