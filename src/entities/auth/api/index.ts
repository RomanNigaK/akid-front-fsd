import { httpClientAuthorized } from 'shared/config/http-client';

export const validToken = () =>
  httpClientAuthorized.get('profile').json<boolean>();
