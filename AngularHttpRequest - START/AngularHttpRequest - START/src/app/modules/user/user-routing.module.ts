import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { DetailsCardComponent } from './components/details-card/details-card.component';

const routes: Routes = [
  { path: '', component:UserComponent},
  {path:':id',component:DetailsCardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
