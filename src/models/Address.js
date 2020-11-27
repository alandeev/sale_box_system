const { Model, DataTypes } = require("sequelize");

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        client_id: DataTypes.INTEGER,
        cep: DataTypes.STRING,
        city: DataTypes.STRING,
        street: DataTypes.STRING,
        number: DataTypes.STRING,
      },
      { sequelize }
    );
  }

  static associate(models){
    this.belongsTo(models.Client, { foreignKey: 'client_id', as: 'owner' });
  }
}

module.exports = Address;
