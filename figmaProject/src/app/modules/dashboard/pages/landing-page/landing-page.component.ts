import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ELEMENT_DATA } from '../../../shared/services/data'
import { PeriodicElement } from '../../../shared/services/data'
import { Clipboard } from '@angular/cdk/clipboard'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatTabChangeEvent } from '@angular/material/tabs'
import { provideMomentDateAdapter } from '@angular/material-moment-adapter'
import * as _moment from 'moment'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms'
import { DashboardService } from '../../dashboard.service'
import { ApiServiceService } from 'src/app/modules/shared/services/api.service'

const moment = _moment

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  formGroup!: FormGroup
  consultedDateControl!: FormControl
  physicianServiceBool: boolean = false
  physicianServiceNotesBool: boolean = false
  matCardStatus: boolean = false
  matCardStatusValue: any
  matCardColor = document.querySelectorAll('.mat-card-status')
  matCardStatusColor: string = ''
  apiData: any

  constructor(
    private copyIdsnackBar: MatSnackBar,
    private copyPhonesnackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private clipboard: Clipboard,
    private _snackBar: MatSnackBar,
    private dashBoardService: DashboardService,
    private apiService: ApiServiceService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const id = params.get('id')
      console.log(id)
      this.currentId = id

      this.dashBoardService.getAppointmentTotalList().subscribe((data) => {
        this.apiData = data.data[0].service_list

        console.log(data.data[0].service_list)

        this.currentElement = this.apiData.find(
          (element: { id: any }) => element.id == this.currentId
        )
        console.log(this.currentElement)

        this.consultedDateControl = new FormControl(null, [Validators.required])
        this.formGroup = new FormGroup({
          consultedDate: this.consultedDateControl,
        })

        this.currentCfId = this.currentElement.cf_id
        console.log(this.currentCfId)

        this.checkStatus()

        const landingPageHeaderBody = {
          id: this.currentId,
          cf_id: this.currentCfId,
          key: 'hcm_fup_physician',
          requested_date: this.currentElement.requested_date,
        }

        this.apiService
          .postRequest('followup/service/details', landingPageHeaderBody)
          .subscribe((data) => {
            console.log(data), (this.currentHeaderData = data)
          })

      
      })
    })
  }

  assignApiData(service_list: any) {
    this.apiData = service_list
    this.checkStatus()
    console.log(service_list)
  }

  radioNotReqButtonClicked() {
    this.matCardStatusValue = 'Closed'
    this.physicianServiceBool = false
    this.physicianServiceNotesBool = true
    this.matCardStatus = true
    this.matCardStatusColor = '#F0F1F3'
  }

  radioYesButtonClicked() {
    this.matCardStatusValue = 'Pending'
    this.physicianServiceBool = true
    this.matCardStatus = true
    this.physicianServiceNotesBool = true
    this.matCardStatusColor = '#fde9e7'
  }

  radioNoButtonClicked() {
    this.matCardStatusValue = 'Resolved'
    this.physicianServiceBool = false
    this.matCardStatus = true
    this.physicianServiceNotesBool = false
    this.matCardStatusColor = '#D7F9EA'
  }

  date = new FormControl(moment())

  currentStatusResolved: boolean = false
  currentStatusPending: boolean = false

  selectedTabIndex: number = 1

  tabChanged($event: MatTabChangeEvent) {
    this.checkStatus()
  }

  private checkStatus(): void {
    console.log(this.currentElement)
    if (this.currentElement.status === 'Pending') {
      this.selectedTabIndex = 0
      this.currentStatusPending = true
    } else {
      this.currentStatusPending = false
      this.selectedTabIndex = 1
    }

    if (
      this.currentElement.status === 'Closed' ||
      this.currentElement.status === 'Resolved'
    ) {
      this.currentStatusResolved = true
    } else this.currentStatusResolved = false
  }

  getCurrentStatus() {
    console.log('asidbiadb')
  }

  copyPhonefn(message: string, action: string) {
    const idContent = document.getElementById('copyPhoneNumber')?.innerText

    if (idContent) {
      this.clipboard.copy(idContent)
      this.copyPhonesnackBar.open(message, action, {
        duration: 2000,
        panelClass: ['blue-snackbar'],
        verticalPosition: 'bottom',
        horizontalPosition: 'start',
      })
    } else alert('Error')
  }

  copyIdfn(message: string, action: string) {
    const idContent = document.getElementById('copyId')?.innerText

    if (idContent) {
      this.clipboard.copy(idContent)
      this.copyIdsnackBar.open(message, action, {
        duration: 2000,
        panelClass: ['blue-snackbar'],
        verticalPosition: 'bottom',
        horizontalPosition: 'start',
      })
    } else alert('Error')
  }

  currentId: any
  currentCfId: any
  currentElement: any
  currentHeaderData: any

  navigateToDashboard() {
    // Navigate to the dashboard route
    console.log('navigate called')
    this.router.navigate(['/homepage'])
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
      verticalPosition: 'bottom',
      horizontalPosition: 'start',
    })
    this.navigateToDashboard()
  }
}
