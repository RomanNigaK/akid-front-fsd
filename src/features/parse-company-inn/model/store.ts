import { makeAutoObservable } from 'mobx';
import { IPromiseBasedObservable } from 'mobx-utils';

class Store {
  data?: IPromiseBasedObservable<unknown>;

  constructor() {
    makeAutoObservable(this);
  }
}

export default new Store();
