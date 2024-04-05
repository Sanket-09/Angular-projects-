"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var animations_1 = require("@angular/platform-browser/animations");
var material_module_1 = require("./material/material.module");
var header_component_1 = require("./components/header/header.component");
var home_component_1 = require("./pages/home/home.component");
var product_header_component_1 = require("./pages/home/component/product-header/product-header.component");
var filter_component_1 = require("./pages/home/component/filter/filter.component");
var product_box_component_1 = require("./pages/home/component/product-box/product-box.component");
var cart_component_1 = require("./pages/cart/cart.component");
var service_worker_1 = require("@angular/service-worker");
var environment_1 = require("../environments/environment");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                home_component_1.HomeComponent,
                product_header_component_1.ProductHeaderComponent,
                filter_component_1.FilterComponent,
                product_box_component_1.ProductBoxComponent,
                cart_component_1.CartComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                material_module_1.MaterialModule,
                service_worker_1.ServiceWorkerModule.register('ngsw-worker.js', {
                    enabled: environment_1.environment.production,
                    registrationStrategy: 'registerWhenStable:30000'
                }),
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
