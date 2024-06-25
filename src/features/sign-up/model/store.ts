import { makeAutoObservable } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { registration } from '../api';
import { RequestRegistration } from './types';

class Store {
  user?: IPromiseBasedObservable<unknown>;
  constructor() {
    makeAutoObservable(this);
  }
  registrationAction = async (params: RequestRegistration) =>
    (this.user = fromPromise(registration(params)));
}

export default new Store();
