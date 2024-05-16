import { makeAutoObservable } from "mobx";

class DataStore {
  jwt?: string;
  isLogged = false;

  constructor() {
    makeAutoObservable(this);
  }
}

export const dataStore = new DataStore();
