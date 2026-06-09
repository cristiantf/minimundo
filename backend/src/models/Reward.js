const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reward = sequelize.define('Reward', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  icon: {
    type: DataTypes.STRING(255)
  },
  stars_required: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  type: {
    type: DataTypes.ENUM('badge', 'trophy', 'title'),
    allowNull: false
  }
}, {
  tableName: 'rewards',
  timestamps: true,
  underscored: true
});

module.exports = Reward;
