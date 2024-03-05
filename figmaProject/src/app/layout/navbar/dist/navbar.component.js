"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavbarComponent = void 0;
var core_1 = require("@angular/core");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(dashBoardService) {
        this.dashBoardService = dashBoardService;
        this.sideNav = [
            {
                value: 'physician-escalations-0',
                viewValue: 'Physician Escalations',
                notif: 0,
                router: 'pageNotFound'
            },
            {
                value: 'physician-appointments-1',
                viewValue: 'Physician Appointments',
                notif: 1,
                router: 'dashboard'
            },
            {
                value: 'lab-service-2',
                viewValue: 'Lab Service',
                notif: 2,
                router: 'pageNotFound'
            },
            {
                value: 'nursing-home-visit-3',
                viewValue: 'Nursing  Home Visit',
                notif: 3,
                router: 'pageNotFound'
            },
            {
                value: 'nursing-care-service-4',
                viewValue: 'Nursing Care Service',
                notif: 4,
                router: 'pageNotFound'
            },
            {
                value: 'physiotherapy-5',
                viewValue: 'Physiotherapy',
                notif: 5,
                router: 'pageNotFound'
            },
            {
                value: 'dietician-6',
                viewValue: 'Dietician',
                notif: 6,
                router: 'pageNotFound'
            },
            {
                value: 'psychologist-7',
                viewValue: 'Psychologist',
                notif: 7,
                router: 'pageNotFound'
            },
        ];
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dashBoardService.getSideNavCount().subscribe(function (data) {
            _this.sideNavData = data.data[0];
            _this.sideNav[0].notif = _this.sideNavData.CCC_FUP_PHYSICIAN_ESCALATION;
            _this.sideNav[1].notif = _this.sideNavData.CCC_FUP_PHSICIAN_APPOINTMENT;
            _this.sideNav[2].notif = _this.sideNavData.labs;
            _this.sideNav[3].notif = _this.sideNavData.nursing_home_visit;
            _this.sideNav[4].notif = _this.sideNavData.nursing_care;
            _this.sideNav[5].notif = _this.sideNavData.CCC_FUP_PHYSIOTHERAPY;
            _this.sideNav[6].notif = _this.sideNavData.dietician;
            _this.sideNav[7].notif = _this.sideNavData.psychologist;
        });
    };
    NavbarComponent.prototype.selectCard = function (sideNav) {
        this.sideNav.forEach(function (nav) { return (nav.selected = false); }); // Deselect all cards
        sideNav.selected = true; // Select the clicked card
        this.selectedCard = sideNav;
    };
    NavbarComponent.prototype.isSelected = function (sideNav) {
        return this.selectedCard === sideNav;
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'app-navbar',
            templateUrl: './navbar.component.html',
            styleUrls: ['./navbar.component.scss']
        })
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
function assignvalue() {
    throw new Error('Function not implemented.');
}
