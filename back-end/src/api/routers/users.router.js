const { Router } = require('express');
const userController = require('../controllers/users.controller');
const { validateAuth } = require('../middlewares/validateAuth.middleware');

const usersRouter = Router();

usersRouter.get('/:role', validateAuth, userController.getByRole);
usersRouter.get('/', validateAuth, userController.getUsers);
usersRouter.delete('/:id', validateAuth, userController.deleteUser);

module.exports = usersRouter;