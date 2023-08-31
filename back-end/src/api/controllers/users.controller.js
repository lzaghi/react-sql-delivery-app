const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs');
const userService = require('../services/users.service');

const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');
const jwtConfig = {
  expiresIn: '2d',
  algorithm: 'HS256',
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.getByEmail(email);
  if (!user) {
    return res.status(404).json({ message: 'Email not registered!' });
  }

  const token = jwt.sign({ userId: user.id, userEmail: user.email }, secret, jwtConfig);
  
  const newHash = crypto.createHash('md5').update(password).digest('hex');

  const { password: _, ...rest } = user.dataValues;

  if (newHash === user.password) {
    return res.status(200).json({ user: rest, token });
  } 
  return res.status(401).json({ message: 'Wrong password!' });
};

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const usedEmail = await userService.getByEmail(email);
  if (usedEmail) {
    return res.status(409).json({ message: 'Email already registered!' });
  }

  const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
  const newUser = await userService.createUser(name, email, hashedPassword, role);
  
  const token = jwt.sign({ userId: newUser.id, userEmail: newUser.email }, secret, jwtConfig);
  
  const { password: _, ...rest } = newUser.dataValues;
  return res.status(201).json({ user: rest, token });
};

const getByRole = async (req, res) => {
  const { role } = req.params;
  const users = await userService.getByRole(role);
  const usersNoPassword = users.map((user) => {
    const { password: _, ...rest } = user.dataValues;
    return rest;
  });
  return res.status(200).json(usersNoPassword);
};

const getUsers = async (_req, res) => {
  const users = await userService.getUsers();
  return res.status(200).json(users);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await userService.deleteUser(id);
  return res.status(204).end();
};

module.exports = {
  login,
  register,
  getByRole,
  getUsers,
  deleteUser,
};