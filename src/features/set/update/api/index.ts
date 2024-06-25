import { httpClientAuthorized } from 'shared/config/http-client';
import { Set } from 'entities/set';
import { urlFromTemplate } from 'shared/lib/url';

export const createSet = async (set: Set): Promise<unknown> => {
  const { id, ...rest } = set;
  return httpClientAuthorized.put(
    urlFromTemplate('set/{setId}', { setId: id }),
    { json: rest }
  );
};
