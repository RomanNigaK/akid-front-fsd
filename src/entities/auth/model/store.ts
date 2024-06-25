/* eslint-disable sonarjs/no-small-switch */
import { autorun, makeAutoObservable, runInAction } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { AuthResponse } from '../api/types';
import { validToken } from '../api';

class AuthStore {
  isAuth: boolean = false;
  isTokenValid?: IPromiseBasedObservable<boolean>;
  authData?: IPromiseBasedObservable<AuthResponse>;
  constructor() {
    makeAutoObservable(this);
    autorun(() => {
      switch (this.isTokenValid?.state) {
        case 'fulfilled':
          runInAction(() => (this.isAuth = true));
          break;
      }
    });
  }

  validTokenAction = () => {
    this.isTokenValid = fromPromise(validToken());
  };
}
export default new AuthStore();
