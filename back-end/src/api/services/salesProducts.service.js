const { SaleProduct } = require('../../database/models');

const updateSaleProducts = async (saleId, cart) => {
  const cartProducts = Object.values(cart)
    .filter((product) => product.qtty > 0);
    await Promise.all(cartProducts.map((product) => SaleProduct.create({
      saleId,
      productId: product.id,
      quantity: product.qtty,
    })));
};

module.exports = {
  updateSaleProducts,
};