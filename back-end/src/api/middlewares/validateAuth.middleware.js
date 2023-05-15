const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const validateAuth = (req, res, next) => {
  console.log('validou?');
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'No token provided' });

  try {
    jwt.verify(authorization, secret);
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = {
  validateAuth,
};