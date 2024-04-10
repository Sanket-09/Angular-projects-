"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddTutorialComponent = void 0;
var core_1 = require("@angular/core");
var AddTutorialComponent = /** @class */ (function () {
    function AddTutorialComponent(tutorialService) {
        this.tutorialService = tutorialService;
        this.tutorial = {
            title: '',
            description: '',
            published: false
        };
        this.submitted = false;
    }
    AddTutorialComponent.prototype.saveTutorial = function () {
        var _this = this;
        var data = {
            title: this.tutorial.title,
            description: this.tutorial.description
        };
        this.tutorialService.create(data).subscribe({
            next: function (res) {
                console.log(res);
                _this.submitted = true;
            },
            error: function (e) { return console.error(e); }
        });
    };
    AddTutorialComponent.prototype.newTutorial = function () {
        this.submitted = false;
        this.tutorial = {
            title: '',
            description: '',
            published: false
        };
    };
    AddTutorialComponent = __decorate([
        core_1.Component({
            selector: 'app-add-tutorial',
            templateUrl: './add-tutorial.component.html',
            styleUrls: ['./add-tutorial.component.css']
        })
    ], AddTutorialComponent);
    return AddTutorialComponent;
}());
exports.AddTutorialComponent = AddTutorialComponent;
