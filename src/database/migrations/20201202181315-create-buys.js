'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('buys', { //carrinho de compras
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
        allowNull: false,
        onDelete: 'set null',
        onUpdate: 'set null'
      },
      is_paid: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('buys');
  }
};
