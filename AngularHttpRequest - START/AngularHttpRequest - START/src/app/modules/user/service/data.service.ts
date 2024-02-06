import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http : HttpClient) { }

  getDataById(id : any): Observable<any>
  {
    const url = 'https://procademy-c9684-default-rtdb.firebaseio.com/products/' + id + '.json';
    return this.http.get<any>(url);
  }
}
