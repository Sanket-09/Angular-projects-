import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, filter } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FilterService {
  totalNo: number | undefined;
  currentFilterStatus! : string ;
  currentSelectedValues: string[] = [];

  constructor() { }

  private filterSubject = new Subject<string> ();
  private filterSubjectObj = new Subject<object> ();


  filterChanged$ = this.filterSubject.asObservable();
  filterChangedSpeciality$  =this.filterSubjectObj.asObservable();
  filterChangedSearch$  =this.filterSubject.asObservable();

  emitFilterSearch(search : string){
    this.filterSubject.next(search);
  }

  emitFilter(filter : string){
    this.filterSubject.next(filter);
  }

  emitFilterSpeciality(speciality : any)
  { 
    // const filterObj = {"key": Math.random() , "value" : this.currentFilter }
    // console.log(filterObj);
    // speciality.push(filterObj);
    console.log("received event speciality type "  + typeof(speciality) + "  value of event  " + speciality)
    this.filterSubjectObj.next(speciality);
  }

  applyFilter(){
    this.emitFilterSpeciality(this.currentSelectedValues);
    this.emitFilter(this.currentFilterStatus);
  }

  
}
