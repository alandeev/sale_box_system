const { Router } = require('express');

const routes = Router();

const controller = require('../controllers/client');

routes.get('/', controller.index);
routes.post('/', controller.create);

module.exports = routes;