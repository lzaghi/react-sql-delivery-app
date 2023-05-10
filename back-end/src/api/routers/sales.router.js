const { Router } = require('express');
const saleController = require('../controllers/sales.controller');
const { validateAuth } = require('../middlewares/validateAuth.middleware');

const salesRouter = Router();

salesRouter.post('/', validateAuth, saleController.createSale);
salesRouter.get('/user', validateAuth, saleController.getUserSales);
salesRouter.get('/details/:id', validateAuth, saleController.getSaleDetails);
salesRouter.get('/seller', validateAuth, saleController.getSellerSales);

module.exports = salesRouter;