"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FilterComponent = void 0;
var core_1 = require("@angular/core");
var FilterComponent = /** @class */ (function () {
    function FilterComponent(storeService) {
        this.storeService = storeService;
        this.showCategory = new core_1.EventEmitter();
    }
    FilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.categoriesSubscription = this.storeService
            .getAllCategories()
            .subscribe(function (response) {
            _this.categories = response;
        });
    };
    FilterComponent.prototype.onShowCategory = function (category) {
        this.showCategory.emit(category);
    };
    FilterComponent.prototype.ngOnDestroy = function () {
        if (this.categoriesSubscription) {
            this.categoriesSubscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Output()
    ], FilterComponent.prototype, "showCategory");
    FilterComponent = __decorate([
        core_1.Component({
            selector: 'app-filter',
            templateUrl: './filter.component.html',
            styleUrls: ['./filter.component.scss']
        })
    ], FilterComponent);
    return FilterComponent;
}());
exports.FilterComponent = FilterComponent;
