const { Router } = require('express');

const routes = Router();

const controller = require('../controllers/buy');

routes.get('/:client_id/buys', controller.findAllProjects);
routes.post('/:client_id/buys/:product_id', controller.findOrCreateAndAddProduct);

module.exports = routes;
