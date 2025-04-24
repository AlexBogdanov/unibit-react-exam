import { verifyToken } from '../utils/jwt.util';
import { CustomError } from '../middlewares/error.middleware';

import { IUser, User, UserDoc } from '../models/user.model';

const LOG_CONTEXT = 'User Data';

export const findUserPayloadByToken = async (token: string): Promise<any> => {
  return verifyToken(token);
};

export const findUserByEmail = async (email: string, logContext: string): Promise<UserDoc> => {
  logContext += ` -> ${LOG_CONTEXT} -> findUserByEmail() | email: ${email}`;

  const user = await User.findOne({ email })
    .catch(err => {
      throw new CustomError(500, err.message, logContext);
    });

  if (!user) {
    throw new CustomError(401, 'User not found', logContext);
  }

  return user;
};

export const createUser = async (data: Partial<IUser>, logContext: string): Promise<UserDoc> => {
  logContext += ` -> ${LOG_CONTEXT} -> createUser() | data: ${JSON.stringify(data)}`;

  return await User.create(data)
    .catch(err => {
      if (err.code === 11000) {
        throw new CustomError(400, 'Email already exists', logContext);
      }

      throw new CustomError(500, err.message, logContext);
    });
};
