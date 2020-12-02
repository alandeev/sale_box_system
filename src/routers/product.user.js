const { Router } = require('express');

const controller = require('../controllers/product');

const routes = Router();

routes.post('/', controller.store);
routes.get('/', controller.index);

module.exports = routes;
