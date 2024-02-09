import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BottomSheetViewerComponent , BottomSheetViewerSheet } from './bottom-sheet-viewer/bottom-sheet-viewer.component';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { Routes } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { TreeComponent } from './tree/tree.component';
import { TableComponent } from './table/table.component';
import { SnackbarComponent } from './snackbar/snackbar.component';

const routes : Routes = [
    {path: '' , component:AutocompleteComponent},
    {path: 'autoComplete', component: AutocompleteComponent},
    {path: 'bottomSheet', component:BottomSheetViewerComponent},
    {path: 'button' , component: ButtonComponent},
    {path: 'snackbar', component: SnackbarComponent},

  ]


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AutocompleteComponent,
        BottomSheetViewerComponent,
        BottomSheetViewerSheet,
        ButtonComponent,
        CheckboxComponent,
        TreeComponent,
        TableComponent,
        SnackbarComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MatNativeDateModule,
        ReactiveFormsModule,

    ]   
})
export class AppModule { }
