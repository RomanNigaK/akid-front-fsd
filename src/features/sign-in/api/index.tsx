import { LoginReguest, LoginResponse } from '../model';
import { httpClient } from 'shared/config/http-client';

export const login = async (data: LoginReguest) => {
  return httpClient.post('login', { json: data }).json<LoginResponse>();
};
