# 🔧 Documentación Técnica — MiniMundo

> **Aplicación Móvil Educativa e Interactiva para Niños de 3 a 5 Años**  
> Versión: 1.0.0 | Última actualización: 09/06/2026

---

## 1. Visión General de la Arquitectura

### 1.1 Stack Tecnológico

| Componente | Tecnología | Versión |
|-----------|------------|---------|
| Lenguaje Frontend | JavaScript (ES6+) / JSX | ES2022 |
| Framework Frontend | React.js | 18.x |
| Bundler | Vite | 5.x |
| Empaquetado Móvil | Capacitor | 6.x |
| Lenguaje Backend | JavaScript (Node.js) | 20.x LTS |
| Framework Backend | Express.js | 4.x |
| Base de datos | MySQL | 8.x |
| ORM | Sequelize | 6.x |
| Autenticación | JWT (jsonwebtoken) | Última estable |
| Almacenamiento de archivos | Servidor local / Multer | Última estable |
| Diseño UI/UX | Figma | N/A |
| IDE | VS Code + Android Studio (Capacitor) | Última estable |
| Control de versiones | Git + GitHub | N/A |
| Plataforma objetivo | Android 6.0+ (API 23) | N/A |

### 1.2 Patrón de Arquitectura

Se utilizará una arquitectura **cliente-servidor** con:
- **Frontend**: React.js con componentes funcionales, hooks y Context API para estado global
- **Backend**: API REST con Express.js siguiendo patrón MVC
- **Móvil**: Capacitor como bridge para compilar la app React como APK nativo de Android

```
minimundo/
├── frontend/                         # App React.js + Capacitor
│   ├── public/assets/
│   │   ├── images/                   # mascots/, letters/, numbers/, animals/, shapes/, backgrounds/
│   │   ├── sounds/                   # letters/, numbers/, animals/, effects/
│   │   └── animations/              # Archivos Lottie JSON
│   ├── src/
│   │   ├── main.jsx                  # Punto de entrada React
│   │   ├── App.jsx                   # Componente raíz + Router
│   │   ├── App.css                   # Estilos globales
│   │   ├── context/                  # AuthContext, ProgressContext, AudioContext
│   │   ├── hooks/                    # useAudio, useAnimation, useOfflineStorage
│   │   ├── services/                 # api.js (Axios), authService, progressService, moduleService
│   │   ├── components/
│   │   │   ├── common/              # MascotWidget, RewardStar, GameCard, SafeButton, WoodFrame
│   │   │   ├── home/                # CategoryCard, WelcomeBanner
│   │   │   ├── letters/             # LetterCard, NumberCard
│   │   │   ├── colors/              # EaselCanvas (Canvas HTML5), ColorPicker
│   │   │   ├── memory/              # FlipCard, MatchFeedback
│   │   │   └── parental/            # ParentalGate, ProgressDashboard
│   │   └── pages/                    # SplashScreen, HomePage, LettersPage, NumbersPage,
│   │                                 # ColorsPage, ShapesPage, MemoryPage, AnimalsPage,
│   │                                 # RewardsPage, ParentalSettingsPage
│   ├── capacitor.config.ts           # Configuración de Capacitor
│   ├── vite.config.js
│   └── package.json
│
└── backend/                          # API REST Node.js + Express
    ├── src/
    │   ├── server.js                 # Punto de entrada del servidor
    │   ├── config/                   # database.js (MySQL/Sequelize), env.js
    │   ├── models/                   # User, Module, Activity, Progress, Reward
    │   ├── controllers/              # auth, module, progress, reward Controllers
    │   ├── routes/                   # auth, module, progress, reward Routes
    │   ├── middleware/               # auth.js (JWT), errorHandler.js
    │   └── seeders/                  # moduleSeeder, activitySeeder
    ├── uploads/                      # Archivos subidos
    ├── .env
    └── package.json
```

---

## 2. Análisis de la Interfaz de Usuario (UI/UX)

### 2.1 Pantalla Principal — Menú de Bienvenida

