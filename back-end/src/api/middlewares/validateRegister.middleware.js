const validateRegisterBody = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ message: 'All fields must be filled' });
  }

  if (name.length < 12) {
    return res.status(401).send({ message: 'Invalid name' });
  }
  next();
};

module.exports = {
  validateRegisterBody,
};