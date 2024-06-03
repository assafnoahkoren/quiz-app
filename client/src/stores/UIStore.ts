import { makeAutoObservable } from "mobx";

// This store will manage the authentication state of the user
class UIStore {
  menuOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

}

export const uiStore = new UIStore();

