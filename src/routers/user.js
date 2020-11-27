const { Router } = require('express');

const controller = require('../controllers/users');
const middleware = require('../middleware');

const routes = Router();

routes.use(middleware);

routes.get('/', controller.index);

module.exports = (app) => app.use('/users', routes);