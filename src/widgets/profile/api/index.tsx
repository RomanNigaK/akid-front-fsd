import { Profile } from '../model';
import { httpClientAuthorized } from 'shared/config/http-client';

export const getProfile = async () => {
  return httpClientAuthorized.get('profile').json<Profile>();
};
