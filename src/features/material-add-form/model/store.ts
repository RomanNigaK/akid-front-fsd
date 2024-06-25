import { autorun, makeAutoObservable, runInAction } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { addMaterial } from '../api';
import { MaterialRequest } from './types';
import { Material, MaterialStore } from 'entities/material';

class Store {
  material?: IPromiseBasedObservable<Material>;
  create?: IPromiseBasedObservable<Material>;
  kitId?: string;
  constructor() {
    makeAutoObservable(this);
    autorun(() => {
      if (this.create?.state === 'fulfilled' && this.kitId) {
        MaterialStore.getCountAction(this.kitId);
      }
    });

    autorun(() => {
      if (this.material?.state === 'fulfilled' && this.kitId) {
        MaterialStore.getMaterialsAction(this.kitId);
      }
    });
  }
  addMaterialAction = (material: MaterialRequest, kitId: string) =>
    runInAction(() => {
      this.kitId = kitId;
      this.material = fromPromise(addMaterial(material, kitId));
    });
  createMaterialAction = (material: MaterialRequest, kitId: string) =>
    runInAction(() => {
      this.kitId = kitId;
      this.create = fromPromise(addMaterial(material, kitId));
    });
}

export default new Store();
