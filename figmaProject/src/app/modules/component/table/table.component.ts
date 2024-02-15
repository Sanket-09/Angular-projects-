import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  prefDate: Date;
  status: string;
  id: string;
  name: string;
  reqDate : Date;
  speciality : string;
  visitType : string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {status: 'Pending', prefDate: new Date(), id: 'M37281', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M37281', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M37281', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M37281', name: 'Jane Doe' , reqDate: new Date(), speciality: 'General Medicine' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M37281', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M37281', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Other Appointments'},
  {status: 'Pending', prefDate: new Date(), id: 'M37281', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M37281', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},


];





@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['status', 'prefDate', 'id', 'name', 'reqDate', 'speciality' , 'visitType'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
