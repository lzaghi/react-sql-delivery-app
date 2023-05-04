const express = require('express');
const cors = require('cors');
const loginRouter = require('./routers/login.router');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => res.status(200).json({ message: 'ok' }));
app.use('/login', loginRouter);

module.exports = app;
