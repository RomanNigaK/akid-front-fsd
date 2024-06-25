import { makeAutoObservable } from 'mobx';
import { IPromiseBasedObservable } from 'mobx-utils';
import { ProjectDocumentDetails } from './types';

class Store {
  details?: IPromiseBasedObservable<ProjectDocumentDetails>;

  constructor() {
    makeAutoObservable(this);
  }
}

export default new Store();
