const jwt = require('jsonwebtoken');
const fs = require('fs');
const salesService = require('../services/sales.service');

const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const createSale = async (req, res) => {
  const newSale = await salesService.createSale(req.body);
  return res.status(201).json(newSale);
};

const getUserSales = async (req, res) => {
  const { authorization } = req.headers;
  const data = jwt.decode(authorization, secret);
  const sales = await salesService.getUserSales(data.userId);
  return res.status(200).json(sales);
};

const getSaleDetails = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleDetails(id);
  return res.status(200).json(sale);
};

const getSellerSales = async (req, res) => {
  const { authorization } = req.headers;
  const data = jwt.decode(authorization, secret);
  const sales = await salesService.getSellerSales(data.userId);
  return res.status(200).json(sales);
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body;
  await salesService.updateStatus(id, newStatus);
  return res.status(204).end();
};

module.exports = {
  createSale,
  getUserSales,
  getSaleDetails,
  getSellerSales,
  updateStatus,
};