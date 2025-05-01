import * as apiService from '../../services/api.service';

import { User, LoginBody, RegisterBody } from './auth.model.ts';

export const login = (body: LoginBody): Promise<User> =>
  apiService.post<LoginBody, User>('auth/login', body);

export const register = (body: RegisterBody): Promise<void> =>
  apiService.post<RegisterBody, void>('auth/register', body);

export const getUser = (): Promise<User> =>
  apiService.get<User>('auth/user');
