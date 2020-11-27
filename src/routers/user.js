const { Router } = require('express');

const controller = require('../controllers/users');
const middleware = require('../middleware');

const routes = Router();

routes.use(middleware);

//setting sub_routes
routes.use('/clients', require('./client.user'))
routes.use('/addresses', require('./address.user'))
//routes
routes.get('/', controller.index);

module.exports = routes;