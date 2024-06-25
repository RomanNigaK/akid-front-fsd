import { autorun, makeAutoObservable, runInAction } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { addWork } from '../api';
import { WorkRequest } from './types';
import { Work, WorkStore } from 'entities/work';

class Store {
  work?: IPromiseBasedObservable<Work>;
  create?: IPromiseBasedObservable<Work>;
  kitId?: string;
  constructor() {
    makeAutoObservable(this);
    autorun(() => {
      if (this.create?.state === 'fulfilled' && this.kitId) {
        WorkStore.getCountAction(this.kitId);
      }
    });

    autorun(() => {
      if (this.work?.state === 'fulfilled' && this.kitId) {
        WorkStore.getWorksAction(this.kitId);
      }
    });
  }
  addWorkAction = (work: WorkRequest, kitId: string) =>
    runInAction(() => {
      this.kitId = kitId;
      this.work = fromPromise(addWork(work, kitId));
    });

  createWorkAction = (work: WorkRequest, kitId: string) =>
    runInAction(() => {
      this.kitId = kitId;
      this.create = fromPromise(addWork(work, kitId));
    });
}

export default new Store();
