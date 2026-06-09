# 📋 Plan de Desarrollo — MiniMundo

> **Aplicación Móvil Educativa e Interactiva para Niños de 3 a 5 Años**  
> Instituto Superior Tecnológico "Alberto Enríquez"  
> Responsable: Romina Requene Velasco | Fecha: 28/05/2026

---

## 1. Resumen del Proyecto

**MiniMundo** es una app móvil educativa para niños de 3-5 años que estimula el aprendizaje temprano mediante juegos didácticos y actividades interactivas. Desarrollada con **React.js + Capacitor** como frontend móvil y **Node.js/Express + MySQL** como backend.

---

## 2. Metodología: Scrum Ágil

Sprints de **2 semanas** con: Planificación → Diseño → Desarrollo → Pruebas → Retrospectiva.

| Rol | Responsable | Descripción |
|-----|-------------|-------------|
| Product Owner | Romina Requene Velasco | Define requisitos y prioridades |
| Scrum Master | Por asignar | Facilita el proceso Scrum |
| Desarrollador | Por asignar | Implementación técnica |
| Diseñador UI/UX | Por asignar | Diseño en Figma |
| QA Tester | Por asignar | Pruebas y calidad |

---

## 3. Cronograma de Sprints

### 🔵 Fase 1: Planificación y Diseño (Semanas 1-4)

#### Sprint 0 — Configuración Inicial (Semana 1-2)
- [ ] Configurar repositorio GitHub y proyecto React.js con Vite
- [ ] Instalar y configurar Capacitor para compilación Android
- [ ] Configurar backend Node.js/Express con conexión a MySQL
- [ ] Diseñar y crear esquema de base de datos MySQL
- [ ] Definir estructura de carpetas del proyecto (frontend + backend)
- [ ] Configurar entorno de desarrollo (VS Code + Android Studio para Capacitor)
- [ ] Definir paleta de colores, tipografía y guía de estilos

#### Sprint 1 — Diseño UI/UX (Semana 3-4)
- [ ] Crear wireframes de baja fidelidad
- [ ] Diseñar prototipos de alta fidelidad en Figma
- [ ] Diseñar mascotas (personaje verde-azulado y morado)
- [ ] Crear assets gráficos (animales, letras, números, formas)
- [ ] Diseñar animaciones y transiciones
- [ ] Validar diseño con usuarios objetivo

### 🟢 Fase 2: Desarrollo Core (Semanas 5-10)

#### Sprint 2 — Pantalla Principal y Navegación (Semana 5-6)
- [ ] Splash screen animado
- [ ] Pantalla de bienvenida "¡Bienvenidos a MiniMundo!"
- [ ] Menú principal con categorías: Lectura, Matemáticas, Animales
- [ ] Navegación segura (modo infantil)
- [ ] Mascota interactiva con saludo personalizado ("¡Hola Romina!")
- [ ] Sonidos de interacción y feedback auditivo

#### Sprint 3 — Módulo de Letras y Números (Semana 7-8)
- [ ] Juego de reconocimiento de letras con tarjetas (M-Mariposa, A-Abeja)
- [ ] Juego de reconocimiento de números (2-Dos Osos)
- [ ] Sistema de recompensas (estrellas + trofeo dorado)
- [ ] Narración educativa por voz
- [ ] Actividades de arrastrar y soltar

#### Sprint 4 — Módulo de Colores y Formas (Semana 9-10)
- [ ] Pizarra interactiva con caballete y pincel
- [ ] Reconocimiento de colores en objetos (frutas, formas)
- [ ] Formas geométricas (círculo, cuadrado, triángulo, estrella)
- [ ] Clasificación por color/forma
- [ ] Mascota como guía interactiva en la pizarra

### 🟡 Fase 3: Módulos Complementarios (Semanas 11-14)

#### Sprint 5 — Memoria y Asociación (Semana 11-12)
- [ ] Juego de memoria con cartas de animales (Gato, Panda)
- [ ] Mecánica de voltear y emparejar
- [ ] Niveles de dificultad progresiva (4, 6, 8 cartas)
- [ ] Asociación de sonidos con imágenes
- [ ] Retroalimentación positiva ("¡Excelente Trabajo!")

