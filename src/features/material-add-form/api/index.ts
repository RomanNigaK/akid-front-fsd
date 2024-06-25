import { MaterialRequest } from '../model';
import { Material } from 'entities/material';
import { httpClientAuthorized } from 'shared/config/http-client';
import { urlFromTemplate } from 'shared/lib/url';

export const addMaterial = async (
  material: MaterialRequest,
  kitId: string
): Promise<Material> => {
  return await httpClientAuthorized
    .post(urlFromTemplate('kit/{kitId}/material', { kitId }), {
      json: material,
    })
    .json();
};
