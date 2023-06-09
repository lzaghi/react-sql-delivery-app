const express = require('express');
const cors = require('cors');
const loginRouter = require('./routers/login.router');
const registerRouter = require('./routers/register.router');
const productsRouter = require('./routers/products.router');
const usersRouter = require('./routers/users.router');
const salesRouter = require('./routers/sales.router');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static('public'));

app.get('/', (_req, res) => res.status(200).json({ message: 'ok' }));
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/sales', salesRouter);

module.exports = app;
