const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs');
const userService = require('../services/users.service');

const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.getByEmail(email);
  if (!user) {
    return res.status(404).json({ message: 'Email not registered' });
  }

  const token = jwt.sign({ userId: user.id, userEmail: user.email }, secret, jwtConfig);
  
  const newHash = crypto.createHash('md5').update(password).digest('hex');

  if (newHash === user.password) {
    return res.status(200).json({ token });
  } 
  return res.status(401).json({ message: 'Invalid password' });
};

module.exports = {
  login,
};