const express = require('express');
const router = express.Router();
const { getAll, getById } = require('../controllers/rewardController');

// Listar todas las recompensas
router.get('/', getAll);

// Obtener detalle de una recompensa
router.get('/:id', getById);

module.exports = router;
