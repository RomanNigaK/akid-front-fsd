import { makeAutoObservable } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { getProfile } from '../api';
import { Profile } from '.';

class Store {
  profile?: IPromiseBasedObservable<Profile>;
  constructor() {
    makeAutoObservable(this);
  }
  getProfileAction = async () => (this.profile = fromPromise(getProfile()));
}

export default new Store();
