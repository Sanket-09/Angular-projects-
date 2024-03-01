import { Component, OnInit } from '@angular/core'
import { DashboardService } from 'src/app/modules/dashboard/dashboard.service'

interface sideNavs {
  value: string
  viewValue: string
  notif: number
  router: string
  selected?: boolean
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private dashBoardService: DashboardService) {}

  sideNavData: any
  sideNavDataObject: any

  ngOnInit(): void {
    this.dashBoardService.getSideNavCount().subscribe((data: any) => {
      this.sideNavData = data.data[0]
      console.log(this.sideNavData)
      this.sideNav[0].notif = this.sideNavData.CCC_FUP_PHYSICIAN_ESCALATION
      this.sideNav[1].notif = this.sideNavData.CCC_FUP_PHSICIAN_APPOINTMENT
      this.sideNav[2].notif = this.sideNavData.labs
      this.sideNav[3].notif = this.sideNavData.nursing_home_visit
      this.sideNav[4].notif = this.sideNavData.nursing_care
      this.sideNav[5].notif = this.sideNavData.CCC_FUP_PHYSIOTHERAPY
      this.sideNav[6].notif = this.sideNavData.dietician
      this.sideNav[7].notif = this.sideNavData.psychologist
    })
  }

  sideNav: sideNavs[] = [
    {
      value: 'physician-escalations-0',
      viewValue: 'Physician Escalations',
      notif: 0,
      router: 'pageNotFound',
    },
    {
      value: 'physician-appointments-1',
      viewValue: 'Physician Appointments',
      notif: 1,
      router: 'dashboard',
    },
    {
      value: 'lab-service-2',
      viewValue: 'Lab Service',
      notif: 2,
      router: 'pageNotFound',
    },
    {
      value: 'nursing-home-visit-3',
      viewValue: 'Nursing  Home Visit',
      notif: 3,
      router: 'pageNotFound',
    },
    {
      value: 'nursing-care-service-4',
      viewValue: 'Nursing Care Service',
      notif: 4,
      router: 'pageNotFound',
    },
    {
      value: 'physiotherapy-5',
      viewValue: 'Physiotherapy',
      notif: 5,
      router: 'pageNotFound',
    },
    {
      value: 'dietician-6',
      viewValue: 'Dietician',
      notif: 6,
      router: 'pageNotFound',
    },
    {
      value: 'psychologist-7',
      viewValue: 'Psychologist',
      notif: 7,
      router: 'pageNotFound',
    },
  ]

  selectedCard: any

  selectCard(sideNav: sideNavs): void {
    this.sideNav.forEach((nav) => (nav.selected = false)) // Deselect all cards
    sideNav.selected = true // Select the clicked card
    this.selectedCard = sideNav

    console.log(this.sideNavData.data[0])
  }

  isSelected(sideNav: any): boolean {
    return this.selectedCard === sideNav
  }
}
function assignvalue() {
  throw new Error('Function not implemented.')
}
