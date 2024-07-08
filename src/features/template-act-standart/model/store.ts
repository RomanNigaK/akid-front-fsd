import { makeAutoObservable, runInAction } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { getTemplates } from '../api';
import { Template } from './types';

class Store {
  template?: IPromiseBasedObservable<Template[]>;
  constructor() {
    makeAutoObservable(this);
  }
  getTemplatesAction = () =>
    runInAction(() => {
      this.template = fromPromise(getTemplates());
    });
}

export default new Store();
