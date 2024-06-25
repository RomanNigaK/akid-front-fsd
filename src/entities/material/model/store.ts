import { makeAutoObservable, runInAction } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { getConuntMaterialByKitId, getMaterialByKitId } from '../api';
import { Material } from './types';

class Store {
  count?: IPromiseBasedObservable<{ count: number }>;
  materials?: IPromiseBasedObservable<Material[]>;
  materialUpdateDelete?: Material;
  constructor() {
    makeAutoObservable(this);
  }

  resetMaterialStore = () => {
    runInAction(() => {
      this.count = undefined;
      this.materials = undefined;
    });
  };

  setMaterialEdit = (m: Material | undefined) =>
    runInAction(() => {
      this.materialUpdateDelete = m;
    });

  getCountAction = (kitId: string) =>
    runInAction(() => {
      this.count = fromPromise(getConuntMaterialByKitId(kitId));
    });

  getMaterialsAction = (id: string) =>
    runInAction(() => {
      this.materials = fromPromise(getMaterialByKitId(id));
    });
}

export default new Store();
