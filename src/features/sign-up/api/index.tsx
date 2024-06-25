import { RequestRegistration } from '../model';
import { httpClient } from 'shared/config/http-client';

export const registration = async (data: RequestRegistration) => {
  return httpClient.post('registration', { json: data }).json<unknown>();
};
