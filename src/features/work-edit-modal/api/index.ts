import { WorkRequest } from '../model/types';
import { httpClientAuthorized } from 'shared/config/http-client';
import { urlFromTemplate } from 'shared/lib/url';

export const updateWork = async (
  work: WorkRequest,
  workId: string
): Promise<unknown> => {
  return await httpClientAuthorized
    .put(urlFromTemplate('work/{workId}', { workId }), {
      json: work,
    })
    .json();
};
