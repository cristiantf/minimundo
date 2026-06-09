const { Progress, User, Module } = require('../models');

/**
 * Obtener progreso general del niño
 * GET /api/progress/:userId
 */
const getUserProgress = async (req, res, next) => {
  try {
    const progress = await Progress.findAll({
      where: { user_id: req.params.userId },
      include: [{
        model: Module,
        as: 'module',
        attributes: ['id', 'name', 'icon']
      }]
    });

    res.json({ success: true, data: progress });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener progreso de un módulo específico
 * GET /api/progress/:userId/:moduleId
 */
const getModuleProgress = async (req, res, next) => {
  try {
    const { userId, moduleId } = req.params;

    let progress = await Progress.findOne({
      where: { user_id: userId, module_id: moduleId }
    });

    // Si no existe, crear registro inicial
    if (!progress) {
      progress = await Progress.create({
        user_id: userId,
        module_id: moduleId,
        completed_activities: 0,
        total_activities: 0,
        stars_earned: 0,
        time_spent: 0
      });
    }

    res.json({ success: true, data: progress });
  } catch (error) {
    next(error);
  }
};

/**
 * Actualizar progreso
 * PUT /api/progress/:userId/:moduleId
 */
const updateProgress = async (req, res, next) => {
  try {
    const { userId, moduleId } = req.params;
    const { completed_activities, total_activities, stars_earned, time_spent } = req.body;

    let progress = await Progress.findOne({
      where: { user_id: userId, module_id: moduleId }
    });

    if (!progress) {
      progress = await Progress.create({
        user_id: userId,
        module_id: moduleId,
        completed_activities: completed_activities || 0,
        total_activities: total_activities || 0,
        stars_earned: stars_earned || 0,
        time_spent: time_spent || 0,
        last_played: new Date()
      });
    } else {
      await progress.update({
        completed_activities: completed_activities ?? progress.completed_activities,
        total_activities: total_activities ?? progress.total_activities,
        stars_earned: stars_earned ?? progress.stars_earned,
        time_spent: time_spent ?? progress.time_spent,
        last_played: new Date()
      });
    }

    // Actualizar estrellas totales del usuario
    const allProgress = await Progress.findAll({ where: { user_id: userId } });
    const totalStars = allProgress.reduce((sum, p) => sum + p.stars_earned, 0);
    await User.update({ total_stars: totalStars }, { where: { id: userId } });

    res.json({
      success: true,
      message: '¡Progreso actualizado!',
      data: progress
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserProgress, getModuleProgress, updateProgress };
