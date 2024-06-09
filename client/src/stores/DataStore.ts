import {action, autorun, makeObservable, observable} from "mobx";
import axios from "axios";
import { SubjectType } from "../types/subjectType";
import { makePersistable } from "mobx-persist-store";
import { ApiService } from "../services/api-service";
import { SubjectStats } from "@shared/types/SubjectStats";
class DataStore {
  subjects = [];
  subjectsLoading = false;
  selectedSubjectId = "";
  subjectsMap: { [subjectId: string]: { isLoading?: boolean; subject?: any } } = {};
  subjectById: Record<string, SubjectType> = {};
  filterQuestionsByVisibility?: boolean = true;
  statsBySubjectId: Record<string, SubjectStats> = {};


  constructor() {
    makeObservable(this, {
      subjects: observable,
      subjectsLoading: observable,
      selectedSubjectId: observable,
      subjectsMap: observable,
      subjectById: observable,
      filterQuestionsByVisibility: observable,
      statsBySubjectId: observable,
      getSubjects: action,
      getSubjectsByFilter: action,
      setSelectedSubject: action,
      getSubjectById: action,
      
    })
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
      this.filterQuestionsByVisibility
      console.log(subjectId, 'subjectId')
      if (subjectId) {
        this.getSubjectById(subjectId)
      }
    })
  }

  async getMyStats() {
    this.statsBySubjectId = await ApiService.questions.getMySubjectStats();
  }
  get flatSubjects() {
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