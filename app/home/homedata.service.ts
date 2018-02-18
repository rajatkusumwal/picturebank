import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Items } from "./shared/item.model";

@Injectable()
export class DataService {
    typeMessage;
    dataitems: Array<Items>;
    private typeSource;

    constructor() {
        this.dataitems=[];
        this.typeSource = new BehaviorSubject<string>("default message");
        this.typeMessage = this.typeSource.asObservable();
    }

    setTypeMessage(message: string) {
        this.typeSource.next(message);
    }

    setItems(temp: Array<Items>){
        this.dataitems = temp;
    }

    getItems(): Array<Items> {
        return this.dataitems;
    }

    getItemById(id): Items {
        return this.dataitems[id];
    }
}
