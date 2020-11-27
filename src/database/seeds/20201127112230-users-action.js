'use strict';

const bcryptjs = require('bcryptjs');
const { uuid } = require('uuidv4')

module.exports = {
  up: async (queryInterface) => {
     await queryInterface.bulkInsert('users', [{
       id: uuid(),
       name: 'John Doe',
       username: 'johndoe',
       password_hash: await bcryptjs.hash('123456', 8),
       created_at: new Date(),
       updated_at: new Date(),
     }], {});
  }
};
