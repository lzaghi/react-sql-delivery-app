const { User } = require('../../database/models');

const getByEmail = async (email) => User.findOne({
  where: { email },
});

const createUser = async (name, email, password) => {
  const newUser = await User.create({
    name,
    email,
    password,
    role: 'customer',
  });
  return newUser;
};

const getByRole = async (role) => User.findAll({
  where: { role },
});

module.exports = {
  getByEmail,
  createUser,
  getByRole,
};