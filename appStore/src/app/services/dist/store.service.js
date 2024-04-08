"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StoreService = void 0;
var core_1 = require("@angular/core");
var STORE_BASE_URL = 'https://fakestoreapi.com';
var StoreService = /** @class */ (function () {
    function StoreService(httpClient) {
        this.httpClient = httpClient;
    }
    StoreService.prototype.getAllProducts = function (limit, sort, category) {
        if (limit === void 0) { limit = '12'; }
        if (sort === void 0) { sort = 'desc'; }
        return this.httpClient.get(STORE_BASE_URL + "/products" + (category ? '/category/' + category : '') + "?sort=" + sort + "&limit=" + limit);
    };
    StoreService.prototype.getAllCategories = function () {
        return this.httpClient.get(STORE_BASE_URL + "/products/categories");
    };
    StoreService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], StoreService);
    return StoreService;
}());
exports.StoreService = StoreService;
