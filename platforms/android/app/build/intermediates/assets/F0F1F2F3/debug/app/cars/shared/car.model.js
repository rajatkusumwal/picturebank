"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Car = /** @class */ (function () {
    function Car(options) {
        this.id = options.id;
        this.name = options.name;
        this.hasAC = options.hasAC;
        this.seats = options.seats;
        this.luggage = Number(options.luggage);
        this.class = options.class;
        this.doors = Number(options.doors);
        this.price = Number(options.price);
        this.transmission = options.transmission;
        this.imageUrl = options.imageUrl;
        this.imageStoragePath = options.imageStoragePath;
    }
    return Car;
}());
exports.Car = Car;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FyLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7SUFhSSxhQUFZLE9BQVk7UUFDcEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7SUFDckQsQ0FBQztJQUNMLFVBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDO0FBMUJZLGtCQUFHIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIENhciB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgaGFzQUM6IGJvb2xlYW47XHJcbiAgICBzZWF0czogc3RyaW5nO1xyXG4gICAgbHVnZ2FnZTogbnVtYmVyO1xyXG4gICAgY2xhc3M6IHN0cmluZztcclxuICAgIGRvb3JzOiBudW1iZXI7XHJcbiAgICBwcmljZTogbnVtYmVyO1xyXG4gICAgdHJhbnNtaXNzaW9uOiBzdHJpbmc7XHJcbiAgICBpbWFnZVVybDogc3RyaW5nO1xyXG4gICAgaW1hZ2VTdG9yYWdlUGF0aDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBvcHRpb25zLmlkO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZTtcclxuICAgICAgICB0aGlzLmhhc0FDID0gb3B0aW9ucy5oYXNBQztcclxuICAgICAgICB0aGlzLnNlYXRzID0gb3B0aW9ucy5zZWF0cztcclxuICAgICAgICB0aGlzLmx1Z2dhZ2UgPSBOdW1iZXIob3B0aW9ucy5sdWdnYWdlKTtcclxuICAgICAgICB0aGlzLmNsYXNzID0gb3B0aW9ucy5jbGFzcztcclxuICAgICAgICB0aGlzLmRvb3JzID0gTnVtYmVyKG9wdGlvbnMuZG9vcnMpO1xyXG4gICAgICAgIHRoaXMucHJpY2UgPSBOdW1iZXIob3B0aW9ucy5wcmljZSk7XHJcbiAgICAgICAgdGhpcy50cmFuc21pc3Npb24gPSBvcHRpb25zLnRyYW5zbWlzc2lvbjtcclxuICAgICAgICB0aGlzLmltYWdlVXJsID0gb3B0aW9ucy5pbWFnZVVybDtcclxuICAgICAgICB0aGlzLmltYWdlU3RvcmFnZVBhdGggPSBvcHRpb25zLmltYWdlU3RvcmFnZVBhdGg7XHJcbiAgICB9XHJcbn1cclxuIl19