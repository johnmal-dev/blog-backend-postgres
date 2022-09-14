const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password_hash',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      default: Date.now(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
      default: Date.now(),
    },
  },
  {
    underscored: true,
    timestamps: true,
  }
);

module.exports = User;
