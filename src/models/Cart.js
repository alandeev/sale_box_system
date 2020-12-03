const { Model, DataTypes } = require("sequelize");

class Cart extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });
  }

  static associate(models){
    this.belongsToMany(models.Product, {
      foreignKey: 'cart_id',
      as: "products",
      through: 'carts_products'
    });
  }
}

module.exports = Cart;
