import { Injectable } from '@angular/core'
import { ApiServiceService } from '../shared/services/api.service'
import { BehaviorSubject, Observable } from 'rxjs'

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

  bucketCountHeader = {
    preferred_date_from: '',
    preferred_date_to: '',
    requested_date_from: '',
    requested_date_to: '',
    offset: 0,
    page_size: 10,
    category: [],
    status: [],
    hsm_id: [],
    visit_type: [],
    selectedCard: 'pending',
  }

  getBucketCount(): Observable<any> {
    return this.apiService.postRequest(
      'physician-appointment/service/count',
      this.bucketCountHeader
    )
  }

  getAppointmentTotalList(params: {
    currentStatus?: string
    currentCategory?: string[]
    currentVisitType?: string[]
    currentSpeciality?: string[]
  }): Observable<any> {
    const AppointmentTotalListHeader = {
      preferred_date_from: '',
      preferred_date_to: '',
      requested_date_from: '',
      requested_date_to: '',
      offset: 0,
      page_size: 500,
      category: params.currentCategory || [],
      status: [],
      hsm_id: params.currentSpeciality || [],
      visit_type: params.currentVisitType || [],
      selectedCard: params.currentStatus || 'total',
    }

    console.log('getappointment called with status : ', params.currentStatus)
    console.log(
      'getappointment called with category : ',
      params.currentCategory
    )
    console.log(
      'getappointment called with visit type : ',
      params.currentVisitType
    )
    console.log(
      'getappointment called with speciality : ',
      params.currentSpeciality
    )

    return this.apiService.postRequest(
      'physician-appointment/service/list',
      AppointmentTotalListHeader
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
