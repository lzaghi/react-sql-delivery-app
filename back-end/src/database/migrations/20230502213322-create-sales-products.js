'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales_products', {
      saleId: {
        // allowNull: false,
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'sales',
        //   key: 'id',
        // },
        // onDelete: 'NO ACTION',
        // onUpdate: 'NO ACTION',
        primaryKey: true,
        field: 'sale_id'
      },
      productId: {
        // allowNull: false,
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'products',
        //   key: 'id',
        // },
        // onDelete: 'NO ACTION',
        // onUpdate: 'NO ACTION',
        primaryKey: true,
        field: 'product_id'
      },
      quantity: { 
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales_products');
  }
};
