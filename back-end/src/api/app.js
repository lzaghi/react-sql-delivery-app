const express = require('express');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const loginRouter = require('./routers/login.router');
const registerRouter = require('./routers/register.router');
const productsRouter = require('./routers/products.router');
const usersRouter = require('./routers/users.router');
const salesRouter = require('./routers/sales.router');

const app = express();
app.disable('x-powered-by');
app.use(express.json());

const corsOptions = {
  origin: [
    'https://react-sql-delivery-app-front.vercel.app',
    'http://localhost:3000',
  ], // Your front-end URL
};
app.use(cors(corsOptions));

app.use(express.static('public'));

app.get('/', (_req, res) => res.status(200).json({ message: 'ok' }));

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/sales', salesRouter);

module.exports = app;
