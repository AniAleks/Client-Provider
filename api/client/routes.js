const express = require('express');
const controller = require('./controller');


const routes = express.Router();

routes.route('/').post(controller.add);

routes.route('/').get(controller.clients);

routes.route('/:id').get(controller.client);

routes.route('/:id').delete(controller.delete);

routes.route('/:id').put(controller.edit);

module.exports = routes;
