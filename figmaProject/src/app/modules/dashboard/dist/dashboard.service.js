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
var DashboardService = /** @class */ (function () {
    function DashboardService(apiService) {
        this.apiService = apiService;
        this.selectedCardSubject = new rxjs_1.BehaviorSubject('total');
        this.selectedCard$ = this.selectedCardSubject.asObservable();
        this.filterSubject = new rxjs_1.BehaviorSubject('');
        this.filter$ = this.filterSubject.asObservable();
        this.bucketCountHeader = {
            preferred_date_from: '',
            preferred_date_to: '',
            requested_date_from: '',
            requested_date_to: '',
            offset: 0,
            page_size: 10,
            category: [],
            status: [],
            hsm_id: [],
            visit_type: [],
            selectedCard: 'pending'
        };
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
    DashboardService.prototype.getBucketCount = function () {
        return this.apiService.postRequest('physician-appointment/service/count', this.bucketCountHeader);
    };
    DashboardService.prototype.getAppointmentTotalList = function (params) {
        var AppointmentTotalListHeader = {
            preferred_date_from: '',
            preferred_date_to: '',
            requested_date_from: '',
            requested_date_to: '',
            offset: 0,
            page_size: 500,
            category: params.currentCategory || [],
            status: [],
            hsm_id: params.currentSpeciality || [],
            visit_type: params.currentVisitType || [],
            selectedCard: params.currentStatus || 'total'
        };
        console.log('getappointment called with status : ', params.currentStatus);
        console.log('getappointment called with category : ', params.currentCategory);
        console.log('getappointment called with visit type : ', params.currentVisitType);
        console.log('getappointment called with speciality : ', params.currentSpeciality);
        return this.apiService.postRequest('physician-appointment/service/list', AppointmentTotalListHeader);
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
