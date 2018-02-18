"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var DataService = /** @class */ (function () {
    function DataService() {
        this.typeSource = new BehaviorSubject_1.BehaviorSubject("default message");
        this.typeMessage = this.typeSource.asObservable();
    }
    DataService.prototype.setTypeMessage = function (message) {
        this.typeSource.next(message);
    };
    DataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWVkYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msd0RBQXVEO0FBR3ZEO0lBSUk7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksaUNBQWUsQ0FBUyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0lBRUQsb0NBQWMsR0FBZCxVQUFlLE9BQWU7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQVhRLFdBQVc7UUFEdkIsaUJBQVUsRUFBRTs7T0FDQSxXQUFXLENBYXZCO0lBQUQsa0JBQUM7Q0FBQSxBQWJELElBYUM7QUFiWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tIFwicnhqcy9CZWhhdmlvclN1YmplY3RcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERhdGFTZXJ2aWNlIHtcclxuICAgIHR5cGVNZXNzYWdlO1xyXG4gICAgcHJpdmF0ZSB0eXBlU291cmNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudHlwZVNvdXJjZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPihcImRlZmF1bHQgbWVzc2FnZVwiKTtcclxuICAgICAgICB0aGlzLnR5cGVNZXNzYWdlID0gdGhpcy50eXBlU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFR5cGVNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMudHlwZVNvdXJjZS5uZXh0KG1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=