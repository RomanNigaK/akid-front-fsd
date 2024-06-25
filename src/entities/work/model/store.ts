import { makeAutoObservable, runInAction } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { getCountWorkByKitId, getWorkBySetId } from '../api';
import { Work } from '.';

class Store {
  works?: IPromiseBasedObservable<Work[]>;
  count?: IPromiseBasedObservable<{ count: number }>;
  workUpdateDelete?: Work;

  constructor() {
    makeAutoObservable(this);
  }

  resetWorkStore = () => {
    runInAction(() => {
      this.count = undefined;
      this.works = undefined;
    });
  };
  setWorkEdit = (w: Work | undefined) =>
    runInAction(() => {
      this.workUpdateDelete = w;
    });
  getCountAction = (kitId: string) =>
    (this.count = fromPromise(getCountWorkByKitId(kitId)));

  getWorksAction = (id: string) =>
    (this.works = fromPromise(getWorkBySetId(id)));
}

export default new Store();
