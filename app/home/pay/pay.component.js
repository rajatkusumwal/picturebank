"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var Cam = require("nativescript-camera");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var fs = require("tns-core-modules/file-system");
var imageSource = require("tns-core-modules/image-source");
var homedata_service_1 = require("../homedata.service");
var keyword_model_1 = require("../shared/keyword.model");
var PayComponent = /** @class */ (function () {
    function PayComponent(_routerExtensions, http, dataservice) {
        this._routerExtensions = _routerExtensions;
        this.http = http;
        this.dataservice = dataservice;
        this._isLoading = false;
        this.saveToGallery = true;
        this.keepAspectRatio = false;
        this.width = 300;
        this.height = 300;
        this.person = { name: "", uid: "", actno: "" };
        this.keywords = [];
    }
    PayComponent.prototype.ngOnInit = function () {
        this._isLoading = true;
        Cam.requestPermissions();
        if (Cam.isAvailable()) {
            this.onTakePhoto();
        }
        return;
    };
    PayComponent.prototype.onTakePhoto = function () {
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
    PayComponent.prototype.imageSourceFromAsset = function (imageAsset) {
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
    PayComponent.prototype.postData = function (data) {
        var _this = this;
        console.log("hello post pay");
        var config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Key d2ded056ab1243468049eb9ca21f228b"
            }
        };
        this.http.post("https://api.clarifai.com/v2/models/facedetect/outputs", JSON.stringify(data), config).map(function (res) { return res; })
            .subscribe(function (res) {
            _this.message = res.outputs[0].data.concepts.map(function (unit) { return unit.name; });
            // tslint:disable-next-line:prefer-for-of
            for (var i = 0; i < _this.message.length; i++) {
                _this.keywords.push(new keyword_model_1.Keyword(_this.message[i]));
            }
            // tslint:disable-next-line:prefer-conditional-expression
            if (_this.message[0] === "rajat") {
                _this.person = { name: "Rajat Kusumwal", uid: "rajatkusumwal@dbs", actno: "1234567890" };
            }
            else {
                _this.person = { name: "Santosh Kumar Kolla", uid: "santoshkolla@dbs", actno: "987654321" };
            }
            _this._isLoading = false;
        }, function (err) {
            console.log("Error occured");
        });
    };
    PayComponent.prototype.onBackButtonTap = function () {
        this._routerExtensions.backToPreviousPage();
    };
    Object.defineProperty(PayComponent.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        enumerable: true,
        configurable: true
    });
    PayComponent = __decorate([
        core_1.Component({
            selector: "pay",
            moduleId: module.id,
            templateUrl: "./pay.component.html",
            styles: ["\n    .list-group .list-group-item {\n        padding: 0 0 8 0;\n        background-color: #00bfff;\n      }\n      .list-group .list-group-item .list-group-item-content {\n        padding: 8 15 4 15;\n      }\n      .list-group .list-group-item .fa {\n        color: #4CAEE3;\n      }\n    "]
        })
        // tslint:disable-next-line:max-classes-per-file
        ,
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            http_1.HttpClient,
            homedata_service_1.DataService])
    ], PayComponent);
    return PayComponent;
}());
exports.PayComponent = PayComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBheS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBNkU7QUFDN0Usc0NBQTZGO0FBRTdGLHNEQUEwRTtBQUMxRSx5Q0FBMkM7QUFFM0MsZ0NBQThCO0FBQzlCLGlDQUErQjtBQUkvQixpREFBbUQ7QUFFbkQsMkRBQTZEO0FBQzdELHdEQUFrRDtBQUVsRCx5REFBa0Q7QUFxQmxEO0lBY0ksc0JBQ1ksaUJBQW1DLEVBQ25DLElBQWdCLEVBQ2hCLFdBQXdCO1FBRnhCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQWQ1QixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBQzlCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLFVBQUssR0FBVyxHQUFHLENBQUM7UUFDcEIsV0FBTSxHQUFXLEdBQUcsQ0FBQztRQUlyQixXQUFNLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBUTlDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsR0FBRyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDekIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQztRQUVELE1BQU0sQ0FBQztJQUNYLENBQUM7SUFFRCxrQ0FBVyxHQUFYO1FBQUEsaUJBaUJDO1FBaEJHLElBQU0sT0FBTyxHQUFHO1lBQ1os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LFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxzQkFBc0I7WUFDbkMsTUFBTSxFQUFFLENBQUMscVNBV1IsQ0FBQztTQUNMLENBQUM7UUFFRixnREFBZ0Q7O3lDQWdCYix5QkFBZ0I7WUFDN0IsaUJBQVU7WUFDSCw4QkFBVztPQWpCM0IsWUFBWSxDQXFIeEI7SUFBRCxtQkFBQztDQUFBLEFBckhELElBcUhDO0FBckhZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbmplY3RhYmxlLCBPbkluaXQsIFR5cGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IFBhZ2VSb3V0ZSwgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0ICogYXMgQ2FtIGZyb20gXCJuYXRpdmVzY3JpcHQtY2FtZXJhXCI7XHJcbmltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvbGlzdHZpZXdcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgYXMgUnhPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBmb3JrSm9pbiB9IGZyb20gXCJyeGpzL29ic2VydmFibGUvZm9ya0pvaW5cIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiO1xyXG5pbXBvcnQgeyBJbWFnZUFzc2V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2UtYXNzZXQvaW1hZ2UtYXNzZXRcIjtcclxuaW1wb3J0ICogYXMgaW1hZ2VTb3VyY2UgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlXCI7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL2hvbWVkYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSXRlbXMgfSBmcm9tIFwiLi4vc2hhcmVkL2l0ZW0ubW9kZWxcIjtcclxuaW1wb3J0IHsgS2V5d29yZCB9IGZyb20gXCIuLi9zaGFyZWQva2V5d29yZC5tb2RlbFwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJwYXlcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BheS5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVzOiBbYFxyXG4gICAgLmxpc3QtZ3JvdXAgLmxpc3QtZ3JvdXAtaXRlbSB7XHJcbiAgICAgICAgcGFkZGluZzogMCAwIDggMDtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBiZmZmO1xyXG4gICAgICB9XHJcbiAgICAgIC5saXN0LWdyb3VwIC5saXN0LWdyb3VwLWl0ZW0gLmxpc3QtZ3JvdXAtaXRlbS1jb250ZW50IHtcclxuICAgICAgICBwYWRkaW5nOiA4IDE1IDQgMTU7XHJcbiAgICAgIH1cclxuICAgICAgLmxpc3QtZ3JvdXAgLmxpc3QtZ3JvdXAtaXRlbSAuZmEge1xyXG4gICAgICAgIGNvbG9yOiAjNENBRUUzO1xyXG4gICAgICB9XHJcbiAgICBgXVxyXG59KVxyXG5cclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1jbGFzc2VzLXBlci1maWxlXHJcbmV4cG9ydCBjbGFzcyBQYXlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAga2V5d29yZHM6IEFycmF5PEtleXdvcmQ+O1xyXG4gICAgaXRlbXM6IEFycmF5PEl0ZW1zPjtcclxuICAgIHByaXZhdGUgX2lzTG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBzYXZlVG9HYWxsZXJ5OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHByaXZhdGUga2VlcEFzcGVjdFJhdGlvOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHdpZHRoOiBudW1iZXIgPSAzMDA7XHJcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyID0gMzAwO1xyXG4gICAgcHJpdmF0ZSBpbWFnZVRha2VuO1xyXG4gICAgcHJpdmF0ZSBhcHA7XHJcbiAgICBwcml2YXRlIG1lc3NhZ2U7XHJcbiAgICBwcml2YXRlIHBlcnNvbiA9IHsgbmFtZTogXCJcIiwgdWlkOiBcIlwiLCBhY3RubzogXCJcIiB9O1xyXG4gICAgcHJpdmF0ZSB0ZXh0VmFsdWU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhc2VydmljZTogRGF0YVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMua2V5d29yZHMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgIENhbS5yZXF1ZXN0UGVybWlzc2lvbnMoKTtcclxuICAgICAgICBpZiAoQ2FtLmlzQXZhaWxhYmxlKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5vblRha2VQaG90bygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVGFrZVBob3RvKCkge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxyXG4gICAgICAgICAgICBrZWVwQXNwZWN0UmF0aW86IHRoaXMua2VlcEFzcGVjdFJhdGlvLFxyXG4gICAgICAgICAgICBzYXZlVG9HYWxsZXJ5OiB0aGlzLnNhdmVUb0dhbGxlcnlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBDYW0udGFrZVBpY3R1cmUob3B0aW9ucylcclxuICAgICAgICAgICAgLnRoZW4oKGltYWdlQXNzZXQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VUYWtlbiA9IGltYWdlQXNzZXQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlU291cmNlRnJvbUFzc2V0KGltYWdlQXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTaXplOiBcIiArIGltYWdlQXNzZXQub3B0aW9ucy53aWR0aCArIFwieFwiICsgaW1hZ2VBc3NldC5vcHRpb25zLmhlaWdodCk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGltYWdlU291cmNlRnJvbUFzc2V0KGltYWdlQXNzZXQpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2UgPSBuZXcgaW1hZ2VTb3VyY2UuSW1hZ2VTb3VyY2UoKTtcclxuICAgICAgICBzb3VyY2UuZnJvbUFzc2V0KGltYWdlQXNzZXQpLnRoZW4oKGltYWdlU291KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvbGRlciA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKS5wYXRoO1xyXG4gICAgICAgICAgICBjb25zdCBmaWxlTmFtZSA9IFwidGVzdC5qcGdcIjtcclxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IGZzLnBhdGguam9pbihmb2xkZXIsIGZpbGVOYW1lKTtcclxuICAgICAgICAgICAgY29uc3Qgc2F2ZWQgPSBpbWFnZVNvdS5zYXZlVG9GaWxlKHBhdGgsIFwianBnXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2F2ZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSW1hZ2Ugc2F2ZWQgc3VjY2Vzc2Z1bGx5IVwiLCBwYXRoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IGltYWdlU291cmNlLmZyb21GaWxlKHBhdGgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZTY0U3RyaW5nID0gaW1nLnRvQmFzZTY0U3RyaW5nKFwianBnXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3N0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlNjQ6IGJhc2U2NFN0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zdERhdGEoZGF0YTogYW55KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJoZWxsbyBwb3N0IHBheVwiKTtcclxuXHJcbiAgICAgICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IFwiS2V5IGQyZGVkMDU2YWIxMjQzNDY4MDQ5ZWI5Y2EyMWYyMjhiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5odHRwLnBvc3QoXCJodHRwczovL2FwaS5jbGFyaWZhaS5jb20vdjIvbW9kZWxzL2ZhY2VkZXRlY3Qvb3V0cHV0c1wiLFxyXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShkYXRhKSwgY29uZmlnKS5tYXAoKHJlcykgPT4gcmVzKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSAoPGFueT5yZXMpLm91dHB1dHNbMF0uZGF0YS5jb25jZXB0cy5tYXAoKHVuaXQpID0+IHVuaXQubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWZvci1vZlxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1lc3NhZ2UubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleXdvcmRzLnB1c2gobmV3IEtleXdvcmQodGhpcy5tZXNzYWdlW2ldKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci1jb25kaXRpb25hbC1leHByZXNzaW9uXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tZXNzYWdlWzBdID09PSBcInJhamF0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcnNvbiA9IHsgbmFtZTogXCJSYWphdCBLdXN1bXdhbFwiLCB1aWQ6IFwicmFqYXRrdXN1bXdhbEBkYnNcIiwgYWN0bm86IFwiMTIzNDU2Nzg5MFwiIH07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGVyc29uID0geyBuYW1lOiBcIlNhbnRvc2ggS3VtYXIgS29sbGFcIiwgdWlkOiBcInNhbnRvc2hrb2xsYUBkYnNcIiwgYWN0bm86IFwiOTg3NjU0MzIxXCIgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIG9jY3VyZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJhY2tCdXR0b25UYXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNMb2FkaW5nKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0xvYWRpbmc7XHJcbiAgICB9XHJcbn1cclxuIl19