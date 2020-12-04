const { Router } = require('express');

const routes = Router();

const controller = require('../controllers/client');

routes.get('/', controller.index);
routes.post('/', controller.create);

routes.use('/buys/:client_id', require('./buy.client'));

module.exports = routes;
