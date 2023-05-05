const { Router } = require('express');
const productController = require('../controllers/products.controller');

const productsRouter = Router();

productsRouter.get('/', productController.getAll);

module.exports = productsRouter;