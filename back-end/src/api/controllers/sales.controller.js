const salesService = require('../services/sales.service');

const createSale = async (req, res) => {
  const newSale = await salesService.createSale(req.body);
  return res.status(201).json(newSale);
};

module.exports = {
  createSale,
};