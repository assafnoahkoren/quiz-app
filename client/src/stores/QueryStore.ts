import {makeAutoObservable} from "mobx";

export class QueryStore<T> {
    data: T;
    loading: boolean;
    error: string;
    promise: Promise<any>

    constructor(promise) {
        makeAutoObservable(this)
        this.promise = promise
    }
}