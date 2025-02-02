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
var home_page_component_1 = require("./modules/dashboard/pages/home-page/home-page.component");
var dashboard_component_1 = require("./modules/dashboard/dashboard.component");
var landing_page_component_1 = require("./modules/dashboard/pages/landing-page/landing-page.component");
var page_not_found_component_1 = require("./modules/dashboard/pages/page-not-found/page-not-found.component");
var appRoute = [
    { path: '', pathMatch: 'full', redirectTo: 'homepage' },
    {
        path: 'homepage',
        component: home_page_component_1.HomePageComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
            { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
            { path: 'pageNotFound', component: page_not_found_component_1.PageNotFoundComponent },
        ]
    },
    { path: 'landing', component: landing_page_component_1.LandingPageComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(appRoute)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