#### Sprint 6 — Animales y Sonidos (Semana 13-14)
- [ ] Galería interactiva de animales con sonidos
- [ ] Juego de hábitats y alimentación
- [ ] Animaciones de animales interactivas

### 🟠 Fase 4: Integración y Funcionalidades Avanzadas (Semanas 15-18)

#### Sprint 7 — Progreso y Perfil (Semana 15-16)
- [ ] Perfiles de usuario (niño)
- [ ] Dashboard de progreso para padres/docentes
- [ ] Sistema de logros y badges
- [ ] Control de tiempo de uso

#### Sprint 8 — Seguridad y Modo Infantil (Semana 17-18)
- [ ] Puerta parental (verificación de adulto)
- [ ] Implementar JWT y middleware de autenticación en Express
- [ ] Modo offline (almacenamiento local con IndexedDB/localStorage)
- [ ] Optimización de datos y batería

### 🔴 Fase 5: Pruebas y Lanzamiento (Semanas 19-22)

#### Sprint 9 — Testing y QA (Semana 19-20)
- [ ] Pruebas unitarias, integración y usabilidad
- [ ] Pruebas con niños de 3-5 años (sesiones de 10-15 min)
- [ ] Pruebas de rendimiento en múltiples dispositivos Android
- [ ] Corrección de bugs críticos

#### Sprint 10 — Lanzamiento (Semana 21-22)
- [ ] Pulir animaciones y optimizar APK con Capacitor
- [ ] Preparar assets para Google Play Store
- [ ] Configurar analytics (Google Analytics / Matomo)
- [ ] Desplegar backend (API REST + MySQL) en servidor de producción
- [ ] Publicar en Google Play Store
- [ ] Presentación final del proyecto

---

## 4. Hitos del Proyecto

| Hito | Fecha | Entregable |
|------|-------|------------|
| Kickoff | Semana 1 | Repo configurado, entorno listo |
| Diseño UI/UX aprobado | Semana 4 | Prototipos en Figma validados |
| MVP funcional | Semana 8 | App con pantalla principal + letras/números |
| Beta completa | Semana 14 | Todos los módulos funcionales |
| Release Candidate | Semana 18 | App con progreso y seguridad |
| QA completado | Semana 20 | App libre de bugs críticos |
| **Lanzamiento v1.0** | **Semana 22** | **App en Google Play Store** |

---

## 5. Gestión de Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Retrasos en assets gráficos | Alta | Alto | Usar librerías de ilustraciones como base |
| Incompatibilidad en dispositivos | Media | Alto | API mínima Android 6.0+, probar en múltiples dispositivos |
| Rendimiento bajo con animaciones | Media | Medio | Chrome DevTools, animaciones CSS/Framer Motion optimizadas |
| Dificultad en pruebas con niños | Alta | Medio | Sesiones cortas con supervisión de padres |
| Problemas de conectividad al backend | Baja | Alto | Modo offline con IndexedDB/localStorage |
| Contenido no adecuado para la edad | Baja | Crítico | Revisión por expertos en educación inicial |

---

## 6. Criterios de Aceptación

### Funcionalidad
- ✅ Juegos interactivos funcionales y sin errores
- ✅ Sistema de recompensas registra progreso correctamente
- ✅ Navegación intuitiva para niños de 3-5 años (sin ayuda de adulto)

### Rendimiento
- ✅ Carga inicial < 3 segundos
- ✅ Transiciones fluidas a 60 FPS
- ✅ Uso de memoria < 200 MB
- ✅ Tamaño del APK < 100 MB

### Usabilidad
- ✅ Botones ≥ 48x48 dp con feedback visual y auditivo
- ✅ Fuentes grandes y legibles
- ✅ Sonidos y narraciones en todas las interacciones

---

## 7. Entregables Finales

1. Código fuente completo en repositorio GitHub
2. APK firmado listo para distribución
3. Documentación técnica completa
4. Manual de usuario para padres y docentes
5. Prototipos de diseño en Figma
6. Informe de pruebas QA
7. Presentación del proyecto (PPT/PDF)
