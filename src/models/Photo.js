const { Model, DataTypes } = require("sequelize");

class Photo extends Model {
  static init(sequelize) {
    super.init(
      {
        product_id: DataTypes.INTEGER,
        filename: {
          type: DataTypes.STRING,
          defaultValue: "",
          unique: {
            msg: "filename must be unique",
          },
        },
        originalname: {
          type: DataTypes.STRING,
          defaultValue: ""
        },
        path: {
          type: DataTypes.STRING,
          defaultValue: ""
        }
      },
      { sequelize }
    );
  }

  static associate(models){
    this.belongsTo(models.Product, { foreignKey: 'product_id', as: "product" });
  }
}

module.exports = Photo;
