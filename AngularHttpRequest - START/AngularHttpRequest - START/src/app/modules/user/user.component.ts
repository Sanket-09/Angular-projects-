import { Component, OnInit,ViewChild } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs';
import {Product} from './model/products';
import {productService} from './service/products.service';
import {FormGroup,NgForm} from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  allProducts: Product[] = [];
  isFetching: boolean;
  currentProductId: string;
  editMode: boolean = false;
  @ViewChild('productsForm') form: NgForm;
  productsForm: any;
  defaultGender = 'default';
  displayedColumns: string[] = ['Name', 'Email', 'PhoneNumber', 'Dob', 'Gender', 'delete-btn', 'visible'];
  constructor(private productService:productService) { }

  ngOnInit() {
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

  onProductCreate(products: {
    Name: string,
    Email: string,
    PhoneNumber: string,
    Dob: Date,
    Gender: string
  }, productsForm) {

    if (this.editMode == false)
      this.productService.createProduct(products).subscribe(() => {
        debugger
        productsForm.resetForm();
        alert("Form Submitted")
        this.onProductsFetch();
      })

    else{
      this.productService.updateProduct(this.currentProductId, products).subscribe(() => {
        debugger;
        productsForm.resetForm();

        alert("Form Updated")
        this.onProductsFetch();
        this.editMode = false;
      });}
  }



  onProductsFetch() {
    this.isFetching = true;
    this.productService.fetchProduct().subscribe((response) => {
      console.log(response);
      this.allProducts = [...response];
      this.isFetching = false;
    });
  }

  onDeleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe((data) => {
      this.allProducts.filter(product => product.id !== id)
      this.onProductsFetch();
      this.productsForm.resetForm();
    });
  }

  onDeletAllProducts() {
    this.productService.clearProduct().subscribe()
  }

  onEditProduct(id: string) {
    let currentProduct = this.allProducts.find((currElement) => {
      return currElement.id === id
    })

    this.form.setValue({
      Name: currentProduct.Name,
      Email: currentProduct.Email,
      PhoneNumber: currentProduct.PhoneNumber,
      Dob: currentProduct.Dob,
      Gender: currentProduct.Gender
    });

    this.editMode = true;

    this.currentProductId = id;

  }

 

}
