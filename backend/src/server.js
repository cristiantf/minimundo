require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const { sequelize } = require('./models');
const errorHandler = require('./middleware/errorHandler');
const seedDatabase = require('./seeders/seed');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const progressRoutes = require('./routes/progressRoutes');
const rewardRoutes = require('./routes/rewardRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// ==========================================
// Middlewares
// ==========================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Servir archivos estáticos (imágenes, sonidos)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ==========================================
// Rutas de la API
// ==========================================
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: '🌍 ¡Bienvenido a la API de MiniMundo!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      modules: '/api/modules',
      progress: '/api/progress',
      rewards: '/api/rewards'
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/rewards', rewardRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

// ==========================================
// Iniciar servidor
// ==========================================
const startServer = async () => {
  try {
    // Conectar a MySQL
    await sequelize.authenticate();
    console.log('✅ Conexión a MySQL establecida correctamente.');

    // Sincronizar modelos con la base de datos
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados con la base de datos.');

    // Verificar si hay módulos, si no hay poblar la BD
    const { Module } = require('./models');
    const count = await Module.count();
    if (count === 0) {
      console.log('📦 Poblando base de datos con datos iniciales...');
      await seedDatabase();
    }

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`\n🚀 Servidor MiniMundo corriendo en http://localhost:${PORT}`);
      console.log(`📡 API disponible en http://localhost:${PORT}/api`);
      console.log(`🌐 Entorno: ${process.env.NODE_ENV}\n`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

startServer();
