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
    function NavbarComponent() {
        this.sideNav = [
            {
                value: 'physician-escalations-0',
                viewValue: 'Physician Escalations',
                notif: 8,
                router: 'dashboard'
            },
            {
                value: 'physician-appointments-1',
                viewValue: 'Physician Appointments',
                notif: 5,
                router: 'dashboard'
            },
            {
                value: 'lab-service-2',
                viewValue: 'Lab Service',
                notif: 4,
                router: 'dashboard'
            },
            {
                value: 'nursing-home-visit-3',
                viewValue: 'Nursing  Home Visit',
                notif: 9,
                router: 'dashboard'
            },
            {
                value: 'nursing-care-service-4',
                viewValue: 'Nursing Care Service',
                notif: 7,
                router: 'dashboard'
            },
            {
                value: 'physiotherapy-5',
                viewValue: 'Physiotherapy',
                notif: 1,
                router: 'dashboard'
            },
            {
                value: 'dietician-6',
                viewValue: 'Dietician',
                notif: 0,
                router: 'dashboard'
            },
            {
                value: 'psychologist-7',
                viewValue: 'Psychologist',
                notif: 3,
                router: 'dashboard'
            },
        ];
    }
    NavbarComponent.prototype.selectCard = function (sideNav) {
        this.selectedCard = sideNav;
    };
    NavbarComponent.prototype.isSelected = function (sideNav) {
        return this.selectedCard === sideNav;
    };
    NavbarComponent.prototype.ngOnInit = function () { };
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
