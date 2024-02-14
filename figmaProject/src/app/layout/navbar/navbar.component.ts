import { Component, OnInit } from '@angular/core';

interface hospital {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  hospital: hospital[] = [
    {value: 'trinity-0', viewValue: 'Trinity Hospital'},
    {value: 'appolo-1', viewValue: 'Appolo Hospital'},
    {value: 'tata-2', viewValue: 'Tata AIG'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
