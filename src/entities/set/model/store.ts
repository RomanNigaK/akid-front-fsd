import { makeAutoObservable } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { getSet, getSets } from '../api';
import { Set } from '.';

class Store {
  sets?: IPromiseBasedObservable<Set[]>;
  currentSet?: IPromiseBasedObservable<Set>;

  constructor() {
    makeAutoObservable(this);
  }

  getSetsAction = () => (this.sets = fromPromise(getSets()));

  getCurrentSet = (id: string) => (this.currentSet = fromPromise(getSet(id)));

  clearCurrentSet = () => (this.currentSet = undefined);
}

export default new Store();
