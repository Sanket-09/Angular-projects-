import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { Product } from './model/products';
import { productService } from './service/products.service';
import { FormGroup, NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'AngularHttpRequest';
  allProducts : Product[] = [];
  isFetching: boolean;
  myForm : NgForm;
  productsForm: any;
  
  constructor(private http: HttpClient, private productService: productService){

  }

  ngOnInit(){
    this.isFetching = true;
    this.productService.fetchProduct().subscribe((response) => {
      console.log(response);
      this.allProducts = response;
      this.isFetching = false;
    });
  }

  // ngOnChanges(){
  //   this.isFetching = true;
  //   this.productService.fetchProduct().subscribe((response) => {
  //     console.log(response);
  //     this.allProducts = response;
  //     this.isFetching = false;
  //   });
  // }

  onProductCreate(products: {pName:string, desc:string, price:string},  productsForm)
  {
   this.productService.createProduct(products)
   productsForm.reset()
  }

  

  onProductsFetch(){
    this.isFetching = true;
    this.productService.fetchProduct().subscribe((response) => {
      console.log(response);
      this.allProducts = response;
      this.isFetching = false;
    });
  }

  onDeleteProduct(id : string){
    this.productService.deleteProduct(id).subscribe( (data) => {
      this.allProducts.filter(product => product.id !== id)
    });
  }

  onDeletAllProducts(){
    this.productService.clearProduct().subscribe()
  }

}


