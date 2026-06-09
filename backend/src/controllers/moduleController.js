const { Module, Activity } = require('../models');

/**
 * Listar todos los módulos activos
 * GET /api/modules
 */
const getAll = async (req, res, next) => {
  try {
    const modules = await Module.findAll({
      where: { is_active: true },
      order: [['sort_order', 'ASC']],
      include: [{
        model: Activity,
        as: 'activities',
        attributes: ['id', 'title', 'type', 'difficulty']
      }]
    });

    res.json({ success: true, data: modules });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener detalle de un módulo
 * GET /api/modules/:id
 */
const getById = async (req, res, next) => {
  try {
    const module = await Module.findByPk(req.params.id, {
      include: [{
        model: Activity,
        as: 'activities',
        order: [['difficulty', 'ASC']]
      }]
    });

    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Módulo no encontrado.'
      });
    }

    res.json({ success: true, data: module });
  } catch (error) {
    next(error);
  }
};

/**
 * Listar actividades de un módulo
 * GET /api/modules/:id/activities
 */
const getActivities = async (req, res, next) => {
  try {
    const activities = await Activity.findAll({
      where: { module_id: req.params.id },
      order: [['difficulty', 'ASC']]
    });

    res.json({ success: true, data: activities });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, getActivities };
