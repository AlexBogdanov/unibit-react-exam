import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';

import * as userData from '../data/user.data';

import { UserPayload } from '../models/user.model';

export const configurePassport = () => {
  passport.use(new BearerStrategy(
    async (token, done) => {
      const payload = await userData.findUserPayloadByToken(token)
        .catch((err) => {
          return done(err);
        });

      if (!payload) {
        return done(null, false);
      }

      const { email, name, createdAt, updatedAt } = payload._doc;

      const user: UserPayload = {
        email,
        name,
        createdAt,
        updatedAt,
      };

      return done(null, user);
    },
  ));
}