import { makeAutoObservable, runInAction } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { updateWork } from '../api';
import { WorkRequest } from './types';

class Store {
  update?: IPromiseBasedObservable<unknown>;
  isViewModal: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
  setIsViewModal = (bool: boolean) =>
    runInAction(() => {
      this.isViewModal = bool;
    });
  updateWorkAction = (work: WorkRequest, workId: string) =>
    runInAction(() => {
      this.update = fromPromise(updateWork(work, workId));
    });
}

export default new Store();
