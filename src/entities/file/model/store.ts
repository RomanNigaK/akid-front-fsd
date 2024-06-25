import { makeAutoObservable, runInAction } from 'mobx';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';
import { getDocuments, getFiles } from '../api';
import { FileType } from './types';

class Store {
  files?: IPromiseBasedObservable<FileType[]>;
  documents?: IPromiseBasedObservable<FileType[]>;

  isViewDrawerUpload: boolean = false;
  isViewDrawerFileList: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  resetFileStore = () => {
    runInAction(() => {
      this.documents = undefined;
      this.files = undefined;
    });
  };

  setIsViewDrawerUpload = (bool: boolean) => (this.isViewDrawerUpload = bool);
  setIsViewDrawerFileList = (bool: boolean) =>
    (this.isViewDrawerFileList = bool);

  getFilesByMaterialIdAction = (id: string) =>
    (this.files = fromPromise(getFiles(id)));

  getDocumentByKitAction = (id: string) =>
    (this.documents = fromPromise(getDocuments(id)));
}

export default new Store();
