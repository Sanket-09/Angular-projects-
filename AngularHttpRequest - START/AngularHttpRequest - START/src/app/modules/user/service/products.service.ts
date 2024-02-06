import { HttpClient , HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../model/products";
import { Observable, map } from "rxjs";
import { DatePipe } from "@angular/common";


@Injectable({
  providedIn: "root"
}) export class productService {
  isFetching: boolean; //similar to mentioning in provider in app.module
  allProducts: any[];

  constructor(private http: HttpClient) {

  }

  createProduct(products: {
    Name: string,
    Email: string,
    PhoneNumber: string,
    Dob: Date,
    Gender: string
  }): Observable < any > {
    const datepipe = new DatePipe('en-US');
    const formattedProducts = {...products, Dob: datepipe.transform(products.Dob, 'yyyy-MM-dd')}
 
    console.log(products);
    const myHeader = new HttpHeaders({
      'myHeader': 'proacademy'
    });
    return this.http.post < {
      name: string
    } > ('https://procademy-c9684-default-rtdb.firebaseio.com/products.json', formattedProducts , {
      headers: myHeader
    });



    //will be automatically converted to a json file by the post method
    //post method returns an observable, need a subscriber to return the data
    //no subscriber, no request will be sent
  }

  fetchProduct() {

    this.isFetching = true;
    return this.http.get < {
        [key: string]: Product
      } > ('https://procademy-c9684-default-rtdb.firebaseio.com/products.json')
      .pipe(map((res) => {
        const products = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            products.push({
              ...res[key],
              id: key
            })
          }
        }
        return products;
      }))
  }

  deleteProduct(id: string) {
    return this.http.delete('https://procademy-c9684-default-rtdb.firebaseio.com/products/' + id + '.json')

  }

  clearProduct() {
    return this.http.delete('https://procademy-c9684-default-rtdb.firebaseio.com/products.json')
  }

  updateProduct(id: string, value: Product): Observable < any > {
    return this.http.put('https://procademy-c9684-default-rtdb.firebaseio.com/products/' + id + '.json', value);
  }

}
