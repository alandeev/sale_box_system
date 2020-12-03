'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('carts_products', {
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
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      cart_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "carts",
          key: "id"
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('carts_products');
  }
};
