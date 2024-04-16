"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TutorialService = void 0;
var core_1 = require("@angular/core");
var baseUrl = 'http://localhost:8080/api/tutorials';
var TutorialService = /** @class */ (function () {
    function TutorialService(http) {
        this.http = http;
    }
    TutorialService.prototype.getAll = function () {
        return this.http.get(baseUrl);
    };
    TutorialService.prototype.getSortedData = function (currentCategory) {
        return this.http.get(baseUrl + "/currentCategory?category=" + currentCategory);
    };
    TutorialService.prototype.getAllPublished = function () {
        return this.http.get(baseUrl + "/published");
    };
    TutorialService.prototype.get = function (id) {
        return this.http.get(baseUrl + "/" + id);
    };
    TutorialService.prototype.create = function (data) {
        return this.http.post(baseUrl, data);
    };
    TutorialService.prototype.update = function (id, data) {
        return this.http.put(baseUrl + "/" + id, data);
    };
    TutorialService.prototype["delete"] = function (id) {
        return this.http["delete"](baseUrl + "/" + id);
    };
    TutorialService.prototype.deleteAll = function () {
        return this.http["delete"](baseUrl);
    };
    TutorialService.prototype.findByTitle = function (title) {
        return this.http.get(baseUrl + "?title=" + title);
    };
    TutorialService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], TutorialService);
    return TutorialService;
}());
exports.TutorialService = TutorialService;
