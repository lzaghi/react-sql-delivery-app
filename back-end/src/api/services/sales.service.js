const { Sale } = require('../../database/models');
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

module.exports = {
  createSale,
  getAll,
};