const { DataTypes } = require('sequelize');
'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('users', { 
      id: { 
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      password_hash: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
