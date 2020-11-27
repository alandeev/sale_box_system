'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('clients', { 
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id"
        },
        allowNull: false
      },
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('clients');
  }
};
