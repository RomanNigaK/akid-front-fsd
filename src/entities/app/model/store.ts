import { makeAutoObservable, runInAction } from 'mobx';
import { MainMenuItemsType } from '.';

class Store {
  mainMenuItem: (keyof typeof MainMenuItemsType)[] = ['index'];
  constructor() {
    makeAutoObservable(this);
  }
  setMainMenuItem = (item: (keyof typeof MainMenuItemsType)[]) =>
    runInAction(() => {
      this.mainMenuItem = item;
    });
}
export default new Store();
