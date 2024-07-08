import { makeAutoObservable, runInAction } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { createRepresentative, updateRepresentative } from '../api';
import { Representative } from './types';

class Store {
  representative?: IPromiseBasedObservable<Representative>;

  constructor() {
    makeAutoObservable(this);
  }

  createRepresentativeAction = (
    personId: string,
    representative: Representative
  ) =>
    runInAction(() => {
      this.representative = fromPromise(
        createRepresentative(personId, representative)
      );
    });

  updateRepresentativeAction = (representative: Representative) =>
    runInAction(() => {
      this.representative = fromPromise(updateRepresentative(representative));
    });

  clearRepresentative = () =>
    runInAction(() => {
      this.representative = undefined;
    });
}

export default new Store();
