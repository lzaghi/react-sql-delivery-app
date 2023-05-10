const { Router } = require('express');
const saleController = require('../controllers/sales.controller');
const { validateAuth } = require('../middlewares/validateAuth.middleware');

const salesRouter = Router();

salesRouter.post('/', validateAuth, saleController.createSale);
salesRouter.get('/', validateAuth, saleController.getAll);
salesRouter.get('/details/:id', validateAuth, saleController.getSaleDetails);

module.exports = salesRouter;