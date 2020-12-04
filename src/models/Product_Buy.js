const { Model } = require("sequelize");

class Product_Buy extends Model {
  static init(sequelize) {
    super.init({ }, { sequelize });
  }
}

module.exports = Product_Buy;
