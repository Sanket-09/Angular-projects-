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
var material_module_1 = require("./material.module");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var header_component_1 = require("./layout/header/header.component");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
var navbar_component_1 = require("./layout/navbar/navbar.component");
var table_component_1 = require("./modules/dashboard/component/table/table.component");
var dashboard_component_1 = require("./modules/dashboard/dashboard.component");
var range_date_picker_component_1 = require("./modules/dashboard/component/range-date-picker/range-date-picker.component");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var ngx_mat_select_search_1 = require("ngx-mat-select-search");
var filter_dropdown_component_1 = require("./modules/dashboard/component/filter-dropdown-speciality/filter-dropdown.component");
var filter_content_component_1 = require("./modules/dashboard/component/filter-content/filter-content.component");
var filter_dropdown_category_component_1 = require("./modules/dashboard/component/filter-dropdown-category/filter-dropdown-category.component");
var filter_chips_component_1 = require("./modules/dashboard/component/filter-chips/filter-chips.component");
var home_page_component_1 = require("./modules/dashboard/pages/home-page/home-page.component");
var landing_page_component_1 = require("./modules/dashboard/pages/landing-page/landing-page.component");
var material_moment_adapter_1 = require("@angular/material-moment-adapter");
var page_not_found_component_1 = require("./modules/dashboard/pages/page-not-found/page-not-found.component");
// import { BufferComponentComponent } from './modules/component/buffer-component/buffer-component.component';
// const appRoute: Routes = [
//   { path: '', pathMatch: 'full', redirectTo: 'homepage' },
//   {
//     path: 'homepage',
//     component: HomePageComponent,
//     children: [
//       { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
//       { path: 'dashboard', component: DashboardComponent },
//     ],
//   },
//   { path: 'landing', component: LandingPageComponent },
// ]
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                navbar_component_1.NavbarComponent,
                table_component_1.TableComponent,
                dashboard_component_1.DashboardComponent,
                range_date_picker_component_1.RangeDatePickerComponent,
                filter_dropdown_component_1.FilterDropdownComponent,
                filter_content_component_1.FilterContentComponent,
                filter_dropdown_category_component_1.FilterDropdownCategoryComponent,
                filter_chips_component_1.FilterChipsComponent,
                home_page_component_1.HomePageComponent,
                landing_page_component_1.LandingPageComponent,
                page_not_found_component_1.PageNotFoundComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                material_module_1.MaterialModule,
                forms_1.FormsModule,
                angular_fontawesome_1.FontAwesomeModule,
                forms_1.ReactiveFormsModule,
                table_1.MatTableModule,
                paginator_1.MatPaginatorModule,
                ngx_mat_select_search_1.NgxMatSelectSearchModule,
            ],
            providers: [material_moment_adapter_1.provideMomentDateAdapter(landing_page_component_1.MY_FORMATS)],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
