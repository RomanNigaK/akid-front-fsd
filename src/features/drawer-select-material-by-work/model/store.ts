import { makeAutoObservable, runInAction } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { Key } from 'react';
import { bundleMaterialsWork, getMaterialsByWork } from '../api';

class Store {
  materialsWork?: IPromiseBasedObservable<string[]>;
  updateBundle?: IPromiseBasedObservable<unknown>;
  constructor() {
    makeAutoObservable(this);
  }
  getMaterialsWorkAction = (id: string) =>
    runInAction(() => {
      this.materialsWork = fromPromise(getMaterialsByWork(id));
    });

  bundleMaterialsWorkAction = (id: string, ids: Key[]) =>
    runInAction(() => {
      this.updateBundle = fromPromise(bundleMaterialsWork(id, ids));
    });
}
export default new Store();
