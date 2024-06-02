import { makeAutoObservable } from "mobx";
import axios from "axios";
import { SubjectType } from "../types/subjectType";
import { makePersistable } from "mobx-persist-store";
class DataStore {
  subjects = [];
  subjectsLoading = false;
  selectedSubjectId = "";
  subjectsMap: { [subjectId: string]: { isLoading?: boolean; subject?: any } } = {};
  subjectById: Record<string, SubjectType> = {};
  

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "DataStore",
      properties: [
        "subjects",
        "selectedSubjectId",
        "subjectsMap",
        "subjectById",
      ],
      storage: window.localStorage,
    });
  }

  get flatSubjects() {
    return flattenSubjects(this.subjects);
  }

  async getSubjects() {
    this.subjectsLoading = true;

    const res = await axios.get("/api/subjects");
    this.subjectsLoading = false;
    if (!res.data.error) {
      this.subjects = res.data;
    }
  }

  async getSubjectsByFilter(filter: string) {
    this.subjectsLoading = true;
    console.log(filter);
    const res = await axios.get(`/api/subjects`, {
      params: {
        name: filter
      }
    });
    this.subjectsLoading = false;
    if (!res.data.error) {
      this.subjects = res.data;
    }
    console.log(this.subjects);

  }

  setSelectedSubject(subjectId: string) {
    this.selectedSubjectId = subjectId;
    localStorage.setItem('selectedSubjectId', subjectId);
  }

  async getSubjectById(subjectId: string) {
    if (this.subjectsMap[subjectId]?.subject) return;
    this.subjectsMap[subjectId] = {}
    this.subjectsMap[subjectId].isLoading = true;
    const res = await axios.get(`/api/subjects/${subjectId}`);
    if (res.data) {
      this.subjectsMap[subjectId].subject = res.data;
    }
    this.subjectsMap[subjectId].isLoading = false;
    this.subjectById = flattenSubjects(res.data)

  }
}

export const dataStore = new DataStore();


const flattenSubjects = (subject: any): Record<string, SubjectType> => {
  const subjectsMap: Record<string, SubjectType> = {};
  subjectsMap[subject.id] = subject;

  const traverse = (subjects: any[]) => {
    if (!subjects) return;
      for (const sub of subjects) {
        subjectsMap[sub.id] = sub;
          if (sub.Subjects.length > 0) {
              traverse(sub.Subjects);
          }
      }
  };

  traverse(subject.Subjects);

  return subjectsMap;
};