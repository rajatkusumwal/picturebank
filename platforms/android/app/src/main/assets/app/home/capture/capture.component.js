"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var Cam = require("nativescript-camera");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var forkJoin_1 = require("rxjs/observable/forkJoin");
var fs = require("tns-core-modules/file-system");
var imageSource = require("tns-core-modules/image-source");
var homedata_service_1 = require("../homedata.service");
var item_model_1 = require("../shared/item.model");
var keyword_model_1 = require("../shared/keyword.model");
var CaptureComponent = /** @class */ (function () {
    function CaptureComponent(_routerExtensions, http, dataservice) {
        this._routerExtensions = _routerExtensions;
        this.http = http;
        this.dataservice = dataservice;
        this._isLoading = false;
        this.saveToGallery = true;
        this.keepAspectRatio = false;
        this.width = 300;
        this.height = 300;
        this.keywords = [];
    }
    CaptureComponent.prototype.ngOnInit = function () {
        this._isLoading = true;
        Cam.requestPermissions();
        if (Cam.isAvailable()) {
            this.onTakePhoto();
        }
        return;
    };
    CaptureComponent.prototype.onTakePhoto = function () {
        var _this = this;
        var options = {
            width: this.width,
            height: this.height,
            keepAspectRatio: this.keepAspectRatio,
            saveToGallery: this.saveToGallery
        };
        Cam.takePicture(options)
            .then(function (imageAsset) {
            _this.imageTaken = imageAsset;
            _this.imageSourceFromAsset(imageAsset);
            console.log("Size: " + imageAsset.options.width + "x" + imageAsset.options.height);
        }).catch(function (err) {
            _this._routerExtensions.backToPreviousPage();
            console.log(err.message);
        });
    };
    CaptureComponent.prototype.imageSourceFromAsset = function (imageAsset) {
        var _this = this;
        var source = new imageSource.ImageSource();
        source.fromAsset(imageAsset).then(function (imageSou) {
            var folder = fs.knownFolders.documents().path;
            var fileName = "test.jpg";
            var path = fs.path.join(folder, fileName);
            var saved = imageSou.saveToFile(path, "jpg");
            if (saved) {
                console.log("Image saved successfully!", path);
                var img = imageSource.fromFile(path);
                var base64String = img.toBase64String("jpg");
                _this.postData({
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
    };
    CaptureComponent.prototype.postData = function (data) {
        var _this = this;
        console.log("hello post new2");
        var config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Key ac1556bf9cab4e9c884c4a4a27e3ad57"
            }
        };
        this.http.post("https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs", JSON.stringify(data), config).map(function (res) { return res; })
            .subscribe(function (res) {
            _this.keywords = res.outputs[0].data.concepts.map(function (unit) { return new keyword_model_1.Keyword(unit.name); });
            _this.collectDataFromEbay();
        }, function (err) {
            console.log("Error occured");
        });
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
    };
    CaptureComponent.prototype.onBackButtonTap = function () {
        this._routerExtensions.backToPreviousPage();
    };
    Object.defineProperty(CaptureComponent.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        enumerable: true,
        configurable: true
    });
    CaptureComponent.prototype.collectDataFromEbay = function () {
        var _this = this;
        // tslint:disable-next-line:max-line-length
        var temp = this.keywords.map(function (searchWord) { return _this.http.get("http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=santoshk-digihack-PRD-510683bd3-6540cd30&RESPONSE-DATA-FORMAT=JSON&GLOBAL-ID=EBAY-IN&keywords=" + searchWord.value + "&sortOrder=CurrentPriceHighest&paginationInput.entriesPerPage=1&paginationInput.pageNumber=1"); });
        forkJoin_1.forkJoin(temp).subscribe(function (results) {
            _this._isLoading = false;
            _this.items = results.map(function (unitRes, index) { return new item_model_1.Items({
                id: index,
                imageUrl: unitRes.findItemsByKeywordsResponse[0].searchResult[0].item[0].galleryURL[0],
                name: unitRes.findItemsByKeywordsResponse[0].searchResult[0].item[0].title[0],
                // tslint:disable-next-line:max-line-length
                price: unitRes.findItemsByKeywordsResponse[0].searchResult[0].item[0].sellingStatus[0].currentPrice[0].__value__,
                keyword: _this.keywords[index].value,
                itemurl: unitRes.findItemsByKeywordsResponse[0].searchResult[0].item[0].viewItemURL[0]
            }); });
            _this.dataservice.setItems(_this.items);
        });
        return;
    };
    CaptureComponent.prototype.onItemTap = function (args) {
        var tappedItem = args.view.bindingContext;
        console.log(tappedItem.id);
        this._routerExtensions.navigate(["/home/detail", tappedItem.id], {
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });
        return;
    };
    CaptureComponent = __decorate([
        core_1.Component({
            selector: "capture",
            moduleId: module.id,
            templateUrl: "./capture.component.html",
            styles: ["\n    .list-group .list-group-item {\n        padding: 0 0 8 0;\n        background-color: #00bfff;\n      }\n      .list-group .list-group-item .list-group-item-content {\n        padding: 8 15 4 15;\n      }\n      .list-group .list-group-item .fa {\n        color: #4CAEE3;\n      }\n    "]
        })
        // tslint:disable-next-line:max-classes-per-file
        ,
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            http_1.HttpClient,
            homedata_service_1.DataService])
    ], CaptureComponent);
    return CaptureComponent;
}());
exports.CaptureComponent = CaptureComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwdHVyZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXB0dXJlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE2RTtBQUM3RSxzQ0FBNkY7QUFFN0Ysc0RBQTBFO0FBQzFFLHlDQUEyQztBQUUzQyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBRS9CLHFEQUFvRDtBQUVwRCxpREFBbUQ7QUFFbkQsMkRBQTZEO0FBQzdELHdEQUFrRDtBQUNsRCxtREFBNkM7QUFDN0MseURBQWtEO0FBcUJsRDtJQVlJLDBCQUNZLGlCQUFtQyxFQUNuQyxJQUFnQixFQUNoQixXQUF3QjtRQUZ4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFaNUIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxVQUFLLEdBQVcsR0FBRyxDQUFDO1FBQ3BCLFdBQU0sR0FBVyxHQUFHLENBQUM7UUFVekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixHQUFHLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUN6QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBRUQsTUFBTSxDQUFDO0lBQ1gsQ0FBQztJQUVELHNDQUFXLEdBQVg7UUFBQSxpQkFpQkM7UUFoQkcsSUFBTSxPQUFPLEdBQUc7WUFDWixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxN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QUU7SUFDWixDQUFDO0lBaktRLGdCQUFnQjtRQW5CNUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLE1BQU0sRUFBRSxDQUFDLHFTQVdSLENBQUM7U0FDTCxDQUFDO1FBRUYsZ0RBQWdEOzt5Q0FjYix5QkFBZ0I7WUFDN0IsaUJBQVU7WUFDSCw4QkFBVztPQWYzQixnQkFBZ0IsQ0FtSzVCO0lBQUQsdUJBQUM7Q0FBQSxBQW5LRCxJQW1LQztBQW5LWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEluamVjdGFibGUsIE9uSW5pdCwgVHlwZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJkYXRhL29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgUGFnZVJvdXRlLCBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgKiBhcyBDYW0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1jYW1lcmFcIjtcclxuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9saXN0dmlld1wiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IGZvcmtKb2luIH0gZnJvbSBcInJ4anMvb2JzZXJ2YWJsZS9mb3JrSm9pblwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCB7IEltYWdlQXNzZXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1hc3NldC9pbWFnZS1hc3NldFwiO1xyXG5pbXBvcnQgKiBhcyBpbWFnZVNvdXJjZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1zb3VyY2VcIjtcclxuaW1wb3J0IHsgRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vaG9tZWRhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBJdGVtcyB9IGZyb20gXCIuLi9zaGFyZWQvaXRlbS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBLZXl3b3JkIH0gZnJvbSBcIi4uL3NoYXJlZC9rZXl3b3JkLm1vZGVsXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcImNhcHR1cmVcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2NhcHR1cmUuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlczogW2BcclxuICAgIC5saXN0LWdyb3VwIC5saXN0LWdyb3VwLWl0ZW0ge1xyXG4gICAgICAgIHBhZGRpbmc6IDAgMCA4IDA7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwYmZmZjtcclxuICAgICAgfVxyXG4gICAgICAubGlzdC1ncm91cCAubGlzdC1ncm91cC1pdGVtIC5saXN0LWdyb3VwLWl0ZW0tY29udGVudCB7XHJcbiAgICAgICAgcGFkZGluZzogOCAxNSA0IDE1O1xyXG4gICAgICB9XHJcbiAgICAgIC5saXN0LWdyb3VwIC5saXN0LWdyb3VwLWl0ZW0gLmZhIHtcclxuICAgICAgICBjb2xvcjogIzRDQUVFMztcclxuICAgICAgfVxyXG4gICAgYF1cclxufSlcclxuXHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtY2xhc3Nlcy1wZXItZmlsZVxyXG5leHBvcnQgY2xhc3MgQ2FwdHVyZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBrZXl3b3JkczogQXJyYXk8S2V5d29yZD47XHJcbiAgICBpdGVtczogQXJyYXk8SXRlbXM+O1xyXG4gICAgcHJpdmF0ZSBfaXNMb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHNhdmVUb0dhbGxlcnk6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBrZWVwQXNwZWN0UmF0aW86IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlciA9IDMwMDtcclxuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXIgPSAzMDA7XHJcbiAgICBwcml2YXRlIGltYWdlVGFrZW47XHJcbiAgICBwcml2YXRlIGFwcDtcclxuICAgIHByaXZhdGUgbWVzc2FnZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgICAgICBwcml2YXRlIGRhdGFzZXJ2aWNlOiBEYXRhU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5rZXl3b3JkcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2lzTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgQ2FtLnJlcXVlc3RQZXJtaXNzaW9ucygpO1xyXG4gICAgICAgIGlmIChDYW0uaXNBdmFpbGFibGUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uVGFrZVBob3RvKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgb25UYWtlUGhvdG8oKSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXHJcbiAgICAgICAgICAgIGtlZXBBc3BlY3RSYXRpbzogdGhpcy5rZWVwQXNwZWN0UmF0aW8sXHJcbiAgICAgICAgICAgIHNhdmVUb0dhbGxlcnk6IHRoaXMuc2F2ZVRvR2FsbGVyeVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIENhbS50YWtlUGljdHVyZShvcHRpb25zKVxyXG4gICAgICAgICAgICAudGhlbigoaW1hZ2VBc3NldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZVRha2VuID0gaW1hZ2VBc3NldDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VTb3VyY2VGcm9tQXNzZXQoaW1hZ2VBc3NldCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNpemU6IFwiICsgaW1hZ2VBc3NldC5vcHRpb25zLndpZHRoICsgXCJ4XCIgKyBpbWFnZUFzc2V0Lm9wdGlvbnMuaGVpZ2h0KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW1hZ2VTb3VyY2VGcm9tQXNzZXQoaW1hZ2VBc3NldCkge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IG5ldyBpbWFnZVNvdXJjZS5JbWFnZVNvdXJjZSgpO1xyXG4gICAgICAgIHNvdXJjZS5mcm9tQXNzZXQoaW1hZ2VBc3NldCkudGhlbigoaW1hZ2VTb3UpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZm9sZGVyID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpLnBhdGg7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGVOYW1lID0gXCJ0ZXN0LmpwZ1wiO1xyXG4gICAgICAgICAgICBjb25zdCBwYXRoID0gZnMucGF0aC5qb2luKGZvbGRlciwgZmlsZU5hbWUpO1xyXG4gICAgICAgICAgICBjb25zdCBzYXZlZCA9IGltYWdlU291LnNhdmVUb0ZpbGUocGF0aCwgXCJqcGdcIik7XHJcbiAgICAgICAgICAgIGlmIChzYXZlZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJbWFnZSBzYXZlZCBzdWNjZXNzZnVsbHkhXCIsIHBhdGgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW1nID0gaW1hZ2VTb3VyY2UuZnJvbUZpbGUocGF0aCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlNjRTdHJpbmcgPSBpbWcudG9CYXNlNjRTdHJpbmcoXCJqcGdcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc3REYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2U2NDogYmFzZTY0U3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwb3N0RGF0YShkYXRhOiBhbnkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImhlbGxvIHBvc3QgbmV3MlwiKTtcclxuXHJcbiAgICAgICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IFwiS2V5IGFjMTU1NmJmOWNhYjRlOWM4ODRjNGE0YTI3ZTNhZDU3XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5odHRwLnBvc3QoXCJodHRwczovL2FwaS5jbGFyaWZhaS5jb20vdjIvbW9kZWxzL2FhYTAzYzIzYjM3MjRhMTZhNTZiNjI5MjAzZWRjNjJjL291dHB1dHNcIixcclxuICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZGF0YSksIGNvbmZpZykubWFwKChyZXMpID0+IHJlcylcclxuICAgICAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXl3b3JkcyA9ICg8YW55PnJlcykub3V0cHV0c1swXS5kYXRhLmNvbmNlcHRzLm1hcCgodW5pdCkgPT4gbmV3IEtleXdvcmQodW5pdC5uYW1lKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3REYXRhRnJvbUViYXkoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBvY2N1cmVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgLypcclxuICAgICAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogXCJLZXkgZDJkZWQwNTZhYjEyNDM0NjgwNDllYjljYTIxZjIyOGJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmh0dHAucG9zdChcImh0dHBzOi8vYXBpLmNsYXJpZmFpLmNvbS92Mi9tb2RlbHMvZmFjZWRldGVjdC9vdXRwdXRzXCIsXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGRhdGEpLCBjb25maWcpLm1hcCgocmVzKSA9PiByZXMpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gKDxhbnk+cmVzKS5vdXRwdXRzWzBdLmRhdGEuY29uY2VwdHMubWFwKCh1bml0KSA9PiB1bml0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci1mb3Itb2ZcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tZXNzYWdlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXl3b3Jkcy5wdXNoKG5ldyBLZXl3b3JkKHRoaXMubWVzc2FnZVtpXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIG9jY3VyZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTsqL1xyXG4gICAgfVxyXG5cclxuICAgIG9uQmFja0J1dHRvblRhcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0xvYWRpbmcoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzTG9hZGluZztcclxuICAgIH1cclxuXHJcbiAgICBjb2xsZWN0RGF0YUZyb21FYmF5KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuICAgICAgICBjb25zdCB0ZW1wID0gdGhpcy5rZXl3b3Jkcy5tYXAoKHNlYXJjaFdvcmQpID0+IHRoaXMuaHR0cC5nZXQoXCJodHRwOi8vc3Zjcy5lYmF5LmNvbS9zZXJ2aWNlcy9zZWFyY2gvRmluZGluZ1NlcnZpY2UvdjE/T1BFUkFUSU9OLU5BTUU9ZmluZEl0ZW1zQnlLZXl3b3JkcyZTRVJWSUNFLVZFUlNJT049MS4wLjAmU0VDVVJJVFktQVBQTkFNRT1zYW50b3Noay1kaWdpaGFjay1QUkQtNTEwNjgzYmQzLTY1NDBjZDMwJlJFU1BPTlNFLURBVEEtRk9STUFUPUpTT04mR0xPQkFMLUlEPUVCQVktSU4ma2V5d29yZHM9XCIgKyBzZWFyY2hXb3JkLnZhbHVlICsgXCImc29ydE9yZGVyPUN1cnJlbnRQcmljZUhpZ2hlc3QmcGFnaW5hdGlvbklucHV0LmVudHJpZXNQZXJQYWdlPTEmcGFnaW5hdGlvbklucHV0LnBhZ2VOdW1iZXI9MVwiKSk7XHJcbiAgICAgICAgZm9ya0pvaW4odGVtcCkuc3Vic2NyaWJlKChyZXN1bHRzKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gKDxhbnk+cmVzdWx0cykubWFwKCh1bml0UmVzLCBpbmRleCkgPT4gbmV3IEl0ZW1zKHtcclxuICAgICAgICAgICAgICAgIGlkOiBpbmRleCxcclxuICAgICAgICAgICAgICAgIGltYWdlVXJsOiB1bml0UmVzLmZpbmRJdGVtc0J5S2V5d29yZHNSZXNwb25zZVswXS5zZWFyY2hSZXN1bHRbMF0uaXRlbVswXS5nYWxsZXJ5VVJMWzBdLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogdW5pdFJlcy5maW5kSXRlbXNCeUtleXdvcmRzUmVzcG9uc2VbMF0uc2VhcmNoUmVzdWx0WzBdLml0ZW1bMF0udGl0bGVbMF0sXHJcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICAgICAgICAgICAgICBwcmljZTogdW5pdFJlcy5maW5kSXRlbXNCeUtleXdvcmRzUmVzcG9uc2VbMF0uc2VhcmNoUmVzdWx0WzBdLml0ZW1bMF0uc2VsbGluZ1N0YXR1c1swXS5jdXJyZW50UHJpY2VbMF0uX192YWx1ZV9fLFxyXG4gICAgICAgICAgICAgICAga2V5d29yZDogdGhpcy5rZXl3b3Jkc1tpbmRleF0udmFsdWUsXHJcbiAgICAgICAgICAgICAgICBpdGVtdXJsOiB1bml0UmVzLmZpbmRJdGVtc0J5S2V5d29yZHNSZXNwb25zZVswXS5zZWFyY2hSZXN1bHRbMF0uaXRlbVswXS52aWV3SXRlbVVSTFswXVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YXNlcnZpY2Uuc2V0SXRlbXModGhpcy5pdGVtcyk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSXRlbVRhcChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRhcHBlZEl0ZW0gPSBhcmdzLnZpZXcuYmluZGluZ0NvbnRleHQ7XHJcbiAgICAgICAgY29uc29sZS5sb2codGFwcGVkSXRlbS5pZCk7XHJcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9kZXRhaWxcIiwgdGFwcGVkSXRlbS5pZF0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhbmltYXRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzbGlkZVwiLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMCxcclxuICAgICAgICAgICAgICAgIGN1cnZlOiBcImVhc2VcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiA7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==