**Descripción del diseño propuesto:**
- Fondo temático de naturaleza/parque con árboles, estrellas y cielo nocturno
- Mascota principal (personaje verde-azulado redondeado) con saludo personalizado: "¡Hola Romina!"
- Título grande y llamativo: "¡BIENVENIDOS A MINIMUNDO!"
- Marco de madera decorativo que enmarca toda la pantalla
- Tres categorías principales en botones grandes tipo tarjeta:
  - 📖 **Lectura** (icono de libro abierto, fondo naranja)
  - 🔢 **Matemáticas** (icono con números y operaciones, fondo naranja)
  - 🐾 **Animales** (icono de mascota/oso, fondo naranja)

**Especificaciones técnicas:**
- Botones de categoría: mínimo 80x80 dp con bordes redondeados (16 dp)
- Texto de categorías: fuente bold, tamaño 16-18 sp
- Título principal: fuente extra-bold, tamaño 28-32 sp, color blanco con sombra
- Animación de entrada: fade-in + scale para el título, slide-up para las categorías
- Mascota: animación idle (rebote suave) + animación de saludo al cargar

### 2.2 Módulo de Colores y Formas

**Descripción del diseño propuesto:**
- Fondo de parque/jardín con columpios y área verde
- Caballete/pizarra blanca central como área de actividad
- Pincel interactivo para colorear
- Objetos para identificar: frutas (manzana, pera), formas (casa, estrella)
- Mascota azul-verde como guía junto a la pizarra
- Detalles decorativos: estrellas, corazones, notas musicales flotantes

**Especificaciones técnicas:**
- Canvas interactivo: elemento `<canvas>` de HTML5 con API Canvas 2D
- Gestos: eventos `onTouchStart/onTouchMove` para pintar con el dedo
- Tamaño del pincel: 8-12px (adaptable con CSS viewport units)
- Detección de colores: comparación de RGB con tolerancia del 15%
- Animación al completar: react-confetti + sonido de celebración (Howler.js)

### 2.3 Módulo de Letras y Números

**Descripción del diseño propuesto:**
- Fondo de naturaleza con vegetación y elementos infantiles
- Mascota morada como guía con texto: "¡Toca en ti tapón!"
- Tarjetas tipo flashcard con borde redondeado:
  - Letra grande + imagen asociada + palabra: **M** - Mariposa, **A** - Abeja
  - Número + representación visual: **2** - Dos Osos
- Etiqueta "REWARDOS" con trofeo dorado y estrellas
- Tren decorativo con cubos de letras/números
- "GRAN TROFEO DE ESTRELLAS DE MINI-RECOMPENSAS" como logro máximo

**Especificaciones técnicas:**
- Tarjetas: componente React con `box-shadow` y `border-radius: 16px`
- Dimensiones de tarjeta: 120x160px mínimo
- Imagen: 60x60px dentro de la tarjeta
- Letra/número: fuente extra-bold, 48px, color primario
- Palabra: fuente medium, 14px, debajo de la imagen
- Animación al tocar: CSS `transform: scale()` con transición bounce + sonido (Howler.js)
- Trofeo: animación Lottie con `lottie-react`

### 2.4 Módulo de Memoria y Asociación

**Descripción del diseño propuesto:**
- Fondo dividido en dos tonos (verde/azul claro)
- Cartas de memoria con diseño de animal en el frente:
  - Cara oculta: patrón decorativo colorido
  - Cara visible: icono de animal + nombre (GATO, PANDA)
- Mascota morada celebrando con confetti
- Mensaje de retroalimentación: "¡EXCELENTE TRABAJO!"
- Botón de retroceso (flecha circular)
- Texto guía: "ECEA MATCHO!" (busca el par)

**Especificaciones técnicas:**
- Cartas: tamaño mínimo 80x100px con `border-radius: 12px`
- Animación de volteo: CSS `transform: rotateY()` con `perspective`, duración 400ms
- Grid: CSS Grid con 2 cols (fácil), 3 cols (medio), 4 cols (difícil)
- Espaciado entre cartas: `gap: 8-12px`
- Lógica de emparejamiento: comparar IDs en estado React, mantener visible si coinciden
- Feedback al emparejar: CSS `box-shadow` glow verde + sonido Howler.js + estrellas
- Feedback al fallar: CSS `@keyframes shake` + sonido suave

---

## 3. Diseño de Base de Datos (MySQL)

