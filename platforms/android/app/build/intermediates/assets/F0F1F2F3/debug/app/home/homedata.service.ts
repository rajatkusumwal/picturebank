import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class DataService {
    typeMessage;
    private typeSource;

    constructor() {
        this.typeSource = new BehaviorSubject<string>("default message");
        this.typeMessage = this.typeSource.asObservable();
    }

    setTypeMessage(message: string) {
        this.typeSource.next(message);
    }

}
