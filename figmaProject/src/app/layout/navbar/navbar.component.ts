import { Component, OnInit } from '@angular/core'

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
  sideNav: sideNavs[] = [
    {
      value: 'physician-escalations-0',
      viewValue: 'Physician Escalations',
      notif: 8,
      router: 'pageNotFound',
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
      router: 'pageNotFound',
    },
    {
      value: 'nursing-home-visit-3',
      viewValue: 'Nursing  Home Visit',
      notif: 9,
      router: 'pageNotFound',
    },
    {
      value: 'nursing-care-service-4',
      viewValue: 'Nursing Care Service',
      notif: 7,
      router: 'pageNotFound',
    },
    {
      value: 'physiotherapy-5',
      viewValue: 'Physiotherapy',
      notif: 1,
      router: 'pageNotFound',
    },
    {
      value: 'dietician-6',
      viewValue: 'Dietician',
      notif: 0,
      router: 'pageNotFound',
    },
    {
      value: 'psychologist-7',
      viewValue: 'Psychologist',
      notif: 3,
      router: 'pageNotFound',
    },
  ]

  selectedCard: any

  selectCard(sideNav: sideNavs): void {
    this.sideNav.forEach((nav) => (nav.selected = false)) // Deselect all cards
    sideNav.selected = true // Select the clicked card
    this.selectedCard = sideNav
    console.log(sideNav.router)
  }

  isSelected(sideNav: any): boolean {
    return this.selectedCard === sideNav
  }

  constructor() {}

  ngOnInit(): void {}
}
