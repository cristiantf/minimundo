const express = require('express');
const router = express.Router();
const { register, getProfile, updateProfile } = require('../controllers/authController');
const { auth } = require('../middleware/auth');

// Registro de perfil de niño (público)
router.post('/register', register);

// Obtener perfil (autenticado)
router.get('/profile/:id', auth, getProfile);

// Actualizar perfil (autenticado)
router.put('/profile/:id', auth, updateProfile);

module.exports = router;
