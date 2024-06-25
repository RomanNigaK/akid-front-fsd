import { Key } from 'react';
import { httpClientAuthorized } from 'shared/config/http-client';
import { urlFromTemplate } from 'shared/lib/url';

export const getMaterialsByWork = async (workId: string): Promise<string[]> => {
  return await httpClientAuthorized
    .get(urlFromTemplate('work/{workId}/materials', { workId }))
    .json();
};

export const bundleMaterialsWork = async (
  workId: string,
  ids: Key[]
): Promise<unknown> => {
  return await httpClientAuthorized
    .post(urlFromTemplate('work/{workId}/materials', { workId }), {
      json: { items: ids },
    })
    .json();
};
