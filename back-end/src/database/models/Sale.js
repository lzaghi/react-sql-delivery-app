/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

const SaleModel = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    // saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  },
  {
    tableName: 'sales',
    underscored: true,
    timestamps: true,
    createdAt: 'saleDate',
    updatedAt: false,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user' 
    });
    Sale.belongsTo(models.User, {
      foreignKey: 'sellerId', as: 'seller' 
    });
  }

  return Sale;
};

module.exports = SaleModel;
