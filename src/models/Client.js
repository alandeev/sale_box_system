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
              args: [2, 30],
              msg: "Field name must have be from 2 to 30 characters",
            },
          },
        },
        phone: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [2, 30],
              msg: "Field phone must have be from 2 to 30 characters",
            }
          }
        },
      },
      { sequelize }
    );
    this.addHook('beforeCreate', (client) => {
      if(client.name) client.name = client.name.toLowerCase();
    })
  }

  static associate(models){
    this.hasMany(models.Buy, { foreignKey: 'client_id', as: 'buys' });
    this.hasOne(models.Address, { foreignKey: 'client_id', as: 'address' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' });
  }
}

module.exports = Client;
