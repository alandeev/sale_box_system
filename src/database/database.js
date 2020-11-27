const { Sequelize } = require('sequelize');

const User = require('../models/User');
const Client = require('../models/Client');
const Address = require('../models/Address');

const configDB = require('../configs/database');

const connection = new Sequelize(configDB)

User.init(connection)
Client.init(connection)
Address.init(connection)

User.associate(connection.models)
Address.associate(connection.models)
Client.associate(connection.models)