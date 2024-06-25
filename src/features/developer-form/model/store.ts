import { makeAutoObservable } from 'mobx';
import { IPromiseBasedObservable } from 'mobx-utils';
import { Developer } from '.';

class Store {
  developer?: IPromiseBasedObservable<Developer>;

  constructor() {
    makeAutoObservable(this);
  }
}

export default new Store();
