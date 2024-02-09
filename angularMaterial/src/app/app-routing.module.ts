import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { BottomSheetViewerComponent } from './bottom-sheet-viewer/bottom-sheet-viewer.component';
import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { TreeComponent } from './tree/tree.component';
import { TableComponent } from './table/table.component';


const routes: Routes = [
  {path: '  ' , component:AutocompleteComponent},
  {path: 'autoComplete' , component:AutocompleteComponent},
  {path: 'bottomSheet' , component:BottomSheetViewerComponent},
  {path: 'button' , component: ButtonComponent},
  {path: 'checkbox', component: CheckboxComponent},
  {path: 'tree' , component: TreeComponent},
  {path: 'table' , component:TableComponent}

  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
