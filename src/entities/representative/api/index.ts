import { Representative } from '../model';
import { httpClientAuthorized } from 'shared/config/http-client';
import { urlFromTemplate } from 'shared/lib/url';

export const createRepresentative = async (
  personId: string,
  representative: Representative
) => {
  return httpClientAuthorized
    .post(urlFromTemplate('person/{personId}/representative', { personId }), {
      json: representative,
    })
    .json<Representative>();
};

export const updateRepresentative = async (representative: Representative) => {
  const { id, ...rest } = representative;
  return httpClientAuthorized
    .put(
      urlFromTemplate('representative/{representativeId}', {
        representativeId: id,
      }),
      {
        json: rest,
      }
    )
    .json<Representative>();
};
