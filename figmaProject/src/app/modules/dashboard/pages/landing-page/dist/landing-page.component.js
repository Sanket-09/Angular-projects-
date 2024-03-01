"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LandingPageComponent = exports.MY_FORMATS = void 0;
var core_1 = require("@angular/core");
var data_1 = require("../../../shared/services/data");
var _moment = require("moment");
var forms_1 = require("@angular/forms");
var moment = _moment;
exports.MY_FORMATS = {
    parse: {
        dateInput: 'LL'
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};
var LandingPageComponent = /** @class */ (function () {
    function LandingPageComponent(copyIdsnackBar, copyPhonesnackBar, router, route, clipboard, _snackBar) {
        this.copyIdsnackBar = copyIdsnackBar;
        this.copyPhonesnackBar = copyPhonesnackBar;
        this.router = router;
        this.route = route;
        this.clipboard = clipboard;
        this._snackBar = _snackBar;
        this.physicianServiceBool = false;
        this.physicianServiceNotesBool = false;
        this.matCardStatus = false;
        this.matCardColor = document.querySelectorAll('.mat-card-status');
        this.matCardStatusColor = '';
        this.date = new forms_1.FormControl(moment());
        this.currentStatusResolved = false;
        this.currentStatusPending = false;
        this.selectedTabIndex = 1;
    }
    LandingPageComponent.prototype.radioNotReqButtonClicked = function () {
        this.matCardStatusValue = 'Closed';
        this.physicianServiceBool = false;
        this.physicianServiceNotesBool = true;
        this.matCardStatus = true;
        this.matCardStatusColor = '#F0F1F3';
    };
    LandingPageComponent.prototype.radioYesButtonClicked = function () {
        this.matCardStatusValue = 'Pending';
        this.physicianServiceBool = true;
        this.matCardStatus = true;
        this.physicianServiceNotesBool = true;
        this.matCardStatusColor = '#fde9e7';
    };
    LandingPageComponent.prototype.radioNoButtonClicked = function () {
        this.matCardStatusValue = 'Resolved';
        this.physicianServiceBool = false;
        this.matCardStatus = true;
        this.physicianServiceNotesBool = false;
        this.matCardStatusColor = '#D7F9EA';
    };
    LandingPageComponent.prototype.tabChanged = function ($event) {
        this.checkStatus();
    };
    LandingPageComponent.prototype.checkStatus = function () {
        if (this.currentElement.status === 'Pending') {
            this.selectedTabIndex = 0;
            this.currentStatusPending = true;
        }
        else {
            this.currentStatusPending = false;
            this.selectedTabIndex = 1;
        }
        if (this.currentElement.status === 'Closed' ||
            this.currentElement.status === 'Resolved') {
            this.currentStatusResolved = true;
        }
        else
            this.currentStatusResolved = false;
    };
    LandingPageComponent.prototype.getCurrentStatus = function () {
        console.log('asidbiadb');
    };
    LandingPageComponent.prototype.copyPhonefn = function (message, action) {
        var _a;
        var idContent = (_a = document.getElementById('copyPhoneNumber')) === null || _a === void 0 ? void 0 : _a.innerText;
        if (idContent) {
            this.clipboard.copy(idContent);
            this.copyPhonesnackBar.open(message, action, {
                duration: 2000,
                panelClass: ['blue-snackbar'],
                verticalPosition: 'bottom',
                horizontalPosition: 'start'
            });
        }
        else
            alert('Error');
    };
    LandingPageComponent.prototype.copyIdfn = function (message, action) {
        var _a;
        var idContent = (_a = document.getElementById('copyId')) === null || _a === void 0 ? void 0 : _a.innerText;
        if (idContent) {
            this.clipboard.copy(idContent);
            this.copyIdsnackBar.open(message, action, {
                duration: 2000,
                panelClass: ['blue-snackbar'],
                verticalPosition: 'bottom',
                horizontalPosition: 'start'
            });
        }
        else
            alert('Error');
    };
    LandingPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParamMap.subscribe(function (params) {
            var id = params.get('id');
            console.log(id);
            _this.currentId = id; // or do whatever you want with the id value
            _this.currentElement = data_1.ELEMENT_DATA.find(function (element) { return element.id === _this.currentId; });
            console.log(_this.currentElement);
        });
        this.checkStatus();
        this.consultedDateControl = new forms_1.FormControl(null, [forms_1.Validators.required]);
        this.formGroup = new forms_1.FormGroup({
            consultedDate: this.consultedDateControl
        });
    };
    LandingPageComponent.prototype.navigateToDashboard = function () {
        // Navigate to the dashboard route
        console.log('navigate called');
        this.router.navigate(['/homepage']);
    };
    LandingPageComponent.prototype.openSnackBar = function (message, action) {
        this._snackBar.open(message, action, {
            duration: 2000,
            panelClass: ['blue-snackbar'],
            verticalPosition: 'bottom',
            horizontalPosition: 'start'
        });
        this.navigateToDashboard();
    };
    LandingPageComponent = __decorate([
        core_1.Component({
            selector: 'app-landing-page',
            templateUrl: './landing-page.component.html',
            styleUrls: ['./landing-page.component.scss']
        })
    ], LandingPageComponent);
    return LandingPageComponent;
}());
exports.LandingPageComponent = LandingPageComponent;
