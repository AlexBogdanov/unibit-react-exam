import passport from 'passport';
import { Router } from 'express';

import { getUseCatch } from '../utils/catch.util';

import UserController from '../controllers/user.controller';

const useCatch = getUseCatch();
const userController = new UserController();

const UserRouter = Router();

UserRouter.get('/user', passport.authenticate('bearer', { session: false }), useCatch(userController.user));
UserRouter.post('/login', useCatch(userController.login));
UserRouter.post('/register', useCatch(userController.register));

export default UserRouter;
