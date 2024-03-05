import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  totalNo: number | undefined
  currentFilterStatus!: string
  currentSelectedValues: string[] = []
  currentFilterType: string | undefined

  constructor() {}

  private filterSubject = new Subject<string>()
  private filterSubjectObj = new Subject<object>()
  private filterSubjectVisitObj = new Subject<object>()
  private filterSubjectCategoryObj = new Subject<object>()
  private chipMethodSubject = new Subject<void>()

  chipMethodCalled$ = this.chipMethodSubject.asObservable()

  chipCallMethod(chipSpecialityEvent: any) {
    this.chipMethodSubject.next(chipSpecialityEvent)
  }

  currentFilterSpeciality: any
  currentFilterVisit: any

  data: string[] = []
  dataVisit: string[] = []

  filterChanged$ = this.filterSubject.asObservable()
  filterChangedSpeciality$ = this.filterSubjectObj.asObservable()
  filterChangedCategory$ = this.filterSubjectCategoryObj.asObservable()
  filterChangedSearch$ = this.filterSubject.asObservable()
  filterChangedVisit$ = this.filterSubjectVisitObj.asObservable()

  emitFilterSearch(search: string) {
    this.filterSubject.next(search)
  }

  emitFilter(filter: string) {
    this.filterSubject.next(filter)
    // this.emitFilterSpeciality(this.currentFilterSpeciality)
  }

  emitFilterSpeciality(speciality: any) {
    this.data = []
    this.currentFilterSpeciality = speciality

    // const filterObj = {"key": Math.random() , "value" : this.currentFilter }
    // console.log(filterObj);
    // speciality.push(filterObj);
    console.log(
      'received event speciality type ' +
        typeof speciality +
        '  value of event  ' +
        speciality
    )
    this.filterSubjectObj.next(speciality)

    // this.currentFilterSpeciality.forEach((obj: { [x: string]: string }) => {
    //   Object.keys(obj).forEach((key) => {
    //     console.log('key : ' + key + ' - value : ' + obj[key])
    //     if (typeof obj[key] === 'string') this.data.push(obj[key])
    //   })
    // })
  }

  emitFilterCategory(speciality: any) {
    this.data = []
    this.currentFilterSpeciality = speciality

    // const filterObj = {"key": Math.random() , "value" : this.currentFilter }
    // console.log(filterObj);
    // speciality.push(filterObj);
    console.log(
      'received event speciality type ' +
        typeof speciality +
        '  value of event  ' +
        speciality
    )
    this.filterSubjectCategoryObj.next(speciality)

    // this.currentFilterSpeciality.forEach((obj: { [x: string]: string }) => {
    //   Object.keys(obj).forEach((key) => {
    //     console.log('key : ' + key + ' - value : ' + obj[key])
    //     if (typeof obj[key] === 'string') this.data.push(obj[key])
    //   })
    // })
  }

  emitFilterVisit(visit: any) {
    this.dataVisit = []
    this.currentFilterVisit = visit

    // const filterObj = {"key": Math.random() , "value" : this.currentFilter }
    // console.log(filterObj);
    // speciality.push(filterObj);
    console.log(
      'received event Visit type ' + typeof visit + '  value of event  ' + visit
    )
    this.filterSubjectVisitObj.next(visit)

    // this.currentFilterVisit.forEach((obj: { [x: string]: string }) => {
    //   Object.keys(obj).forEach((key) => {
    //     console.log('key : ' + key + ' - value : ' + obj[key])
    //     if (typeof obj[key] === 'string') this.dataVisit.push(obj[key])
    //   })
    // })
  }

  applyFilter() {
    this.emitFilterSpeciality(this.currentSelectedValues)
    this.emitFilter(this.currentFilterStatus)
    this.emitFilterVisit(this.currentFilterVisit)
  }
}
