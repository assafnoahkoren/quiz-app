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
    console.log(res.data.error);
    if (!res.data.error) {
      this.subjects = res.data;
    }
  }

  async getSubjectById(subjectId: string) {
    this.subjectsLoading = true;

    const res = await axios.get(`/api/subjects/${subjectId}`);
    this.subjectsLoading = false;
    console.log("dataaaaaa: ",res.data);
    if (res.data) {
      return res.data;
    }
  }
}

export const dataStore = new DataStore();
