import {autorun, makeAutoObservable} from "mobx";
import {FilterableData} from "../FilterableData.ts";

class SubjectsDomainStore {
    shallowAllSubjects = new FilterableData(['subject1', 'subject2', 'subject3']);

    // currentRootSubject
    constructor() {
        makeAutoObservable(this);

        autorun(() =>  {
            console.log(this.shallowAllSubjects.items);
            console.log('filtered', JSON.stringify(this.shallowAllSubjects.filtered));
            console.log(this.shallowAllSubjects.filter);

        });
    }
}

export const subjectsDomainStore = new SubjectsDomainStore();

// @ts-ignore
window.subjectsDomainStore = subjectsDomainStore;