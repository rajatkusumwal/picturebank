import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CaptureComponent } from "./capture/capture.component";
import { DetailComponent } from "./detail/detail.component";
import { HomeComponent } from "./home.component";
import { PayComponent } from "./pay/pay.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "capture", component: CaptureComponent },
    { path: "detail/:id", component: DetailComponent },
    { path: "pay", component: PayComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }
