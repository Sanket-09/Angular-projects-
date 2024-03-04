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
var DashboardService = /** @class */ (function () {
    function DashboardService(apiService) {
        this.apiService = apiService;
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
        this.AppointmentTotalListHeader = {
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
    DashboardService.prototype.getSideNavCount = function () {
        return this.apiService.getRequest('followup/service/sidbar/count');
    };
    DashboardService.prototype.getSpecialityList = function () {
        return this.apiService.getRequest('followup/service/specialty/all');
    };
    DashboardService.prototype.getBucketCount = function () {
        return this.apiService.postRequest('physician-appointment/service/count', this.bucketCountHeader);
    };
    DashboardService.prototype.getAppointmentTotalList = function () {
        return this.apiService.postRequest('physician-appointment/service/list', this.AppointmentTotalListHeader);
    };
    DashboardService.prototype.getSpecialityMap = function () {
        return this.apiService.getRequest('speciality/all ');
    };
    DashboardService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DashboardService);
    return DashboardService;
}());
exports.DashboardService = DashboardService;
