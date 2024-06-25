import { WorkRequest } from '../model';
import { Work } from 'entities/work';
import { httpClientAuthorized } from 'shared/config/http-client';
import { urlFromTemplate } from 'shared/lib/url';

export const addWork = async (
  work: WorkRequest,
  kitId: string
): Promise<Work> => {
  return await httpClientAuthorized
    .post(urlFromTemplate('kit/{kitId}/work', { kitId }), { json: work })
    .json();
};
