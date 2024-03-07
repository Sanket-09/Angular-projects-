"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RangeDatePickerComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var moment = require("moment");
var RangeDatePickerComponent = /** @class */ (function () {
    function RangeDatePickerComponent(cdRef, FilterService) {
        var _this = this;
        this.cdRef = cdRef;
        this.FilterService = FilterService;
        this.selectedValuesChange = new core_1.EventEmitter();
        this.range = new forms_1.FormGroup({
            start: new forms_1.FormControl(),
            end: new forms_1.FormControl()
        });
        this.range1 = new forms_1.FormGroup({
            start1: new forms_1.FormControl(),
            end1: new forms_1.FormControl()
        });
        this.showFilterOptions = false;
        this.speciality = new forms_1.FormControl();
        // specs: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
        this.specs1 = [
            { key: 1, value: 'General Medicine' },
            { key: 2, value: 'Cardiology' },
            { key: 3, value: 'Pediatrics' },
            { key: 4, value: 'Oncologist' },
            { key: 5, value: 'Endocrinologist' },
            { key: 6, value: 'Neurology' },
            { key: 7, value: 'Radiology' },
        ];
        this.status = [
            { key: 1, value: 'Pending' },
            { key: 2, value: 'Resolved' },
            { key: 3, value: 'Closed' },
        ];
        this.physicianVisitType = [
            { key: 1, value: 'Escalation' },
            { key: 2, value: 'Compliance' },
            { key: 3, value: 'Other Appointments' },
        ];
        this.physicianCategory = [
            { key: 1, value: 'Hospital Visit' },
            { key: 2, value: 'Tele-consulation' },
            { key: 3, value: 'Home Visit' },
        ];
        this.subscription = this.FilterService.chipMethodCalled$.subscribe(function (chipEmitList) {
            _this.onChipMethodCalled(chipEmitList);
        });
    }
    RangeDatePickerComponent.prototype.handleDateFilterChange = function (event) { };
    RangeDatePickerComponent.prototype.handleVisitFilterDataChange = function (event, action) {
        if (action === 'remove') {
            this.bufferArray = this.speciality.value;
            this.bufferArray = this.bufferArray.filter(function (value) { return value != event; });
            this.speciality.setValue(this.bufferArray);
        }
        this.transformedArray = event.value.map(function (value, index) { return ({
            key: index,
            value: value
        }); });
        console.log(this.speciality.value);
    };
    RangeDatePickerComponent.prototype.onChipMethodCalled = function (chipEmitList) {
        this.handleVisitFilterDataChange(chipEmitList, 'remove');
        this.cdRef.detectChanges();
    };
    // logObjectProperties(obj: any){
    //   if (typeof obj === 'object' && obj !== null) {
    //     console.log("Received object:");
    //     Object.keys(obj).forEach((key) => {
    //       console.log(`${key}:`, obj[key]);
    //       if(typeof obj[key] === 'string')
    //       this.selectedValues.push(obj[key])
    //     });
    //     console.log(this.selectedValues  +  "    this is the selected value ");
    //     this.submitVisit();
    //   }
    // }
    RangeDatePickerComponent.prototype.handleFilterDataChange = function ($event) { };
    RangeDatePickerComponent.prototype.handleStatusFilterDataChange = function ($event) {
        this.FilterService.emitFilter($event.value);
    };
    RangeDatePickerComponent.prototype.preferredDateChange = function () {
        var parsedValue = JSON.parse(JSON.stringify(this.range.value));
        console.log(this.range.value);
        var startValue = moment(parsedValue.start).format('YYYY-MM-DD');
        var endValue = moment(parsedValue.end).format('YYYY-MM-DD');
        this.FilterService.emitFilterPrefDate(startValue, endValue);
    };
    RangeDatePickerComponent.prototype.requestedDateChange = function () {
        var parsedValue1 = JSON.parse(JSON.stringify(this.range1.value));
        var startValue1 = moment(parsedValue1.start1).format('YYYY-MM-DD');
        var endValue1 = moment(parsedValue1.end1).format('YYYY-MM-DD');
        this.FilterService.emitFilterReqDate(startValue1, endValue1);
    };
    RangeDatePickerComponent.prototype.showFilter = function () {
        this.showFilterOptions = !this.showFilterOptions;
    };
    RangeDatePickerComponent.prototype.ngOnInit = function () { };
    RangeDatePickerComponent.prototype.submitVisit = function () {
        // Get the checked values and set them to the input field\
        this.FilterService.emitFilterVisit(this.transformedArray);
        // ...
    };
    RangeDatePickerComponent.prototype.cancel = function () {
        // Reset the checked values to empty
        this.speciality.setValue([]);
    };
    __decorate([
        core_1.Output()
    ], RangeDatePickerComponent.prototype, "selectedValuesChange");
    RangeDatePickerComponent = __decorate([
        core_1.Component({
            selector: 'app-range-date-picker',
            templateUrl: './range-date-picker.component.html',
            styleUrls: ['./range-date-picker.component.scss']
        })
    ], RangeDatePickerComponent);
    return RangeDatePickerComponent;
}());
exports.RangeDatePickerComponent = RangeDatePickerComponent;
