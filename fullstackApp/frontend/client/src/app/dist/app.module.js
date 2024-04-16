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
var add_tutorial_component_1 = require("./components/add-tutorial/add-tutorial.component");
var tutorial_details_component_1 = require("./components/tutorial-details/tutorial-details.component");
var tutorials_list_component_1 = require("./components/tutorials-list/tutorials-list.component");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var tutorials_published_component_1 = require("./components/tutorials-published/tutorials-published.component");
var animations_1 = require("@angular/platform-browser/animations");
var form_field_1 = require("@angular/material/form-field");
var select_1 = require("@angular/material/select");
var input_1 = require("@angular/material/input");
var button_1 = require("@angular/material/button");
var menu_1 = require("@angular/material/menu");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                add_tutorial_component_1.AddTutorialComponent,
                tutorial_details_component_1.TutorialDetailsComponent,
                tutorials_list_component_1.TutorialsListComponent,
                tutorials_published_component_1.TutorialsPublishedComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                animations_1.BrowserAnimationsModule,
                form_field_1.MatFormFieldModule,
                select_1.MatSelectModule,
                input_1.MatInputModule,
                forms_1.FormsModule,
                button_1.MatButtonModule,
                menu_1.MatMenuModule,
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
