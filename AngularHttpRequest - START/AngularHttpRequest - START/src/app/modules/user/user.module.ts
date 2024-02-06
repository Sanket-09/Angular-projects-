import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { MaterialExampleModule } from '../../material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DetailsCardComponent } from './components/details-card/details-card.component';
import { productService } from './service/products.service';

@NgModule({
  declarations: [
    UserComponent,
    DetailsCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    MaterialExampleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    UserRoutingModule
  ],

  providers: [productService],
  bootstrap: [UserComponent]
})
export class UserModule { }
