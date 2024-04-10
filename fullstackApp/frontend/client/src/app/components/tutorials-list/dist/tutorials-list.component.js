"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
                console.log(data);
            },
            error: function (e) { return console.error(e); }
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
