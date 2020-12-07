const { Router } = require('express');

const routes = Router();

const controller = require('../controllers/buy');

//get all buys;
routes.get('/buys/all', controller.findAllBuyPaid);

routes.get('/:client_id/buys', controller.findBuyClientCurrent);
routes.post('/:client_id/buys/:product_id', controller.findOrCreateCartAndAddProduct);
routes.post('/:client_id/buys', controller.checkout);

module.exports = routes;
