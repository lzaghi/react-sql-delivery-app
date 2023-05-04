const express = require('express');
const cors = require('cors');
const loginRouter = require('./routers/login.router');
const registerRouter = require('./routers/register.router');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => res.status(200).json({ message: 'ok' }));
app.use('/login', loginRouter);
app.use('/register', registerRouter);

module.exports = app;
