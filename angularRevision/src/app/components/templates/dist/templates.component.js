"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TemplatesComponent = void 0;
var core_1 = require("@angular/core");
var TemplatesComponent = /** @class */ (function () {
    function TemplatesComponent() {
        this.currentCustomer = 'Sanket';
        this.itemImageUrl = 'https://picsum.photos/200/100';
        this.buttonColor = 'grey';
        this.actionName = 'Hit me up';
        this.clickMessage = '';
        this.fontSizePx = 16;
    }
    TemplatesComponent.prototype.ngOnInit = function () { };
    TemplatesComponent = __decorate([
        core_1.Component({
            selector: 'app-templates',
            templateUrl: './templates.component.html',
            styleUrls: ['./templates.component.scss']
        })
    ], TemplatesComponent);
    return TemplatesComponent;
}());
exports.TemplatesComponent = TemplatesComponent;
