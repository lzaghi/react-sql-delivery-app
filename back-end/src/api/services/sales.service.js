const { Sale } = require('../../database/models');

const createSale = async ({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber }) => {
  const newSale = await Sale.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status: 'Pendente',
  });
  return newSale;
};

module.exports = {
  createSale,
};