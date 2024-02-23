import { Component, OnInit } from '@angular/core'

interface sideNavs {
  value: string
  viewValue: string
  notif: number
  router: string
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  sideNav: sideNavs[] = [
    {
      value: 'physician-escalations-0',
      viewValue: 'Physician Escalations',
      notif: 8,
      router: 'dashboard',
    },
    {
      value: 'physician-appointments-1',
      viewValue: 'Physician Appointments',
      notif: 5,
      router: 'dashboard',
    },
    {
      value: 'lab-service-2',
      viewValue: 'Lab Service',
      notif: 4,
      router: 'dashboard',
    },
    {
      value: 'nursing-home-visit-3',
      viewValue: 'Nursing  Home Visit',
      notif: 9,
      router: 'dashboard',
    },
    {
      value: 'nursing-care-service-4',
      viewValue: 'Nursing Care Service',
      notif: 7,
      router: 'dashboard',
    },
    {
      value: 'physiotherapy-5',
      viewValue: 'Physiotherapy',
      notif: 1,
      router: 'dashboard',
    },
    {
      value: 'dietician-6',
      viewValue: 'Dietician',
      notif: 0,
      router: 'dashboard',
    },
    {
      value: 'psychologist-7',
      viewValue: 'Psychologist',
      notif: 3,
      router: 'dashboard',
    },
  ]

  selectedCard: any

  selectCard(sideNav: any) {
    this.selectedCard = sideNav
  }

  isSelected(sideNav: any): boolean {
    return this.selectedCard === sideNav
  }

  constructor() {}

  ngOnInit(): void {}
}
