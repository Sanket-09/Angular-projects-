"use strict";
// app.component.ts
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
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var AppComponent = /** @class */ (function () {
    function AppComponent(router, dataService) {
        this.router = router;
        this.dataService = dataService;
        this.showAddItem = false;
        this.showEditItem = false;
        this.showHomePage = true;
        this.gridItems = this.dataService.getStoredGridItems();
    }
    AppComponent.prototype.onItemClick = function (index) {
        console.log('the index is', index);
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.gridItems$.subscribe(function (items) {
            _this.gridItems = items ? __spreadArrays(items) : [];
            console.log(_this.gridItems);
        });
    };
    AppComponent.prototype.editItem = function (index) {
        this.router.navigate(["/edit-item/" + index]);
        // this.showEditItem = !this.showEditItem;
        // this.showHomePage = !this.showHomePage;
        var elem = document.getElementById("EditForm");
        elem === null || elem === void 0 ? void 0 : elem.scrollIntoView();
    };
    AppComponent.prototype.navigateToAddItem = function () {
        this.showAddItem = true;
        this.showEditItem = false;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
