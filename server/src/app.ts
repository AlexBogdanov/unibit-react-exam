import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

import Config from './config';
import MainRouter from './routers';

import { configurePassport } from './utils/passport.util';

import ErrorMiddleware from './middlewares/error.middleware';

const app = express();

const config = Config.getInstance();
configurePassport();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use(MainRouter);
app.use(new ErrorMiddleware().init);

app.listen(config.server.port, () => {
  console.info(`Server listening on ${config.server.port}`);
});

mongoose.set('strict', true);
mongoose.connect(config.clusterUri)
  .then(() => {
    console.info('DB connected');
  })
  .catch((err) => {
    console.error(err, 'DB connection error');
  });
