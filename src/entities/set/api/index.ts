import { Set } from '../index';
import { urlFromTemplate } from 'shared/lib/url';
import { httpClientAuthorized } from 'shared/config/http-client';

export const getSets = async (): Promise<Set[]> => {
  return httpClientAuthorized.get('kits').json<Set[]>();
};

export const getSet = async (kitId: string): Promise<Set> => {
  return httpClientAuthorized
    .get(urlFromTemplate('kit/{kitId}', { kitId }))
    .json<Set>();
};
