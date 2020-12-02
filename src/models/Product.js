const { Model, DataTypes } = require("sequelize");

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        created_by: DataTypes.UUID,
        name: {
          type: DataTypes.STRING,
          defaultValue: "",
          unique: {
            msg: "name already exists",
          },
          validate: {
            len: {
              args: [2, 30],
              msg: "Field name must have be from 2 to 30 characters",
            },
          },
        },
        description: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [2, 255],
              msg: "Field description must have be from 2 to 255 characters",
            },
          }
        },
        price: {
          type: DataTypes.FLOAT,
          defaultValue: 0,
          validate: {
            min: {
              args: 2,
              msg: "You need send price field in 2 or more"
            }
          }
        }
      },
      { sequelize }
    );

    this.addHook('beforeCreate', (product) => {
      if(product.name) product.name = product.name.toLowerCase();
    })
  }
}

module.exports = Product;
