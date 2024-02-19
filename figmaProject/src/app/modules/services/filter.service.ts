import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  pendingNo : number | undefined;
  resolvedNo : number | undefined 
  closedNo : number | undefined 
  totalNo : number | undefined 
  


  private filterSubject = new Subject<string> ();


  filterChanged$ = this.filterSubject.asObservable();


  emitFilter(filter : string){
    this.filterSubject.next(filter);
  }

  
}
