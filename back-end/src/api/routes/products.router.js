const { Router } = require('express');
const productController = require('../controllers/products.controller');
const { validateAuth } = require('../middlewares/validateAuth.middleware');

const productsRouter = Router();

productsRouter.get('/', validateAuth, productController.getAll);

module.exports = productsRouter;