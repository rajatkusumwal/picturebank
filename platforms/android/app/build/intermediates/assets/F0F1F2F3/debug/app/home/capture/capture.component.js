"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Clarifai = require("clarifai");
var router_1 = require("nativescript-angular/router");
var Cam = require("nativescript-camera");
var fs = require("tns-core-modules/file-system");
var imageSource = require("tns-core-modules/image-source");
var CaptureComponent = /** @class */ (function () {
    function CaptureComponent(_routerExtensions) {
        this._routerExtensions = _routerExtensions;
        this.saveToGallery = true;
        this.keepAspectRatio = true;
        this.width = 300;
        this.height = 300;
    }
    CaptureComponent.prototype.ngOnInit = function () {
        this.app = new Clarifai.App({
            apiKey: "ac1556bf9cab4e9c884c4a4a27e3ad57"
        });
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
        var source = new imageSource.ImageSource();
        source.fromAsset(imageAsset).then(function (imageSou) {
            var folder = fs.knownFolders.documents().path;
            var fileName = "test.jpg";
            var path = fs.path.join(folder, fileName);
            var saved = imageSou.saveToFile(path, "jpg");
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
    };
    CaptureComponent = __decorate([
        core_1.Component({
            selector: "capture",
            moduleId: module.id,
            templateUrl: "./capture.component.html"
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], CaptureComponent);
    return CaptureComponent;
}());
exports.CaptureComponent = CaptureComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwdHVyZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXB0dXJlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxtQ0FBcUM7QUFDckMsc0RBQTBFO0FBQzFFLHlDQUEyQztBQUMzQyxpREFBbUQ7QUFFbkQsMkRBQTZEO0FBTzdEO0lBU0ksMEJBQ1ksaUJBQW1DO1FBQW5DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFSdkMsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFDOUIsb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFDaEMsVUFBSyxHQUFXLEdBQUcsQ0FBQztRQUNwQixXQUFNLEdBQVcsR0FBRyxDQUFDO0lBTXpCLENBQUM7SUFFTCxtQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFDeEIsTUFBTSxFQUFFLGtDQUFrQztTQUMxQyxDQUFDLENBQUM7UUFDTixHQUFHLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUN6QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBRUQsTUFBTSxDQUFDO0lBQ1gsQ0FBQztJQUVELHNDQUFXLEdBQVg7UUFBQSxpQkFpQkM7UUFoQkcsSUFBTSxPQUFPLEdBQUc7WUFDWixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7U0FDcEMsQ0FBQztRQUVGLEdBQUcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO2FBQ25CLElBQUksQ0FBQyxVQUFDLFVBQVU7WUFDYixLQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3QixLQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkYsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsR0FBRztZQUNULEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELCtDQUFvQixHQUFwQixVQUFxQixVQUFVO1FBQzNCLElBQU0sTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBUTtZQUN2QyxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQztZQUNoRCxJQUFNLFFBQVEsR0FBRyxVQUFVLENBQUM7WUFDNUIsSUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQy9DLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDL0M7Ozs7Ozs7Ozs7MEJBVVU7WUFDZCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBbEVRLGdCQUFnQjtRQUw1QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwwQkFBMEI7U0FDMUMsQ0FBQzt5Q0FXaUMseUJBQWdCO09BVnRDLGdCQUFnQixDQW9FNUI7SUFBRCx1QkFBQztDQUFBLEFBcEVELElBb0VDO0FBcEVZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICogYXMgQ2xhcmlmYWkgZnJvbSBcImNsYXJpZmFpXCI7XHJcbmltcG9ydCB7IFBhZ2VSb3V0ZSwgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0ICogYXMgQ2FtIGZyb20gXCJuYXRpdmVzY3JpcHQtY2FtZXJhXCI7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCB7IEltYWdlQXNzZXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1hc3NldC9pbWFnZS1hc3NldFwiO1xyXG5pbXBvcnQgKiBhcyBpbWFnZVNvdXJjZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1zb3VyY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiY2FwdHVyZVwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY2FwdHVyZS5jb21wb25lbnQuaHRtbFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYXB0dXJlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBwcml2YXRlIHNhdmVUb0dhbGxlcnk6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBrZWVwQXNwZWN0UmF0aW86IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyID0gMzAwO1xyXG4gICAgcHJpdmF0ZSBoZWlnaHQ6IG51bWJlciA9IDMwMDtcclxuICAgIHByaXZhdGUgaW1hZ2VUYWtlbjtcclxuICAgIHByaXZhdGUgYXBwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnNcclxuICAgICkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBuZXcgQ2xhcmlmYWkuQXBwKHtcclxuICAgICAgICAgICAgYXBpS2V5OiBcImFjMTU1NmJmOWNhYjRlOWM4ODRjNGE0YTI3ZTNhZDU3XCJcclxuICAgICAgICAgICB9KTtcclxuICAgICAgICBDYW0ucmVxdWVzdFBlcm1pc3Npb25zKCk7XHJcbiAgICAgICAgaWYgKENhbS5pc0F2YWlsYWJsZSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25UYWtlUGhvdG8oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBvblRha2VQaG90bygpIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogdGhpcy53aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcclxuICAgICAgICAgICAga2VlcEFzcGVjdFJhdGlvOiB0aGlzLmtlZXBBc3BlY3RSYXRpbyxcclxuICAgICAgICAgICAgc2F2ZVRvR2FsbGVyeTogdGhpcy5zYXZlVG9HYWxsZXJ5XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgQ2FtLnRha2VQaWN0dXJlKG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50aGVuKChpbWFnZUFzc2V0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlVGFrZW4gPSBpbWFnZUFzc2V0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZVNvdXJjZUZyb21Bc3NldChpbWFnZUFzc2V0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2l6ZTogXCIgKyBpbWFnZUFzc2V0Lm9wdGlvbnMud2lkdGggKyBcInhcIiArIGltYWdlQXNzZXQub3B0aW9ucy5oZWlnaHQpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpbWFnZVNvdXJjZUZyb21Bc3NldChpbWFnZUFzc2V0KSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlID0gbmV3IGltYWdlU291cmNlLkltYWdlU291cmNlKCk7XHJcbiAgICAgICAgc291cmNlLmZyb21Bc3NldChpbWFnZUFzc2V0KS50aGVuKChpbWFnZVNvdSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmb2xkZXIgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCkucGF0aDtcclxuICAgICAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBcInRlc3QuanBnXCI7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBmcy5wYXRoLmpvaW4oZm9sZGVyLCBmaWxlTmFtZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNhdmVkID0gaW1hZ2VTb3Uuc2F2ZVRvRmlsZShwYXRoLCBcImpwZ1wiKTtcclxuICAgICAgICAgICAgaWYgKHNhdmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkltYWdlIHNhdmVkIHN1Y2Nlc3NmdWxseSFcIiwgcGF0aCk7XHJcbiAgICAgICAgICAgICAgICAvKmNvbnN0IGltZyA9IGltYWdlU291cmNlLmZyb21GaWxlKHBhdGgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZTY0U3RyaW5nID0gaW1nLnRvQmFzZTY0U3RyaW5nKFwicG5nXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHAubW9kZWxzLnByZWRpY3QoQ2xhcmlmYWkuR0VORVJBTF9NT0RFTCwge2Jhc2U2NDogYmFzZTY0U3RyaW5nfSkudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gZG8gc29tZXRoaW5nIHdpdGggcmVzcG9uc2VcclxuICAgICAgICAgICAgICAgICAgICB9KS5cclxuICAgICAgICAgICAgICAgICAgICBjYXRjaCgoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyB0aGVyZSB3YXMgYW4gZXJyb3JcclxuICAgICAgICAgICAgICAgICAgICB9KTsgKi9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=