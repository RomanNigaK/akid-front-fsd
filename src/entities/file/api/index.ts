import { FileType } from '../model';
import { urlFromTemplate } from 'shared/lib/url';
import { httpClientAuthorized } from 'shared/config/http-client';

export const getFiles = async (materialId: string): Promise<FileType[]> => {
  return httpClientAuthorized
    .get(urlFromTemplate('material/{materialId}/files', { materialId }))
    .json<FileType[]>();
};

export const getDocuments = async (kitId: string): Promise<FileType[]> => {
  return httpClientAuthorized
    .get(urlFromTemplate('kit/{kitId}/documents', { kitId }))
    .json<FileType[]>();
};
