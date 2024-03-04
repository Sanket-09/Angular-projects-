"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FilterContentComponent = void 0;
var core_1 = require("@angular/core");
var FilterContentComponent = /** @class */ (function () {
    function FilterContentComponent(FilterService, dashBoardService) {
        this.FilterService = FilterService;
        this.dashBoardService = dashBoardService;
        this.allDataCount = 0;
        this.pendingDataCount = 0;
        this.resolvedDataCount = 0;
        this.closedDataCount = 0;
        this.currentStatus = new core_1.EventEmitter();
    }
    FilterContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dashBoardService.getBucketCount().subscribe(function (data) {
            console.log(data.data);
            _this.allDataCount = data.data[0].count;
            _this.pendingDataCount = data.data[1].count;
            _this.resolvedDataCount = data.data[2].count;
            _this.closedDataCount = data.data[3].count;
            _this.initializeCards();
        });
    };
    FilterContentComponent.prototype.initializeCards = function () {
        this.cards = [
            {
                icon: './../../../../assets/icons-unselected-filter-content/hour-glass.fill.svg',
                iconSelected: './../../../../assets/icons-selected-filter-content/hour-glass.fill.svg',
                value1: this.pendingDataCount,
                value2: 'Pending',
                bgColor: 'white'
            },
            {
                icon: './../../../../assets/icons-unselected-filter-content/Recommend.fill.svg',
                iconSelected: './../../../../assets/icons-selected-filter-content/Recommend.fill.svg',
                value1: this.resolvedDataCount,
                value2: 'Resolved',
                bgColor: 'white'
            },
            {
                icon: './../../../../assets/icons-unselected-filter-content/checkbox.fill.svg',
                iconSelected: './../../../../assets/icons-selected-filter-content/checkbox.fill.svg',
                value1: this.closedDataCount,
                value2: 'Closed',
                bgColor: 'white'
            },
            {
                icon: './../../../../assets/icons-unselected-filter-content/Group.fill.svg',
                iconSelected: './../../../../assets/icons-selected-filter-content/Group.fill.svg',
                value1: this.allDataCount,
                value2: 'Total Request',
                bgColor: 'white'
            },
        ];
    };
    FilterContentComponent.prototype.selectCard = function (card) {
        this.selectedCard = card;
        this.applyFilter(card.value2);
    };
    FilterContentComponent.prototype.applyFilter = function (status) {
        this.FilterService.emitFilter(status);
        // this.FilterService.currentFilterStatus = status;
        // this.FilterService.applyFilter();
    };
    FilterContentComponent.prototype.isSelected = function (card) {
        return this.selectedCard === card;
    };
    FilterContentComponent.prototype.selectCardIcon = function (card) {
        this.selectedCard = card;
    };
    FilterContentComponent.prototype.isSelectedIcon = function (card) {
        return this.selectedCard === card;
    };
    __decorate([
        core_1.Output()
    ], FilterContentComponent.prototype, "currentStatus");
    FilterContentComponent = __decorate([
        core_1.Component({
            selector: 'app-filter-content',
            templateUrl: './filter-content.component.html',
            styleUrls: ['./filter-content.component.scss']
        })
    ], FilterContentComponent);
    return FilterContentComponent;
}());
exports.FilterContentComponent = FilterContentComponent;
