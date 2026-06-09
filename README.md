# 🌍 MiniMundo

### Aplicación Móvil Educativa e Interactiva para Niños de 3 a 5 Años

<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Capacitor-6.x-119EFF?style=for-the-badge&logo=capacitor&logoColor=white" alt="Capacitor"/>
  <img src="https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/MySQL-8.x-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/>
</p>

---

## 📖 Descripción

**MiniMundo** es una aplicación móvil educativa diseñada para estimular el aprendizaje temprano en niños de 3 a 5 años mediante juegos didácticos, actividades interactivas y contenido visual adaptado a la primera infancia. La app combina aprendizaje, diversión y seguridad digital en un entorno colorido e intuitivo.

## 🎯 Problema que Resuelve

Actualmente muchos niños en etapa preescolar utilizan dispositivos móviles únicamente para entretenimiento, sin acceder a contenido educativo adecuado para su edad. Existen pocas aplicaciones infantiles en español que combinen aprendizaje, diversión y seguridad digital. **MiniMundo** llena ese vacío ofreciendo herramientas interactivas adaptadas al desarrollo cognitivo de niños de 3 a 5 años.

## 👥 Público Objetivo

- **Niños y niñas** de entre 3 y 5 años en etapa de educación inicial o preescolar.
- **Padres de familia** que busquen herramientas tecnológicas educativas.
- **Docentes** que deseen reforzar el aprendizaje infantil de manera entretenida.

---

## ✨ Funcionalidades Principales

| Módulo | Descripción |
|--------|-------------|
| 📖 **Lectura** | Juegos interactivos de reconocimiento de letras con tarjetas (M-Mariposa, A-Abeja) |
| 🔢 **Matemáticas** | Reconocimiento de números con representación visual (2-Dos Osos) |
| 🐾 **Animales** | Galería interactiva con sonidos, hábitats y actividades |
| 🎨 **Colores y Formas** | Pizarra interactiva con pincel, reconocimiento de colores y figuras geométricas |
| 🧠 **Memoria** | Juego de cartas para emparejar con niveles de dificultad progresiva |
| ⭐ **Recompensas** | Sistema de estrellas y trofeos por logros alcanzados |
| 👨‍👩‍👧 **Sección Parental** | Dashboard de progreso y control de tiempo de uso |

---

## 🛠️ Stack Tecnológico

### Frontend
| Tecnología | Uso |
|-----------|-----|
| **React.js 18** | Framework de interfaz de usuario |
| **Vite 5** | Bundler y servidor de desarrollo |
| **Capacitor 6** | Empaquetado como app nativa Android |
| **Framer Motion** | Animaciones fluidas |
| **Howler.js** | Reproducción de audio y sonidos |
| **Lottie React** | Animaciones vectoriales |
| **Axios** | Cliente HTTP para la API |
| **React Router 6** | Navegación entre pantallas |

### Backend
| Tecnología | Uso |
|-----------|-----|
| **Node.js 20 LTS** | Entorno de ejecución |
| **Express.js** | Framework de API REST |
| **MySQL 8** | Base de datos relacional |
| **Sequelize 6** | ORM para MySQL |
| **JWT** | Autenticación con tokens |
| **Multer** | Carga de archivos |
| **Morgan** | Logger de peticiones HTTP |

### Herramientas
| Herramienta | Uso |
|-----------|-----|
| **Figma** | Diseño UI/UX |
| **VS Code** | IDE principal |
| **Android Studio** | Compilación APK con Capacitor |
| **Git + GitHub** | Control de versiones |

---

## 📁 Estructura del Proyecto

```
minimundo/
├── frontend/                     # App React.js + Capacitor
│   ├── public/assets/            # Imágenes, sonidos, animaciones
│   ├── src/
│   │   ├── context/              # AuthContext, AudioContext
│   │   ├── hooks/                # Hooks personalizados
│   │   ├── services/             # api.js (Axios)
│   │   ├── components/           # Componentes reutilizables
│   │   ├── pages/                # Pantallas de la app
│   │   ├── App.jsx               # Componente raíz + Router
│   │   ├── App.css               # Estilos de pantallas
│   │   └── index.css             # Sistema de diseño global
│   ├── capacitor.config.json     # Configuración Capacitor
│   ├── vite.config.js
│   └── package.json
│
├── backend/                      # API REST Node.js + Express
│   ├── src/
│   │   ├── config/database.js    # Conexión MySQL/Sequelize
│   │   ├── models/               # User, Module, Activity, Progress, Reward
│   │   ├── controllers/          # Lógica de negocio
│   │   ├── routes/               # Endpoints de la API
│   │   ├── middleware/            # auth (JWT), errorHandler
│   │   ├── seeders/seed.js       # Datos iniciales
│   │   └── server.js             # Punto de entrada
│   ├── uploads/                  # Archivos subidos
│   ├── .env                      # Variables de entorno
│   └── package.json
│
├── documentacion_tecnica.md      # Arquitectura y especificaciones
├── plan_de_desarrollo.md         # Cronograma Scrum (10 sprints)
├── estado_del_proyecto.md        # Seguimiento de avance
└── README.md
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos

- [Node.js](https://nodejs.org/) v20 o superior
- [MySQL](https://www.mysql.com/) 8.x (o XAMPP/WAMP)
- [Git](https://git-scm.com/)
- [Android Studio](https://developer.android.com/studio) (para compilar APK)

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/minimundo.git
cd minimundo
```

