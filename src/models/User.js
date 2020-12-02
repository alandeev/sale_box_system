const { Model, DataTypes } = require("sequelize");
const bcryptjs = require("bcryptjs");
const { uuid } = require("uuidv4");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [2, 30],
              msg: "Field name must have be from 2 to 30 characters",
            },
          },
        },
        username: {
          type: DataTypes.STRING,
          defaultValue: "",
          unique: {
            msg: "username already exists",
          },
          validate: {
            len: {
              args: [4, 20],
              msg: "Field username must have be from 4 to 20 characters",
            },
          },
        },
        password_hash: {
          type: DataTypes.STRING,
          defaultValue: "",
        },
        password: {
          type: DataTypes.VIRTUAL,
          defaultValue: "",
          validate: {
            len: {
              args: [6, 50],
              msg: "Field password must have be from 6 to 50 characters",
            },
          },
        },
      },
      {
        sequelize,
      }
    );

    this.addHook("beforeCreate", async (user) => {
      user.id = uuid();
      user.username = user.username.toLowerCase();
      user.password_hash = await bcryptjs.hash(user.password, 8);
    });
  }

  static associate(models){
    this.hasMany(models.Client, { foreignKey: 'user_id', as: 'clients' });
    this.hasMany(models.Product, { foreignKey: 'created_by', as: 'products' });
  }

  password_is_valid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}

module.exports = User;
