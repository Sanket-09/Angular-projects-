"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeroParentComponent = void 0;
var core_1 = require("@angular/core");
var HeroParentComponent = /** @class */ (function () {
    function HeroParentComponent() {
        this.items = ['item1', 'item2', 'item3', 'item4'];
        this.currentItem = 'Television';
    }
    HeroParentComponent.prototype.addItem = function (newItem) {
        this.items.push(newItem);
    };
    HeroParentComponent.prototype.ngOnInit = function () { };
    HeroParentComponent = __decorate([
        core_1.Component({
            selector: 'app-hero-parent',
            templateUrl: './hero-parent.component.html',
            styleUrls: ['./hero-parent.component.scss']
        })
    ], HeroParentComponent);
    return HeroParentComponent;
}());
exports.HeroParentComponent = HeroParentComponent;
