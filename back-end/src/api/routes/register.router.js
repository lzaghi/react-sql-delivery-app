const { Router } = require('express');
const userController = require('../controllers/users.controller');
const { validateLoginBody } = require('../middlewares/validateLoginBody.middleware');
const { validateRegisterBody } = require('../middlewares/validateRegister.middleware');
const { validateAuth } = require('../middlewares/validateAuth.middleware');

const registerRouter = Router();

registerRouter.post(
  '/admin',
  validateAuth,
  validateRegisterBody,
  validateLoginBody,
  userController.register,
);
registerRouter.post('/', validateRegisterBody, validateLoginBody, userController.register);

module.exports = registerRouter;