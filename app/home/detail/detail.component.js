"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var web_view_1 = require("ui/web-view");
var homedata_service_1 = require("../homedata.service");
/* ***********************************************************
* This is the item details component in the master-detail structure.
* This component retrieves the passed parameter from the master list component,
* finds the data item by this parameter and displays the detailed data item information.
*************************************************************/
var DetailComponent = /** @class */ (function () {
    function DetailComponent(dataService, _pageRoute, _routerExtensions) {
        this.dataService = dataService;
        this._pageRoute = _pageRoute;
        this._routerExtensions = _routerExtensions;
        this.webViewSrc = "https://docs.nativescript.org/";
    }
    DetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        /* ***********************************************************
        * Learn more about how to get navigation parameters in this documentation article:
        * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
        *************************************************************/
        this._pageRoute.activatedRoute
            .switchMap(function (activatedRoute) { return activatedRoute.params; })
            .forEach(function (params) {
            var itemId = params.id;
            _this.item = _this.dataService.getItemById(itemId);
            _this.webViewSrc = _this.item.itemurl;
        });
    };
    DetailComponent.prototype.ngAfterViewInit = function () {
        var webview = this.webViewRef.nativeElement;
        var label = this.labelResultRef.nativeElement;
        label.text = "WebView is still loading...";
        // tslint:disable-next-line:only-arrow-functions
        webview.on(web_view_1.WebView.loadFinishedEvent, function (args) {
            var message;
            // tslint:disable-next-line:prefer-conditional-expression
            if (!args.error) {
                message = "WebView finished loading of " + args.url;
            }
            else {
                message = "Error loading " + args.url + ": " + args.error;
            }
            label.text = message;
            console.log("WebView message - " + message);
        });
    };
    DetailComponent.prototype.goBack = function () {
        var webview = this.webViewRef.nativeElement;
        if (webview.canGoBack) {
            webview.goBack();
        }
    };
    DetailComponent.prototype.submit = function (args) {
        var textField = this.urlFieldRef.nativeElement;
        if (args.substring(0, 4) === "http") {
            this.webViewSrc = args;
            textField.dismissSoftInput();
        }
        else {
            alert("Please, add `http://` or `https://` in front of the URL string");
        }
    };
    DetailComponent.prototype.onBackButtonTap = function () {
        this._routerExtensions.backToPreviousPage();
    };
    __decorate([
        core_1.ViewChild("myWebView"),
        __metadata("design:type", core_1.ElementRef)
    ], DetailComponent.prototype, "webViewRef", void 0);
    __decorate([
        core_1.ViewChild("urlField"),
        __metadata("design:type", core_1.ElementRef)
    ], DetailComponent.prototype, "urlFieldRef", void 0);
    __decorate([
        core_1.ViewChild("labelResult"),
        __metadata("design:type", core_1.ElementRef)
    ], DetailComponent.prototype, "labelResultRef", void 0);
    DetailComponent = __decorate([
        core_1.Component({
            selector: "Detail",
            moduleId: module.id,
            templateUrl: "./detail.component.html"
        }),
        __metadata("design:paramtypes", [homedata_service_1.DataService,
            router_1.PageRoute,
            router_1.RouterExtensions])
    ], DetailComponent);
    return DetailComponent;
}());
exports.DetailComponent = DetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0Y7QUFDeEYsc0RBQTBFO0FBSTFFLHdDQUFxRDtBQUNyRCx3REFBa0Q7QUFFbEQ7Ozs7OERBSThEO0FBTTlEO0lBU0kseUJBQ1ksV0FBd0IsRUFDeEIsVUFBcUIsRUFDckIsaUJBQW1DO1FBRm5DLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGVBQVUsR0FBVixVQUFVLENBQVc7UUFDckIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQVYvQyxlQUFVLEdBQVcsZ0NBQWdDLENBQUM7SUFXbEQsQ0FBQztJQUVMLGtDQUFRLEdBQVI7UUFBQSxpQkFhQztRQVpHOzs7c0VBRzhEO1FBQzlELElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYzthQUN6QixTQUFTLENBQUMsVUFBQyxjQUFjLElBQUssT0FBQSxjQUFjLENBQUMsTUFBTSxFQUFyQixDQUFxQixDQUFDO2FBQ3BELE9BQU8sQ0FBQyxVQUFDLE1BQU07WUFDWixJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBRXpCLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakQsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCx5Q0FBZSxHQUFmO1FBQ0ksSUFBTSxPQUFPLEdBQVksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDdkQsSUFBTSxLQUFLLEdBQVUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFDdkQsS0FBSyxDQUFDLElBQUksR0FBRyw2QkFBNkIsQ0FBQztRQUUzQyxnREFBZ0Q7UUFDaEQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxrQkFBTyxDQUFDLGlCQUFpQixFQUFFLFVBQVMsSUFBbUI7WUFDOUQsSUFBSSxPQUFPLENBQUM7WUFDWix5REFBeUQ7WUFDekQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDZCxPQUFPLEdBQUcsOEJBQThCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUN4RCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osT0FBTyxHQUFHLGdCQUFnQixHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDOUQsQ0FBQztZQUVELEtBQUssQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsT0FBTyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsZ0NBQU0sR0FBTjtRQUNJLElBQU0sT0FBTyxHQUFZLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQ3ZELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztJQUVELGdDQUFNLEdBQU4sVUFBTyxJQUFZO1FBQ2YsSUFBTSxTQUFTLEdBQWMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7UUFFNUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixLQUFLLENBQUMsZ0VBQWdFLENBQUMsQ0FBQztRQUM1RSxDQUFDO0lBQ0wsQ0FBQztJQUVELHlDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBbEV1QjtRQUF2QixnQkFBUyxDQUFDLFdBQVcsQ0FBQztrQ0FBYSxpQkFBVTt1REFBQztJQUN4QjtRQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQztrQ0FBYyxpQkFBVTt3REFBQztJQUNyQjtRQUF6QixnQkFBUyxDQUFDLGFBQWEsQ0FBQztrQ0FBaUIsaUJBQVU7MkRBQUM7SUFONUMsZUFBZTtRQUwzQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx5QkFBeUI7U0FDekMsQ0FBQzt5Q0FXMkIsOEJBQVc7WUFDWixrQkFBUztZQUNGLHlCQUFnQjtPQVp0QyxlQUFlLENBdUUzQjtJQUFELHNCQUFDO0NBQUEsQUF2RUQsSUF1RUM7QUF2RVksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZVJvdXRlLCBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBMYWJlbCB9IGZyb20gXCJ1aS9sYWJlbFwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuaW1wb3J0IHsgTG9hZEV2ZW50RGF0YSwgV2ViVmlldyB9IGZyb20gXCJ1aS93ZWItdmlld1wiO1xyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gXCIuLi9ob21lZGF0YS5zZXJ2aWNlXCI7XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIFRoaXMgaXMgdGhlIGl0ZW0gZGV0YWlscyBjb21wb25lbnQgaW4gdGhlIG1hc3Rlci1kZXRhaWwgc3RydWN0dXJlLlxyXG4qIFRoaXMgY29tcG9uZW50IHJldHJpZXZlcyB0aGUgcGFzc2VkIHBhcmFtZXRlciBmcm9tIHRoZSBtYXN0ZXIgbGlzdCBjb21wb25lbnQsXHJcbiogZmluZHMgdGhlIGRhdGEgaXRlbSBieSB0aGlzIHBhcmFtZXRlciBhbmQgZGlzcGxheXMgdGhlIGRldGFpbGVkIGRhdGEgaXRlbSBpbmZvcm1hdGlvbi5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJEZXRhaWxcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2RldGFpbC5jb21wb25lbnQuaHRtbFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQgIHtcclxuXHJcbiAgICB3ZWJWaWV3U3JjOiBzdHJpbmcgPSBcImh0dHBzOi8vZG9jcy5uYXRpdmVzY3JpcHQub3JnL1wiO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoXCJteVdlYlZpZXdcIikgd2ViVmlld1JlZjogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJ1cmxGaWVsZFwiKSB1cmxGaWVsZFJlZjogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoXCJsYWJlbFJlc3VsdFwiKSBsYWJlbFJlc3VsdFJlZjogRWxlbWVudFJlZjtcclxuXHJcbiAgICBwcml2YXRlIGl0ZW07XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9wYWdlUm91dGU6IFBhZ2VSb3V0ZSxcclxuICAgICAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zXHJcbiAgICApIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgKiBMZWFybiBtb3JlIGFib3V0IGhvdyB0byBnZXQgbmF2aWdhdGlvbiBwYXJhbWV0ZXJzIGluIHRoaXMgZG9jdW1lbnRhdGlvbiBhcnRpY2xlOlxyXG4gICAgICAgICogaHR0cDovL2RvY3MubmF0aXZlc2NyaXB0Lm9yZy9hbmd1bGFyL2NvcmUtY29uY2VwdHMvYW5ndWxhci1uYXZpZ2F0aW9uLmh0bWwjcGFzc2luZy1wYXJhbWV0ZXJcclxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgICAgIHRoaXMuX3BhZ2VSb3V0ZS5hY3RpdmF0ZWRSb3V0ZVxyXG4gICAgICAgICAgICAuc3dpdGNoTWFwKChhY3RpdmF0ZWRSb3V0ZSkgPT4gYWN0aXZhdGVkUm91dGUucGFyYW1zKVxyXG4gICAgICAgICAgICAuZm9yRWFjaCgocGFyYW1zKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtSWQgPSBwYXJhbXMuaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtID0gdGhpcy5kYXRhU2VydmljZS5nZXRJdGVtQnlJZChpdGVtSWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWJWaWV3U3JjID0gdGhpcy5pdGVtLml0ZW11cmw7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICBjb25zdCB3ZWJ2aWV3OiBXZWJWaWV3ID0gdGhpcy53ZWJWaWV3UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgbGFiZWw6IExhYmVsID0gdGhpcy5sYWJlbFJlc3VsdFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIGxhYmVsLnRleHQgPSBcIldlYlZpZXcgaXMgc3RpbGwgbG9hZGluZy4uLlwiO1xyXG5cclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6b25seS1hcnJvdy1mdW5jdGlvbnNcclxuICAgICAgICB3ZWJ2aWV3Lm9uKFdlYlZpZXcubG9hZEZpbmlzaGVkRXZlbnQsIGZ1bmN0aW9uKGFyZ3M6IExvYWRFdmVudERhdGEpIHtcclxuICAgICAgICAgICAgbGV0IG1lc3NhZ2U7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItY29uZGl0aW9uYWwtZXhwcmVzc2lvblxyXG4gICAgICAgICAgICBpZiAoIWFyZ3MuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIldlYlZpZXcgZmluaXNoZWQgbG9hZGluZyBvZiBcIiArIGFyZ3MudXJsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiRXJyb3IgbG9hZGluZyBcIiArIGFyZ3MudXJsICsgXCI6IFwiICsgYXJncy5lcnJvcjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGFiZWwudGV4dCA9IG1lc3NhZ2U7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2ViVmlldyBtZXNzYWdlIC0gXCIgKyBtZXNzYWdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnb0JhY2soKSB7XHJcbiAgICAgICAgY29uc3Qgd2VidmlldzogV2ViVmlldyA9IHRoaXMud2ViVmlld1JlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIGlmICh3ZWJ2aWV3LmNhbkdvQmFjaykge1xyXG4gICAgICAgICAgICB3ZWJ2aWV3LmdvQmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdWJtaXQoYXJnczogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgdGV4dEZpZWxkOiBUZXh0RmllbGQgPSB0aGlzLnVybEZpZWxkUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGlmIChhcmdzLnN1YnN0cmluZygwLCA0KSA9PT0gXCJodHRwXCIpIHtcclxuICAgICAgICAgICAgdGhpcy53ZWJWaWV3U3JjID0gYXJncztcclxuICAgICAgICAgICAgdGV4dEZpZWxkLmRpc21pc3NTb2Z0SW5wdXQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcIlBsZWFzZSwgYWRkIGBodHRwOi8vYCBvciBgaHR0cHM6Ly9gIGluIGZyb250IG9mIHRoZSBVUkwgc3RyaW5nXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkJhY2tCdXR0b25UYXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICAgIH1cclxufVxyXG4iXX0=