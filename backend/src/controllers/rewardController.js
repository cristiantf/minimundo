const { Reward } = require('../models');

/**
 * Listar todas las recompensas
 * GET /api/rewards
 */
const getAll = async (req, res, next) => {
  try {
    const rewards = await Reward.findAll({
      order: [['stars_required', 'ASC']]
    });

    res.json({ success: true, data: rewards });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener detalle de una recompensa
 * GET /api/rewards/:id
 */
const getById = async (req, res, next) => {
  try {
    const reward = await Reward.findByPk(req.params.id);

    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Recompensa no encontrada.'
      });
    }

    res.json({ success: true, data: reward });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById };
