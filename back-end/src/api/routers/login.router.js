const { Router } = require('express');
const userController = require('../controllers/users.controller');
const { validateLoginBody } = require('../middlewares/validateLoginBody.middleware');

const loginRouter = Router();

loginRouter.post('/', validateLoginBody, userController.login);

module.exports = loginRouter;