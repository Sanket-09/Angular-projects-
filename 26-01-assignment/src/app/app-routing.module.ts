import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';

const routes: Routes = [
  { path: 'addItem', component: AddItemComponent },
  { path: 'edit-item/:index', component: EditItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
