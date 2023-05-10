const { Sale, User, Product } = require('../../database/models');
const { updateSaleProducts } = require('./salesProducts.service');

const createSale = async (
  { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, cart },
) => {
  const newSale = await Sale.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status: 'Pendente',
  });
  await updateSaleProducts(newSale.id, cart);
  return newSale;
};

const getAll = async (userId) => Sale.findAll({
  where: { userId },
});

const getSaleDetails = async (id) => Sale.findOne({
  where: { id },
  include: [
    { model: User, as: 'seller', attributes: { exclude: ['password', 'id', 'role'] } },
    { model: Product, as: 'products', attributes: { exclude: ['urlImage', 'id'] } },
  ],
});

module.exports = {
  createSale,
  getAll,
  getSaleDetails,
};