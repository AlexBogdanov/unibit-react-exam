import * as apiService from '../../services/api.service';

import { User, LoginBody, RegisterBody } from './auth.model.ts';

export const login = (body: LoginBody): Promise<User> => {
  return apiService.post<LoginBody, User>('auth/login', body);
};

export const register = async (body: RegisterBody): Promise<void> => {
  return apiService.post<RegisterBody, void>('auth/register', body);
};

export const getUser = async (): Promise<User> => {
  return apiService.get<User>('auth/user');
}
