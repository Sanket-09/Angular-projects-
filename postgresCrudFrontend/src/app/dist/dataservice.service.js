"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DataserviceService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var DataserviceService = /** @class */ (function () {
    function DataserviceService(http) {
        this.http = http;
        this.gridItemsUrl = 'http://localhost:8000/users';
        this.gridItemsSubject = new rxjs_1.BehaviorSubject([]); // Changed to BehaviorSubject
        this.gridItems$ = this.gridItemsSubject.asObservable();
        this.loadInitialGridItems();
    }
    DataserviceService.prototype.getGridItems = function () {
        return this.http.get(this.gridItemsUrl);
    };
    DataserviceService.prototype.addUser = function (user) {
        var _this = this;
        return this.http
            .post(this.gridItemsUrl, user, {
            responseType: 'text'
        })
            .pipe(rxjs_1.tap(function () { return _this.loadInitialGridItems(); }) // Refresh grid items after adding a user
        );
    };
    DataserviceService.prototype.deleteUser = function (id) {
        var _this = this;
        var url = this.gridItemsUrl + "/" + id;
        return this.http["delete"](url, { responseType: 'text' }).pipe(rxjs_1.tap(function () {
            console.log("User deleted with ID: " + id);
            _this.loadInitialGridItems(); // Refresh grid items after deleting a user
        }), rxjs_1.catchError(function (error) {
            console.error('Error deleting user:', error);
            return rxjs_1.throwError(error); // Rethrow the error to be handled by the subscriber
        }));
    };
    DataserviceService.prototype.editUser = function (id, user) {
        var _this = this;
        var url = this.gridItemsUrl + "/" + id;
        return this.http
            .put(url, user, {
            responseType: 'text'
        })
            .pipe(rxjs_1.tap(function () {
            console.log("User edited with ID: " + id);
            _this.loadInitialGridItems(); // Optionally refresh grid items after editing a user
        }), rxjs_1.catchError(function (error) {
            console.error('Error editing user:', error);
            return rxjs_1.throwError(error); // Rethrow the error to be handled by the subscriber
        }));
    };
    DataserviceService.prototype.loadInitialGridItems = function () {
        var _this = this;
        this.getGridItems().subscribe(function (items) {
            _this.gridItemsSubject.next(items);
        });
    };
    DataserviceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DataserviceService);
    return DataserviceService;
}());
exports.DataserviceService = DataserviceService;
