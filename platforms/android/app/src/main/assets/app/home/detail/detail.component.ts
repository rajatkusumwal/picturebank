import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { Label } from "ui/label";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { LoadEventData, WebView } from "ui/web-view";
import { DataService } from "../homedata.service";

/* ***********************************************************
* This is the item details component in the master-detail structure.
* This component retrieves the passed parameter from the master list component,
* finds the data item by this parameter and displays the detailed data item information.
*************************************************************/
@Component({
    selector: "Detail",
    moduleId: module.id,
    templateUrl: "./detail.component.html"
})
export class DetailComponent implements OnInit, AfterViewInit  {

    webViewSrc: string = "https://docs.nativescript.org/";

    @ViewChild("myWebView") webViewRef: ElementRef;
    @ViewChild("urlField") urlFieldRef: ElementRef;
    @ViewChild("labelResult") labelResultRef: ElementRef;

    private item;
    constructor(
        private dataService: DataService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        /* ***********************************************************
        * Learn more about how to get navigation parameters in this documentation article:
        * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
        *************************************************************/
        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
                const itemId = params.id;

                this.item = this.dataService.getItemById(itemId);
                this.webViewSrc = this.item.itemurl;
            });
    }

    ngAfterViewInit() {
        const webview: WebView = this.webViewRef.nativeElement;
        const label: Label = this.labelResultRef.nativeElement;
        label.text = "WebView is still loading...";

        // tslint:disable-next-line:only-arrow-functions
        webview.on(WebView.loadFinishedEvent, function(args: LoadEventData) {
            let message;
            // tslint:disable-next-line:prefer-conditional-expression
            if (!args.error) {
                message = "WebView finished loading of " + args.url;
            } else {
                message = "Error loading " + args.url + ": " + args.error;
            }

            label.text = message;
            console.log("WebView message - " + message);
        });
    }

    goBack() {
        const webview: WebView = this.webViewRef.nativeElement;
        if (webview.canGoBack) {
            webview.goBack();
        }
    }

    submit(args: string) {
        const textField: TextField = this.urlFieldRef.nativeElement;

        if (args.substring(0, 4) === "http") {
            this.webViewSrc = args;
            textField.dismissSoftInput();
        } else {
            alert("Please, add `http://` or `https://` in front of the URL string");
        }
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }
}
