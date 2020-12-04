'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('products_buys', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "products",
          key: "id"
        },
        allowNull: false,
        onDelete: 'set null',
        onUpdate: 'set null'
      },
      buy_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "buys",
          key: "id"
        },
        allowNull: false,
        onDelete: 'set null',
        onUpdate: 'set null'
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('products_buys');
  }
};
