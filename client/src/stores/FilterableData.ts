import {autorun, makeAutoObservable} from "mobx";
import Fuse from 'fuse.js'

export class FilterableData<T extends any[]> {
    filtered: any[] = [];
    filter?: string;
    items: T;

    constructor(items: T) {
        makeAutoObservable(this);
        this.items = items;

        autorun(() => {
            if (this.filter) {
                const fuse = new Fuse(this.items);
                this.filtered = fuse.search(this.filter).map((result) => result.item);
            } else {
                this.filtered = this.items;
            }
        })
    }


}