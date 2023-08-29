module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        // allowNull: false,
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'users',
        //   key: 'id',
        // },
        // onDelete: 'NO ACTION',
        // onUpdate: 'NO ACTION',
        field: 'user_id',
      },
      sellerId: {
        // allowNull: false,
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'users',
        //   key: 'id',
        // },
        // onDelete: 'NO ACTION',
        // onUpdate: 'NO ACTION',
        field: 'seller_id',
      },
      totalPrice: {
        type: Sequelize.DECIMAL(9, 2),
        field: 'total_price',
      },
      deliveryAddress: {
        type: Sequelize.STRING(100),
        field: 'delivery_address',
      },
      deliveryNumber: {
        type: Sequelize.STRING(50),
        field: 'delivery_number',
      },
      saleDate: {
        type: Sequelize.DATE,
        field: 'sale_date',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      status: { type: Sequelize.STRING(50) },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales');
  },
};
