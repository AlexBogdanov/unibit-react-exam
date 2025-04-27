import bcryptjs from 'bcryptjs';
import { RequestHandler } from 'express';

import { generateToken } from '../utils/jwt.util';

import * as userData from '../data/user.data';
import { CustomError } from '../middlewares/error.middleware';
import { IUser, UserPayload } from "../models/user.model";

export default class UserController {

  #logContext = 'User Controller';

  register: RequestHandler = async (req, res) => {
    const logContext = `${this.#logContext} -> register()`;

    const body: Partial<IUser> = req.body;

    if (!body.email || !body.password || !body.name) {
      throw new CustomError(400, 'Missing fields', logContext);
    }

    await userData.createUser(body, logContext);

    res.status(201).json({});
  }

  login: RequestHandler = async (req, res) => {
    const logContext = `${this.#logContext} -> login()`;

    const { email, password } = req.body;
    const user = await userData.findUserByEmail(email, logContext);

    const isPasswordValid = await bcryptjs.compare(password, user.password)
      .catch(err => {
        throw new CustomError(500, err.message, `${logContext} -> bcryptjs.compare() -> userId: ${user._id.toString()}`);
      });

    if (!isPasswordValid) {
      throw new CustomError(404, `Invalid credentials`, logContext);
    }

    const token = generateToken(user as UserPayload);

    user.token = token;
    await user.save()
      .catch(err => {
        throw new CustomError(500, err.message, logContext);
      });

    res.header('Authorization-Access', token);
    res.header('Access-control-expose-headers', 'authorization-access');

    res.status(200).json({
      email: user.email,
      name: user.name,
    });
  }

  user: RequestHandler = async (req, res) => {
    res.status(200).json(req.user);
  }

}
