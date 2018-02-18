import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { CaptureComponent } from "./capture/capture.component";
import { DetailComponent } from "./detail/detail.component";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { DataService } from "./homedata.service";
import { PayComponent } from "./pay/pay.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptHttpClientModule,
        HomeRoutingModule
    ],
    declarations: [
        CaptureComponent,
        HomeComponent,
        DetailComponent,
        PayComponent
    ],
    providers: [
        DataService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
