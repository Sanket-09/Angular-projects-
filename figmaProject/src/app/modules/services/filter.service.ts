import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FilterService {
  totalNo: number | undefined;

  constructor() { }

  private filterSubject = new Subject<string> ();
  private filterSubjectObj = new Subject<object> ();


  filterChanged$ = this.filterSubject.asObservable();
  
  filterChangedSpeciality$  =this.filterSubjectObj.asObservable();

  emitFilter(filter : string){
    this.filterSubject.next(filter);
  }

  emitFilterSpeciality(speciality : object)
  {
    console.log("received event speciality type "  + typeof(speciality))
    this.filterSubjectObj.next(speciality);
  }

  
}
