"use strict";
// data.service.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.DataService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var DataService = /** @class */ (function () {
    function DataService() {
        this.gridItemsSubject = new rxjs_1.BehaviorSubject(this.getStoredGridItems());
        this.gridItems$ = this.gridItemsSubject.asObservable();
    }
    DataService.prototype.getGridItems = function () {
        return this.gridItemsSubject.value;
    };
    DataService.prototype.getGridItem = function (id) {
        var items = this.gridItemsSubject.value;
        return items[id];
    };
    DataService.prototype.addGridItem = function (item) {
        var currentItems = this.gridItemsSubject.value;
        var updatedItems = __spreadArrays(currentItems, [item]);
        this.gridItemsSubject.next(updatedItems);
        this.storeGridItems(updatedItems);
    };
    DataService.prototype.updateGridItem = function (id, updatedItem) {
        var items = this.gridItemsSubject.value;
        if (id >= 0 && id < items.length) {
            items[id] = updatedItem;
            this.gridItemsSubject.next(__spreadArrays(items));
            this.storeGridItems(items);
        }
    };
    DataService.prototype.storeGridItems = function (items) {
        localStorage.setItem('gridItems', JSON.stringify(items));
    };
    DataService.prototype.getStoredGridItems = function () {
        var storedItems = localStorage.getItem('gridItems');
        return storedItems ? JSON.parse(storedItems) : [];
    };
    DataService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
