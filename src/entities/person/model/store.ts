import { makeAutoObservable, runInAction } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { createPerson, getPerson, updatePerson } from 'entities/person/api';
import { TypePerson } from 'shared/constants/enums';
import { Person } from 'entities/person';

class Store {
  person?: IPromiseBasedObservable<Person>;

  constructor() {
    makeAutoObservable(this);
  }
  getPersonAction = (kitId: string, type: TypePerson) =>
    runInAction(() => {
      this.person = fromPromise(getPerson(type, kitId));
    });

  createPersonAction = (kitId: string, person: Person, type: TypePerson) =>
    runInAction(() => {
      this.person = fromPromise(createPerson(type, kitId, person));
    });

  updatePersonAction = (person: Person) =>
    runInAction(() => {
      this.person = fromPromise(updatePerson(person));
    });

  clearPerson = () =>
    runInAction(() => {
      this.person = undefined;
    });
}

export default new Store();
