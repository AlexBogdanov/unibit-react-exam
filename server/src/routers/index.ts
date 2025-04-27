import { Router } from 'express';

import UserRouter from './user.router';
import BookRouter from './book.router';

const MainRouter = Router();

MainRouter.use('/api/auth', UserRouter);
MainRouter.use('/api/book', BookRouter);

export default MainRouter;
