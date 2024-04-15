"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var tutorials_list_component_1 = require("./components/tutorials-list/tutorials-list.component");
var tutorial_details_component_1 = require("./components/tutorial-details/tutorial-details.component");
var add_tutorial_component_1 = require("./components/add-tutorial/add-tutorial.component");
var tutorials_published_component_1 = require("./components/tutorials-published/tutorials-published.component");
var routes = [
    { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
    { path: 'tutorials', component: tutorials_list_component_1.TutorialsListComponent },
    { path: 'tutorials/published', component: tutorials_published_component_1.TutorialsPublishedComponent },
    { path: 'tutorials/:id', component: tutorial_details_component_1.TutorialDetailsComponent },
    { path: 'add', component: add_tutorial_component_1.AddTutorialComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
