const express = require('express');
const userService = require('./services/users.service');

const app = express();

app.get('/', (_req, res) => res.status(200).json({ message: 'ok' }));
app.get('/users', userService.getAll);

module.exports = app;
