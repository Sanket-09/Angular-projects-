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
exports.TutorialsListComponent = void 0;
var core_1 = require("@angular/core");
var TutorialsListComponent = /** @class */ (function () {
    function TutorialsListComponent(tutorialService) {
        this.tutorialService = tutorialService;
        this.currentTutorial = {};
        this.currentIndex = -1;
        this.title = '';
        this.categories = [];
    }
    TutorialsListComponent.prototype.ngOnInit = function () {
        this.retrieveTutorials();
    };
    TutorialsListComponent.prototype.retrieveTutorials = function () {
        var _this = this;
        this.tutorialService.getAll().subscribe({
            next: function (data) {
                _this.tutorials = data;
                console.log(data);
                _this.categories = __spreadArrays(new Set(data.map(function (movie) { return movie.description; })));
                _this.categories.push('Show All');
                _this.categories.reverse();
                console.log(_this.categories);
            },
            error: function (e) { return console.error(e); }
        });
    };
    TutorialsListComponent.prototype.refreshList = function () {
        this.retrieveTutorials();
        this.currentTutorial = {};
        this.currentIndex = -1;
    };
    TutorialsListComponent.prototype.setActiveTutorial = function (tutorial, index) {
        this.currentTutorial = tutorial;
        this.currentIndex = index;
    };
    TutorialsListComponent.prototype.removeAllTutorials = function () {
        var _this = this;
        this.tutorialService.deleteAll().subscribe({
            next: function (res) {
                console.log(res);
                _this.refreshList();
            },
            error: function (e) { return console.error(e); }
        });
    };
    TutorialsListComponent.prototype.searchTitle = function () {
        var _this = this;
        this.currentTutorial = {};
        this.currentIndex = -1;
        this.tutorialService.findByTitle(this.title).subscribe({
            next: function (data) {
                _this.tutorials = data;
            },
            error: function (e) { return console.error(e); }
        });
    };
    TutorialsListComponent.prototype.onCategoryChange = function ($event) {
        var _this = this;
        this.tutorialService.getSortedData(this.currentCategory).subscribe({
            next: function (data) {
                _this.tutorials = data;
            },
            error: function (e) { return console.log(e); }
        });
    };
    TutorialsListComponent = __decorate([
        core_1.Component({
            selector: 'app-tutorials-list',
            templateUrl: './tutorials-list.component.html',
            styleUrls: ['./tutorials-list.component.css']
        })
    ], TutorialsListComponent);
    return TutorialsListComponent;
}());
exports.TutorialsListComponent = TutorialsListComponent;
