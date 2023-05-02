const { User } = require('../../database/models');

const getAll = async (_req, res) => {
  const users = await User.findAll();

  res.status(200).json(users);
};

module.exports = {
  getAll,
};