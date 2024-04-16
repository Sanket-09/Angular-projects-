"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TutorialsPublishedComponent = void 0;
var core_1 = require("@angular/core");
var TutorialsPublishedComponent = /** @class */ (function () {
    function TutorialsPublishedComponent(tutorialService) {
        this.tutorialService = tutorialService;
        this.currentTutorial = {};
        this.currentIndex = -1;
        this.title = '';
    }
    TutorialsPublishedComponent.prototype.ngOnInit = function () {
        this.retrieveTutorials();
    };
    TutorialsPublishedComponent.prototype.retrieveTutorials = function () {
        var _this = this;
        this.tutorialService.getAllPublished().subscribe({
            next: function (data) {
                _this.tutorials = data;
                console.log(data);
            },
            error: function (e) { return console.error(e); }
        });
    };
    TutorialsPublishedComponent.prototype.refreshList = function () {
        this.retrieveTutorials();
        this.currentTutorial = {};
        this.currentIndex = -1;
    };
    TutorialsPublishedComponent.prototype.setActiveTutorial = function (tutorial, index) {
        this.currentTutorial = tutorial;
        this.currentIndex = index;
    };
    TutorialsPublishedComponent.prototype.searchTitle = function () {
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
    TutorialsPublishedComponent = __decorate([
        core_1.Component({
            selector: 'app-tutorials-published',
            templateUrl: './tutorials-published.component.html',
            styleUrls: ['./tutorials-published.component.css']
        })
    ], TutorialsPublishedComponent);
    return TutorialsPublishedComponent;
}());
exports.TutorialsPublishedComponent = TutorialsPublishedComponent;
