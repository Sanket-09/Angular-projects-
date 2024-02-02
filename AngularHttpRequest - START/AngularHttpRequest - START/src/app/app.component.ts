import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
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
  currentProductId : string;
  editMode: boolean = false;
  @ViewChild('productsForm') form : NgForm;
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
   
   if(this.editMode==false)
   this.productService.createProduct(products)

   else
   this.productService.updateProduct(this.currentProductId, products);

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

  onEditProduct(id: string) {
    let currentProduct =  this.allProducts.find( (currElement) => {
          return currElement.id === id
      })

    this.form.setValue({
      pName : currentProduct.pName,
      desc : currentProduct.desc ,
      price : currentProduct.price,
  });

     this.editMode = true;

     this.currentProductId = id;
    
    }

}


