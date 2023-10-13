const express = require('express');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const loginRouter = require('./routes/login.router');
const registerRouter = require('./routes/register.router');
const productsRouter = require('./routes/products.router');
const usersRouter = require('./routes/users.router');
const salesRouter = require('./routes/sales.router');

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

app.use(cors());

app.use(express.static('public'));

app.get('/', (_req, res) => res.status(200).json({ message: 'ok' }));
const userController = require('./controllers/users.controller');

app.get('/users', userController.getUsers);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/sales', salesRouter);

module.exports = app;
