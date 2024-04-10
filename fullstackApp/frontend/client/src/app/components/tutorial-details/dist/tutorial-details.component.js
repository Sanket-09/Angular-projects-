"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TutorialDetailsComponent = void 0;
var core_1 = require("@angular/core");
var TutorialDetailsComponent = /** @class */ (function () {
    function TutorialDetailsComponent(tutorialService, route, router) {
        this.tutorialService = tutorialService;
        this.route = route;
        this.router = router;
        this.viewMode = false;
        this.currentTutorial = {
            title: '',
            description: '',
            published: false
        };
        this.message = '';
    }
    TutorialDetailsComponent.prototype.ngOnInit = function () {
        if (!this.viewMode) {
            this.message = '';
            this.getTutorial(this.route.snapshot.params['id']);
        }
    };
    TutorialDetailsComponent.prototype.getTutorial = function (id) {
        var _this = this;
        this.tutorialService.get(id).subscribe({
            next: function (data) {
                _this.currentTutorial = data;
                console.log(data);
            },
            error: function (e) { return console.error(e); }
        });
    };
    TutorialDetailsComponent.prototype.updatePublished = function (status) {
        var _this = this;
        var data = {
            title: this.currentTutorial.title,
            description: this.currentTutorial.description,
            published: status
        };
        this.message = '';
        this.tutorialService.update(this.currentTutorial.id, data).subscribe({
            next: function (res) {
                console.log(res);
                _this.currentTutorial.published = status;
                _this.message = res.message
                    ? res.message
                    : 'The status was updated successfully!';
            },
            error: function (e) { return console.error(e); }
        });
    };
    TutorialDetailsComponent.prototype.updateTutorial = function () {
        var _this = this;
        this.message = '';
        this.tutorialService
            .update(this.currentTutorial.id, this.currentTutorial)
            .subscribe({
            next: function (res) {
                console.log(res);
                _this.message = res.message
                    ? res.message
                    : 'This tutorial was updated successfully!';
            },
            error: function (e) { return console.error(e); }
        });
    };
    TutorialDetailsComponent.prototype.deleteTutorial = function () {
        var _this = this;
        this.tutorialService["delete"](this.currentTutorial.id).subscribe({
            next: function (res) {
                console.log(res);
                _this.router.navigate(['/tutorials']);
            },
            error: function (e) { return console.error(e); }
        });
    };
    __decorate([
        core_1.Input()
    ], TutorialDetailsComponent.prototype, "viewMode");
    __decorate([
        core_1.Input()
    ], TutorialDetailsComponent.prototype, "currentTutorial");
    TutorialDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-tutorial-details',
            templateUrl: './tutorial-details.component.html',
            styleUrls: ['./tutorial-details.component.css']
        })
    ], TutorialDetailsComponent);
    return TutorialDetailsComponent;
}());
exports.TutorialDetailsComponent = TutorialDetailsComponent;
