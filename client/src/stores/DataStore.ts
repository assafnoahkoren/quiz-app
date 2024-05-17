import { makeAutoObservable } from "mobx";
import { authStore } from "./AuthStore";
class DataStore {
  subjects = [];
  subjectsLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async getSubjects() {
    this.subjectsLoading = true;
    const res = await fetch("http://localhost:3000/api/subjects", {
      headers: {
        authorization: authStore.jwt || "",
      },
    });
    this.subjectsLoading = false;
    const data = await res.json();
    this.subjects = data;

  }
}

export const dataStore = new DataStore();