### 2. Configurar la base de datos

Crea la base de datos en MySQL:

```sql
CREATE DATABASE IF NOT EXISTS minimundo_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Configurar el backend

```bash
cd backend
cp .env.example .env    # Copiar y editar variables de entorno
npm install
```

Edita el archivo `.env` con tus credenciales:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=minimundo_db
DB_USER=root
DB_PASSWORD=
JWT_SECRET=tu_clave_secreta
PORT=3001
NODE_ENV=development
```

### 4. Configurar el frontend

```bash
cd ../frontend
npm install
```

### 5. Iniciar en modo desarrollo

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```
> 🚀 Servidor corriendo en `http://localhost:3001/api`

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
> 🌐 App disponible en `http://localhost:5173`

> **Nota:** Al iniciar el backend por primera vez, la base de datos se sincroniza automáticamente y se puebla con datos iniciales (módulos, actividades y recompensas).

---

## 📡 API REST — Endpoints

### Autenticación
| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/auth/register` | Crear perfil de niño |
| `GET` | `/api/auth/profile/:id` | Obtener perfil |
| `PUT` | `/api/auth/profile/:id` | Actualizar perfil |

### Módulos y Actividades
| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/modules` | Listar módulos activos |
| `GET` | `/api/modules/:id` | Detalle de un módulo |
| `GET` | `/api/modules/:id/activities` | Actividades del módulo |

### Progreso
| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/progress/:userId` | Progreso general |
| `GET` | `/api/progress/:userId/:moduleId` | Progreso por módulo |
| `PUT` | `/api/progress/:userId/:moduleId` | Actualizar progreso |

### Recompensas
| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/rewards` | Listar recompensas |
| `GET` | `/api/rewards/:id` | Detalle de recompensa |

---

## 📱 Compilar para Android

```bash
cd frontend
npm run build                    # Generar build de producción
npx cap add android              # Agregar plataforma Android
npx cap sync                     # Sincronizar con el proyecto nativo
npx cap open android             # Abrir en Android Studio
```

Desde Android Studio, compilar el APK con **Build > Build Bundle(s) / APK(s) > Build APK(s)**.

---

## 🎨 Guía de Diseño

### Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| 🟢 Verde Azulado | `#4ECDC4` | Mascota principal, acentos |
| 🟣 Morado Suave | `#9B72CF` | Mascota secundaria |
| 🟠 Naranja Cálido | `#FF9F43` | Botones, categorías |
| 🟡 Amarillo | `#FECA57` | Estrellas, recompensas |
| 🟩 Verde | `#2ECC71` | Éxito, correcto |
| 🔵 Azul Cielo | `#74B9FF` | Fondos, cielo |
| 🩷 Rosa | `#FD79A8` | Acentos decorativos |
| 🟤 Marrón | `#8B6914` | Marcos de madera |

### Tipografía

**Baloo 2** (Google Fonts) — Fuente infantil, redondeada y amigable.

### Principios de Diseño

- ✅ Botones grandes (mínimo 48x48px, recomendado 64px+)
- ✅ Bordes redondeados (12-20px)
- ✅ Feedback visual y auditivo en todas las interacciones
- ✅ Navegación intuitiva sin texto (iconos + colores)
- ✅ Animaciones suaves (200-400ms) con curva bounce

---

## 📅 Metodología

Se utiliza **Scrum Ágil** con sprints de 2 semanas:

| Fase | Sprints | Descripción |
|------|---------|-------------|
| 🔵 Planificación | 0-1 | Configuración y diseño UI/UX |
| 🟢 Desarrollo Core | 2-4 | Pantalla principal, letras, números, colores |
| 🟡 Módulos Extra | 5-6 | Memoria, animales, sonidos |
| 🟠 Integración | 7-8 | Progreso, perfil, seguridad |
| 🔴 Lanzamiento | 9-10 | Testing, QA, publicación en Play Store |

---

## 📊 Estado Actual

| Indicador | Valor |
|-----------|-------|
| Sprint actual | Sprint 0 ✅ Completado |
| Progreso global | 35% |
| Módulos desarrollados | 0 / 6 |
| API endpoints | 10 implementados |

---

## 👩‍💻 Autora

**Romina Requene Velasco**

- 🏫 Instituto Superior Tecnológico "Alberto Enríquez"
- 📚 Carrera: Desarrollo de Software
- 📅 Fecha de inicio: 28/05/2026

---

## 📄 Documentación

- [📋 Plan de Desarrollo](./plan_de_desarrollo.md) — Cronograma, sprints, hitos y riesgos
- [🔧 Documentación Técnica](./documentacion_tecnica.md) — Arquitectura, modelos, API, diseño
- [📊 Estado del Proyecto](./estado_del_proyecto.md) — Seguimiento de avance por sprint

---

## 📝 Licencia

Este proyecto fue desarrollado con fines educativos como parte del programa de Desarrollo de Software del Instituto Superior Tecnológico "Alberto Enríquez".

---

<p align="center">
  <b>🌍 MiniMundo — Aprende jugando ✨</b>
</p>
