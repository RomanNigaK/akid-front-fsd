import { autorun, makeAutoObservable, runInAction } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { createSet } from '../api';
import { Set } from 'entities/set';
import { SetStore } from 'entities/set/model';

class Store {
  set?: IPromiseBasedObservable<Set>;
  isViewForm: boolean = false;

  constructor() {
    makeAutoObservable(this);
    autorun(() => {
      if (this.set?.state === 'fulfilled')
        runInAction(() => {
          this.isViewForm = false;
          SetStore.getSetsAction();
        });
    });
  }
  setIsViewForm = (bool: boolean) => (this.isViewForm = bool);

  setUndefined = () => (this.set = undefined);

  createSetAction = (set: Set) => (this.set = fromPromise(createSet(set)));
}

export default new Store();
