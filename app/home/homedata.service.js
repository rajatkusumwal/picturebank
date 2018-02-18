"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var DataService = /** @class */ (function () {
    function DataService() {
        this.dataitems = [];
        this.typeSource = new BehaviorSubject_1.BehaviorSubject("default message");
        this.typeMessage = this.typeSource.asObservable();
    }
    DataService.prototype.setTypeMessage = function (message) {
        this.typeSource.next(message);
    };
    DataService.prototype.setItems = function (temp) {
        this.dataitems = temp;
    };
    DataService.prototype.getItems = function () {
        return this.dataitems;
    };
    DataService.prototype.getItemById = function (id) {
        return this.dataitems[id];
    };
    DataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWVkYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msd0RBQXVEO0FBSXZEO0lBS0k7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFDLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksaUNBQWUsQ0FBUyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0lBRUQsb0NBQWMsR0FBZCxVQUFlLE9BQWU7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELDhCQUFRLEdBQVIsVUFBUyxJQUFrQjtRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQsOEJBQVEsR0FBUjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxpQ0FBVyxHQUFYLFVBQVksRUFBRTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUF6QlEsV0FBVztRQUR2QixpQkFBVSxFQUFFOztPQUNBLFdBQVcsQ0EwQnZCO0lBQUQsa0JBQUM7Q0FBQSxBQTFCRCxJQTBCQztBQTFCWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tIFwicnhqcy9CZWhhdmlvclN1YmplY3RcIjtcclxuaW1wb3J0IHsgSXRlbXMgfSBmcm9tIFwiLi9zaGFyZWQvaXRlbS5tb2RlbFwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRGF0YVNlcnZpY2Uge1xyXG4gICAgdHlwZU1lc3NhZ2U7XHJcbiAgICBkYXRhaXRlbXM6IEFycmF5PEl0ZW1zPjtcclxuICAgIHByaXZhdGUgdHlwZVNvdXJjZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmRhdGFpdGVtcz1bXTtcclxuICAgICAgICB0aGlzLnR5cGVTb3VyY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oXCJkZWZhdWx0IG1lc3NhZ2VcIik7XHJcbiAgICAgICAgdGhpcy50eXBlTWVzc2FnZSA9IHRoaXMudHlwZVNvdXJjZS5hc09ic2VydmFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUeXBlTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnR5cGVTb3VyY2UubmV4dChtZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRJdGVtcyh0ZW1wOiBBcnJheTxJdGVtcz4pe1xyXG4gICAgICAgIHRoaXMuZGF0YWl0ZW1zID0gdGVtcDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJdGVtcygpOiBBcnJheTxJdGVtcz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFpdGVtcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRJdGVtQnlJZChpZCk6IEl0ZW1zIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhaXRlbXNbaWRdO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==