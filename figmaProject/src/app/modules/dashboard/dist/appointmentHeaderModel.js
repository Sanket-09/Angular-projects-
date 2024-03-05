"use strict";
exports.__esModule = true;
exports.AppointmentHeader = void 0;
// appointment-header.model.ts
var AppointmentHeader = /** @class */ (function () {
    function AppointmentHeader() {
        this.preferred_date_from = '';
        this.preferred_date_to = '';
        this.requested_date_from = '';
        this.requested_date_to = '';
        this.offset = 0;
        this.page_size = 500;
        this.category = [];
        this.status = [];
        this.hsm_id = [];
        this.visit_type = [];
        this.selectedCard = 'total';
    }
    AppointmentHeader.prototype.update = function (params) {
        if (params.currentStatus !== undefined) {
            this.selectedCard = params.currentStatus;
        }
        if (params.currentCategory !== undefined) {
            this.category = params.currentCategory;
        }
        if (params.currentVisitType !== undefined) {
            this.visit_type = params.currentVisitType;
        }
        if (params.currentSpeciality !== undefined) {
            this.hsm_id = params.currentSpeciality;
        }
    };
    return AppointmentHeader;
}());
exports.AppointmentHeader = AppointmentHeader;
