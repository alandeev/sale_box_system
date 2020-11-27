const { Model, DataTypes } = require("sequelize");

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        client_id: {
          type: DataTypes.INTEGER,
          defaultValue: '',
          unique: {
            msg: "client_id must be unique",
          },
          validate: {
            notEmpty: {
              msg: "Field client_id is required"
            },
            onForeignConstraintError: (field, message, ...whatever) => {
              message('client_id invalid or already registed.')
            },
          }
        },
        cep: {
          type: DataTypes.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: "Field cep is required"
            }
          }
        },
        city: {
          type: DataTypes.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: "Field city is required"
            }
          }
        },
        street: {
          type: DataTypes.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: "Field street is required"
            }
          }
        },
        number: {
          type: DataTypes.STRING,
          defaultValue: 'null'
        },
      },
      { sequelize }
    );
  }

  static associate(models){
    this.belongsTo(models.Client, { foreignKey: 'client_id', as: 'owner' });
  }
}

module.exports = Address;
