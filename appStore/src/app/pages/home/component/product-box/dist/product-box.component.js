"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductBoxComponent = void 0;
var core_1 = require("@angular/core");
var ProductBoxComponent = /** @class */ (function () {
    function ProductBoxComponent() {
        this.addToCart = new core_1.EventEmitter();
        this.fullwidthMode = false;
    }
    ProductBoxComponent.prototype.onAddToCart = function () {
        this.addToCart.emit(this.product);
    };
    ProductBoxComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.Output()
    ], ProductBoxComponent.prototype, "addToCart");
    __decorate([
        core_1.Input()
    ], ProductBoxComponent.prototype, "product");
    __decorate([
        core_1.Input()
    ], ProductBoxComponent.prototype, "fullwidthMode");
    ProductBoxComponent = __decorate([
        core_1.Component({
            selector: 'app-product-box',
            templateUrl: './product-box.component.html',
            styleUrls: ['./product-box.component.scss']
        })
    ], ProductBoxComponent);
    return ProductBoxComponent;
}());
exports.ProductBoxComponent = ProductBoxComponent;
