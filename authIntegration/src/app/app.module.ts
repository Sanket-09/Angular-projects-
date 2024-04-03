import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { SigninComponent } from './signin/signin.component'
import { SignupComponent } from './signup/signup.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { FooterComponent } from './partials/footer/footer.component'
import { HeaderComponent } from './partials/header/header.component'
import { HomeComponent } from './home/home.component'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
