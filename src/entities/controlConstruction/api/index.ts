import { ControlConstruction } from '../model';
import { httpClientAuthorized } from 'shared/config/http-client';
import { urlFromTemplate } from 'shared/lib/url';

export const createControlConstruction = async (
  personId: string,
  controlConstruction: ControlConstruction
) => {
  return httpClientAuthorized
    .post(
      urlFromTemplate('person/{personId}/construction-control', { personId }),
      {
        json: controlConstruction,
      }
    )
    .json<ControlConstruction>();
};

export const updateControlConstruction = async (
  controlConstruction: ControlConstruction
) => {
  const { id, ...rest } = controlConstruction;
  return httpClientAuthorized
    .put(
      urlFromTemplate('construction-control/{constructionControlId}', {
        constructionControlId: id,
      }),
      {
        json: rest,
      }
    )
    .json<ControlConstruction>();
};
