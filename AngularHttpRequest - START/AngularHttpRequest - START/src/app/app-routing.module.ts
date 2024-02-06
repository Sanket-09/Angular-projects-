import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsCardComponent } from './modules/user/components/details-card/details-card.component';
import { AppComponent } from './app.component';

const routes: Routes = [
{ path: '', redirectTo:'user',pathMatch:'full'},
 {path:'user',loadChildren:()=>import ('./modules/user/user.module').then(m=>m.UserModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }