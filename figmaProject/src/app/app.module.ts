import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MaterialModule } from './material.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './layout/header/header.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NavbarComponent } from './layout/navbar/navbar.component'
import { TableComponent } from './modules/dashboard/component/table/table.component'

import { DashboardComponent } from './modules/dashboard/dashboard.component'
import { RangeDatePickerComponent } from './modules/dashboard/component/range-date-picker/range-date-picker.component'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search'
import { FilterDropdownComponent } from './modules/dashboard/component/filter-dropdown-speciality/filter-dropdown.component'
import { FilterContentComponent } from './modules/dashboard/component/filter-content/filter-content.component'
import { FilterDropdownCategoryComponent } from './modules/dashboard/component/filter-dropdown-category/filter-dropdown-category.component'
import { FilterChipsComponent } from './modules/dashboard/component/filter-chips/filter-chips.component'
import { RouterModule, Routes } from '@angular/router'
import { HomePageComponent } from './modules/dashboard/pages/home-page/home-page.component'
import {
  LandingPageComponent,
  MY_FORMATS,
} from './modules/dashboard/pages/landing-page/landing-page.component'
import { provideMomentDateAdapter } from '@angular/material-moment-adapter'
import { PageNotFoundComponent } from './modules/dashboard/pages/page-not-found/page-not-found.component'

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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    TableComponent,
    DashboardComponent,
    RangeDatePickerComponent,
    FilterDropdownComponent,
    FilterContentComponent,
    FilterDropdownCategoryComponent,
    FilterChipsComponent,
    HomePageComponent,
    LandingPageComponent,
    PageNotFoundComponent,

    // BufferComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    NgxMatSelectSearchModule,
    // RouterModule.forRoot(appRoute),
  ],
  providers: [provideMomentDateAdapter(MY_FORMATS)],
  bootstrap: [AppComponent],
})
export class AppModule {}
