import { makeAutoObservable } from "mobx";
import axios from "axios";
class DataStore {
  subjects = [];
  subjectsLoading = false;
  selectedSubjectId = "";

  constructor() {
    makeAutoObservable(this);
  }

  async getSubjects() {
    this.subjectsLoading = true;

    const res = await axios.get("/api/subjects");
    this.subjectsLoading = false;
    if (!res.data.error) {
      this.subjects = res.data;
    }
  }

  setSelectedSubject(subjectId: string) {
    this.selectedSubjectId = subjectId;
  }

  async getSubjectById(subjectId: string) {
    this.subjectsLoading = true;

    const res = await axios.get(`/api/subjects/${subjectId}`);
    this.subjectsLoading = false;
    if (res.data) {
      return res.data;
    }
  }
}

export const dataStore = new DataStore();
