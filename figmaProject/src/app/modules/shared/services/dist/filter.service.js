"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FilterService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var FilterService = /** @class */ (function () {
    function FilterService() {
        this.currentSelectedValues = [];
        this.filterSubject = new rxjs_1.Subject();
        this.filterSubjectObj = new rxjs_1.Subject();
        this.filterSubjectVisitObj = new rxjs_1.Subject();
        this.filterSubjectCategoryObj = new rxjs_1.Subject();
        this.chipMethodSubject = new rxjs_1.Subject();
        this.chipMethodCalled$ = this.chipMethodSubject.asObservable();
        this.data = [];
        this.dataVisit = [];
        this.filterChanged$ = this.filterSubject.asObservable();
        this.filterChangedSpeciality$ = this.filterSubjectObj.asObservable();
        this.filterChangedCategory$ = this.filterSubjectCategoryObj.asObservable();
        this.filterChangedSearch$ = this.filterSubject.asObservable();
        this.filterChangedVisit$ = this.filterSubjectVisitObj.asObservable();
    }
    FilterService.prototype.chipCallMethod = function (chipSpecialityEvent) {
        this.chipMethodSubject.next(chipSpecialityEvent);
    };
    FilterService.prototype.emitFilterSearch = function (search) {
        this.filterSubject.next(search);
    };
    FilterService.prototype.emitFilter = function (filter) {
        this.filterSubject.next(filter);
        // this.emitFilterSpeciality(this.currentFilterSpeciality)
    };
    FilterService.prototype.emitFilterSpeciality = function (speciality) {
        this.data = [];
        this.currentFilterSpeciality = speciality;
        // const filterObj = {"key": Math.random() , "value" : this.currentFilter }
        // console.log(filterObj);
        // speciality.push(filterObj);
        console.log('received event speciality type ' +
            typeof speciality +
            '  value of event  ' +
            speciality);
        this.filterSubjectObj.next(speciality);
        // this.currentFilterSpeciality.forEach((obj: { [x: string]: string }) => {
        //   Object.keys(obj).forEach((key) => {
        //     console.log('key : ' + key + ' - value : ' + obj[key])
        //     if (typeof obj[key] === 'string') this.data.push(obj[key])
        //   })
        // })
    };
    FilterService.prototype.emitFilterCategory = function (speciality) {
        this.data = [];
        this.currentFilterSpeciality = speciality;
        // const filterObj = {"key": Math.random() , "value" : this.currentFilter }
        // console.log(filterObj);
        // speciality.push(filterObj);
        console.log('received event speciality type ' +
            typeof speciality +
            '  value of event  ' +
            speciality);
        this.filterSubjectCategoryObj.next(speciality);
        // this.currentFilterSpeciality.forEach((obj: { [x: string]: string }) => {
        //   Object.keys(obj).forEach((key) => {
        //     console.log('key : ' + key + ' - value : ' + obj[key])
        //     if (typeof obj[key] === 'string') this.data.push(obj[key])
        //   })
        // })
    };
    FilterService.prototype.emitFilterVisit = function (visit) {
        this.dataVisit = [];
        this.currentFilterVisit = visit;
        // const filterObj = {"key": Math.random() , "value" : this.currentFilter }
        // console.log(filterObj);
        // speciality.push(filterObj);
        console.log('received event Visit type ' + typeof visit + '  value of event  ' + visit);
        this.filterSubjectVisitObj.next(visit);
        // this.currentFilterVisit.forEach((obj: { [x: string]: string }) => {
        //   Object.keys(obj).forEach((key) => {
        //     console.log('key : ' + key + ' - value : ' + obj[key])
        //     if (typeof obj[key] === 'string') this.dataVisit.push(obj[key])
        //   })
        // })
    };
    FilterService.prototype.applyFilter = function () {
        this.emitFilterSpeciality(this.currentSelectedValues);
        this.emitFilter(this.currentFilterStatus);
        this.emitFilterVisit(this.currentFilterVisit);
    };
    FilterService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], FilterService);
    return FilterService;
}());
exports.FilterService = FilterService;
