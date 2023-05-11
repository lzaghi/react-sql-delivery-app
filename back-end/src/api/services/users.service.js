const { User, Sequelize } = require('../../database/models');

const getByEmail = async (email) => User.findOne({
  where: { email },
});

const createUser = async (name, email, password, role = 'customer') => {
  const newUser = await User.create({
    name,
    email,
    password,
    role,
  });
  return newUser;
};

const getByRole = async (role) => User.findAll({
  where: { role },
});

const getUsers = async () => User.findAll({
  where: { role: {
    [Sequelize.Op.not]: 'administrator',
    },
  },
  attributes: {
    exclude: ['password'],
  },
});

module.exports = {
  getByEmail,
  createUser,
  getByRole,
  getUsers,
};