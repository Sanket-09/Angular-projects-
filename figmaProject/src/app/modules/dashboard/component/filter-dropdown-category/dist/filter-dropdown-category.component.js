"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FilterDropdownCategoryComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var demo_data_1 = require("./demo-data");
var FilterDropdownCategoryComponent = /** @class */ (function () {
    function FilterDropdownCategoryComponent(FilterService, cdRef, dashBoardService) {
        var _this = this;
        this.FilterService = FilterService;
        this.cdRef = cdRef;
        this.dashBoardService = dashBoardService;
        this.selectedValuesChange = new core_1.EventEmitter();
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
    FilterDropdownCategoryComponent.prototype.toggleAllSelection = function () {
        var _this = this;
        this.filteredBanksMulti
            .asObservable()
            .pipe(operators_1.take(1))
            .subscribe(function (filteredBanks) {
            if (_this.allSelected) {
                // Select all options except ngx-mat-select-search
                var banksToSelect = filteredBanks.filter(function (bank) { return bank.value !== 'ngx-mat-select-search'; });
                _this.bankMultiCtrl.setValue(banksToSelect);
            }
            else {
                _this.bankMultiCtrl.setValue([]);
            }
        });
    };
    FilterDropdownCategoryComponent.prototype.onSelectionChange = function ($event, action) {
        // this.selectedValuesChange.emit(this.selectedValues.join(','));
        if (action == 'remove') {
            console.log($event);
            console.log(this.selectedValues);
            this.something = this.selectedValues.filter(function (value) { return value.value !== $event; });
            this.selectedValues = this.something;
        }
        this.cdRef.detectChanges();
    };
    FilterDropdownCategoryComponent.prototype.logSelectedValues = function () {
        // console.log(this.selectedValues);
        // this.FilterService.currentSelectedValues = this.selectedValues;
        this.FilterService.emitFilterSpeciality(this.selectedValues);
        // this.FilterService.applyFilter();
    };
    FilterDropdownCategoryComponent.prototype.cancelAll = function () {
        this.selectedValues = [];
        this.bankMultiCtrl.setValue([]);
        this.allSelected = false;
    };
    FilterDropdownCategoryComponent.prototype.onChipMethodCalled = function (chipEmitList) {
        this.onSelectionChange(chipEmitList, 'remove');
        this.cdRef.detectChanges();
    };
    FilterDropdownCategoryComponent.prototype.ngOnInit = function () {
        // listen for search field value changes
        var _this = this;
        this.bankMultiCtrl.setValue([]);
        // load the initial bank list
        this.filteredBanksMulti.next(this.banks.slice());
        this.bankMultiFilterCtrl.valueChanges
            .pipe(operators_1.takeUntil(this._onDestroy))
            .subscribe(function () {
            _this.filterBanksMulti();
        });
    };
    FilterDropdownCategoryComponent.prototype.filterBanksMulti = function () {
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
        this.filteredBanksMulti.next(this.banks.filter(function (bank) { return bank.value.toLowerCase().indexOf(search) > -1; }));
    };
    __decorate([
        core_1.ViewChild('select')
    ], FilterDropdownCategoryComponent.prototype, "select");
    __decorate([
        core_1.Output()
    ], FilterDropdownCategoryComponent.prototype, "selectedValuesChange");
    __decorate([
        core_1.ViewChild('multiSelect', {
            static: true
        })
    ], FilterDropdownCategoryComponent.prototype, "multiSelect");
    FilterDropdownCategoryComponent = __decorate([
        core_1.Component({
            selector: 'app-filter-dropdown-category',
            templateUrl: './filter-dropdown-category.component.html',
            styleUrls: ['./filter-dropdown-category.component.scss']
        })
    ], FilterDropdownCategoryComponent);
    return FilterDropdownCategoryComponent;
}());
exports.FilterDropdownCategoryComponent = FilterDropdownCategoryComponent;
