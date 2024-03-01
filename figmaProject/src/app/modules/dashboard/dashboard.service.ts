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
    return this.apiService.getRequest('followup/service/specialty/all');
  }
}
