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
    selector: "capture",
    moduleId: module.id,
    templateUrl: "./capture.component.html",
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
export class CaptureComponent implements OnInit {
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
        console.log("hello post new2");

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Key ac1556bf9cab4e9c884c4a4a27e3ad57"
            }
        };
        this.http.post("https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs",
         JSON.stringify(data), config).map((res) => res)
            .subscribe(
            (res) => {
                this.keywords = (<any>res).outputs[0].data.concepts.map((unit) => new Keyword(unit.name));
                this.collectDataFromEbay();
            },
            (err) => {
                console.log("Error occured");
            }
            );
        /*
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
                this._isLoading = false;
                this.message = (<any>res).outputs[0].data.concepts.map((unit) => unit.name);
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < this.message.length; i++) {
                    this.keywords.push(new Keyword(this.message[i]));
                }
            },
            (err) => {
                console.log("Error occured");
            }
            );*/
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    collectDataFromEbay(): void {
        // tslint:disable-next-line:max-line-length
        const temp = this.keywords.map((searchWord) => this.http.get("http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=santoshk-digihack-PRD-510683bd3-6540cd30&RESPONSE-DATA-FORMAT=JSON&GLOBAL-ID=EBAY-IN&keywords=" + searchWord.value + "&sortOrder=CurrentPriceHighest&paginationInput.entriesPerPage=1&paginationInput.pageNumber=1"));
        forkJoin(temp).subscribe((results) => {
            this._isLoading = false;
            this.items = (<any>results).map((unitRes, index) => new Items({
                id: index,
                imageUrl: unitRes.findItemsByKeywordsResponse[0].searchResult[0].item[0].galleryURL[0],
                name: unitRes.findItemsByKeywordsResponse[0].searchResult[0].item[0].title[0],
                // tslint:disable-next-line:max-line-length
                price: unitRes.findItemsByKeywordsResponse[0].searchResult[0].item[0].sellingStatus[0].currentPrice[0].__value__,
                keyword: this.keywords[index].value,
                itemurl: unitRes.findItemsByKeywordsResponse[0].searchResult[0].item[0].viewItemURL[0]
            }));
            this.dataservice.setItems(this.items);
          });

        return;
    }

    onItemTap(args: ListViewEventData): void {
        const tappedItem = args.view.bindingContext;
        console.log(tappedItem.id);
        this._routerExtensions.navigate(["/home/detail", tappedItem.id],
        {
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });

        return ;
    }

}
