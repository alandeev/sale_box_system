const { Router } = require('express');

const routes = Router();

const controller = require('../controllers/buy');

routes.get('/:client_id/buys', controller.find_buy_now);
routes.post('/:client_id/buys/:product_id', controller.findOrCreateAndAddProduct);
routes.post('/:client_id/buys', controller.checkout);

module.exports = routes;
