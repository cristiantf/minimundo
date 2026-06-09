const express = require('express');
const router = express.Router();
const { getAll, getById, getActivities } = require('../controllers/moduleController');

// Listar todos los módulos activos
router.get('/', getAll);

// Obtener detalle de un módulo
router.get('/:id', getById);

// Listar actividades de un módulo
router.get('/:id/activities', getActivities);

module.exports = router;
