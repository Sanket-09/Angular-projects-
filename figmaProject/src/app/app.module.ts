import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { TableComponent } from './modules/component/table/table.component';

import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { RangeDatePickerComponent } from './modules/component/range-date-picker/range-date-picker.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FilterDropdownComponent } from './modules/component/filter-dropdown-speciality/filter-dropdown.component';
import { FilterContentComponent } from './modules/component/filter-content/filter-content.component';
import { FilterDropdownCategoryComponent } from './modules/component/filter-dropdown-category/filter-dropdown-category.component';
import { FilterChipsComponent } from './modules/component/filter-chips/filter-chips.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';

// import { BufferComponentComponent } from './modules/component/buffer-component/buffer-component.component';

const appRoute : Routes =  [ 
  { path: '', pathMatch: 'full', redirectTo: 'homepage' },
  { path: 'homepage', component: HomePageComponent },
  { path: 'landing', component: LandingPageComponent}
]

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
    RouterModule.forRoot(appRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
