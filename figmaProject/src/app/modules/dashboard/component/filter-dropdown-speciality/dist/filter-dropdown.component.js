"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.FilterDropdownComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var demo_data_1 = require("./demo-data");
var FilterDropdownComponent = /** @class */ (function () {
    function FilterDropdownComponent(FilterService, cdRef, dashBoardService) {
        var _this = this;
        this.FilterService = FilterService;
        this.cdRef = cdRef;
        this.dashBoardService = dashBoardService;
        this.selectedValuesChange = new core_1.EventEmitter();
        this.selectedValues = [];
        this.allSelected = false;
        this.banks = demo_data_1.BANKS;
        /** control for the selected bank for multi-selection */
        this.bankMultiCtrl = new forms_1.FormControl([]);
        /** control for the MatSelect filter keyword multi-selection */
        this.bankMultiFilterCtrl = new forms_1.FormControl('');
        /** list of banks filtered by search keyword */
        this.filteredBanksMulti = new rxjs_1.ReplaySubject(1);
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new rxjs_1.Subject();
        this.subscription = this.FilterService.chipMethodCalled$.subscribe(function (chipEmitList) {
            _this.onChipMethodCalled(chipEmitList);
        });
    }
    FilterDropdownComponent.prototype.toggleAllSelection = function () {
        var _this = this;
        this.filteredBanksMulti
            .asObservable()
            .pipe(operators_1.take(1))
            .subscribe(function (filteredBanks) {
            if (_this.allSelected) {
                // Select all options except ngx-mat-select-search
                var banksToSelect = filteredBanks.filter(function (bank) { return bank.name !== 'ngx-mat-select-search'; });
                _this.bankMultiCtrl.setValue(banksToSelect);
            }
            else {
                _this.bankMultiCtrl.setValue([]);
            }
        });
    };
    FilterDropdownComponent.prototype.onSelectionChange = function ($event) {
        // this.selectedValuesChange.emit(this.selectedValues.join(','));
        console.log('Event received in specility is : ', $event);
        if ($event.isUserInput) {
            if ($event.source.selected) {
                this.selectedValues.push($event.source.value);
                console.log('this is the selected Values  ', this.selectedValues);
            }
            else {
                this.selectedValues = this.selectedValues.filter(function (value) { return value !== $event.source.value; });
            }
        }
        this.cdRef.detectChanges();
        console.log(this.selectedValues);
    };
    FilterDropdownComponent.prototype.logSelectedValues = function () {
        // console.log(this.selectedValues);
        // this.FilterService.currentSelectedValues = this.selectedValues;
        console.log(this.selectedValues + ' selected values of speciality');
        this.FilterService.emitFilterSpeciality(this.selectedValues);
        // this.FilterService.applyFilter();
    };
    FilterDropdownComponent.prototype.cancelAll = function () {
        this.selectedValues = [];
        this.bankMultiCtrl.setValue([]);
        this.allSelected = false;
    };
    FilterDropdownComponent.prototype.onChipMethodCalled = function (chipEmitList) {
        console.log('onChipMethodCalled in spec component : ', chipEmitList);
        this.selectedValues = __spreadArrays(chipEmitList);
        console.log('this is selected values : ', this.selectedValues);
        this.onSelectionChange(chipEmitList);
        this.cdRef.detectChanges();
    };
    FilterDropdownComponent.prototype.ngOnInit = function () {
        // listen for search field value changes
        var _this = this;
        this.dashBoardService.getSpecialityList().subscribe(function (data) {
            console.log(Object.entries(data.data));
            for (var i = 0; i < Math.max(demo_data_1.BANKS.length, data.data.length); i++) {
                var existingList = demo_data_1.BANKS[i];
                var additionalUpdatedList = data.data[i];
                if (existingList && additionalUpdatedList) {
                    existingList.name = additionalUpdatedList.name;
                }
                else if (additionalUpdatedList) {
                    demo_data_1.BANKS.push({
                        key: demo_data_1.BANKS.length + i + 1,
                        name: additionalUpdatedList.name
                    });
                }
            }
            console.log(_this.banks);
            _this.bankMultiCtrl.setValue([]);
            // load the initial bank list
            _this.filteredBanksMulti.next(_this.banks.slice());
            _this.bankMultiFilterCtrl.valueChanges
                .pipe(operators_1.takeUntil(_this._onDestroy))
                .subscribe(function () {
                _this.filterBanksMulti();
            });
        });
    };
    FilterDropdownComponent.prototype.filterBanksMulti = function () {
        if (!this.banks) {
            return;
        }
        // get the search keyword
        var search = this.bankMultiFilterCtrl.value;
        if (!search) {
            this.filteredBanksMulti.next(this.banks.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.filteredBanksMulti.next(this.banks.filter(function (bank) { return bank.name.toLowerCase().indexOf(search) > -1; }));
    };
    __decorate([
        core_1.ViewChild('select')
    ], FilterDropdownComponent.prototype, "select");
    __decorate([
        core_1.Output()
    ], FilterDropdownComponent.prototype, "selectedValuesChange");
    __decorate([
        core_1.ViewChild('multiSelect', {
            static: true
        })
    ], FilterDropdownComponent.prototype, "multiSelect");
    FilterDropdownComponent = __decorate([
        core_1.Component({
            selector: 'app-filter-dropdown',
            templateUrl: './filter-dropdown.component.html',
            styleUrls: ['./filter-dropdown.component.scss']
        })
    ], FilterDropdownComponent);
    return FilterDropdownComponent;
}());
exports.FilterDropdownComponent = FilterDropdownComponent;
