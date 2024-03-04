import { Injectable } from '@angular/core'
import { ApiServiceService } from '../shared/services/api.service'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private apiService: ApiServiceService) {}

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

  AppointmentTotalListHeader = {
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

  getAppointmentTotalList(): Observable<any> {
    return this.apiService.postRequest(
      'physician-appointment/service/list',
      this.AppointmentTotalListHeader
    )
  }

  getSpecialityMap(): Observable<any> {
    return this.apiService.getRequest('speciality/all ')
  }
}
