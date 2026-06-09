const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Progress = sequelize.define('Progress', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  module_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  completed_activities: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  total_activities: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  stars_earned: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  time_spent: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Tiempo en minutos'
  },
  last_played: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'progress',
  timestamps: false,
  underscored: true
});

module.exports = Progress;
