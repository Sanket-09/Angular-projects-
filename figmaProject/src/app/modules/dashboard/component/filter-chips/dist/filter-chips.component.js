"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FilterChipsComponent = void 0;
var keycodes_1 = require("@angular/cdk/keycodes");
var core_1 = require("@angular/core");
var FilterChipsComponent = /** @class */ (function () {
    function FilterChipsComponent(filterService) {
        var _this = this;
        this.filterService = filterService;
        this.selectedValues = [];
        this.addOnBlur = true;
        this.separatorKeysCodes = [keycodes_1.ENTER, keycodes_1.COMMA];
        this.fruits = [];
        this.showClearButton = false;
        this.chipSpeciality = [];
        this.chipSpecialityEmit = [];
        this.filterService.filterChangedSpeciality$.subscribe(function (speciality) {
            _this.updateFruits(speciality);
        });
    }
    FilterChipsComponent.prototype.clearList = function () {
        this.showClearButton = false;
        this.fruits = [];
    };
    FilterChipsComponent.prototype.updateFruits = function (speciality) {
        var _this = this;
        this.showClearButton = true;
        this.fruits = [];
        this.chipSpeciality = [];
        speciality.forEach(function (obj) {
            Object.keys(obj).forEach(function (key) {
                if (typeof obj[key] === 'string') {
                    _this.fruits.push({ name: obj[key] });
                    _this.chipSpeciality.push({ key1: 1, value: obj[key] });
                }
            });
        });
    };
    FilterChipsComponent.prototype.ngOnInit = function () { };
    // add(event: MatChipInputEvent): void {
    //   console.log(this.selectedValues + "   in input")
    //   const value = (event.value || '').trim();
    //   // Add our fruit
    //   if (value) {
    //     this.fruits.push({name: value});
    //   }
    //   // Clear the input value
    //   event.chipInput!.clear();
    // }
    FilterChipsComponent.prototype.remove = function (fruit) {
        console.log('the lenght of the array is  ', this.fruits.length);
        if (this.fruits.length <= 1)
            this.showClearButton = false;
        console.log('chip removed called');
        console.log(this.showClearButton);
        var currentItemDelete = fruit.name;
        console.log('item deleted is :  ', currentItemDelete);
        var index = this.fruits.indexOf(fruit);
        if (index >= 0) {
            this.fruits.splice(index, 1);
            this.chipSpecialityEmit = this.chipSpeciality.filter(function (item) { return item.value !== currentItemDelete; });
            console.log(this.chipSpecialityEmit);
            this.filterService.emitFilterSpeciality(this.chipSpecialityEmit);
            this.filterService.chipCallMethod(this.chipSpecialityEmit);
        }
    };
    __decorate([
        core_1.Input()
    ], FilterChipsComponent.prototype, "selectedValues");
    FilterChipsComponent = __decorate([
        core_1.Component({
            selector: 'app-filter-chips',
            templateUrl: './filter-chips.component.html',
            styleUrls: ['./filter-chips.component.scss']
        })
    ], FilterChipsComponent);
    return FilterChipsComponent;
}());
exports.FilterChipsComponent = FilterChipsComponent;
