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
        this.chipVisit = [];
        this.chipVisitEmit = [];
        this.chipSpeciality = [];
        this.chipSpecialityEmit = [];
        this.chipCategory = [];
        this.chipCategoryEmit = [];
        this.allchip = [];
        this.allChipEmit = [];
        this.filterService.filterChangedSpeciality$.subscribe(function (speciality) {
            _this.updateList(speciality);
        });
        this.filterService.filterChangedCategory$.subscribe(function (category) {
            _this.updateList(category);
        });
        this.filterService.filterChangedVisit$.subscribe(function (visitType) {
            _this.updateList(visitType);
        });
    }
    FilterChipsComponent.prototype.clearList = function () {
        this.showClearButton = true;
        this.fruits = [];
        this.filterService.emitFilterCategory([]);
        this.filterService.emitFilterSpeciality([]);
        this.filterService.emitFilterVisit([]);
    };
    FilterChipsComponent.prototype.updateList = function (list) {
        this.updateFruits(list);
    };
    FilterChipsComponent.prototype.updateFruits = function (speciality) {
        var _this = this;
        this.fruits = [];
        this.chipVisit = [];
        this.chipSpeciality = [];
        this.chipCategory = [];
        this.allchip = [];
        if (speciality.length > 4) {
            this.showClearButton = true;
        }
        else
            this.showClearButton = false;
        speciality.forEach(function (obj) {
            Object.keys(obj).forEach(function (key) {
                if (typeof obj[key] === 'string') {
                    _this.fruits.push({ name: obj[key] });
                    if (obj[key] == 'Escalation' ||
                        obj[key] == 'Compliance' ||
                        obj[key] == 'Other Appointments') {
                        _this.chipVisit.push({ key1: 1, value: obj[key] });
                        _this.allchip.push({ key1: 1, value: obj[key] });
                    }
                    if (obj[key] == 'Hospital Visit' ||
                        obj[key] == 'Tele-consultation' ||
                        obj[key] == 'Home Visit') {
                        _this.chipSpeciality.push({ key1: 1, value: obj[key] });
                        _this.allchip.push({ key1: 1, value: obj[key] });
                    }
                    else {
                        _this.chipCategory.push({ key1: 1, value: obj[key] });
                        _this.allchip.push({ key1: 1, value: obj[key] });
                    }
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
        console.log('chip removed called');
        console.log(this.showClearButton);
        var currentItemDelete = fruit.name;
        console.log('item deleted is :  ', currentItemDelete);
        var index = this.fruits.indexOf(fruit);
        if (index >= 0) {
            this.fruits.splice(index, 1);
            if (currentItemDelete == 'Escalation' ||
                currentItemDelete == 'Compliance' ||
                currentItemDelete == 'Other Appointments') {
                this.chipVisitEmit = this.chipVisit.filter(function (item) { return item.value !== currentItemDelete; });
                this.allChipEmit = this.allchip.filter(function (item) { return item.value !== currentItemDelete; });
            }
            else if (currentItemDelete == 'Hospital Visit' ||
                currentItemDelete == 'Home Visit' ||
                currentItemDelete == 'Tele-consultation') {
                this.chipSpecialityEmit = this.chipSpeciality.filter(function (item) { return item.value !== currentItemDelete; });
                this.allChipEmit = this.allchip.filter(function (item) { return item.value !== currentItemDelete; });
            }
            else {
                this.chipCategoryEmit = this.chipCategory.filter(function (item) { return item.value !== currentItemDelete; });
                this.allChipEmit = this.allchip.filter(function (item) { return item.value !== currentItemDelete; });
            }
            var emitCategory = this.chipVisit.map(function (item) { return item.value; });
            console.log('the emitted chiplist is :  ', this.chipVisitEmit + '   and its type is  : ', typeof this.chipVisitEmit);
            if (currentItemDelete == 'Escalation' ||
                currentItemDelete == 'Compliance' ||
                currentItemDelete == 'Other Appointments')
                this.filterService.emitFilterVisit(this.chipVisitEmit);
            else if (currentItemDelete == 'Hospital Visit' ||
                currentItemDelete == 'Home Visit' ||
                currentItemDelete == 'Tele-consultation')
                this.filterService.emitFilterSpeciality(this.chipSpecialityEmit);
            else {
                console.log('rmeoveed element from catgegory  :  ', this.chipCategoryEmit);
                this.filterService.emitFilterCategory(this.chipCategoryEmit);
            }
            this.filterService.chipCallMethod(this.chipVisitEmit);
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
