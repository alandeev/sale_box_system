'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('address', { 
      id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      client_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "clients",
          key: "id"
        },
        allowNull: false
      },
      cep: DataTypes.STRING,
      city: DataTypes.STRING,
      street: DataTypes.STRING,
      number: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('address');
  }
};
