import { Router } from 'express';

import UserRouter from './user.router';

const MainRouter = Router();

MainRouter.use('/api/user', UserRouter);

export default MainRouter;
