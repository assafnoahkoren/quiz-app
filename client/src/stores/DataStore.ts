import { makeAutoObservable } from "mobx";
import axios from "axios";
class DataStore {
  subjects = [];
  subjectsLoading = false;
  selectedSubjectId = "";
  subjectsMap: { [subjectId: string]: { isLoading: boolean; subject: any } } =
{};

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
    if (!this.subjectsMap[subjectId]) {
      this.subjectsMap[subjectId] = { isLoading: false, subject: null };
    }
  }

  async getSubjectById(subjectId: string) {
    if (!this.subjectsMap[subjectId].subject) {
      this.subjectsMap[subjectId].isLoading = true;
      const res = await axios.get(`/api/subjects/${subjectId}`);
      if (res.data) {
        this.subjectsMap[subjectId].subject = res.data;
      }
      this.subjectsMap[subjectId].isLoading = false;
    }
  }
}

export const dataStore = new DataStore();
