import { Component, OnInit } from '@angular/core';

interface sideNavs {
  value: string;
  viewValue: string;
  notif : number
}



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  sideNav: sideNavs[] = [
    {value: 'physician-escalations-0', viewValue: 'Physician Escalations' ,notif : 8},
    {value: 'physician-appointments-1', viewValue: 'Physician Appointments',notif : 5},
    {value: 'lab-service-2', viewValue: 'Lab Service',notif : 4},
    {value: 'nursing-home-visit-3', viewValue: 'Nursing  Home Visit',notif : 9},
    {value: 'nursing-care-service-4', viewValue: 'Nursing Care Service',notif : 7},
    {value: 'physiotherapy-5', viewValue: 'Physiotherapy',notif : 1},
    {value: 'dietician-6', viewValue: 'Dietician',notif : 0},
    {value: 'psychologist-7', viewValue: 'Psychologist',notif : 3},
  ];

  selectedCard: any;

  selectCard(sideNav: any) {
    this.selectedCard = sideNav;
  }

  isSelected(sideNav: any): boolean {
    return this.selectedCard === sideNav;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
