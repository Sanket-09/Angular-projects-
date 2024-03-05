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
var TableComponent = /** @class */ (function () {
    function TableComponent(tabService, filterService, router, cdRef, dashBoardService) {
        var _this = this;
        this.tabService = tabService;
        this.filterService = filterService;
        this.router = router;
        this.cdRef = cdRef;
        this.dashBoardService = dashBoardService;
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
        this.dataSource = new table_1.MatTableDataSource();
        this.filteredDataSource = new table_1.MatTableDataSource();
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
        this.filterSubscriptionCategory =
            this.filterService.filterChangedCategory$.subscribe(function (filter) {
                _this.applyCategoryFilter(filter);
            });
    }
    TableComponent.prototype.getRecord = function (data) {
        var queryParams = {};
        queryParams['id'] = data.id; // Create a dictionary containing the query parameter
        this.router.navigate(['landing'], {
            queryParams: queryParams
        });
    };
    TableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dashBoardService.getAppointmentTotalList().subscribe(function (data) {
            // Initialize data sources
            _this.dataSource = new table_1.MatTableDataSource(data.data[0].service_list);
            _this.filteredDataSource = new table_1.MatTableDataSource(data.data[0].service_list);
            // Set table value
            _this.setTableValue(data);
            // Set paginator for filteredDataSource
            _this.filteredDataSource.paginator = _this.paginator;
        });
        this.dashBoardService.getSpecialityMapId().subscribe(function (data) {
            _this.speicialityMapId = data.data;
        });
    };
    TableComponent.prototype.setTableValue = function (data) { };
    // ngDoCheck(): void {
    //   this.filteredDataSource.paginator = this.paginator
    //   this.cdRef.detectChanges()
    //   console.log('ng do check is called')
    // }
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
    TableComponent.prototype.applySearchFilter = function (searchValue) { };
    TableComponent.prototype.applyStatusFilter = function (filterValue) {
        var _this = this;
        if (filterValue == 'Total Request')
            filterValue = 'total';
        this.dashBoardService.appointmentHeader.update({
            currentStatus: filterValue.toLowerCase()
        });
        var response = this.dashBoardService.getAppointmentTotalList();
        response.subscribe(function (data) {
            // Update the data property of filteredDataSource
            _this.filteredDataSource.data = data.data[0].service_list;
            _this.filteredDataSource.paginator = _this.paginator;
            _this.dashBoardService.notifyDataUpdated();
        });
    };
    TableComponent.prototype.applySpecialityFilter = function (specialities) {
        var _this = this;
        var selectedSpecialities = specialities.map(function (item) { return item.value; });
        this.dashBoardService.appointmentHeader.update({
            currentCategory: selectedSpecialities
        });
        var response = this.dashBoardService.getAppointmentTotalList();
        response.subscribe(function (data) {
            // Rest of the code
            _this.filteredDataSource.data = data.data[0].service_list;
            _this.filteredDataSource.paginator = _this.paginator;
            _this.dashBoardService.notifyDataUpdated();
        });
        // response.subscribe((data) => {
        //   this.filteredDataSource.data = data.data[0].service_list
        //   this.filteredDataSource.paginator = this.paginator
        // })
        // setTimeout(() => {
        //   // Access the filtered data after the filter is applied
        //   const filteredData = this.filteredDataSource.filteredData;
        //   console.log(filteredData);
        // }, 0);
    };
    TableComponent.prototype.applyCategoryFilter = function (specialities) {
        var _this = this;
        var selectedSpecialities = specialities.map(function (item) { return item.name; });
        var mappingObject = {};
        this.speicialityMapId.forEach(function (obj) {
            mappingObject[obj.name] = obj.id;
        });
        var mapIdData = [];
        var mapId = specialities.map(function (data) {
            mapIdData.push(parseInt(mappingObject[data.name]));
        });
        this.dashBoardService.appointmentHeader.update({
            currentSpeciality: mapIdData
        });
        var response = this.dashBoardService.getAppointmentTotalList();
        response.subscribe(function (data) {
            // Rest of the code
            _this.filteredDataSource.data = data.data[0].service_list;
            _this.filteredDataSource.paginator = _this.paginator;
            _this.dashBoardService.notifyDataUpdated();
        });
        // response.subscribe((data) => {
        //   this.filteredDataSource.data = data.data[0].service_list
        //   this.filteredDataSource.paginator = this.paginator
        // })
        // setTimeout(() => {
        //   // Access the filtered data after the filter is applied
        //   const filteredData = this.filteredDataSource.filteredData;
        //   console.log(filteredData);
        // }, 0);
    };
    TableComponent.prototype.applyVisitFilter = function (specialities) {
        var _this = this;
        var selectedSpecialities = specialities.map(function (item) { return item.value; });
        this.dashBoardService.appointmentHeader.update({
            currentVisitType: selectedSpecialities
        });
        var response = this.dashBoardService.getAppointmentTotalList();
        response.subscribe(function (data) {
            // Rest of the code
            _this.filteredDataSource.data = data.data[0].service_list;
            _this.filteredDataSource.paginator = _this.paginator;
            _this.dashBoardService.notifyDataUpdated();
        });
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
