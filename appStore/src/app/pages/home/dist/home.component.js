"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var ROWS_HEIGHT = {
    1: 400,
    3: 335,
    4: 350
};
var HomeComponent = /** @class */ (function () {
    function HomeComponent(cartService, storeService) {
        this.cartService = cartService;
        this.storeService = storeService;
        this.cols = 3;
        this.rowHeight = ROWS_HEIGHT[this.cols];
        this.sort = 'desc';
        this.count = '12';
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.getProducts();
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        if (this.productsSubscription)
            this.productsSubscription.unsubscribe();
    };
    HomeComponent.prototype.getProducts = function () {
        var _this = this;
        this.productsSubscription = this.storeService
            .getAllProducts(this.count, this.sort, this.category)
            .subscribe(function (_products) {
            _this.products = _products;
        });
    };
    HomeComponent.prototype.onColumnsCountChange = function (colsNumber) {
        this.cols = colsNumber;
        this.rowHeight = ROWS_HEIGHT[this.cols];
    };
    HomeComponent.prototype.onShowCategory = function (newCategory) {
        this.category = newCategory;
        this.getProducts();
    };
    HomeComponent.prototype.onAddToCart = function (product) {
        this.cartService.addToCart({
            product: product.image,
            name: product.title,
            price: product.price,
            quantity: 1,
            id: product.id
        });
    };
    HomeComponent.prototype.onItemsCountChange = function (newCount) {
        this.count = newCount.toString();
        this.getProducts();
    };
    HomeComponent.prototype.onSortChange = function (newSort) {
        this.sort = newSort;
        this.getProducts();
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
