const { Module, Activity, Reward } = require('../models');

/**
 * Seeder: Datos iniciales de módulos, actividades y recompensas
 */
const seedDatabase = async () => {
  try {
    // ==========================================
    // MÓDULOS EDUCATIVOS
    // ==========================================
    const modules = await Module.bulkCreate([
      {
        name: 'Lectura',
        description: 'Aprende las letras del abecedario con imágenes y sonidos divertidos.',
        icon: 'book',
        sort_order: 1,
        is_active: true
      },
      {
        name: 'Matemáticas',
        description: 'Descubre los números y aprende a contar con juegos interactivos.',
        icon: 'numbers',
        sort_order: 2,
        is_active: true
      },
      {
        name: 'Animales',
        description: 'Conoce animales, sus sonidos y dónde viven.',
        icon: 'animals',
        sort_order: 3,
        is_active: true
      },
      {
        name: 'Colores y Formas',
        description: 'Identifica colores y formas geométricas pintando y jugando.',
        icon: 'palette',
        sort_order: 4,
        is_active: true
      },
      {
        name: 'Memoria',
        description: 'Ejercita tu memoria encontrando parejas de cartas.',
        icon: 'brain',
        sort_order: 5,
        is_active: true
      }
    ]);

    // ==========================================
    // ACTIVIDADES — MÓDULO LECTURA
    // ==========================================
    await Activity.bulkCreate([
      {
        module_id: modules[0].id,
        title: 'Letra M - Mariposa',
        type: 'letter',
        difficulty: 1,
        content: { letter: 'M', word: 'Mariposa', image: 'mariposa.png' },
        audio_url: '/sounds/letters/m.mp3',
        image_url: '/images/letters/m_mariposa.png'
      },
      {
        module_id: modules[0].id,
        title: 'Letra A - Abeja',
        type: 'letter',
        difficulty: 1,
        content: { letter: 'A', word: 'Abeja', image: 'abeja.png' },
        audio_url: '/sounds/letters/a.mp3',
        image_url: '/images/letters/a_abeja.png'
      },
      {
        module_id: modules[0].id,
        title: 'Letra S - Sol',
        type: 'letter',
        difficulty: 1,
        content: { letter: 'S', word: 'Sol', image: 'sol.png' },
        audio_url: '/sounds/letters/s.mp3',
        image_url: '/images/letters/s_sol.png'
      },
      {
        module_id: modules[0].id,
        title: 'Letra P - Perro',
        type: 'letter',
        difficulty: 2,
        content: { letter: 'P', word: 'Perro', image: 'perro.png' },
        audio_url: '/sounds/letters/p.mp3',
        image_url: '/images/letters/p_perro.png'
      }
    ]);

    // ==========================================
    // ACTIVIDADES — MÓDULO MATEMÁTICAS
    // ==========================================
    await Activity.bulkCreate([
      {
        module_id: modules[1].id,
        title: 'Número 1 - Un Gato',
        type: 'number',
        difficulty: 1,
        content: { number: 1, word: 'Uno', representation: 'Un Gato' },
        audio_url: '/sounds/numbers/1.mp3',
        image_url: '/images/numbers/1_gato.png'
      },
      {
        module_id: modules[1].id,
        title: 'Número 2 - Dos Osos',
        type: 'number',
        difficulty: 1,
        content: { number: 2, word: 'Dos', representation: 'Dos Osos' },
        audio_url: '/sounds/numbers/2.mp3',
        image_url: '/images/numbers/2_osos.png'
      },
      {
        module_id: modules[1].id,
        title: 'Número 3 - Tres Peces',
        type: 'number',
        difficulty: 1,
        content: { number: 3, word: 'Tres', representation: 'Tres Peces' },
        audio_url: '/sounds/numbers/3.mp3',
        image_url: '/images/numbers/3_peces.png'
      }
    ]);

    // ==========================================
    // ACTIVIDADES — MÓDULO MEMORIA
    // ==========================================
    await Activity.bulkCreate([
      {
        module_id: modules[4].id,
        title: 'Memoria Animales - Fácil',
        type: 'memory',
        difficulty: 1,
        content: {
          cards: [
            { id: 'gato', name: 'Gato', image: 'gato.png' },
            { id: 'panda', name: 'Panda', image: 'panda.png' }
          ],
          pairs: 2
        }
      },
      {
        module_id: modules[4].id,
        title: 'Memoria Animales - Medio',
        type: 'memory',
        difficulty: 2,
        content: {
          cards: [
            { id: 'gato', name: 'Gato', image: 'gato.png' },
            { id: 'panda', name: 'Panda', image: 'panda.png' },
            { id: 'perro', name: 'Perro', image: 'perro.png' }
          ],
          pairs: 3
        }
      }
    ]);

    // ==========================================
    // RECOMPENSAS
    // ==========================================
    await Reward.bulkCreate([
      {
        name: 'Primera Estrella',
        description: '¡Ganaste tu primera estrella!',
        icon: 'star_1',
        stars_required: 1,
        type: 'badge'
      },
      {
        name: 'Explorador',
        description: '¡Completaste tu primera actividad!',
        icon: 'explorer',
        stars_required: 5,
        type: 'badge'
      },
      {
        name: 'Trofeo de Bronce',
        description: '¡Eres increíble! Sigue aprendiendo.',
        icon: 'trophy_bronze',
        stars_required: 10,
        type: 'trophy'
      },
      {
        name: 'Trofeo de Plata',
        description: '¡Eres un gran aprendiz!',
        icon: 'trophy_silver',
        stars_required: 25,
        type: 'trophy'
      },
      {
        name: 'Gran Trofeo de Estrellas',
        description: '¡El trofeo máximo de MiniMundo! ¡Excelente trabajo!',
        icon: 'trophy_gold',
        stars_required: 50,
        type: 'trophy'
      }
    ]);

    console.log('✅ Base de datos poblada con datos iniciales.');
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error.message);
    throw error;
  }
};

module.exports = seedDatabase;
