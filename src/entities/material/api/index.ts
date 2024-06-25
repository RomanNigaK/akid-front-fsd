import { Material } from '../model';
import { urlFromTemplate } from 'shared/lib/url';
import { httpClientAuthorized } from 'shared/config/http-client';

export const getConuntMaterialByKitId = async (
  kitId: string
): Promise<{ count: number }> => {
  return httpClientAuthorized
    .get(urlFromTemplate('kit/{kitId}/materials/count', { kitId }))
    .json<{ count: number }>();
};

export const getMaterialByKitId = async (
  kitId: string
): Promise<Material[]> => {
  return httpClientAuthorized
    .get(urlFromTemplate('kit/{kitId}/materials', { kitId }))
    .json<Material[]>();
};
