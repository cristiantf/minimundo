const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING(50),
    defaultValue: 'default'
  },
  age: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 3,
    validate: { min: 3, max: 6 }
  },
  total_stars: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  total_trophies: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true
});

module.exports = User;
