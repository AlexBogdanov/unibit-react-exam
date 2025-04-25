import * as apiService from '../../services/api.service';

import { User, LoginBody, RegisterBody } from './auth.model.ts';

export const login = (body: LoginBody): Promise<User> => {
  return apiService.post<LoginBody, User>('/login', body);
};

export const register = async (body: RegisterBody): Promise<void> => {
  return apiService.post<RegisterBody, void>('/register', body);
};
