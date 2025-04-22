import passport from 'passport';
import { Router } from 'express';

import { getUseCatch } from '../utils/catch.util';

import UserController from '../controllers/user.controller';

const useCatch = getUseCatch();
const userController = new UserController();

const UserRouter = Router();

UserRouter.post('/login', useCatch(userController.login));
UserRouter.post('/register', useCatch(userController.register));
UserRouter.get('/some', passport.authenticate('bearer', { session: false }), useCatch(userController.some));

export default UserRouter;
