import { Injectable } from '@angular/core'
import { ApiServiceService } from '../shared/services/api.service'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { AppointmentHeader } from './appointmentHeaderModel'

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private selectedCardSubject = new BehaviorSubject<string>('total')
  selectedCard$ = this.selectedCardSubject.asObservable()

  private filterSubject = new BehaviorSubject<string>('')
  filter$ = this.filterSubject.asObservable()

  constructor(private apiService: ApiServiceService) {}

  getSpecialityMapId(): Observable<any> {
    return this.apiService.getRequest('speciality/all')
  }

  getSideNavCount(): Observable<any> {
    return this.apiService.getRequest('followup/service/sidbar/count')
  }

  getSpecialityList(): Observable<any> {
    return this.apiService.getRequest('followup/service/specialty/all')
  }

  appointmentHeader = new AppointmentHeader()

  private statusFilterSubject = new BehaviorSubject<string>('')
  statusFilter$ = this.statusFilterSubject.asObservable()
  dataUpdatedSubject = new Subject<void>()

  updateStatusFilter(filterValue: string): void {
    this.statusFilterSubject.next(filterValue)
  }

  notifyDataUpdated(): void {
    this.dataUpdatedSubject.next()
  }

  getBucketCount(): Observable<any> {
    return this.apiService.postRequest(
      'physician-appointment/service/count',
      this.appointmentHeader
    )
  }

  getAppointmentTotalList(): Observable<any> {
    return this.apiService.postRequest(
      'physician-appointment/service/list',
      this.appointmentHeader
    )
  }

  getSpecialityMap(): Observable<any> {
    return this.apiService.getRequest('speciality/all')
  }

  updateFilter(filter: string) {
    this.selectedCardSubject.next(filter)
    this.filterSubject.next(filter)
  }
}
