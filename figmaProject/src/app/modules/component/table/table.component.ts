import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FilterService } from '../../services/filter.service';
import { Subscription } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';

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
  
  {status: 'Pending', prefDate: new Date(), id: 'M41232', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Dermatology' , visitType: 'Escalation'},
  {status: 'Closed', prefDate: new Date(), id: 'M37431', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M12412', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Resolved', prefDate: new Date(), id: 'M24431', name: 'Jane Doe' , reqDate: new Date(), speciality: 'General Medicine' , visitType: 'Escalation'},
  {status: 'Resolved', prefDate: new Date(), id: 'M37281', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M37421', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Radiology' , visitType: 'Other Appointments'},
  {status: 'Closed', prefDate: new Date(), id: 'M37281', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Endocrinologist' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M37281', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Dermatology  ' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M32131', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Closed', prefDate: new Date(), id: 'M37123', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Oncologist' , visitType: 'Escalation'},
  {status: 'Closed', prefDate: new Date(), id: 'M33212', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M32341', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Dermatology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M35321', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Radiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M41232', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Closed', prefDate: new Date(), id: 'M37431', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Endocrinologist' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M12412', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Resolved', prefDate: new Date(), id: 'M24431', name: 'Jane Doe' , reqDate: new Date(), speciality: 'General Medicine' , visitType: 'Escalation'},
  {status: 'Resolved', prefDate: new Date(), id: 'M37281', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M37421', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Other Appointments'},
  {status: 'Pending', prefDate: new Date(), id: 'M37281', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Radiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M32131', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Closed', prefDate: new Date(), id: 'M37123', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Endocrinologist' , visitType: 'Escalation'},
  {status: 'Closed', prefDate: new Date(), id: 'M33212', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Oncologist' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M32341', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M35321', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Oncologist' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M41232', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Endocrinologist' , visitType: 'Escalation'},
  {status: 'Closed', prefDate: new Date(), id: 'M37431', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Resolved', prefDate: new Date(), id: 'M24431', name: 'Jane Doe' , reqDate: new Date(), speciality: 'General Medicine' , visitType: 'Escalation'},
  {status: 'Resolved', prefDate: new Date(), id: 'M37281', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Escalation'},
  {status: 'Pending', prefDate: new Date(), id: 'M37421', name: 'Jane Doe' , reqDate: new Date(), speciality: 'Cardiology' , visitType: 'Other Appointments'},



];

var countTotal = ELEMENT_DATA.length;

var pendingNo = ELEMENT_DATA.filter( item => item.status == 'Pending');
var countPending = pendingNo.length;

var resolvedNo = ELEMENT_DATA.filter( item => item.status == 'Resolved');
var countResolved = resolvedNo.length;

var closedNo = ELEMENT_DATA.filter( item => item.status == 'Closed');
var countClosed = closedNo.length;



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {

  displayedColumns: string[] = ['status', 'prefDate', 'id', 'name', 'reqDate', 'speciality' , 'visitType'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);



  
  filterSubscription: Subscription;

  constructor( private filterService : FilterService) { 
    
    console.log(countPending);
    
    this.filterSubscription = this.filterService.filterChanged$.subscribe(filter => {
      
    if(filter !== 'Total Request')
      this.dataSource.filter = filter; 

    else
      this.dataSource.filter = '';

    this.setValueTotal(countTotal)
    })
  }

  setValueTotal(countTotal : number){
    this.filterService.totalNo = countTotal;
  }

  
  
  @ViewChild(MatPaginator) paginator!: MatPaginator ;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


 
  

}
