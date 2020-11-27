const { Model, DataTypes } = require("sequelize");

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: DataTypes.UUID,
        name: {
          type: DataTypes.STRING,
          defaultValue: "",
          unique: {
            msg: "name already exists",
          },
          validate: {
            len: {
              args: [4, 20],
              msg: "Field name must have be from 4 to 20 characters",
            },
          },
        },
        phone: {
          type: DataTypes.STRING,
          defaultValue: "",
        },      
      },
      { sequelize }
    );
  }

  static associate(models){
    this.hasOne(models.Address, { foreignKey: 'client_id', as: 'address' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' });
  }
}

module.exports = Client;
