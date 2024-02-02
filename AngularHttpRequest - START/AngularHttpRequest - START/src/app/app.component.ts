import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { Product } from './model/products';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'AngularHttpRequest';
  allProducts : Product[] = [];
  isFetching: boolean;
  
  constructor(private http: HttpClient){

  }

  ngOnInit(){
    this.fetchProducts();
  }

  onProductsFetch(){
    this.fetchProducts();
  }


  onProductCreate(products: {pName:string, desc:string, price:string})
  {
    console.log(products);
    const myHeader = new HttpHeaders({'myHeader':'proacademy'});
    this.http.post<{ name : string }>('https://procademy-c9684-default-rtdb.firebaseio.com/products.json', products, {headers: myHeader})
    .subscribe((data)=>{
      console.log(data);
    }) 
    //will be automatically converted to a json file by the post method
    //post method returns an observable, need a subscriber to return the data
    //no subscriber, no request will be sent
  }

  private fetchProducts(){
    this.isFetching = true;
    this.http.get<{[key: string] : Product}>('https://procademy-c9684-default-rtdb.firebaseio.com/products.json')
    .pipe(map((res)=>{
      const products = [];
      for(const key in res)
      { 
        if(res.hasOwnProperty(key)){
          products.push({...res[key] , id: key})
        }
      }
      return products;
    }))
    .subscribe((response) => {
      console.log(response);
      this.allProducts = response;
      this.isFetching = false;
    })
  }

  onDeleteProduct(id : string){
    this.http.delete('https://procademy-c9684-default-rtdb.firebaseio.com/products/' + id + '.json')
    .subscribe();
  }

  onDeletAllProducts(){
    this.http.delete('https://procademy-c9684-default-rtdb.firebaseio.com/products.json')
    .subscribe();
  }

}




