import { RequestCreateSet } from '../model';
import { httpClientAuthorized } from 'shared/config/http-client';
import { Set } from 'entities/set';

export const createSet = async (set: RequestCreateSet): Promise<Set> => {
  return httpClientAuthorized.post('set', { json: set }).json<Set>();
};
