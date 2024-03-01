import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError, finalize, map, of, throwError } from 'rxjs'
import { EncryptionDecryptionService } from './../services/encryption-decryption.service'
import { environment } from 'src/environments/environment'
import * as CryptoJS from 'crypto-js'

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(
    private http: HttpClient,
    private encryptionDecryptionService: EncryptionDecryptionService
  ) {}
  getHttpOptions() {
    let sHeaders = {
      headers: new HttpHeaders(),
    }
    let headers: any = {}
    headers['Authorization'] = 'Bearer ' + this.getEncryptedToken()
    headers['eid'] = environment.eid
    headers['metaid'] = environment.metaid
    sHeaders = {
      headers: headers,
    }
    return sHeaders
  }

  getEncryptedToken() {
    let eid = environment.eid
    console.log(eid)
    let token = environment.token
    const encryptToken = CryptoJS.AES.encrypt(
      JSON.stringify(token),
      eid
    ).toString()
    console.log(encryptToken)
    return encryptToken
  }

  private getURL(sEndPoint: any) {
    let apiOriginLink

    switch (sEndPoint) {
      case 'user/login':
      case 'user/login-old':
      case 'user/login-otp':
      case 'user/forgot-password':
      case 'user/change-password':
      case 'user/user-log':
      case 'hospital/id':
      case 'user/hospital':
      case 'user/getuserbytoken':
      case 'user/get-new-token':
      case 'user/user-location-log':
      case 'home-service/id':
      case 'user/close-previous-session':
      case 'user/get-encrypted-token-by-secrete-key':
      case 'language/all':
      case 'user/get-token-by-secrete-key':
      case 'user/get-token-by-secrete-key':
        apiOriginLink = `${environment.apiOriginPmpLink}${environment.pmpURL}${sEndPoint}`
        break
      case 'lab/service/count':
      case 'lab/service/list':
      case 'dietician/service/count':
      case 'dietician/service/list':
      case 'psychologist/service/count':
      case 'psychologist/service/list':
      case 'followup/service/specialty/all':
      case 'followup/service/sidbar/count':
      case 'followup/service/log':
      case 'followup/service/snooze':
      case 'followup/service/service_request':
      case 'physiotherapy/service/dashboard-count':
      case 'physiotherapy/service/physiotherapy-list':
      case 'physician-escalation/service/count':
      case 'physician-escalation/service/list':
      case 'physician-appointment/service/count':
      case 'physician-appointment/service/list':
      case 'discharge/patient':
      case 'discharge/presigned-url/':
      case 'followup/service/search':
      case 'nursing-care/service/list':
      case 'nursing-care/service/count':
      case 'nursing-home-visit/service/list':
      case 'nursing-home-visit/service/count':
      case 'followup/service/getsnooze':
      case 'followup/service/details':
        apiOriginLink = `${environment.apiOriginSrdLink}${environment.srdURL}${sEndPoint}`
        break
      case 'followup/master-list':
      case 'speciality/all':
        apiOriginLink = `${environment.apiOriginHeaps360HcmsLink}${environment.heaps360HcmsURL}${sEndPoint}`
        break
      default:
        apiOriginLink = `${environment.apiOriginCccLink}${environment.cccURL}${sEndPoint}`
        break
    }

    return apiOriginLink
  }
  getRequest(
    endPoint: string,
    id: any = null,
    showSpinner: boolean = true,
    sHeaders: any = null,
    params = null
  ): Observable<any> {
    let apiURL = this.getURL(endPoint)
    if (!apiURL) {
      return of({ status: false })
    }
    if (id) {
      const idsArr = id.toString().split('/')
      idsArr.forEach((par: any) => {
        par = decodeURIComponent(par)
        const encryptedId =
          this.encryptionDecryptionService.getEncryptedData(par)
        const encodedId = encodeURIComponent(encryptedId)
        endPoint = `${endPoint}${'/'}${encodedId}`
      })
    }
    if (params) {
      const encryptedQueryParams =
        this.encryptionDecryptionService.getEncryptedData(params)
      const encodedQueryParams = encodeURIComponent(encryptedQueryParams)
      endPoint += '?queryParams=' + encodedQueryParams
    }

    let httpOptions = this.getHttpOptions()
    debugger
    return this.http.get(apiURL, httpOptions).pipe(
      map((result: any) => {
        let resultData: any = {}
        resultData = this.encryptionDecryptionService.getDecryptedData(
          result.responseObj
        )
        return resultData
      }),
      catchError((error: any): Observable<any> => {
        return throwError(error)
      }),
      finalize(() => {})
    )
  }
}
