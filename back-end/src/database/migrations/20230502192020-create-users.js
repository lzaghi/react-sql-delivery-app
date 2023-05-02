module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { type: Sequelize.STRING(100) },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
      },
      password: { type: Sequelize.STRING(32) },
      role: { type: Sequelize.STRING(20) },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('users');
  },
};
