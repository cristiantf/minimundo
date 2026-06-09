const express = require('express');
const router = express.Router();
const { getUserProgress, getModuleProgress, updateProgress } = require('../controllers/progressController');
const { auth } = require('../middleware/auth');

// Obtener progreso general del niño
router.get('/:userId', auth, getUserProgress);

// Obtener progreso de un módulo específico
router.get('/:userId/:moduleId', auth, getModuleProgress);

// Actualizar progreso
router.put('/:userId/:moduleId', auth, updateProgress);

module.exports = router;
