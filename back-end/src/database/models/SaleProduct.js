/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

const SaleProductModel = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct',
  {
    saleId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    quantity: DataTypes.INTEGER,
  },
  {
    tableName: 'sales_products',
    underscored: true,
    timestamps: false,
  });

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: SaleProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
      constraints: false
    });
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: SaleProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
      constraints: false
    });
  }

  return SaleProduct;
};

module.exports = SaleProductModel;
