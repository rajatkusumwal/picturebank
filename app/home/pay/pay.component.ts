import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, Injectable, OnInit, Type } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import * as Cam from "nativescript-camera";
import { ListViewEventData } from "nativescript-pro-ui/listview";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { Observable as RxObservable } from "rxjs/Observable";
import { forkJoin } from "rxjs/observable/forkJoin";
import { Observable } from "tns-core-modules/data/observable";
import * as fs from "tns-core-modules/file-system";
import { ImageAsset } from "tns-core-modules/image-asset/image-asset";
import * as imageSource from "tns-core-modules/image-source";
import { DataService } from "../homedata.service";
import { Items } from "../shared/item.model";
import { Keyword } from "../shared/keyword.model";

@Component({
    selector: "pay",
    moduleId: module.id,
    templateUrl: "./pay.component.html",
    styles: [`
    .list-group .list-group-item {
        padding: 0 0 8 0;
        background-color: #00bfff;
      }
      .list-group .list-group-item .list-group-item-content {
        padding: 8 15 4 15;
      }
      .list-group .list-group-item .fa {
        color: #4CAEE3;
      }
    `]
})

// tslint:disable-next-line:max-classes-per-file
export class PayComponent implements OnInit {
    keywords: Array<Keyword>;
    items: Array<Items>;
    private _isLoading: boolean = false;
    private saveToGallery: boolean = true;
    private keepAspectRatio: boolean = false;
    private width: number = 300;
    private height: number = 300;
    private imageTaken;
    private app;
    private message;
    private person = { name: "", uid: "", actno: "" };
    private textValue;

    constructor(
        private _routerExtensions: RouterExtensions,
        private http: HttpClient,
        private dataservice: DataService
    ) {
        this.keywords = [];
    }

    ngOnInit(): void {
        this._isLoading = true;
        Cam.requestPermissions();
        if (Cam.isAvailable()) {
            this.onTakePhoto();
        }

        return;
    }

    onTakePhoto() {
        const options = {
            width: this.width,
            height: this.height,
            keepAspectRatio: this.keepAspectRatio,
            saveToGallery: this.saveToGallery
        };

        Cam.takePicture(options)
            .then((imageAsset) => {
                this.imageTaken = imageAsset;
                this.imageSourceFromAsset(imageAsset);
                console.log("Size: " + imageAsset.options.width + "x" + imageAsset.options.height);
            }).catch((err) => {
                this._routerExtensions.backToPreviousPage();
                console.log(err.message);
            });
    }

    imageSourceFromAsset(imageAsset) {
        const source = new imageSource.ImageSource();
        source.fromAsset(imageAsset).then((imageSou) => {
            const folder = fs.knownFolders.documents().path;
            const fileName = "test.jpg";
            const path = fs.path.join(folder, fileName);
            const saved = imageSou.saveToFile(path, "jpg");
            if (saved) {
                console.log("Image saved successfully!", path);
                const img = imageSource.fromFile(path);
                const base64String = img.toBase64String("jpg");
                this.postData({
                    inputs: [
                        {
                            data: {
                                image: {
                                    base64: base64String
                                }
                            }
                        }
                    ]
                });
            }
        });
    }

    postData(data: any) {
        console.log("hello post pay");

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Key d2ded056ab1243468049eb9ca21f228b"
            }
        };
        this.http.post("https://api.clarifai.com/v2/models/facedetect/outputs",
            JSON.stringify(data), config).map((res) => res)
            .subscribe(
            (res) => {
                this.message = (<any>res).outputs[0].data.concepts.map((unit) => unit.name);
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < this.message.length; i++) {
                    this.keywords.push(new Keyword(this.message[i]));
                }

                // tslint:disable-next-line:prefer-conditional-expression
                if (this.message[0] === "rajat") {
                    this.person = { name: "Rajat Kusumwal", uid: "rajatkusumwal@dbs", actno: "1234567890" };
                } else {
                    this.person = { name: "Santosh Kumar Kolla", uid: "santoshkolla@dbs", actno: "987654321" };
                }
                this._isLoading = false;
            },
            (err) => {
                console.log("Error occured");
            }
            );
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    get isLoading(): boolean {
        return this._isLoading;
    }
}
