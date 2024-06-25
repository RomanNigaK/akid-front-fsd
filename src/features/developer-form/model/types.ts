import { Person } from 'entities/person';
import { TypePerson } from 'shared/constants/enums';

export type Developer = {
  person: Person;
  type: TypePerson;
};
