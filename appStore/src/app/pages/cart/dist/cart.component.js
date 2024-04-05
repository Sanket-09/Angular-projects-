"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CartComponent = void 0;
var core_1 = require("@angular/core");
var CartComponent = /** @class */ (function () {
    function CartComponent() {
        this.cart = {
            items: [
                {
                    product: 'https://picsum.photos/900',
                    name: 'Sneakers',
                    price: 450,
                    quantity: 10,
                    id: 1
                },
            ]
        };
        this.datasource = [];
        this.displayedColumns = [
            'product',
            'name',
            'price',
            'quantity',
            'total',
            'action',
        ];
    }
    CartComponent.prototype.ngOnInit = function () {
        this.datasource = this.cart.items;
    };
    CartComponent = __decorate([
        core_1.Component({
            selector: 'app-cart',
            templateUrl: './cart.component.html',
            styleUrls: ['./cart.component.scss']
        })
    ], CartComponent);
    return CartComponent;
}());
exports.CartComponent = CartComponent;
