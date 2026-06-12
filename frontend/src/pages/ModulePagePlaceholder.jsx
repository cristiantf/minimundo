import { useParams } from 'react-router-dom';
import TopBar from '../components/common/TopBar';
import MascotWidget from '../components/common/MascotWidget';
import WoodFrame from '../components/common/WoodFrame';

function ModulePagePlaceholder() {
  const { moduleId } = useParams();

  const moduleInfo = {
    lectura: { title: 'Lectura', emoji: '📖', color: 'from-orange-400 to-orange-500' },
    matematicas: { title: 'Matemáticas', emoji: '🔢', color: 'from-blue-400 to-blue-500' },
    animales: { title: 'Animales', emoji: '🐾', color: 'from-green-400 to-green-500' },
    colores: { title: 'Colores y Formas', emoji: '🎨', color: 'from-pink-400 to-pink-500' },
    memoria: { title: 'Memoria', emoji: '🧠', color: 'from-purple-400 to-purple-500' }
  };

  const currentModule = moduleInfo[moduleId] || { title: 'Módulo Desconocido', emoji: '❓', color: 'from-gray-400 to-gray-500' };

  return (
    <div className={`screen screen--activity flex flex-col`}>
      <TopBar title={currentModule.title} requireHoldToExit={true} />
      
      <div className="flex-1 flex flex-col p-4 md:p-8 gap-4 overflow-hidden relative">
        <MascotWidget 
          speech={`¡Bienvenido a ${currentModule.title}! Pronto jugaremos aquí.`} 
          position="bottom-left"
          size="sm"
        />

        <WoodFrame className="mt-4 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className={`text-8xl mb-6 bg-gradient-to-br ${currentModule.color} text-transparent bg-clip-text drop-shadow-md`}>
              {currentModule.emoji}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">¡En Construcción! 🚧</h2>
            <p className="text-gray-600 text-lg">
              Estamos preparando juegos muy divertidos para ti.
            </p>
          </div>
        </WoodFrame>
      </div>
    </div>
  );
}

export default ModulePagePlaceholder;
