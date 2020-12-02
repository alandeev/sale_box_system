'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('products', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      created_by: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id"
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('products');
  }
};
