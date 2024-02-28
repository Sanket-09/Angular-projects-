import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomePageComponent } from './home-page/home-page.component'
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component'
import { LandingPageComponent } from './modules/landing-page/landing-page.component'
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component'

const appRoute: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'homepage' },
  {
    path: 'homepage',
    component: HomePageComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'pageNotFound', component: PageNotFoundComponent },
    ],
  },
  { path: 'landing', component: LandingPageComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
