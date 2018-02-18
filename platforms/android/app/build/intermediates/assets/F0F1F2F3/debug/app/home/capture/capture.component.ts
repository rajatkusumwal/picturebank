import { Component, OnInit } from "@angular/core";
import * as Clarifai from "clarifai";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import * as Cam from "nativescript-camera";
import * as fs from "tns-core-modules/file-system";
import { ImageAsset } from "tns-core-modules/image-asset/image-asset";
import * as imageSource from "tns-core-modules/image-source";

@Component({
    selector: "capture",
    moduleId: module.id,
    templateUrl: "./capture.component.html"
})
export class CaptureComponent implements OnInit {

    private saveToGallery: boolean = true;
    private keepAspectRatio: boolean = true;
    private width: number = 300;
    private height: number = 300;
    private imageTaken;
    private app;

    constructor(
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        this.app = new Clarifai.App({
            apiKey: "ac1556bf9cab4e9c884c4a4a27e3ad57"
           });
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
                /*const img = imageSource.fromFile(path);
                const base64String = img.toBase64String("png");
                this.app.models.predict(Clarifai.GENERAL_MODEL, {base64: base64String}).then(
                    (response) => {
                        console.log(response);
                      // do something with response
                    }).
                    catch((err) {
                        console.log(err);
                      // there was an error
                    }); */
            }
        });
    }

}
