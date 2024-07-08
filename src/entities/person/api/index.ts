import { Person } from '../model/types';
import { httpClientAuthorized } from 'shared/config/http-client';
import { TypePerson } from 'shared/constants/enums';
import { urlFromTemplate } from 'shared/lib/url';

export const getPerson = async (type: TypePerson, kitId: string) => {
  return httpClientAuthorized
    .get(urlFromTemplate('kit/{kitId}/{type}/person', { kitId, type }))
    .json<Person>();
};

export const createPerson = async (
  type: TypePerson,
  kitId: string,
  person: Person
) => {
  return httpClientAuthorized
    .post(urlFromTemplate('kit/{kitId}/{type}/person', { kitId, type }), {
      json: person,
    })
    .json<Person>();
};

export const updatePerson = async (person: Person) => {
  console.log(person);
  const { id, ...rest } = person;
  return httpClientAuthorized
    .put(urlFromTemplate('person/{personId}', { personId: id }), {
      json: rest,
    })
    .json<Person>();
};
