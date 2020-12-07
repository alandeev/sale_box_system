const { Model, DataTypes } = require("sequelize");

class Product_Buy extends Model {
  static init(sequelize) {
    super.init({
      product_id: DataTypes.INTEGER,
      buy_id: DataTypes.INTEGER,
      qtd: {
        type: Number,
        defaultValue: 1
      }
    }, {
      tableName: 'products_buys',
      sequelize
     });
  }

  async getPriceAllProducts(){
    this.increment()
  }
}

module.exports = Product_Buy;
