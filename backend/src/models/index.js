const sequelize = require('../config/database');
const User = require('./User');
const Module = require('./Module');
const Activity = require('./Activity');
const Progress = require('./Progress');
const Reward = require('./Reward');

// ==========================================
// Relaciones entre modelos
// ==========================================

// Module -> Activities (1:N)
Module.hasMany(Activity, { foreignKey: 'module_id', as: 'activities' });
Activity.belongsTo(Module, { foreignKey: 'module_id', as: 'module' });

// User -> Progress (1:N)
User.hasMany(Progress, { foreignKey: 'user_id', as: 'progress' });
Progress.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Module -> Progress (1:N)
Module.hasMany(Progress, { foreignKey: 'module_id', as: 'progress' });
Progress.belongsTo(Module, { foreignKey: 'module_id', as: 'module' });

module.exports = {
  sequelize,
  User,
  Module,
  Activity,
  Progress,
  Reward
};
