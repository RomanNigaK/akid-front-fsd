import { Work } from '../model';
import { urlFromTemplate } from 'shared/lib/url';
import { httpClientAuthorized } from 'shared/config/http-client';

export const getCountWorkByKitId = async (
  kitId: string
): Promise<{ count: number }> => {
  return httpClientAuthorized
    .get(urlFromTemplate('kit/{kitId}/work/count', { kitId }))
    .json<{ count: number }>();
};

export const getWorkBySetId = async (kitId: string): Promise<Work[]> => {
  return httpClientAuthorized
    .get(urlFromTemplate('kit/{kitId}/works', { kitId }))
    .json<Work[]>();
};
