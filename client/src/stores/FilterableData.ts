import {makeAutoObservable} from "mobx";

export class FilterableData<T extends typeof Proxy> {
    filtered: any[] = [];
    filter: any = {};
    proxy: T;

    constructor(proxy: T) {
        makeAutoObservable(this);
        this.proxy = proxy;
    }
}