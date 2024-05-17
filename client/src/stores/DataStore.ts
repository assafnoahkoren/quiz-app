import { makeAutoObservable } from "mobx";
import axios from "axios";
class DataStore {
  subjects = [];
  subjectsLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async getSubjects() {
    this.subjectsLoading = true;

    const res = await axios.get("/api/subjects");
    this.subjectsLoading = false;
    this.subjects = res.data;

  }
}

export const dataStore = new DataStore();
