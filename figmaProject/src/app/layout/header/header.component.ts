import { Component, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface hospital {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  hospital: hospital[] = [
    {value: 'trinity-0', viewValue: 'Trinity Hospital'},
    {value: 'appolo-1', viewValue: 'Appolo Hospital'},
    {value: 'tata-2', viewValue: 'Tata AIG'},
  ];
 

  
  constructor() { }

  ngOnInit(): void {
  }

}
