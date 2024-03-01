"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TableComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var table_1 = require("@angular/material/table");
var rxjs_1 = require("rxjs");
var router_1 = require("@angular/router");
var data_1 = require("../../../services/data");
var TableComponent = /** @class */ (function () {
    function TableComponent(tabService, filterService, router, cdRef) {
        var _this = this;
        this.tabService = tabService;
        this.filterService = filterService;
        this.router = router;
        this.cdRef = cdRef;
        this.activeRoute = core_1.inject(router_1.ActivatedRoute);
        this.filteredDataSubject = new rxjs_1.BehaviorSubject([]);
        this.displayedColumns = [
            'status',
            'prefDate',
            'id',
            'name',
            'reqDate',
            'speciality',
            'visitType',
        ];
        this.dataSource = new table_1.MatTableDataSource(data_1.ELEMENT_DATA);
        this.filteredDataSource = new table_1.MatTableDataSource(data_1.ELEMENT_DATA);
        this.currentStatus = '';
        this.filterSubscription = this.filterService.filterChanged$.subscribe(function (filter) {
            _this.applyStatusFilter(filter);
        });
        this.filterSubscriptionSpeciality =
            this.filterService.filterChangedSpeciality$.subscribe(function (filter) {
                _this.applySpecialityFilter(filter);
            });
        this.filterSubscriptionVisit =
            this.filterService.filterChangedVisit$.subscribe(function (filter) {
                _this.applyVisitFilter(filter);
            });
        this.filterSubscriptionSearch =
            this.filterService.filterChangedSearch$.subscribe(function (filter) {
                _this.applySearchFilter(filter);
            });
    }
    TableComponent.prototype.getRecord = function (data) {
        console.log(data.id);
        var queryParams = {};
        queryParams['id'] = data.id; // Create a dictionary containing the query parameter
        this.router.navigate(['landing'], {
            queryParams: queryParams
        });
    };
    TableComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.filterSubscription = this.filterService.filterChanged$.subscribe(function (filter) {
            _this.applyStatusFilter(filter);
        });
        this.filterSubscriptionSpeciality =
            this.filterService.filterChangedSpeciality$.subscribe(function (filter) {
                _this.applySpecialityFilter(filter);
            });
        this.filterSubscriptionVisit =
            this.filterService.filterChangedVisit$.subscribe(function (filter) {
                _this.applyVisitFilter(filter);
            });
    };
    TableComponent.prototype.applySearchFilter = function (searchValue) {
        console.log('type of searchValue is : ' + typeof searchValue);
        console.log('SearchValue is : ' + searchValue);
        console.log('SearchValue length is : ' + searchValue.length);
        this.filteredDataSource.data = this.dataSource.data.filter(function (o) { return o.id.toLowerCase == searchValue.trim().toLowerCase; });
        this.filteredDataSource._updateChangeSubscription();
        this.cdRef.detectChanges();
        // this.filteredDataSource.filter = searchValue
        // console.log("Filter applied with searchValue  : " + searchValue )
    };
    TableComponent.prototype.applyStatusFilter = function (filterValue) {
        if (filterValue.toLowerCase() == 'total request') {
            // If 'Total Request', show the complete data without filtering
            this.filteredDataSource.data = this.dataSource.data;
            this.filteredDataSource.filter = '';
            this.cdRef.detectChanges();
        }
        else {
            // Otherwise, apply the filter
            filterValue = filterValue.trim().toLowerCase();
            // Filter the data
            var filteredData = this.dataSource.data.filter(function (item) {
                return item.status.toLowerCase().includes(filterValue);
            });
            // Update the filteredDataSource with the filtered data
            this.filteredDataSource.data = filteredData;
            this.filteredDataSource.filter = filterValue;
            this.cdRef.detectChanges();
        }
        // Trigger the filter method to update the MatTable
        this.cdRef.detectChanges();
    };
    TableComponent.prototype.applySpecialityFilter = function (specialities) {
        var selectedSpecialities = specialities.map(function (item) { return item.value; });
        this.filteredDataSource.filterPredicate = function (data, filter) {
            var selectedValues = filter.split(',');
            return selectedValues.includes(data.speciality.trim());
        };
        var filteredData = this.dataSource.data.filter(function (item) {
            return specialities.some(function (speciality) {
                return item.speciality.toLowerCase() === speciality.value.toLowerCase();
            });
        });
        this.filteredDataSource.filter = selectedSpecialities.join(',');
        this.cdRef.detectChanges();
        this.filteredDataSource.data = this.filteredDataSource.filteredData;
        this.cdRef.detectChanges();
        // setTimeout(() => {
        //   // Access the filtered data after the filter is applied
        //   const filteredData = this.filteredDataSource.filteredData;
        //   console.log(filteredData);
        // }, 0);
    };
    TableComponent.prototype.applyVisitFilter = function (specialities) {
        var selectedSpecialities = specialities.map(function (item) { return item.value; });
        // Custom filter predicate
        this.filteredDataSource.filterPredicate = function (data, filter) {
            var selectedValues = filter.split(',');
            return selectedValues.includes(data.visitType.trim());
        };
        var filteredDataSource = this.dataSource.data.filter(function (item) {
            return specialities.some(function (speciality) {
                return item.visitType.toLowerCase() === speciality.value.toLowerCase();
            });
        });
        // Update the filteredDataSource with the filtered data
        this.filteredDataSource.filter = selectedSpecialities.join(',');
        this.cdRef.detectChanges();
        this.filteredDataSource.data = this.filteredDataSource.filteredData;
        this.cdRef.detectChanges();
    };
    TableComponent.prototype.ngAfterViewInit = function () {
        this.filteredDataSource.paginator = this.paginator;
        this.cdRef.detectChanges();
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], TableComponent.prototype, "paginator");
    TableComponent = __decorate([
        core_1.Component({
            selector: 'app-table',
            templateUrl: './table.component.html',
            styleUrls: ['./table.component.scss']
        })
    ], TableComponent);
    return TableComponent;
}());
exports.TableComponent = TableComponent;
