import jwt from 'jsonwebtoken';

import Config from '../config';

import { UserPayload } from '../models/user.model';

export const generateToken = (payload: UserPayload) => {
  return jwt.sign({ ...payload }, Config.getInstance().jwtSecret, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, Config.getInstance().jwtSecret) as any;
  } catch (error) {
    return null;
  }
};
