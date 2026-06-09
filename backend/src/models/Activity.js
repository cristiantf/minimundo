const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Activity = sequelize.define('Activity', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  module_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('letter', 'number', 'color', 'shape', 'memory', 'animal'),
    allowNull: false
  },
  difficulty: {
    type: DataTypes.TINYINT,
    defaultValue: 1,
    validate: { min: 1, max: 3 }
  },
  content: {
    type: DataTypes.JSON
  },
  audio_url: {
    type: DataTypes.STRING(255)
  },
  image_url: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'activities',
  timestamps: true,
  underscored: true
});

module.exports = Activity;
