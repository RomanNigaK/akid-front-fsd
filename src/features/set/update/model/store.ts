import { makeAutoObservable } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { createSet } from '../api';
import { Set } from 'entities/set';

class Store {
  set?: IPromiseBasedObservable<unknown>;

  constructor() {
    makeAutoObservable(this);
  }
  setUndefined = () => (this.set = undefined);

  updateSetAction = (set: Set) => (this.set = fromPromise(createSet(set)));
}

export default new Store();
