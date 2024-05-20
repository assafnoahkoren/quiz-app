import { makeAutoObservable } from "mobx";
import axios from "axios";
class DataStore {
  subjects = [];
  subjectsLoading = false;
  selectedSubjectId = "";
  subjectsMap: Map<string, { isLoading: boolean; subject: any }> = new Map();

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
    localStorage.setItem('selectedSubjectId', subjectId);
  }

  async getSubjectById(subjectId: string) {
    let subjectData = this.subjectsMap.get(subjectId);

    if (!subjectData) {
      subjectData = { isLoading: false, subject: null };
      this.subjectsMap.set(subjectId, subjectData);
    }

    if (!subjectData.subject) {
      subjectData.isLoading = true;

      const res = await axios.get(`/api/subjects/${subjectId}`);
      const data: any = res.data;

      if (data) {
        subjectData.subject = data;
      }

      subjectData.isLoading = false;
    }
  }
}

export const dataStore = new DataStore();
