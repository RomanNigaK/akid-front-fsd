import { makeAutoObservable, runInAction } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { updateMaterial } from '../api';
import { MaterialRequest } from './types';

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
  updateMaterialAction = (material: MaterialRequest, materialId: string) =>
    runInAction(() => {
      this.update = fromPromise(updateMaterial(material, materialId));
    });
}

export default new Store();
