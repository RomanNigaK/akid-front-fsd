import { MaterialRequest } from '../model';
import { Material } from 'entities/material';
import { httpClientAuthorized } from 'shared/config/http-client';
import { urlFromTemplate } from 'shared/lib/url';

export const updateMaterial = async (
  material: MaterialRequest,
  materialId: string
): Promise<Material> => {
  return await httpClientAuthorized
    .put(urlFromTemplate('material/{materialId}', { materialId }), {
      json: material,
    })
    .json();
};
