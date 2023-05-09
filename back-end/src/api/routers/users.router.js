const { Router } = require('express');
const userController = require('../controllers/users.controller');
const { validateAuth } = require('../middlewares/validateAuth.middleware');

const usersRouter = Router();

usersRouter.get('/:role', validateAuth, userController.getByRole);

module.exports = usersRouter;