import { createContext, useContext, useRef, useCallback } from 'react';
import { Howl } from 'howler';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const soundsRef = useRef({});

  // Reproducir un efecto de sonido
  const playSound = useCallback((soundName) => {
    const soundMap = {
      tap: '/assets/sounds/effects/tap.mp3',
      correct: '/assets/sounds/effects/correct.mp3',
      wrong: '/assets/sounds/effects/wrong.mp3',
      star: '/assets/sounds/effects/star.mp3',
      celebration: '/assets/sounds/effects/celebration.mp3',
      flip: '/assets/sounds/effects/flip.mp3',
    };

    const src = soundMap[soundName];
    if (!src) return;

    // Reutilizar la instancia de Howl si ya existe
    if (!soundsRef.current[soundName]) {
      soundsRef.current[soundName] = new Howl({
        src: [src],
        volume: 0.7,
        preload: true
      });
    }

    soundsRef.current[soundName].play();
  }, []);

  // Reproducir audio de una URL específica (letras, números)
  const playAudio = useCallback((url) => {
    const sound = new Howl({
      src: [url],
      volume: 0.9
    });
    sound.play();
  }, []);

  // Detener todos los sonidos
  const stopAll = useCallback(() => {
    Object.values(soundsRef.current).forEach(sound => sound.stop());
  }, []);

  return (
    <AudioContext.Provider value={{ playSound, playAudio, stopAll }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio debe usarse dentro de AudioProvider');
  }
  return context;
};
