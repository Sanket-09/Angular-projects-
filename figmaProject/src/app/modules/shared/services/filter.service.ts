import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}

  private filterSubject = new Subject<string>()
  private filterSubjectObj = new Subject<object>()
  private filterSubjectVisitObj = new Subject<object>()
  private filterSubjectCategoryObj = new Subject<object>()
  private chipMethodSubject = new Subject<void>()
  private filterSubjectPrefDateStart = new Subject<any>()
  private filterSubjectPrefDateEnd = new Subject<any>()
  private filterSubjectReqDateStart = new Subject<any>()
  private filterSubjectReqDateEnd = new Subject<any>()

  chipMethodCalled$ = this.chipMethodSubject.asObservable()

  chipCallMethod(chipSpecialityEvent: any) {
    this.chipMethodSubject.next(chipSpecialityEvent)
  }

  filterChanged$ = this.filterSubject.asObservable()
  filterChangedSpeciality$ = this.filterSubjectObj.asObservable()
  filterChangedCategory$ = this.filterSubjectCategoryObj.asObservable()
  filterChangedSearch$ = this.filterSubject.asObservable()
  filterChangedVisit$ = this.filterSubjectVisitObj.asObservable()
  filterChangedPrefDateStart$ = this.filterSubjectPrefDateStart.asObservable()
  filterChangedPrefDateEnd$ = this.filterSubjectPrefDateEnd.asObservable()
  filterChangedReqDateStart$ = this.filterSubjectReqDateStart.asObservable()
  filterChangedReqDateEnd$ = this.filterSubjectReqDateEnd.asObservable()

  emitFilterPrefDate(start: string, end: string) {
    this.filterSubjectPrefDateStart.next(start)
    this.filterSubjectPrefDateEnd.next(end)
  }

  emitFilterReqDate(start: string, end: string) {
    this.filterSubjectReqDateStart.next(start)
    this.filterSubjectReqDateEnd.next(end)
  }

  emitFilterSearch(search: string) {
    this.filterSubject.next(search)
  }

  emitFilter(filter: string) {
    this.filterSubject.next(filter)
    // this.emitFilterSpeciality(this.currentFilterSpeciality)
  }

  emitFilterSpeciality(speciality: any) {
    // const filterObj = {"key": Math.random() , "value" : this.currentFilter }
    // console.log(filterObj);
    // speciality.push(filterObj);
    this.filterSubjectObj.next(speciality)
    // this.currentFilterSpeciality.forEach((obj: { [x: string]: string }) => {
    //   Object.keys(obj).forEach((key) => {
    //     console.log('key : ' + key + ' - value : ' + obj[key])
    //     if (typeof obj[key] === 'string') this.data.push(obj[key])
    //   })
    // })
  }

  emitFilterCategory(speciality: any) {
    // const filterObj = {"key": Math.random() , "value" : this.currentFilter }
    // console.log(filterObj);
    // speciality.push(filterObj);
    this.filterSubjectCategoryObj.next(speciality)
    // this.currentFilterSpeciality.forEach((obj: { [x: string]: string }) => {
    //   Object.keys(obj).forEach((key) => {
    //     console.log('key : ' + key + ' - value : ' + obj[key])
    //     if (typeof obj[key] === 'string') this.data.push(obj[key])
    //   })
    // })
  }

  emitFilterVisit(visit: any) {
    // const filterObj = {"key": Math.random() , "value" : this.currentFilter }
    // console.log(filterObj);
    // speciality.push(filterObj);
    this.filterSubjectVisitObj.next(visit)
    // this.currentFilterVisit.forEach((obj: { [x: string]: string }) => {
    //   Object.keys(obj).forEach((key) => {
    //     console.log('key : ' + key + ' - value : ' + obj[key])
    //     if (typeof obj[key] === 'string') this.dataVisit.push(obj[key])
    //   })
    // })
  }
}