### 3.1 Diagrama Entidad-Relación

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│   users      │     │   modules    │     │   rewards    │
├─────────────┤     ├──────────────┤     ├──────────────┤
│ id (PK)      │     │ id (PK)      │     │ id (PK)      │
│ name         │     │ name         │     │ name         │
│ avatar       │     │ description  │     │ description  │
│ age          │     │ icon         │     │ icon         │
│ total_stars  │     │ sort_order   │     │ stars_required│
│ total_trophies│    │ is_active    │     │ type         │
│ created_at   │     │ created_at   │     │ created_at   │
└──────┬──────┘     └──────┬──────┘     └──────────────┘
       │                   │
       │              ┌────┴─────────┐
       │              │  activities   │
       │              ├──────────────┤
       │              │ id (PK)      │
       │              │ module_id(FK)│
       │              │ title        │
       │              │ type         │
       │              │ difficulty   │
       │              │ content(JSON)│
       │              │ audio_url    │
       │              │ image_url    │
       │              └──────────────┘
       │
  ┌────┴─────────┐
  │   progress    │
  ├──────────────┤
  │ id (PK)      │
  │ user_id (FK) │
  │ module_id(FK)│
  │ completed    │
  │ total        │
  │ stars_earned │
  │ time_spent   │
  │ last_played  │
  └──────────────┘
```

### 3.2 Scripts SQL de Creación

```sql
CREATE DATABASE IF NOT EXISTS minimundo_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE minimundo_db;

-- Tabla de usuarios (niños)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  avatar VARCHAR(50) DEFAULT 'default',
  age TINYINT NOT NULL DEFAULT 3,
  total_stars INT DEFAULT 0,
  total_trophies INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de módulos educativos
CREATE TABLE modules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(255),
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de actividades por módulo
CREATE TABLE activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  module_id INT NOT NULL,
  title VARCHAR(150) NOT NULL,
  type ENUM('letter','number','color','shape','memory','animal') NOT NULL,
  difficulty TINYINT DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 3),
  content JSON,
  audio_url VARCHAR(255),
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
);

-- Tabla de progreso del usuario
CREATE TABLE progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  module_id INT NOT NULL,
  completed_activities INT DEFAULT 0,
  total_activities INT DEFAULT 0,
  stars_earned INT DEFAULT 0,
  time_spent INT DEFAULT 0 COMMENT 'Minutos',
  last_played TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_module (user_id, module_id)
);

-- Tabla de recompensas
CREATE TABLE rewards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(255),
  stars_required INT DEFAULT 0,
  type ENUM('badge','trophy','title') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de configuración de la app
CREATE TABLE settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(50) UNIQUE NOT NULL,
  setting_value VARCHAR(255) NOT NULL
);

INSERT INTO settings (setting_key, setting_value) VALUES
  ('max_daily_time', '60'),
  ('sound_enabled', 'true'),
  ('music_enabled', 'true'),
  ('app_version', '1.0.0');
```

---

## 4. Modelos de Datos (Sequelize - JavaScript)

### 4.1 User Model

```javascript
// backend/src/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  avatar: { type: DataTypes.STRING(50), defaultValue: 'default' },
  age: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 3 },
  total_stars: { type: DataTypes.INTEGER, defaultValue: 0 },
  total_trophies: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'users', timestamps: true, underscored: true });

module.exports = User;
```

### 4.2 Activity Model

```javascript
// backend/src/models/Activity.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Activity = sequelize.define('Activity', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  module_id: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING(150), allowNull: false },
  type: { type: DataTypes.ENUM('letter','number','color','shape','memory','animal'), allowNull: false },
  difficulty: { type: DataTypes.TINYINT, defaultValue: 1 },
  content: { type: DataTypes.JSON },
  audio_url: { type: DataTypes.STRING(255) },
  image_url: { type: DataTypes.STRING(255) },
}, { tableName: 'activities', timestamps: true, underscored: true });

module.exports = Activity;
```

### 4.3 Progress Model

```javascript
// backend/src/models/Progress.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Progress = sequelize.define('Progress', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  module_id: { type: DataTypes.INTEGER, allowNull: false },
  completed_activities: { type: DataTypes.INTEGER, defaultValue: 0 },
  total_activities: { type: DataTypes.INTEGER, defaultValue: 0 },
  stars_earned: { type: DataTypes.INTEGER, defaultValue: 0 },
  time_spent: { type: DataTypes.INTEGER, defaultValue: 0, comment: 'Minutos' },
  last_played: { type: DataTypes.DATE },
}, { tableName: 'progress', timestamps: false, underscored: true });

