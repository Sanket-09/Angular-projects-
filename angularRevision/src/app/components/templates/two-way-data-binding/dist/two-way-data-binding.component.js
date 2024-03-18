"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TwoWayDataBindingComponent = void 0;
var core_1 = require("@angular/core");
var TwoWayDataBindingComponent = /** @class */ (function () {
    function TwoWayDataBindingComponent() {
        this.sizeChange = new core_1.EventEmitter();
    }
    TwoWayDataBindingComponent.prototype.ngOnInit = function () { };
    TwoWayDataBindingComponent.prototype.dec = function () {
        this.resize(-1);
    };
    TwoWayDataBindingComponent.prototype.inc = function () {
        this.resize(+1);
    };
    TwoWayDataBindingComponent.prototype.resize = function (delta) {
        this.size = Math.min(40, Math.max(8, +this.size + delta));
        this.sizeChange.emit(this.size);
    };
    __decorate([
        core_1.Input()
    ], TwoWayDataBindingComponent.prototype, "size");
    __decorate([
        core_1.Output()
    ], TwoWayDataBindingComponent.prototype, "sizeChange");
    TwoWayDataBindingComponent = __decorate([
        core_1.Component({
            selector: 'app-two-way-data-binding',
            templateUrl: './two-way-data-binding.component.html',
            styleUrls: ['./two-way-data-binding.component.scss']
        })
    ], TwoWayDataBindingComponent);
    return TwoWayDataBindingComponent;
}());
exports.TwoWayDataBindingComponent = TwoWayDataBindingComponent;
