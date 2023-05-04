const validateRegisterBody = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 12) {
    return res.status(401).send({ message: 'Invalid name' });
  }
  next();
};

module.exports = {
  validateRegisterBody,
};