const { User } = require('../../database/models');

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

module.exports = {
  getByEmail,
  createUser,
  getByRole,
};