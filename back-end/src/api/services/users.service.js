const { User } = require('../../database/models');

const getByEmail = async (email) => User.findOne({
    where: { email },
  });

module.exports = {
  getByEmail,
};