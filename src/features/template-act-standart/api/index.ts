import { Template } from '../model';
import { httpClientAuthorized } from 'shared/config/http-client';

export const getTemplates = async () => {
  return httpClientAuthorized.get('templates').json<Template[]>();
};
