import { autorun, makeAutoObservable } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { login } from '../api';
import { LoginReguest, LoginResponse } from './types';

class Store {
  auth?: IPromiseBasedObservable<LoginResponse>;
  constructor() {
    makeAutoObservable(this);
    autorun(() => {
      if (this.auth?.state === 'fulfilled') {
        localStorage.setItem(
          'accessToken',
          this.auth.case({ fulfilled: (val) => val.token })
        );
      }
    });
  }
  loginAction = async (params: LoginReguest) =>
    (this.auth = fromPromise(login(params)));
}

export default new Store();
