import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { DataService } from "./homedata.service";
// import { ImageAsset } from "tns-core-modules/image-asset/image-asset";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor(
        private _routerExtensions: RouterExtensions,
        private data: DataService
    ) { }

    ngOnInit(): void {
        // Cam.requestPermissions();

        return;
    }

    onButtonTap(args: string): void {
        this.data.setTypeMessage(args);
        this._routerExtensions.navigate(["/home/capture"],
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
