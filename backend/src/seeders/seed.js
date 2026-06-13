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
      },
      {
        module_id: modules[1].id,
        title: 'Número 4 - Cuatro Manzanas',
        type: 'number',
        difficulty: 2,
        content: { number: 4, word: 'Cuatro', representation: 'Cuatro Manzanas' },
        audio_url: '/sounds/numbers/4.mp3',
        image_url: '/images/numbers/4_manzanas.png'
      },
      {
        module_id: modules[1].id,
        title: 'Número 5 - Cinco Estrellas',
        type: 'number',
        difficulty: 2,
        content: { number: 5, word: 'Cinco', representation: 'Cinco Estrellas' },
        audio_url: '/sounds/numbers/5.mp3',
        image_url: '/images/numbers/5_estrellas.png'
      },
      {
        module_id: modules[1].id,
        title: 'Número 6 - Seis Globos',
        type: 'number',
        difficulty: 2,
        content: { number: 6, word: 'Seis', representation: 'Seis Globos' },
        audio_url: '/sounds/numbers/6.mp3',
        image_url: '/images/numbers/6_globos.png'
      },
      {
        module_id: modules[1].id,
        title: 'Número 7 - Siete Autos',
        type: 'number',
        difficulty: 3,
        content: { number: 7, word: 'Siete', representation: 'Siete Autos' },
        audio_url: '/sounds/numbers/7.mp3',
        image_url: '/images/numbers/7_autos.png'
      },
      {
        module_id: modules[1].id,
        title: 'Número 8 - Ocho Flores',
        type: 'number',
        difficulty: 3,
        content: { number: 8, word: 'Ocho', representation: 'Ocho Flores' },
        audio_url: '/sounds/numbers/8.mp3',
        image_url: '/images/numbers/8_flores.png'
      },
      {
        module_id: modules[1].id,
        title: 'Número 9 - Nueve Corazones',
        type: 'number',
        difficulty: 3,
        content: { number: 9, word: 'Nueve', representation: 'Nueve Corazones' },
        audio_url: '/sounds/numbers/9.mp3',
        image_url: '/images/numbers/9_corazones.png'
      },
      {
        module_id: modules[1].id,
        title: 'Número 10 - Diez Soles',
        type: 'number',
        difficulty: 3,
        content: { number: 10, word: 'Diez', representation: 'Diez Soles' },
        audio_url: '/sounds/numbers/10.mp3',
        image_url: '/images/numbers/10_soles.png'
      }
    ]);

    // ==========================================
    // ACTIVIDADES — MÓDULO COLORES Y FORMAS
    // ==========================================
    await Activity.bulkCreate([
      {
        module_id: modules[3].id,
        title: 'Color Rojo - Manzana',
        type: 'color',
        difficulty: 1,
        content: { color: 'Rojo', hex: '#E74C3C', object: 'Manzana', emoji: '🍎' },
        audio_url: '/sounds/colors/rojo.mp3',
        image_url: '/images/colors/rojo_manzana.png'
      },
      {
        module_id: modules[3].id,
        title: 'Color Azul - Ballena',
        type: 'color',
        difficulty: 1,
        content: { color: 'Azul', hex: '#3498DB', object: 'Ballena', emoji: '🐳' },
        audio_url: '/sounds/colors/azul.mp3',
        image_url: '/images/colors/azul_ballena.png'
      },
      {
        module_id: modules[3].id,
        title: 'Forma Círculo',
        type: 'shape',
        difficulty: 1,
        content: { shape: 'Círculo', object: 'Pelota', emoji: '⚽' },
        audio_url: '/sounds/shapes/circulo.mp3',
        image_url: '/images/shapes/circulo_pelota.png'
      },
      {
        module_id: modules[3].id,
        title: 'Forma Cuadrado',
        type: 'shape',
        difficulty: 1,
        content: { shape: 'Cuadrado', object: 'Regalo', emoji: '🎁' },
        audio_url: '/sounds/shapes/cuadrado.mp3',
        image_url: '/images/shapes/cuadrado_regalo.png'
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
