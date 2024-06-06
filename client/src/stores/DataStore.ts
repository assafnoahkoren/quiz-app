import {autorun, observable} from "mobx";
import axios from "axios";
import { SubjectType } from "../types/subjectType";
import { makePersistable } from "mobx-persist-store";
class DataStore {
  @observable subjects = [];
  @observable subjectsLoading = false;
  @observable selectedSubjectId = "";
  @observable subjectsMap: { [subjectId: string]: { isLoading?: boolean; subject?: any } } = {};
  @observable subjectById: Record<string, SubjectType> = {};
  @observable filterQuestionsByVisibility?: boolean;

  constructor() {
    makePersistable(this, {
      name: "DataStore",
      properties: [
        "subjectsMap",
        "subjectById",
        "filterQuestionsByVisibility"
      ],
      storage: window.localStorage,
    });

    autorun(() => {
      const subjectId = this.selectedSubjectId
      console.log(subjectId, 'subjectId')
      if (subjectId) {
        this.getSubjectById(subjectId)
      }
    })
  }

  @observable get flatSubjects() {
    return flattenSubjects(this.subjects);
  }

  async getSubjects() {
    this.subjectsLoading = true;

    const res =
        await axios.get(`/api/subjects`);
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
  }

  setSelectedSubject(subjectId: string) {
    this.selectedSubjectId = subjectId;

  }

  async getSubjectById(subjectId: string) {
    this.subjectsMap[subjectId] = {}
    this.subjectsMap[subjectId].isLoading = true;
    const filter = dataStore.filterQuestionsByVisibility ? `filterQuestionsByVisibility=${dataStore.filterQuestionsByVisibility}` : '';
    const res = await axios.get(`/api/subjects/${subjectId}?${filter}`);
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