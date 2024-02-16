import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  {status: 'Pending', prefDate: new Date(), id: 'M41232', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M37431', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M12412', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M24431', name: 'Jane Doe' , reqDate: new Date(), speciality: 'General Medicine' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M37281', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M37421', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Other Appointments'},
  {status: 'Pending', prefDate: new Date(), id: 'M37281', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M37281', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M32131', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M37123', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M33212', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M32341', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M35321', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},


];





@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {

  displayedColumns: string[] = ['status', 'prefDate', 'id', 'name', 'reqDate', 'speciality' , 'visitType'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor() { }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator ;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  

}
