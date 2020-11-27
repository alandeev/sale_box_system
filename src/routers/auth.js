const { Router } = require('express');

const routes = Router();

const controller = require('../controllers/auth');

routes.post('/auth', controller.authenticate);
routes.post('/signup', controller.signup);

module.exports = (app) => app.use('/', routes);