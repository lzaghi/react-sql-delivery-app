module.exports = {
  // eslint-disable-next-line max-lines-per-function
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        id: 1,
        name: 'Skol Lata 250ml',
        price: 2.20,
        urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      },
      {
        id: 2,
        name: 'Fulana Pereira',
        email: 'fulana@deliveryapp.com',
        password: '3c28d2b0881bf46457a853e0b07531c6',
        role: 'seller',
      },
      {
        id: 3,
        name: 'Cliente Zé Birita',
        email: 'zebirita@email.com',
        password: '1c37466c159755ce1fa181bd247cb925',
        role: 'customer',
      },
      ], { timestamps: false });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  },
};
