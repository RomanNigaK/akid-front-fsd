import { makeAutoObservable, runInAction } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { createControlConstruction, updateControlConstruction } from '../api';
import { ControlConstruction } from './types';

class Store {
  controlConstruction?: IPromiseBasedObservable<ControlConstruction>;

  constructor() {
    makeAutoObservable(this);
  }

  createControlConstructionAction = (
    personId: string,
    controlConstruction: ControlConstruction
  ) =>
    runInAction(() => {
      this.controlConstruction = fromPromise(
        createControlConstruction(personId, controlConstruction)
      );
    });

  updateControlConstructionAction = (
    controlConstruction: ControlConstruction
  ) =>
    runInAction(() => {
      this.controlConstruction = fromPromise(
        updateControlConstruction(controlConstruction)
      );
    });
}

export default new Store();