module.exports = Progress;
```

---

## 5. Guía de Diseño Visual

### 5.1 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Verde Azulado (Mascota 1) | `#4ECDC4` | Mascota principal, acentos |
| Morado Suave (Mascota 2) | `#9B72CF` | Mascota secundaria, highlights |
| Naranja Cálido | `#FF9F43` | Botones de categoría, CTAs |
| Amarillo Brillante | `#FECA57` | Estrellas, recompensas |
| Verde Naturaleza | `#2ECC71` | Fondos de parque, éxito |
| Azul Cielo | `#74B9FF` | Fondos, cielo |
| Rosa Suave | `#FD79A8` | Acentos, decoraciones |
| Marrón Madera | `#8B6914` | Marcos de madera |
| Blanco | `#FFFFFF` | Texto sobre fondos oscuros |
| Casi Negro | `#2D3436` | Texto principal |

### 5.2 Tipografía

| Uso | Fuente | Peso | Tamaño |
|-----|--------|------|--------|
| Título principal | Baloo 2 / Fredoka One | ExtraBold | 28-32 sp |
| Subtítulos | Baloo 2 | Bold | 20-24 sp |
| Texto de tarjetas | Baloo 2 | SemiBold | 16-18 sp |
| Etiquetas | Baloo 2 | Medium | 14 sp |
| Palabras de letras | Baloo 2 | Regular | 12-14 sp |

### 5.3 Principios de Diseño

1. **Botones grandes**: mínimo 48x48 dp, recomendado 64x64 dp o más
2. **Bordes redondeados**: 12-20 dp en todos los elementos interactivos
3. **Sombras suaves**: elevation 4-8 para dar profundidad
4. **Espaciado generoso**: padding 16-24 dp entre elementos
5. **Marcos decorativos**: textura de madera como borde de pantalla
6. **Fondos temáticos**: naturaleza, parques, cielo estrellado
7. **Animaciones**: duración 200-400ms, curva bounceOut
8. **Feedback háptico**: vibración suave al tocar elementos

---

## 6. Dependencias del Proyecto

### 6.1 Frontend (package.json)

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "@capacitor/core": "^6.0.0",
    "@capacitor/android": "^6.0.0",
    "@capacitor/haptics": "^6.0.0",
    "@capacitor/status-bar": "^6.0.0",
    "axios": "^1.6.0",
    "howler": "^2.2.4",
    "lottie-react": "^2.4.0",
    "framer-motion": "^10.16.0",
    "react-confetti": "^6.1.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "eslint": "^8.55.0"
  }
}
```

### 6.2 Backend (package.json)

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.7.0",
    "sequelize": "^6.35.0",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "multer": "^1.4.5-lts.1",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "jest": "^29.7.0"
  }
}
```

---

## 7. API REST — Endpoints

### 7.1 Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register` | Crear perfil de niño (sin contraseña) |
| POST | `/api/auth/login` | Login parental con PIN |
| GET | `/api/auth/profile/:id` | Obtener perfil del niño |

### 7.2 Módulos y Actividades

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/modules` | Listar todos los módulos activos |
| GET | `/api/modules/:id` | Obtener detalle de un módulo |
| GET | `/api/modules/:id/activities` | Listar actividades de un módulo |
| GET | `/api/activities/:id` | Obtener detalle de una actividad |

### 7.3 Progreso

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/progress/:userId` | Obtener progreso general del niño |
| GET | `/api/progress/:userId/:moduleId` | Progreso de un módulo específico |
| PUT | `/api/progress/:userId/:moduleId` | Actualizar progreso |
| POST | `/api/progress/:userId/stars` | Agregar estrellas ganadas |

### 7.4 Recompensas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/rewards` | Listar todas las recompensas |
| GET | `/api/rewards/:userId` | Recompensas desbloqueadas del niño |

---

## 8. Requisitos del Sistema

### Para Desarrollo
- Node.js 20.x LTS
- npm 10.x o superior
- MySQL 8.x (XAMPP, WAMP o instalación directa)
- Android SDK (API 23+) + Android Studio (para Capacitor)
- VS Code
- Git

### Para el Usuario Final
- Android 6.0 (Marshmallow) o superior
- 100 MB de espacio libre
- Conexión a internet (para sincronización con el servidor)
- Altavoz/auriculares (recomendado para audio)

