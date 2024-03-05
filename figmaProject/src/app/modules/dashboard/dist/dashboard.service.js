"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var appointmentHeaderModel_1 = require("./appointmentHeaderModel");
var DashboardService = /** @class */ (function () {
    function DashboardService(apiService) {
        this.apiService = apiService;
        this.selectedCardSubject = new rxjs_1.BehaviorSubject('total');
        this.selectedCard$ = this.selectedCardSubject.asObservable();
        this.filterSubject = new rxjs_1.BehaviorSubject('');
        this.filter$ = this.filterSubject.asObservable();
        this.appointmentHeader = new appointmentHeaderModel_1.AppointmentHeader();
        this.statusFilterSubject = new rxjs_1.BehaviorSubject('');
        this.statusFilter$ = this.statusFilterSubject.asObservable();
        this.dataUpdatedSubject = new rxjs_1.Subject();
    }
    DashboardService.prototype.getSpecialityMapId = function () {
        return this.apiService.getRequest('speciality/all');
    };
    DashboardService.prototype.getSideNavCount = function () {
        return this.apiService.getRequest('followup/service/sidbar/count');
    };
    DashboardService.prototype.getSpecialityList = function () {
        return this.apiService.getRequest('followup/service/specialty/all');
    };
    DashboardService.prototype.updateStatusFilter = function (filterValue) {
        this.statusFilterSubject.next(filterValue);
    };
    DashboardService.prototype.notifyDataUpdated = function () {
        this.dataUpdatedSubject.next();
    };
    DashboardService.prototype.getBucketCount = function () {
        return this.apiService.postRequest('physician-appointment/service/count', this.appointmentHeader);
    };
    DashboardService.prototype.getAppointmentTotalList = function () {
        return this.apiService.postRequest('physician-appointment/service/list', this.appointmentHeader);
    };
    DashboardService.prototype.getSpecialityMap = function () {
        return this.apiService.getRequest('speciality/all');
    };
    DashboardService.prototype.updateFilter = function (filter) {
        this.selectedCardSubject.next(filter);
        this.filterSubject.next(filter);
    };
    DashboardService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DashboardService);
    return DashboardService;
}());
exports.DashboardService = DashboardService;
