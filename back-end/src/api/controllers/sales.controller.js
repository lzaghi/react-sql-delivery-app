const jwt = require('jsonwebtoken');
const fs = require('fs');
const salesService = require('../services/sales.service');

const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const createSale = async (req, res) => {
  const newSale = await salesService.createSale(req.body);
  return res.status(201).json(newSale);
};

const getAll = async (req, res) => {
  const { authorization } = req.headers;
  const data = jwt.decode(authorization, secret);
  const sales = await salesService.getAll(data.userId);
  return res.status(200).json(sales);
};

const getSaleDetails = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleDetails(id);
  return res.status(200).json(sale);
};

module.exports = {
  createSale,
  getAll,
  getSaleDetails,
};