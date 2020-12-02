const { Router } = require('express');

const controller = require('../controllers/product');

const routes = Router();

routes.post('/', controller.store);
routes.get('/', controller.index);

//product set image profile;
routes.post('/:product_id/upload', controller.upload);

module.exports = routes;
