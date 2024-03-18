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
var hero_child_component_1 = require("./components/parent-child-communication/hero-child/hero-child.component");
var hero_parent_component_1 = require("./components/parent-child-communication/hero-parent/hero-parent.component");
var basic_component_component_1 = require("./components/content-projection/basic-component/basic-component.component");
var multi_content_projection_component_1 = require("./components/content-projection/multi-content-projection/multi-content-projection.component");
var conditional_content_projection_component_1 = require("./components/content-projection/conditional-content-projection/conditional-content-projection.component");
var common_1 = require("@angular/common");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                hero_child_component_1.HeroChildComponent,
                hero_parent_component_1.HeroParentComponent,
                basic_component_component_1.BasicComponentComponent,
                multi_content_projection_component_1.MultiContentProjectionComponent,
                conditional_content_projection_component_1.ConditionalContentProjectionComponent,
            ],
            imports: [platform_browser_1.BrowserModule, app_routing_module_1.AppRoutingModule, common_1.NgComponentOutlet, common_1.AsyncPipe],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
